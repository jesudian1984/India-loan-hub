import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductsPoster from "@/components/ProductsPoster";
import LoanTypes from "@/components/LoanTypes";

import HowItWorks from "@/components/HowItWorks";
import LoanConsolidation from "@/components/LoanConsolidation";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import TrustBadges from "@/components/TrustBadges";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import ComplianceDisclosure from "@/components/ComplianceDisclosure";
import PrivacyAssurance from "@/components/PrivacyAssurance";
import FAQSection from "@/components/FAQSection";
import { Button } from "@/components/ui/button";
import { PhoneCall, MessageSquare, ArrowRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const Index = () => {
  const handleCallExpert = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = "tel:9176244465";
    toast({ title: "Calling Loan Expert", description: "Connecting you with our team at +91 9176244465", duration: 4000 });
  };

  const handleWhatsAppChat = (e: React.MouseEvent) => {
    e.preventDefault();
    const message = encodeURIComponent("Hi, I'd like help comparing loan offers via IndiaLoanHub.");
    window.open(`https://wa.me/919176244465?text=${message}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />

        {/* Compliance disclosure under the fold */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <ComplianceDisclosure />
          </div>
        </div>

        <HowItWorks />
        <ProductsPoster />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex justify-center gap-3 flex-wrap">
          <Button size="lg" className="bg-primary hover:bg-primary/90 flex items-center gap-2 shadow-lg" onClick={handleCallExpert}>
            <PhoneCall size={18} /> Talk to a loan expert
          </Button>
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground flex items-center gap-2 shadow-lg" onClick={handleWhatsAppChat}>
            <MessageSquare size={18} /> Chat on WhatsApp
          </Button>
        </div>

        <LoanTypes />
        <QuickEligibilityWidget />
        <PrivacyAssurance />
        <LoanConsolidation />
        <Features />
        <Testimonials />
        <FAQSection />
        <TrustBadges />
        <CTASection />
      </main>
      <Footer />

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-white border-t border-gray-200 px-3 py-2 flex gap-2 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
        <Button asChild className="flex-1 h-11 bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold">
          <Link to="/#enquiry">Check Eligibility</Link>
        </Button>
        <Button onClick={handleWhatsAppChat} className="h-11 bg-green-600 hover:bg-green-700 text-white px-4">
          <MessageSquare className="h-5 w-5" />
        </Button>
      </div>

      {/* Desktop floating CTA */}
      <Button
        size="lg"
        className="hidden md:inline-flex fixed bottom-6 right-6 z-50 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground shadow-2xl rounded-full px-6 py-5"
        asChild
      >
        <Link to="/apply">
          Apply Now <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </Button>
    </div>
  );
};

export default Index;
