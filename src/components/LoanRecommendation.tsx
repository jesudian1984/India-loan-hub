import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, BriefcaseBusiness, CircleAlert, CreditCard, Home, LoaderCircle, ShieldCheck, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface Recommendation {
  category: string;
  fitReason: string;
  tradeOff: string;
}

interface RecommendationResult {
  summary: string;
  recommendations: Recommendation[];
  nextStep: string;
}

const categoryLinks: Record<string, { to: string; icon: typeof Wallet }> = {
  "Personal Loan": { to: "/loans/personal", icon: Wallet },
  "Home Loan": { to: "/loans/home", icon: Home },
  "Business Loan": { to: "/loans/business", icon: BriefcaseBusiness },
  "Doctor Loan": { to: "/loans/doctor", icon: ShieldCheck },
  "Credit Card": { to: "/credit-cards", icon: CreditCard },
  "Loan Against Property": { to: "/loans", icon: Home },
  "Loan Consolidation": { to: "/#consolidate", icon: BriefcaseBusiness },
  "MSME Loan": { to: "/loans/business", icon: BriefcaseBusiness },
};

async function getFunctionErrorMessage(error: { message: string; context?: unknown }) {
  if (error.context instanceof Response) {
    try {
      const payload: unknown = await error.context.clone().json();
      if (typeof payload === "object" && payload !== null && "error" in payload && typeof payload.error === "string") {
        return payload.error;
      }
    } catch {
      // Fall through to the SDK's message when there is no JSON response body.
    }
  }
  return error.message || "We couldn't create a recommendation. Please try again.";
}

const LoanRecommendation = () => {
  const { user, loading: authLoading } = useAuth();
  const [needs, setNeeds] = useState("");
  const [result, setResult] = useState<RecommendationResult | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) return;
    setLoading(true);
    setErrorMessage("");
    setResult(null);
    const { data, error } = await supabase.functions.invoke<RecommendationResult>("recommend-loan-category", {
      body: { needs: needs.trim() },
    });
    if (error) {
      setErrorMessage(await getFunctionErrorMessage(error));
    } else if (data) {
      setResult(data);
    } else {
      setErrorMessage("We couldn't create a recommendation. Please try again.");
    }
    setLoading(false);
  };

  return (
    <section aria-labelledby="loan-recommendation-title" className="border-y border-border bg-muted/30 py-12 sm:py-16">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:gap-12 lg:px-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 text-sm font-medium text-primary">
            <BadgeCheck className="h-4 w-4" /> Lovable AI loan guide
          </div>
          <h2 id="loan-recommendation-title" className="text-3xl font-bold leading-tight text-foreground">Find a loan category that fits your need</h2>
          <p className="max-w-xl text-muted-foreground">Describe what you plan to borrow for. Get a neutral category match and a clear trade-off to consider.</p>
          <p className="flex items-start gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            Your description is sent securely to generate a recommendation and is not saved with your loan enquiry.
          </p>
        </div>

        <div className="space-y-5">
          {!authLoading && !user ? (
            <Card><CardContent className="space-y-4 p-6">
              <p className="text-sm text-muted-foreground">Sign in to use the personalized loan guide.</p>
              <Button asChild><Link to="/auth">Sign in to continue <ArrowRight className="h-4 w-4" /></Link></Button>
            </CardContent></Card>
          ) : (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-xl">What would you like to finance?</CardTitle>
                <CardDescription>Share the purpose and any useful details, such as an approximate amount or repayment preference.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="loan-needs">Your borrowing need</Label>
                    <Textarea
                      id="loan-needs"
                      aria-label="Describe your borrowing need"
                      placeholder="For example: I run a small clinic and need funds for diagnostic equipment and renovation. I would prefer a longer repayment period."
                      value={needs}
                      onChange={(event) => setNeeds(event.target.value)}
                      maxLength={1500}
                      minLength={20}
                      rows={4}
                      required
                      disabled={loading || authLoading || !user}
                    />
                    <p className="text-xs text-muted-foreground">Please don't include your name, phone number, account or identity numbers.</p>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="text-xs text-muted-foreground">{needs.length}/1,500</span>
                    <Button type="submit" disabled={loading || authLoading || !user || needs.trim().length < 20}>
                      {loading ? <><LoaderCircle className="h-4 w-4 animate-spin" /> Finding options…</> : <>Find suitable categories <ArrowRight className="h-4 w-4" /></>}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {errorMessage && <div role="alert" className="flex gap-3 rounded-md border border-destructive/30 bg-destructive/5 p-4 text-sm text-foreground">
            <CircleAlert className="h-5 w-5 shrink-0 text-destructive" /><p>{errorMessage}</p>
          </div>}

          {result && <div aria-live="polite" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Categories to explore</h3>
              <p className="mt-1 text-sm text-muted-foreground">{result.summary}</p>
            </div>
            {result.recommendations.map((recommendation, index) => {
              const category = categoryLinks[recommendation.category];
              const Icon = category?.icon ?? Wallet;
              return <Card key={`${recommendation.category}-${index}`}>
                <CardContent className="space-y-4 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary"><Icon className="h-5 w-5" /></span>
                      <div className="min-w-0">
                        <span className="text-xs font-medium text-muted-foreground">{index === 0 ? "Closest fit" : `Also consider · ${index + 1}`}</span>
                        <h4 className="font-semibold text-foreground">{recommendation.category}</h4>
                      </div>
                    </div>
                    {category && <Button asChild variant="outline" size="sm" className="shrink-0"><Link to={category.to}>Explore <ArrowRight className="h-3.5 w-3.5" /></Link></Button>}
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{recommendation.fitReason}</p>
                  <div className="border-t border-border pt-3">
                    <p className="text-xs font-semibold uppercase text-muted-foreground">Trade-off to compare</p>
                    <p className="mt-1 text-sm leading-relaxed text-foreground">{recommendation.tradeOff}</p>
                  </div>
                </CardContent>
              </Card>;
            })}
            <p className="text-sm text-muted-foreground"><span className="font-medium text-foreground">Next step:</span> {result.nextStep}</p>
            <p className="text-xs leading-relaxed text-muted-foreground">Indicative information only. IndiaLoanHub is not a lender. Lender terms, rates, eligibility and approval are determined by the lender and depend on your profile.</p>
          </div>}
        </div>
      </div>
    </section>
  );
};

export default LoanRecommendation;