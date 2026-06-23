import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Loader2, ArrowDown } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

type LoanRow = {
  financier: string;
  loan_amount: string;
  emi: string;
  tenor: string;
  outstanding: string;
};

const emptyRow = (): LoanRow => ({
  financier: "",
  loan_amount: "",
  emi: "",
  tenor: "",
  outstanding: "",
});

const schema = z.object({
  full_name: z.string().trim().min(2, "Name is required").max(100),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile"),
  email: z.string().trim().email("Invalid email").max(255).optional().or(z.literal("")),
  city: z.string().trim().max(80).optional().or(z.literal("")),
});

const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n || 0);

const formatNum = (n: number, digits = 1) =>
  new Intl.NumberFormat("en-IN", { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(n || 0);

// Estimate monthly interest rate from EMI, principal and tenor using binary search
const estimateMonthlyRate = (principal: number, emi: number, months: number): number | null => {
  if (principal <= 0 || emi <= 0 || months <= 0) return null;
  if (emi * months <= principal) return null; // no positive rate possible
  let low = 0.0001;
  let high = 0.1; // up to ~120% annual
  for (let i = 0; i < 60; i++) {
    const mid = (low + high) / 2;
    const pow = Math.pow(1 + mid, months);
    const calcEmi = (principal * mid * pow) / (pow - 1);
    if (calcEmi < emi) low = mid;
    else high = mid;
  }
  return (low + high) / 2;
};

const computeEMI = (principal: number, monthlyRate: number, months: number): number => {
  if (principal <= 0 || monthlyRate <= 0 || months <= 0) return 0;
  const pow = Math.pow(1 + monthlyRate, months);
  return (principal * monthlyRate * pow) / (pow - 1);
};

const TENORS = [12, 24, 36, 48, 60, 72, 84];
const FOIR = 0.55;

const ConsolidationForm = () => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [monthlySalary, setMonthlySalary] = useState("");
  const [otherEmis, setOtherEmis] = useState("0");
  const [consent, setConsent] = useState(true);
  const [loans, setLoans] = useState<LoanRow[]>([emptyRow()]);
  const [submitting, setSubmitting] = useState(false);
  const [useCustomRate, setUseCustomRate] = useState(false);
  const [customRate, setCustomRate] = useState("12.5");

  const totals = useMemo(() => {
    const numericLoans = loans
      .filter((l) => l.financier.trim() !== "")
      .map((l) => ({
        outstanding: Number(l.outstanding) || 0,
        loanAmount: Number(l.loan_amount) || 0,
        emi: Number(l.emi) || 0,
        tenor: Number(l.tenor) || 0,
      }))
      .filter((l) => l.outstanding > 0 && l.emi > 0);

    const totalEMI = numericLoans.reduce((s, l) => s + l.emi, 0);
    const totalOutstanding = numericLoans.reduce((s, l) => s + l.outstanding, 0);

    let weightedAvgTenor = 0;
    let weightedAvgRateAnnual = 0;
    let hasRateData = false;

    if (totalOutstanding > 0) {
      weightedAvgTenor = numericLoans.reduce((s, l) => s + l.outstanding * l.tenor, 0) / totalOutstanding;

      let rateSum = 0;
      let rateWeight = 0;
      for (const l of numericLoans) {
        if (l.loanAmount > 0 && l.tenor > 0) {
          const monthlyRate = estimateMonthlyRate(l.loanAmount, l.emi, l.tenor);
          if (monthlyRate !== null) {
            rateSum += monthlyRate * l.outstanding;
            rateWeight += l.outstanding;
          }
        }
      }
      if (rateWeight > 0) {
        weightedAvgRateAnnual = (rateSum / rateWeight) * 12 * 100;
        hasRateData = true;
      }
    }

    const effectiveRate = useCustomRate ? (Number(customRate) || 0) / 100 : 0.125;
    const consolidationMonthlyRate = effectiveRate / 12;
    const newTenor = Math.max(Math.round(weightedAvgTenor), 12);
    const estimatedNewEMI =
      totalOutstanding > 0 && weightedAvgTenor > 0
        ? computeEMI(totalOutstanding, consolidationMonthlyRate, newTenor)
        : 0;

    const monthlySavings = totalEMI - estimatedNewEMI;

    // Tenor-wise max eligibility
    const salary = Number(monthlySalary) || 0;
    const others = Number(otherEmis) || 0;
    const maxTotalEMI = salary * FOIR;
    const availableEMI = Math.max(0, maxTotalEMI - others);
    const tenorBreakdown = TENORS.map((n) => {
      const r = consolidationMonthlyRate;
      const maxLoan =
        availableEMI > 0 && r > 0 ? (availableEMI * (1 - Math.pow(1 + r, -n))) / r : 0;
      const refinanceEMI = totalOutstanding > 0 ? computeEMI(totalOutstanding, r, n) : 0;
      const cashInHand = maxLoan - totalOutstanding;
      return { tenor: n, maxEMI: availableEMI, maxLoan, refinanceEMI, cashInHand };
    });
    const bestTenor = tenorBreakdown.reduce(
      (best, t) => (t.cashInHand > (best?.cashInHand ?? -Infinity) ? t : best),
      tenorBreakdown[0]
    );

    return {
      totalEMI,
      totalOutstanding,
      weightedAvgTenor,
      weightedAvgRateAnnual,
      hasRateData,
      estimatedNewEMI,
      monthlySavings,
      newTenor,
      validCount: numericLoans.length,
      salary,
      others,
      maxTotalEMI,
      availableEMI,
      tenorBreakdown,
      bestTenor,
    };
  }, [loans, useCustomRate, customRate, monthlySalary, otherEmis]);

  const updateLoan = (idx: number, field: keyof LoanRow, value: string) => {
    setLoans((prev) => prev.map((l, i) => (i === idx ? { ...l, [field]: value } : l)));
  };

  const addLoan = () => setLoans((prev) => [...prev, emptyRow()]);
  const removeLoan = (idx: number) =>
    setLoans((prev) => (prev.length === 1 ? prev : prev.filter((_, i) => i !== idx)));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ full_name: fullName, phone, email, city });
    if (!parsed.success) {
      toast({ title: "Please fix the form", description: parsed.error.errors[0].message, variant: "destructive" });
      return;
    }
    const validLoans = loans.filter((l) => l.financier.trim() !== "");
    if (validLoans.length === 0) {
      toast({ title: "Add at least one loan", description: "Enter the financier and details for at least one existing loan.", variant: "destructive" });
      return;
    }
    if (!consent) {
      toast({ title: "Consent required", description: "Please agree to be contacted.", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    const payload = {
      full_name: fullName.trim(),
      phone: phone.trim(),
      email: email.trim() || null,
      city: city.trim() || null,
      consent_given: consent,
      existing_loans: {
        applicant_profile: {
          company_name: companyName.trim() || null,
          monthly_salary: Number(monthlySalary) || 0,
          other_emis: Number(otherEmis) || 0,
        },
        loans: validLoans.map((l) => ({
          financier: l.financier.trim(),
          loan_amount: Number(l.loan_amount) || 0,
          emi: Number(l.emi) || 0,
          tenor_months: Number(l.tenor) || 0,
          outstanding: Number(l.outstanding) || 0,
        })),
      },
      total_emi: totals.totalEMI,
      total_outstanding: totals.totalOutstanding,
    };

    const { error } = await supabase.from("consolidation_requests").insert(payload);
    setSubmitting(false);

    if (error) {
      toast({ title: "Submission failed", description: error.message, variant: "destructive" });
      return;
    }

    toast({
      title: "Request submitted",
      description: "Our team will reach out to discuss your consolidation options.",
    });
    setFullName("");
    setPhone("");
    setEmail("");
    setCity("");
    setCompanyName("");
    setMonthlySalary("");
    setOtherEmis("0");
    setLoans([emptyRow()]);
  };

  const showCalculations = totals.validCount > 0 && totals.totalOutstanding > 0;

  return (
    <Card className="shadow-xl border-border">
      <CardHeader>
        <CardTitle className="text-2xl">Get a Loan Consolidation Quote</CardTitle>
        <p className="text-sm text-muted-foreground">
          List your existing loans below. We'll evaluate whether consolidating them into one lower-EMI loan suits you.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="cf-name">Full Name *</Label>
              <Input id="cf-name" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="As per PAN" required />
            </div>
            <div>
              <Label htmlFor="cf-phone">Mobile Number *</Label>
              <Input id="cf-phone" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))} placeholder="10-digit mobile" inputMode="numeric" required />
            </div>
            <div>
              <Label htmlFor="cf-email">Email</Label>
              <Input id="cf-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
            </div>
            <div>
              <Label htmlFor="cf-city">City</Label>
              <Input id="cf-city" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" />
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Your Profile</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="cf-company">Company / Employer *</Label>
                <Input id="cf-company" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="e.g. Infosys Ltd" />
              </div>
              <div>
                <Label htmlFor="cf-salary">Net Monthly Salary (₹) *</Label>
                <Input id="cf-salary" value={monthlySalary} onChange={(e) => setMonthlySalary(e.target.value.replace(/\D/g, ""))} placeholder="75000" inputMode="numeric" />
              </div>
              <div>
                <Label htmlFor="cf-other-emis">Other Monthly EMIs (₹)</Label>
                <Input id="cf-other-emis" value={otherEmis} onChange={(e) => setOtherEmis(e.target.value.replace(/\D/g, ""))} placeholder="0" inputMode="numeric" />
                <p className="text-[10px] text-muted-foreground mt-1">EMIs you'll keep paying (not included in consolidation)</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Existing Loans</h3>
              <Button type="button" variant="outline" size="sm" onClick={addLoan}>
                <Plus className="h-4 w-4 mr-1" /> Add Loan
              </Button>
            </div>

            {loans.map((loan, idx) => (
              <div key={idx} className="rounded-lg border border-border p-4 bg-muted/30">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-muted-foreground">Loan #{idx + 1}</span>
                  {loans.length > 1 && (
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeLoan(idx)} className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
                  <div className="sm:col-span-2 lg:col-span-2">
                    <Label className="text-xs">Loan Financier *</Label>
                    <Input value={loan.financier} onChange={(e) => updateLoan(idx, "financier", e.target.value)} placeholder="e.g. HDFC Bank" />
                  </div>
                  <div>
                    <Label className="text-xs">Loan Amount (₹)</Label>
                    <Input value={loan.loan_amount} onChange={(e) => updateLoan(idx, "loan_amount", e.target.value.replace(/\D/g, ""))} placeholder="500000" inputMode="numeric" />
                  </div>
                  <div>
                    <Label className="text-xs">EMI (₹/month)</Label>
                    <Input value={loan.emi} onChange={(e) => updateLoan(idx, "emi", e.target.value.replace(/\D/g, ""))} placeholder="12000" inputMode="numeric" />
                  </div>
                  <div>
                    <Label className="text-xs">Tenor (months)</Label>
                    <Input value={loan.tenor} onChange={(e) => updateLoan(idx, "tenor", e.target.value.replace(/\D/g, ""))} placeholder="36" inputMode="numeric" />
                  </div>
                  <div>
                    <Label className="text-xs">Loan Outstanding (₹)</Label>
                    <Input value={loan.outstanding} onChange={(e) => updateLoan(idx, "outstanding", e.target.value.replace(/\D/g, ""))} placeholder="300000" inputMode="numeric" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {showCalculations && (
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                <ArrowDown className="h-4 w-4" />
                <span>Live Consolidation Estimate</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 rounded-md border border-border bg-background p-3">
                <div className="flex items-center gap-2">
                  <Switch
                    id="rate-toggle"
                    checked={useCustomRate}
                    onCheckedChange={setUseCustomRate}
                  />
                  <Label htmlFor="rate-toggle" className="text-sm font-medium cursor-pointer">
                    Use my rate
                  </Label>
                </div>
                {useCustomRate && (
                  <div className="flex items-center gap-2">
                    <Label htmlFor="custom-rate" className="text-xs text-muted-foreground whitespace-nowrap">
                      Interest rate
                    </Label>
                    <Input
                      id="custom-rate"
                      value={customRate}
                      onChange={(e) => setCustomRate(e.target.value.replace(/[^0-9.]/g, ""))}
                      placeholder="12.5"
                      inputMode="decimal"
                      className="w-24 h-8 text-sm"
                    />
                    <span className="text-sm text-muted-foreground">% p.a.</span>
                  </div>
                )}
                {!useCustomRate && (
                  <span className="text-xs text-muted-foreground">Estimating at market rate of 12.5% p.a.</span>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <div className="text-xs text-muted-foreground">Total Monthly EMI</div>
                  <div className="text-lg font-bold text-foreground">{formatINR(totals.totalEMI)}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Total Outstanding</div>
                  <div className="text-lg font-bold text-foreground">{formatINR(totals.totalOutstanding)}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Weighted Avg Tenor</div>
                  <div className="text-lg font-bold text-foreground">{formatNum(totals.weightedAvgTenor, 0)} mo</div>
                </div>
                {totals.hasRateData && (
                  <div>
                    <div className="text-xs text-muted-foreground">Weighted Avg Rate</div>
                    <div className="text-lg font-bold text-foreground">{formatNum(totals.weightedAvgRateAnnual, 1)}% p.a.</div>
                  </div>
                )}
                <div>
                  <div className="text-xs text-muted-foreground">Est. New EMI @{(useCustomRate ? Number(customRate) || 0 : 12.5).toFixed(1)}%</div>
                  <div className="text-lg font-bold text-primary">{formatINR(totals.estimatedNewEMI)}</div>
                  <div className="text-[10px] text-muted-foreground">over {totals.newTenor} months</div>
                </div>
                {totals.monthlySavings > 0 && (
                  <div>
                    <div className="text-xs text-muted-foreground">Potential Monthly Savings</div>
                    <div className="text-lg font-bold text-accent">{formatINR(totals.monthlySavings)}</div>
                  </div>
                )}
              </div>

              {totals.salary > 0 && (
                <div className="space-y-2 pt-2 border-t border-primary/20">
                  <div className="text-sm font-semibold text-primary">Maximum Eligibility & Cash In Hand (by tenor)</div>
                  <p className="text-xs text-muted-foreground">
                    Based on salary {formatINR(totals.salary)}, other EMIs {formatINR(totals.others)}, and {formatINR(totals.totalOutstanding)} consolidation outstanding. FOIR cap 55% — max EMI affordable for a new loan: <span className="font-semibold">{formatINR(totals.availableEMI)}</span>.
                  </p>
                  {totals.availableEMI <= 0 ? (
                    <div className="rounded-md bg-destructive/10 text-destructive text-xs p-3">
                      Existing other EMIs already exceed the 55% FOIR cap on your salary. You may not qualify for a new consolidation loan without additional income.
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs border-collapse">
                        <thead>
                          <tr className="bg-background/60">
                            <th className="text-left p-2 border border-border">Tenor</th>
                            <th className="text-right p-2 border border-border">Max Loan Eligible</th>
                            <th className="text-right p-2 border border-border">EMI to Refinance Existing</th>
                            <th className="text-right p-2 border border-border">Cash In Hand</th>
                          </tr>
                        </thead>
                        <tbody>
                          {totals.tenorBreakdown.map((t) => {
                            const isBest = totals.bestTenor && t.tenor === totals.bestTenor.tenor && t.cashInHand > 0;
                            return (
                              <tr key={t.tenor} className={isBest ? "bg-accent/10 font-semibold" : ""}>
                                <td className="p-2 border border-border">{t.tenor} mo</td>
                                <td className="text-right p-2 border border-border">{formatINR(t.maxLoan)}</td>
                                <td className="text-right p-2 border border-border">{formatINR(t.refinanceEMI)}</td>
                                <td className={`text-right p-2 border border-border ${t.cashInHand > 0 ? "text-accent" : "text-destructive"}`}>
                                  {t.cashInHand >= 0 ? formatINR(t.cashInHand) : `Shortfall ${formatINR(Math.abs(t.cashInHand))}`}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      <p className="text-[10px] text-muted-foreground mt-1">
                        Cash in hand = max loan eligible − total consolidation outstanding. Highlighted row = best tenor for maximum cash in hand. Indicative only; final approval at lender's discretion.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <label className="flex items-start gap-2 text-xs text-muted-foreground">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5" />
            <span>I authorise IndiaLoanHub and partner lenders to contact me regarding loan consolidation options. Submission does not guarantee approval.</span>
          </label>

          <Button type="submit" size="lg" disabled={submitting} className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground">
            {submitting ? (<><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Submitting...</>) : "Submit Consolidation Request"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ConsolidationForm;