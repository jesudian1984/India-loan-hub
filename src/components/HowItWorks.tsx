import { FileText, Search, Handshake, CheckCircle2 } from "lucide-react";

const steps = [
  { icon: FileText, title: "Submit your enquiry", desc: "Share basic details — name, mobile, city, loan type, income and employment type." },
  { icon: Search, title: "Eligibility review", desc: "Our team reviews your profile against indicative criteria of our partner lenders." },
  { icon: Handshake, title: "Partner matching", desc: "We connect you with partner banks/NBFCs whose products best match your profile." },
  { icon: CheckCircle2, title: "Lender decision", desc: "The partner lender evaluates your application and communicates the final decision." },
];

const HowItWorks = () => (
  <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">How it works</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A simple, transparent process from enquiry to lender decision.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((s, i) => (
          <div key={i} className="relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white mb-4">
              <s.icon className="h-6 w-6" />
            </div>
            <div className="absolute top-4 right-4 text-xs font-bold text-muted-foreground">0{i + 1}</div>
            <h3 className="text-lg font-semibold text-foreground mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>

      <p className="mt-8 text-center text-xs text-muted-foreground max-w-2xl mx-auto">
        IndiaLoanHub does not approve or disburse loans. All sanction decisions are made by the partner lender based on their policies and applicant eligibility.
      </p>
    </div>
  </section>
);

export default HowItWorks;
