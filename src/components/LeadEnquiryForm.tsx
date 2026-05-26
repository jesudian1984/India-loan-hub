import { useState } from "react";
import { z } from "zod";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShieldCheck, Info, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  full_name: z.string().trim().min(2, "Enter your full name").max(80),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  city: z.string().trim().min(2, "Enter your city").max(60),
  loan_type: z.string().min(1, "Select a loan type"),
  monthly_salary: z.coerce.number().positive("Enter monthly income").max(100000000),
  employment_type: z.string().min(1, "Select employment type"),
  consent_given: z.literal(true, { errorMap: () => ({ message: "Please accept the consent to proceed" }) }),
});

interface Props {
  variant?: "card" | "inline";
  title?: string;
  description?: string;
}

const LeadEnquiryForm = ({
  variant = "card",
  title = "Get a free loan eligibility check",
  description = "Share a few details and our team will help you compare offers from our lending partners.",
}: Props) => {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    city: "",
    loan_type: "",
    monthly_salary: "",
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
      toast.success("Enquiry received. Our team will reach out shortly.");
      setForm({ full_name: "", phone: "", city: "", loan_type: "", monthly_salary: "", employment_type: "", consent_given: false });
    } catch (err: any) {
      toast.error(err.message || "Could not submit enquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const body = (
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

  if (variant === "inline") return body;

  return (
    <Card className="shadow-xl border-none">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{body}</CardContent>
    </Card>
  );
};

export default LeadEnquiryForm;
