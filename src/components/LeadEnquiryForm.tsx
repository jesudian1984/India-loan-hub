import { useState } from "react";
import { z } from "zod";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShieldCheck, Info, Loader2, CheckCircle2, IndianRupee, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  full_name: z.string().trim().min(2, "Enter your full name").max(80),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  city: z.string().trim().min(2, "Enter your city").max(60),
  loan_type: z.string().min(1, "Select a loan type"),
  monthly_salary: z.coerce.number().positive("Enter monthly income").max(100000000),
  existing_emi: z.coerce.number().min(0, "Enter 0 if none").max(100000000),
  employment_type: z.string().min(1, "Select employment type"),
  consent_given: z.literal(true, { errorMap: () => ({ message: "Please accept the consent to proceed" }) }),
});

interface Props {
  variant?: "card" | "inline";
  title?: string;
  description?: string;
}

interface EligibilityResult {
  income: number;
  existingEmi: number;
  loanType: string;
  tenureMonths: number;
}

interface Props {
  variant?: "card" | "inline";
  title?: string;
  description?: string;
}

interface EligibilityResult {
  income: number;
  loanType: string;
  tenureMonths: number;
}

const rateFor = (loanType: string) => {
  switch (loanType) {
    case "home": return 8.5;
    case "business": return 14;
    case "loan_against_property": return 10.5;
    case "credit_card": return 36;
    default: return 10.99;
  }
};

const fmtINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.max(0, Math.round(n)));

