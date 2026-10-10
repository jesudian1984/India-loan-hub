import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { NoObjectGeneratedError } from "npm:ai";
import { z } from "npm:zod";
import { createStructuredResponsesCall } from "../_shared/responses.ts";
import { getLovableAiGatewayResponseHeaders } from "../_shared/run-id.ts";

const FEATURE = "recommend-loan-category";
const CATEGORIES = ["Personal Loan", "Home Loan", "Business Loan", "Doctor Loan", "Credit Card", "Loan Against Property", "Loan Consolidation", "MSME Loan"] as const;
const RequestSchema = z.object({ needs: z.string().trim().min(20).max(1500) });
const RecommendationSchema = z.object({
  summary: z.string(),
  recommendations: z.array(z.object({ category: z.string(), fitReason: z.string(), tradeOff: z.string() })),
  nextStep: z.string(),
});
const jsonHeaders = { ...corsHeaders, "Content-Type": "application/json" };

function jsonResponse(data: Record<string, unknown>, status: number, providerHeaders?: HeadersInit) {
  return new Response(JSON.stringify(data), {
    status,
    headers: getLovableAiGatewayResponseHeaders(providerHeaders, jsonHeaders),
  });
}

function safeError(error: unknown) {
  return error instanceof Error && error.message.trim()
    ? error.message.slice(0, 500)
    : "We couldn't create a recommendation right now. Please try again later.";
}

function isWorkspaceBlock(reason: string) {
  return /credit|workspace|retention|region|model_requires_retention_consent|provider_not_available_in_region|ai is disabled/i.test(reason);
}

Deno.serve(async (request: Request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return jsonResponse({ error: "Use POST to request a recommendation." }, 405);

  const token = request.headers.get("Authorization")?.match(/^Bearer\s+(.+)$/i)?.[1];
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const publishableKey = Deno.env.get("SUPABASE_ANON_KEY") ?? Deno.env.get("SUPABASE_PUBLISHABLE_KEY");
  if (!token || !supabaseUrl || !publishableKey) {
    return jsonResponse({ error: "Please sign in to use loan recommendations." }, 401);
  }

  const userClient = createClient(supabaseUrl, publishableKey, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data: { user }, error: authError } = await userClient.auth.getUser(token);
  if (authError || !user) return jsonResponse({ error: "Please sign in to use loan recommendations." }, 401);

  const { data: accessState, error: accessError } = await userClient
    .from("ai_feature_access_state")
    .select("safe_reason")
    .eq("user_id", user.id)
    .eq("feature", FEATURE)
    .maybeSingle();
  if (accessError) {
    console.error("Could not check AI feature access state", accessError.message);
    return jsonResponse({ error: "We couldn't check recommendation availability. Please try again later." }, 503);
  }
  if (accessState) return jsonResponse({ error: accessState.safe_reason }, 403);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Please describe what you need the loan for." }, 400);
  }
  const parsed = RequestSchema.safeParse(body);
  if (!parsed.success) return jsonResponse({ error: "Describe your borrowing need in 20 to 1,500 characters." }, 400);

  const apiKey = Deno.env.get("LOVABLE_API_KEY");
  if (!apiKey) return jsonResponse({ error: "AI recommendations aren't configured yet. Please contact support." }, 500);

  const instructions = `You are IndiaLoanHub's neutral loan-category guide. IndiaLoanHub is a loan-distribution and lead-generation platform, not a direct lender. Recommend only categories from this catalogue: ${CATEGORIES.join(", ")}. Return one to three suitable categories, in descending fit order. Base the match only on the user's stated need. Explain one relevant trade-off per category, using balanced plain language. Use "not enough information" where appropriate; do not invent eligibility, approval, rates, fees, limits, partner availability, or guaranteed outcomes. For product terms, direct the user to compare current lender disclosures. Keep all copy concise, neutral, and non-promissory. Do not repeat or request personal identifiers. Provide one practical next step. The recommendations are indicative and do not represent a lender decision.`;

  try {
    const { result } = createStructuredResponsesCall(
      request,
      { baseURL: "https://ai.gateway.lovable.dev/v1", apiKey, model: "openai/gpt-6-astra" },
      [{ role: "user", content: parsed.data.needs }],
      instructions,
      RecommendationSchema,
    );
    const output = await result.output;
    const response = await result.response;
    if (!output || output.recommendations.length === 0) {
      return jsonResponse({ error: "We couldn't find a suitable category from that description. Add a little more detail and try again." }, 502, response.headers);
    }

    const recommendations = output.recommendations.slice(0, 3).flatMap((item) => {
      const category = CATEGORIES.find((candidate) => candidate.toLowerCase() === item.category.trim().toLowerCase());
      return category ? [{ category, fitReason: item.fitReason.slice(0, 500), tradeOff: item.tradeOff.slice(0, 500) }] : [];
    });
    if (recommendations.length === 0) {
      return jsonResponse({ error: "We couldn't match the response to our current loan categories. Please try again with a different description." }, 502, response.headers);
    }
    return jsonResponse({ summary: output.summary.slice(0, 500), recommendations, nextStep: output.nextStep.slice(0, 500) }, 200, response.headers);
  } catch (error) {
    if (request.signal.aborted || (error instanceof Error && error.name === "AbortError")) {
      return jsonResponse({ error: "Recommendation cancelled." }, 499);
    }
    if (NoObjectGeneratedError.isInstance(error)) {
      return jsonResponse({ error: "We couldn't format a clear recommendation for that request. Please add a little detail and try again." }, 502);
    }

    const statusCode = typeof error === "object" && error !== null && "statusCode" in error && typeof error.statusCode === "number"
      ? error.statusCode
      : 500;
    const reason = safeError(error);
    if (statusCode === 403 && !isWorkspaceBlock(reason)) {
      const safeReason = "AI recommendations are temporarily unavailable for this account. Please contact support.";
      const { error: insertError } = await userClient.from("ai_feature_access_state").insert({
        user_id: user.id,
        feature: FEATURE,
        safe_reason: safeReason,
      });
      if (insertError && insertError.code !== "23505") {
        console.error("Could not persist AI provider access denial", insertError.message);
      }
      return jsonResponse({ error: safeReason }, 403);
    }
    console.error("Loan recommendation failed", statusCode, reason);
    return jsonResponse({ error: reason }, statusCode >= 400 && statusCode <= 599 ? statusCode : 500);
  }
});