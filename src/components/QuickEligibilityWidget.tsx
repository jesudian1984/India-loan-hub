import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Calculator, ArrowRight, CheckCircle2, IndianRupee, MessageSquare, PhoneCall, GripHorizontal } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const QuickEligibilityWidget = () => {
  const navigate = useNavigate();
  const [loanType, setLoanType] = useState("personal");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [existingEMI, setExistingEMI] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [tenureMonths, setTenureMonths] = useState(60);
  const [eligibilityResults, setEligibilityResults] = useState<{
    minAmount: number;
    maxAmount: number;
    minEMI: number;
    maxEMI: number;
  } | null>(null);

  // Drag-adjustable FOIR: tenure 12mo → 50%, tenure 84mo → 70% (linear)
  const foirPercent = useMemo(
    () => 50 + ((tenureMonths - 12) / (84 - 12)) * 20,
    [tenureMonths]
  );

  const dynamicEligibility = useMemo(() => {
    const income = parseInt(monthlyIncome.replace(/,/g, "")) || 0;
    const emi = parseInt(existingEMI.replace(/,/g, "")) || 0;
    if (income <= 0) return null;
    const rate =
      loanType === "home" ? 8.5 :
      loanType === "business" ? 14 :
      loanType === "doctor" ? 10.5 : 10.99;
    const availableEMI = Math.max(0, (income * foirPercent) / 100 - emi);
    const monthlyRate = rate / 100 / 12;
    const n = tenureMonths;
    const factor = Math.pow(1 + monthlyRate, n);
    const loanAmount = availableEMI > 0 ? Math.round((availableEMI * (factor - 1)) / (monthlyRate * factor)) : 0;
    return { availableEMI, loanAmount };
  }, [monthlyIncome, existingEMI, loanType, tenureMonths, foirPercent]);

  const formatCurrency = (value: string) => {
    if (!value) return "";
    const number = parseInt(value.replace(/,/g, ""));
    if (isNaN(number)) return "";
    return new Intl.NumberFormat('en-IN').format(number);
  };

  const formatAmount = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} L`;
    } else {
      return `₹${new Intl.NumberFormat('en-IN').format(amount)}`;
    }
  };

  // Get loan parameters based on loan type
  const getLoanParams = (type: string) => {
    switch (type) {
      case "home":
        return { rate: 8.5, tenure: 240, multiplierMin: 48, multiplierMax: 60 }; // 20 years
      case "business":
        return { rate: 14, tenure: 60, multiplierMin: 10, multiplierMax: 15 }; // 5 years
      case "doctor":
        return { rate: 10.5, tenure: 84, multiplierMin: 20, multiplierMax: 30 }; // 7 years
      case "personal":
      default:
        return { rate: 10.99, tenure: 60, multiplierMin: 15, multiplierMax: 22 }; // 5 years
    }
  };

  const calculateEligibility = () => {
    const income = parseInt(monthlyIncome.replace(/,/g, "")) || 0;
    const emi = parseInt(existingEMI.replace(/,/g, "")) || 0;
    
    if (income <= 0) return;

    const params = getLoanParams(loanType);
    
    // Calculate available income for new EMI at different FOIR levels
    // FOIR at 50% (conservative - minimum eligibility)
    const availableEMI_50 = (income * 0.50) - emi;
    // FOIR at 70% (aggressive - maximum eligibility)  
    const availableEMI_70 = (income * 0.70) - emi;

    // Calculate loan amount from EMI using PMT formula reverse
    // EMI = P * r * (1+r)^n / ((1+r)^n - 1)
    // P = EMI * ((1+r)^n - 1) / (r * (1+r)^n)
    const monthlyRate = params.rate / 100 / 12;
    const n = params.tenure;
    
    const calculateLoanFromEMI = (emi: number) => {
      if (emi <= 0) return 0;
      const factor = Math.pow(1 + monthlyRate, n);
      return Math.round(emi * (factor - 1) / (monthlyRate * factor));
    };

    const minLoanAmount = Math.max(0, calculateLoanFromEMI(availableEMI_50));
    const maxLoanAmount = Math.max(0, calculateLoanFromEMI(availableEMI_70));

    setEligibilityResults({
      minAmount: minLoanAmount,
      maxAmount: maxLoanAmount,
      minEMI: Math.max(0, availableEMI_50),
      maxEMI: Math.max(0, availableEMI_70),
    });
    setShowResults(true);
  };

  const handleViewDetailedEligibility = () => {
    navigate('/eligibility', { 
      state: { 
        loanType, 
        monthlyIncome: parseInt(monthlyIncome.replace(/,/g, "")), 
        existingEMI: parseInt(existingEMI.replace(/,/g, "")) || 0
      } 
    });
  };

  const resetCalculator = () => {
    setShowResults(false);
    setEligibilityResults(null);
  };

  const getLoanTypeName = (type: string) => {
    switch (type) {
      case "home": return "Home Loan";
      case "business": return "Business Loan";
      case "doctor": return "Doctor Loan";
      case "personal":
      default: return "Personal Loan";
    }
  };

  const handleWhatsAppChat = () => {
    const phoneNumber = "9176244465";
    const loanName = getLoanTypeName(loanType);
    const eligibilityAmount = eligibilityResults 
      ? `${formatAmount(eligibilityResults.minAmount)} - ${formatAmount(eligibilityResults.maxAmount)}`
      : "";
    const message = encodeURIComponent(
      `Hi, I just checked my ${loanName} eligibility on IndiaLoanHub. My eligible amount is ${eligibilityAmount}. Can you help me with the next steps?`
    );
    
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
    
    toast({
      title: "WhatsApp Chat",
      description: "Opening WhatsApp chat with our loan expert",
      duration: 5000,
    });
  };

  const handleCallExpert = () => {
    const phoneNumber = "9176244465";
    const a = document.createElement('a');
    a.href = `tel:${phoneNumber}`;
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener noreferrer');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    toast({
      title: "Calling Loan Expert",
      description: `Connecting you with our loan expert at ${phoneNumber}`,
      duration: 5000,
    });
  };

  return (
    <div className="py-16 bg-gradient-to-br from-brandblue-50 via-white to-accent/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="max-w-4xl mx-auto shadow-2xl border-none">
          <CardHeader className="text-center pb-8 bg-gradient-to-r from-primary to-accent text-white rounded-t-lg">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-white/20 backdrop-blur-sm rounded-full">
                <Calculator className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl md:text-4xl font-bold">
              Check Your Loan Eligibility
            </CardTitle>
            <CardDescription className="text-lg text-white/90 mt-2">
              Get instant results in just 3 simple steps
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            {!showResults ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="space-y-2">
                    <Label htmlFor="loan-type" className="text-base font-semibold">
                      1. Select Loan Type
                    </Label>
                    <Select value={loanType} onValueChange={setLoanType}>
                      <SelectTrigger id="loan-type" className="h-12 text-base">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="personal">Personal Loan</SelectItem>
                        <SelectItem value="home">Home Loan</SelectItem>
                        <SelectItem value="business">Business Loan</SelectItem>
                        <SelectItem value="doctor">Doctor Loan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="monthly-income" className="text-base font-semibold">
                      2. Monthly Income (₹)
                    </Label>
                    <Input
                      id="monthly-income"
                      type="text"
                      placeholder="e.g., 50,000"
                      value={monthlyIncome}
                      onChange={(e) => {
                        const value = e.target.value.replace(/,/g, "");
                        if (/^\d*$/.test(value)) {
                          setMonthlyIncome(formatCurrency(value));
                        }
                      }}
                      className="h-12 text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="existing-emi" className="text-base font-semibold">
                      3. Existing EMI (₹)
                    </Label>
                    <Input
                      id="existing-emi"
                      type="text"
                      placeholder="e.g., 10,000"
                      value={existingEMI}
                      onChange={(e) => {
                        const value = e.target.value.replace(/,/g, "");
                        if (/^\d*$/.test(value)) {
                          setExistingEMI(formatCurrency(value));
                        }
                      }}
                      className="h-12 text-base"
                    />
                  </div>
                </div>

                <Button 
                  onClick={calculateEligibility}
                  disabled={!monthlyIncome}
                  className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                >
                  Check Eligibility Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <div className="mt-6 grid grid-cols-3 gap-4 pt-6 border-t">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">Free</div>
                    <div className="text-sm text-muted-foreground">Eligibility check</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">50+</div>
                    <div className="text-sm text-muted-foreground">Lending partners</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">Indicative</div>
                    <div className="text-sm text-muted-foreground">Subject to lender review</div>
                  </div>
                </div>
                <p className="mt-4 text-xs text-muted-foreground text-center">
                  Results are indicative only. Final eligibility, loan amount, interest rate and approval are at the sole discretion of the partner lender.
                </p>

              </>
            ) : (
              <div className="space-y-6">
                {/* Results Header */}
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Your {getLoanTypeName(loanType)} Eligibility
                  </h3>
                  <p className="text-muted-foreground mt-2">
                    Based on your income of ₹{monthlyIncome}
                  </p>
                </div>

                {/* Eligibility Range */}
                {eligibilityResults && eligibilityResults.maxAmount > 0 ? (
                  <div className="bg-gradient-to-r from-brandblue-50 to-accent/10 rounded-xl p-6">
                    <div className="text-center mb-4">
                      <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                        Your Eligible Loan Amount
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-center gap-4 flex-wrap">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-1">Minimum</p>
                        <div className="flex items-center justify-center text-2xl md:text-3xl font-bold text-primary">
                          <IndianRupee className="h-6 w-6 md:h-7 md:w-7" />
                          {formatAmount(eligibilityResults.minAmount).replace('₹', '')}
                        </div>
                      </div>
                      
                      <div className="text-3xl font-light text-muted-foreground">—</div>
                      
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-1">Maximum</p>
                        <div className="flex items-center justify-center text-2xl md:text-3xl font-bold text-green-600">
                          <IndianRupee className="h-6 w-6 md:h-7 md:w-7" />
                          {formatAmount(eligibilityResults.maxAmount).replace('₹', '')}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 text-center">
                      <p className="text-sm text-muted-foreground">
                        Estimated Monthly EMI: ₹{new Intl.NumberFormat('en-IN').format(Math.round(eligibilityResults.minEMI))} - ₹{new Intl.NumberFormat('en-IN').format(Math.round(eligibilityResults.maxEMI))}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
                    <p className="text-amber-800 font-medium">
                      Based on your current EMI obligations, you may not be eligible for additional loans at this time.
                    </p>
                    <p className="text-amber-600 text-sm mt-2">
                      Consider reducing existing EMIs or speak with our experts for personalized advice.
                    </p>
                  </div>
                )}

                {/* Drag-adjustable tenure ↔ FOIR % visualizer */}
                {dynamicEligibility && (
                  <div className="rounded-xl border border-primary/20 bg-white p-5 md:p-6 shadow-sm">
                    <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Adjust tenure to see eligibility</p>
                        <p className="text-xs text-muted-foreground">Drag the handle: 12 → 84 months maps to 50% → 70% FOIR</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-xs text-muted-foreground">Tenure</div>
                          <div className="text-base font-bold text-primary">{tenureMonths} mo</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-muted-foreground">FOIR</div>
                          <div className="text-base font-bold text-accent">{foirPercent.toFixed(1)}%</div>
                        </div>
                      </div>
                    </div>

                    <div className="relative py-2">
                      <Slider
                        value={[tenureMonths]}
                        min={12}
                        max={84}
                        step={1}
                        onValueChange={(v) => setTenureMonths(v[0])}
                        aria-label="Loan tenure in months"
                      />
                      <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
                        <span>12 mo · 50%</span>
                        <span>48 mo · 60%</span>
                        <span>84 mo · 70%</span>
                      </div>
                      <div className="pointer-events-none absolute -top-1 left-0 right-0 flex justify-center">
                        <GripHorizontal className="h-3 w-3 text-primary/40" />
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-4">
                      <div className="rounded-lg bg-brandblue-50 p-4 text-center">
                        <div className="text-xs text-muted-foreground mb-1">Eligible Loan Amount</div>
                        <div className="flex items-center justify-center text-xl md:text-2xl font-bold text-primary">
                          <IndianRupee className="h-5 w-5" />
                          {formatAmount(dynamicEligibility.loanAmount).replace('₹', '')}
                        </div>
                      </div>
                      <div className="rounded-lg bg-accent/10 p-4 text-center">
                        <div className="text-xs text-muted-foreground mb-1">Estimated Monthly EMI</div>
                        <div className="flex items-center justify-center text-xl md:text-2xl font-bold text-accent">
                          <IndianRupee className="h-5 w-5" />
                          {new Intl.NumberFormat('en-IN').format(Math.round(dynamicEligibility.availableEMI))}
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 text-[11px] text-muted-foreground text-center">
                      Indicative figures. Final FOIR cap and tenure depend on the lender's policy and your profile.
                    </p>
                  </div>
                )}


                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      onClick={handleViewDetailedEligibility}
                      className="flex-1 h-12 text-base font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90"
                    >
                      View Detailed Eligibility
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    <Button 
                      onClick={resetCalculator}
                      variant="outline"
                      className="flex-1 h-12 text-base font-semibold"
                    >
                      Calculate Again
                    </Button>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      onClick={handleCallExpert}
                      className="flex-1 h-12 text-base font-semibold bg-primary hover:bg-primary/90"
                    >
                      <PhoneCall className="mr-2 h-5 w-5" />
                      Call Expert
                    </Button>
                    <Button 
                      onClick={handleWhatsAppChat}
                      className="flex-1 h-12 text-base font-semibold bg-green-600 hover:bg-green-700 text-white"
                    >
                      <MessageSquare className="mr-2 h-5 w-5" />
                      WhatsApp
                    </Button>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="mt-4 pt-4 border-t grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
                  <div>
                    <div className="font-semibold text-primary">No documents</div>
                    <div className="text-muted-foreground">at this stage</div>
                  </div>
                  <div>
                    <div className="font-semibold text-primary">Free check</div>
                    <div className="text-muted-foreground">no platform fee</div>
                  </div>
                  <div>
                    <div className="font-semibold text-primary">Indicative only</div>
                    <div className="text-muted-foreground">not a sanction</div>
                  </div>
                  <div>
                    <div className="font-semibold text-primary">50+ partners</div>
                    <div className="text-muted-foreground">to compare</div>
                  </div>
                </div>
                <p className="mt-3 text-xs text-muted-foreground text-center">
                  Loan terms, rates and approval depend on lender policies and applicant profile. IndiaLoanHub is a lead-generation platform and not a direct lender.
                </p>

              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuickEligibilityWidget;
