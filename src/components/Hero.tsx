import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShieldCheck, Users, Scale } from "lucide-react";
import LeadEnquiryForm from "@/components/LeadEnquiryForm";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary via-brandblue-600 to-accent">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="py-14 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <ShieldCheck className="h-4 w-4 text-white" />
                <span className="text-white text-xs sm:text-sm font-medium">Loan assistance &amp; lead-generation platform</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
                Compare loan offers from
                <span className="block mt-1 bg-clip-text text-transparent bg-gradient-to-r from-white to-brandgreen-200">
                  partner banks &amp; NBFCs
                </span>
              </h1>
              <p className="mt-5 text-base sm:text-lg text-white/90 max-w-xl mx-auto lg:mx-0">
                Check eligibility, compare indicative rates and connect with our lending partners.
                IndiaLoanHub is not a direct lender — loan approval is subject to lender review and your eligibility.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto lg:mx-0">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 text-white text-sm">
                  <Users className="h-4 w-4 text-brandgreen-300" />
                  <span>50+ lending partners</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 text-white text-sm">
                  <Scale className="h-4 w-4 text-brandgreen-300" />
                  <span>Transparent comparison</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 text-white text-sm">
                  <ShieldCheck className="h-4 w-4 text-brandgreen-300" />
                  <span>RBI-regulated lenders</span>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Button size="lg" asChild className="bg-white text-primary hover:bg-white/90 shadow-xl px-6 py-5 text-base font-semibold rounded-xl">
                  <a href="#enquiry">Check Eligibility</a>
                </Button>
                <Button size="lg" asChild variant="outline" className="border-2 border-white text-white hover:bg-white/10 bg-transparent px-6 py-5 text-base font-semibold rounded-xl">
                  <Link to="/bank-comparison">Compare Offers</Link>
                </Button>
              </div>

              <p className="mt-5 text-xs text-white/70 max-w-xl mx-auto lg:mx-0">
                Disclosure: We are a loan assistance / lead-generation platform. We may connect you with partner banks/NBFCs.
                Submission of any form does not guarantee approval. Loan terms, rates and approval depend on lender policies and applicant profile.
              </p>
            </div>

            <div className="w-full">
              <LeadEnquiryForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
