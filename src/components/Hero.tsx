import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const Hero = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    loanType: "Personal Loan",
    loanAmount: "500000"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please login to submit an application");
      navigate('/auth');
      return;
    }
    
    // Simple validation
    if (!formData.name || !formData.phone) {
      toast.error("Please fill all required fields");
      return;
    }

    // Phone validation
    if (!/^\d{10}$/.test(formData.phone)) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }

    try {
      const { error } = await supabase
        .from('loan_applications')
        .insert({
          user_id: user.id,
          full_name: formData.name,
          email: user.email || '',
          phone: formData.phone,
          loan_type: formData.loanType,
          loan_amount: parseFloat(formData.loanAmount),
        });

      if (error) throw error;

      toast.success(`Application submitted successfully! We'll call you at ${formData.phone} shortly.`);

      // Clear form
      setFormData({
        name: "",
        phone: "",
        loanType: formData.loanType,
        loanAmount: formData.loanAmount
      });

      // Close the dialog by simulating an escape key press
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    } catch (error: any) {
      toast.error(error.message || "Failed to submit application");
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary via-brandblue-600 to-accent">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="py-24 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <div className="inline-block mb-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <span className="text-white text-sm font-medium">🎯 India's Trusted Loan Platform</span>
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="block">Your Gateway to</span>
                <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-brandgreen-200">
                  Smart Financing
                </span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-white/90 max-w-2xl">
                Connect with partner banks and NBFCs to explore loan offers. Compare rates, check eligibility, and apply online for Personal, Home, Business & Doctor Loans.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-xl px-8 py-6 text-lg font-semibold rounded-xl">
                  <Link to="/eligibility">Check Eligibility Now</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm px-8 py-6 text-lg font-semibold rounded-xl">
                  <Link to="/bank-comparison">Compare Loans</Link>
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-6 justify-center md:justify-start text-white/80 text-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-brandgreen-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>5 Min Process</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-brandgreen-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>100% Secure</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-brandgreen-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>No Hidden Fees</span>
                </div>
              </div>
            </div>
            <div className="hidden md:flex relative h-full items-center justify-center">
              <div className="grid grid-cols-2 gap-6 w-full max-w-md">
                {/* Stats Cards */}
                <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 hover:bg-white/20 transition-all transform hover:scale-105">
                  <div className="text-4xl font-bold text-white mb-2">₹50L+</div>
                  <div className="text-white/80 text-sm">Loans Disbursed</div>
                </div>
                <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 hover:bg-white/20 transition-all transform hover:scale-105">
                  <div className="text-4xl font-bold text-white mb-2">10k+</div>
                  <div className="text-white/80 text-sm">Happy Customers</div>
                </div>
                <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 hover:bg-white/20 transition-all transform hover:scale-105">
                  <div className="text-4xl font-bold text-white mb-2">7.1%</div>
                  <div className="text-white/80 text-sm">Lowest Rate</div>
                </div>
                <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 hover:bg-white/20 transition-all transform hover:scale-105">
                  <div className="text-4xl font-bold text-white mb-2">24 Hr</div>
                  <div className="text-white/80 text-sm">Quick Approval</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
