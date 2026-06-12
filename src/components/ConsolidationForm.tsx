import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

const ConsolidationForm = () => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [consent, setConsent] = useState(true);
  const [loans, setLoans] = useState<LoanRow[]>([emptyRow()]);
  const [submitting, setSubmitting] = useState(false);

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

    // Consolidation assumption: 12.5% annual (competitive personal-loan rate)
    const consolidationMonthlyRate = 0.125 / 12;
    const newTenor = Math.max(Math.round(weightedAvgTenor), 12);
    const estimatedNewEMI =
      totalOutstanding > 0 && weightedAvgTenor > 0
        ? computeEMI(totalOutstanding, consolidationMonthlyRate, newTenor)
        : 0;

    const monthlySavings = totalEMI - estimatedNewEMI;

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
    };
  }, [loans]);

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
      existing_loans: validLoans.map((l) => ({
        financier: l.financier.trim(),
        loan_amount: Number(l.loan_amount) || 0,
        emi: Number(l.emi) || 0,
        tenor_months: Number(l.tenor) || 0,
        outstanding: Number(l.outstanding) || 0,
      })),
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  <div className="lg:col-span-2">
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
                  <div className="lg:col-span-5">
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
                  <div className="text-xs text-muted-foreground">Est. New EMI @12.5%</div>
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