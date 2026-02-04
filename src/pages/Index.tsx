
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductsPoster from "@/components/ProductsPoster";
import LoanTypes from "@/components/LoanTypes";
import QuickEligibilityWidget from "@/components/QuickEligibilityWidget";
import HowItWorks from "@/components/HowItWorks";
import LoanConsolidation from "@/components/LoanConsolidation";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import TrustBadges from "@/components/TrustBadges";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { PhoneCall, MessageSquare, ArrowRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const Index = () => {
  const handleCallExpert = (e) => {
    e.preventDefault();
    const phoneNumber = "9176244465";
    
    // Use the tel: protocol to initiate a phone call
    const telLink = `tel:${phoneNumber}`;
    
    // Create and click an anchor element to trigger the call
    const a = document.createElement('a');
    a.href = telLink;
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener noreferrer');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    // Show a toast notification
    toast({
      title: "Calling Loan Expert",
      description: `Connecting you with our loan expert at ${phoneNumber}`,
      duration: 5000, // Show toast for 5 seconds
    });
  };

  const handleWhatsAppChat = (e) => {
    e.preventDefault();
    const phoneNumber = "9176244465";
    const message = encodeURIComponent("Hi, I'm interested in learning more about IndiaLoanHub loans. Can you help me?");
    
    // Create WhatsApp URL with phone number and pre-filled message
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    
    // Show a toast notification
    toast({
      title: "WhatsApp Chat",
      description: "Opening WhatsApp chat with our loan expert",
      duration: 5000, // Show toast for 5 seconds
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <ProductsPoster />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex justify-center gap-4 flex-wrap">
          <Button 
            size="lg"
            className="bg-primary hover:bg-primary/90 flex items-center gap-2 shadow-lg"
            onClick={handleCallExpert}
          >
            <PhoneCall size={20} />
            Talk to a Loan Expert
          </Button>
          <Button 
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground flex items-center gap-2 shadow-lg"
            onClick={handleWhatsAppChat}
          >
            <MessageSquare size={20} />
            Chat on WhatsApp
          </Button>
        </div>
        <LoanTypes />
        <QuickEligibilityWidget />
        <HowItWorks />
        <LoanConsolidation />
        <Features />
        <Testimonials />
        <TrustBadges />
        <CTASection />
      </main>
      <Footer />
      
      {/* Fixed Apply Now Button */}
      <Button 
        size="lg"
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground shadow-2xl animate-pulse hover:animate-none rounded-full px-8 py-6"
        asChild
      >
        <Link to="/apply">
          Apply Now
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </Button>
    </div>
  );
};

export default Index;
