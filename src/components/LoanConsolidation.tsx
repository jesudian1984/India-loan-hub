import { Card, CardContent } from "@/components/ui/card";
import { TrendingDown, Wallet, CheckCircle2 } from "lucide-react";
import ConsolidationForm from "@/components/ConsolidationForm";

const LoanConsolidation = () => {
  const benefits = [
    "Lower interest rates than credit cards",
    "Single monthly payment for all debts",
    "Reduce financial stress and complexity",
    "Save money on interest charges",
  ];

  return (
    <div id="consolidate" className="py-16 bg-gradient-to-br from-accent/10 via-background to-primary/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="inline-block mb-4 px-4 py-2 bg-accent/10 rounded-full border border-accent/20">
              <span className="text-accent text-sm font-semibold">💰 Save Money Today</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Consolidate Your Loans & Save Big
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Struggling with multiple credit card bills and fintech app loans? We help you combine them into one simple personal loan at much lower interest rates.
            </p>

            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="bg-gradient-to-br from-primary to-primary/80 border-none shadow-xl">
                <CardContent className="p-5">
                  <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center mb-3">
                    <TrendingDown className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-primary-foreground mb-1">Up to 50%</h3>
                  <p className="text-primary-foreground/80 text-sm">Lower interest vs. credit cards</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-accent to-accent/80 border-none shadow-xl">
                <CardContent className="p-5">
                  <div className="w-10 h-10 rounded-full bg-accent-foreground/20 flex items-center justify-center mb-3">
                    <Wallet className="h-5 w-5 text-accent-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-accent-foreground mb-1">1 Payment</h3>
                  <p className="text-accent-foreground/80 text-sm">All loans into one monthly EMI</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <ConsolidationForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanConsolidation;
