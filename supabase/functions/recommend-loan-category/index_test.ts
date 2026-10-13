import { assertEquals } from "jsr:@std/assert@1";
import { handleRequest } from "./index.ts";

Deno.test("loan recommendations require a signed-in user", async () => {
  const response = await handleRequest(new Request("http://localhost/recommend-loan-category", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ needs: "I need a loan for my small business." }),
  }));

  assertEquals(response.status, 401);
  assertEquals(await response.json(), { error: "Please sign in to use loan recommendations." });
});