const LeadEnquiryForm = ({
  variant = "card",
  title = "Get a free loan eligibility check",
  description = "Share a few details and our team will help you compare offers from our lending partners.",
}: Props) => {
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<EligibilityResult | null>(null);
  const [tenureMonths, setTenureMonths] = useState(60);
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    city: "",
    loan_type: "",
    monthly_salary: "",
    existing_emi: "0",
    employment_type: "",
    consent_given: false,
  });

  const update = (k: string, v: any) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.from("leads").insert({
        full_name: parsed.data.full_name,
        phone: parsed.data.phone,
        city: parsed.data.city,
        loan_type: parsed.data.loan_type,
        monthly_salary: parsed.data.monthly_salary,
        employment_type: parsed.data.employment_type,
        consent_given: true,
        source: "homepage_enquiry",
      });
      if (error) throw error;
      toast.success("Enquiry received. See your indicative eligibility below.");
      setResult({
        income: parsed.data.monthly_salary,
        existingEmi: parsed.data.existing_emi,
        loanType: parsed.data.loan_type,
        tenureMonths: 60,
      });
      setTenureMonths(60);
    } catch (err: any) {
      toast.error(err.message || "Could not submit enquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      `Hi, I just submitted an enquiry on IndiaLoanHub. Please share loan options for me.`
    );
    window.open(`https://wa.me/919176244465?text=${msg}`, "_blank", "noopener,noreferrer");
  };

  // FOIR: tenure 12 → 50%, 84 → 70% (linear) — current slider value
  const foirPercent = result ? 50 + ((tenureMonths - 12) / (84 - 12)) * 20 : 0;

  const computeLoan = (income: number, existingEmi: number, foirPct: number, rate: number, n: number) => {
    const monthlyRate = rate / 100 / 12;
    const availableEMI = Math.max(0, (income * foirPct) / 100 - existingEmi);
    const factor = Math.pow(1 + monthlyRate, n);
    const loanAmount = availableEMI > 0 ? (availableEMI * (factor - 1)) / (monthlyRate * factor) : 0;
    return { availableEMI, loanAmount };
  };

  const eligibilityNumbers = (() => {
    if (!result) return null;
    const rate = rateFor(result.loanType);
    const current = computeLoan(result.income, result.existingEmi, foirPercent, rate, tenureMonths);
    const min = computeLoan(result.income, result.existingEmi, 50, rate, 12);
    const max = computeLoan(result.income, result.existingEmi, 70, rate, 84);
    return { ...current, rate, minLoan: min.loanAmount, maxLoan: max.loanAmount };
  })();

  const formBody = (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="le_name">Full name *</Label>
          <Input id="le_name" value={form.full_name} onChange={(e) => update("full_name", e.target.value)} placeholder="As per PAN" maxLength={80} required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="le_phone">Mobile number *</Label>
          <Input id="le_phone" inputMode="numeric" maxLength={10} value={form.phone} onChange={(e) => update("phone", e.target.value.replace(/\D/g, ""))} placeholder="10-digit mobile" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="le_city">City *</Label>
          <Input id="le_city" value={form.city} onChange={(e) => update("city", e.target.value)} placeholder="e.g. Chennai" maxLength={60} required />
        </div>
        <div className="space-y-1.5">
          <Label>Loan type *</Label>
          <Select value={form.loan_type} onValueChange={(v) => update("loan_type", v)}>
            <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="personal">Personal Loan</SelectItem>
              <SelectItem value="home">Home Loan</SelectItem>
              <SelectItem value="business">Business Loan</SelectItem>
              <SelectItem value="loan_against_property">Loan Against Property</SelectItem>
              <SelectItem value="credit_card">Credit Card</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="le_income">Monthly income (₹) *</Label>
          <Input id="le_income" inputMode="numeric" value={form.monthly_salary} onChange={(e) => update("monthly_salary", e.target.value.replace(/\D/g, ""))} placeholder="e.g. 50000" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="le_existing_emi">Existing monthly EMI (₹)</Label>
          <Input id="le_existing_emi" inputMode="numeric" value={form.existing_emi} onChange={(e) => update("existing_emi", e.target.value.replace(/\D/g, ""))} placeholder="0 if none" />
        </div>
        <div className="space-y-1.5">
          <Label>Employment type *</Label>
          <Select value={form.employment_type} onValueChange={(v) => update("employment_type", v)}>
            <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="salaried">Salaried</SelectItem>
              <SelectItem value="self_employed">Self-employed</SelectItem>
              <SelectItem value="business_owner">Business owner</SelectItem>
              <SelectItem value="professional">Professional</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900 flex gap-2">
        <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
        <span>
          IndiaLoanHub is a loan assistance and lead-generation platform. We may share your details with partner banks/NBFCs/lenders.
          Submission of this form does not guarantee approval. Loan terms, rates and approval depend on lender policies and applicant eligibility.
        </span>
      </div>

      <div className="flex items-start gap-2">
        <Checkbox id="le_consent" checked={form.consent_given} onCheckedChange={(c) => update("consent_given", Boolean(c))} />
        <Label htmlFor="le_consent" className="text-xs leading-relaxed font-normal text-gray-700">
          By clicking Submit, I agree to the <Link to="/privacy" className="underline text-primary">Privacy Policy</Link> and{" "}
          <Link to="/terms" className="underline text-primary">Terms</Link>, and consent to be contacted by phone, SMS, WhatsApp and email
          by IndiaLoanHub and its lending partners regarding my enquiry. This consent overrides any NDNC/DND registration. *
        </Label>
      </div>

      <Button type="submit" disabled={submitting} className="w-full h-12 text-base font-semibold">
        {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting…</> : "Submit Enquiry"}
      </Button>

      <p className="text-[11px] text-center text-muted-foreground flex items-center justify-center gap-1">
        <ShieldCheck className="h-3 w-3" /> Your details are encrypted and shared only with relevant lending partners.
      </p>
    </form>
  );

  const resultBody = result && eligibilityNumbers && (
    <div className="space-y-5">
      <div className="flex items-center gap-2 text-primary">
        <CheckCircle2 className="h-5 w-5" />
        <h3 className="text-lg font-semibold">Your indicative eligibility</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-lg border bg-gradient-to-br from-primary/5 to-accent/5 p-4">
          <p className="text-xs text-muted-foreground mb-1">Indicative loan amount</p>
          <p className="text-2xl font-bold text-primary flex items-center">
            <IndianRupee className="h-5 w-5" /> {fmtINR(eligibilityNumbers.loanAmount)}
          </p>
        </div>
        <div className="rounded-lg border bg-gradient-to-br from-primary/5 to-accent/5 p-4">
          <p className="text-xs text-muted-foreground mb-1">Estimated monthly EMI</p>
          <p className="text-2xl font-bold text-primary flex items-center">
            <IndianRupee className="h-5 w-5" /> {fmtINR(eligibilityNumbers.availableEMI)}
          </p>
        </div>
      </div>

      <div className="rounded-lg border bg-white p-4">
        <p className="text-xs text-muted-foreground mb-2">Your eligibility range (after deducting existing EMI of ₹{fmtINR(result.existingEmi)})</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Minimum (50% FOIR · 12m)</p>
            <p className="text-lg font-semibold flex items-center"><IndianRupee className="h-4 w-4" />{fmtINR(eligibilityNumbers.minLoan)}</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Maximum (70% FOIR · 84m)</p>
            <p className="text-lg font-semibold flex items-center text-primary"><IndianRupee className="h-4 w-4" />{fmtINR(eligibilityNumbers.maxLoan)}</p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <Label>Tenure: <span className="font-semibold">{tenureMonths} months</span></Label>
          <span className="text-xs text-muted-foreground">FOIR ~ {foirPercent.toFixed(0)}%</span>
        </div>
        <Slider
          min={12}
          max={84}
          step={6}
          value={[tenureMonths]}
          onValueChange={(v) => setTenureMonths(v[0])}
        />
        <p className="text-[11px] text-muted-foreground">
          Drag to adjust tenure (12–84 months). Estimates update in real-time.
        </p>
      </div>

      <div className="rounded-md border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900 flex gap-2">
        <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
        <span>
          Indicative only at assumed rate of {eligibilityNumbers.rate}% p.a. Final amount, rate and approval depend on lender review of your profile.
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button onClick={handleWhatsApp} className="flex-1 bg-green-600 hover:bg-green-700">
          <MessageSquare className="mr-2 h-4 w-4" /> Talk to an expert on WhatsApp
        </Button>
        <Button variant="outline" onClick={() => setResult(null)} className="flex-1">
          Submit another enquiry
        </Button>
      </div>
    </div>
  );

  const body = result ? resultBody : formBody;

  if (variant === "inline") return body;

  return (
    <Card id="enquiry" className="shadow-xl border-none scroll-mt-24">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl">{result ? "Thanks — here are your indicative numbers" : title}</CardTitle>
        <CardDescription>
          {result
            ? "Our team will reach out shortly. Meanwhile, explore your indicative eligibility below."
            : description}
        </CardDescription>
      </CardHeader>
      <CardContent>{body}</CardContent>
    </Card>
  );
};

export default LeadEnquiryForm;
