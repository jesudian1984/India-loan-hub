
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const loanTypes = [
  {
    icon: (
      <svg className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8h6M9 12h6M9 16h3m-3-8v8m3-8c1.5 0 3 .5 3 2s-1.5 2-3 2" />
        <circle cx="12" cy="12" r="9" strokeWidth={2} />
      </svg>
    ),
    title: "Personal Loans",
    description: "Quick approval with minimal documentation. Get funds for weddings, travel, medical emergencies, or any personal need.",
    benefits: ["Up to ₹1 Crore", "Approval in 24 hours", "No collateral required"],
    rate: "9.99% p.a.",
    link: "/loans/personal",
    gradient: "from-brandblue-600 to-brandblue-700",
  },
  {
    icon: (
      <svg className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    title: "Home Loans",
    description: "Fulfill your dream of owning a home with competitive interest rates and flexible repayment options up to 30 years.",
    benefits: ["Up to ₹2 Crores", "Tenure up to 30 years", "Tax benefits available"],
    rate: "7.10% p.a.",
    link: "/loans/home",
    gradient: "from-accent to-brandgreen-600",
  },
  {
    icon: (
      <svg className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Business Loans",
    description: "Scale your business with working capital, equipment financing, or expansion loans tailored to your business needs.",
    benefits: ["Up to ₹1.5 Crores", "Flexible repayment", "Minimal documentation"],
    rate: "16.00% p.a.",
    link: "/loans/business",
    gradient: "from-purple-600 to-purple-700",
  },
  {
    icon: (
      <svg className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "Doctor Loans",
    description: "Special loan programs for medical professionals to set up clinics, purchase equipment, or expand medical practice.",
    benefits: ["Up to ₹75 Lakhs", "Pre-approved offers", "Doorstep service"],
    rate: "9.50% p.a.",
    link: "/loans/doctor",
    gradient: "from-red-500 to-pink-600",
  },
];

const LoanTypes = () => {
  return (
    <div className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground">
            Choose Your Perfect Loan
          </h2>
          <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
            Compare loan options from India's top banks and NBFCs. Find the best rates, instant approvals, and hassle-free documentation.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loanTypes.map((loan, index) => (
            <Card 
              key={index} 
              className="group relative overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${loan.gradient} opacity-100`}></div>
              <CardContent className="relative z-10 p-6 flex flex-col h-full text-white">
                <div className="mb-4 p-3 bg-white/20 backdrop-blur-sm rounded-xl w-fit">
                  {loan.icon}
                </div>
                <h3 className="font-bold text-2xl mb-3">
                  {loan.title}
                </h3>
                <p className="text-white/90 text-sm mb-4 flex-grow leading-relaxed">
                  {loan.description}
                </p>
                <div className="space-y-2 mb-6">
                  {loan.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-white/20">
                  <div>
                    <div className="text-xs text-white/80">Starting from</div>
                    <div className="text-xl font-bold">{loan.rate}</div>
                  </div>
                  <Link to={loan.link}>
                    <Button 
                      size="sm" 
                      className="bg-white text-gray-900 hover:bg-white/90 font-semibold rounded-lg group-hover:scale-105 transition-transform"
                    >
                      Apply Now
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoanTypes;
