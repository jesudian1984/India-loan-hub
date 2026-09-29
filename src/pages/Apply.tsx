import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "../components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const Apply = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: location.state?.fullName || "",
    email: "",
    phone: location.state?.phone || "",
    dateOfBirth: "",
    companyName: "",
    monthlySalary: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    employmentType: "salaried",
    workExperience: "",
    loanType: "personal",
    loanAmount: "500000",
    loanPurpose: "",
    tenureMonths: "36",
    existingLoans: false,
    acceptTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const validateCurrentStep = () => {
    if (step === 1) {
      if (!formData.fullName || !formData.email || !formData.phone || !formData.companyName || !formData.monthlySalary) {
        toast.error("Please fill all required fields");
        return false;
      }
      if (formData.phone.length !== 10 || !/^\d+$/.test(formData.phone)) {
        toast.error("Please enter a valid 10-digit phone number");
        return false;
      }
      if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        toast.error("Please enter a valid email address");
        return false;
      }
    } else if (step === 2) {
      if (!formData.address || !formData.city || !formData.state || !formData.pincode) {
        toast.error("Please fill all required fields");
        return false;
      }
      if (formData.pincode.length !== 6 || !/^\d+$/.test(formData.pincode)) {
        toast.error("Please enter a valid 6-digit pincode");
        return false;
      }
    } else if (step === 3) {
      if (!formData.employmentType) {
        toast.error("Please select employment type");
        return false;
      }
    }
    return true;
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      setStep((prev) => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (!loading && !user) {
      toast.error("Please login to apply for a loan");
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please login to submit application");
      navigate('/auth');
      return;
    }

    if (!formData.acceptTerms) {
      toast.error("Please accept the terms and conditions");
      return;
    }

    try {
      const { error } = await supabase
        .from('loan_applications')
        .insert({
          user_id: user.id,
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          date_of_birth: formData.dateOfBirth || null,
          company_name: formData.companyName || null,
          monthly_salary: formData.monthlySalary ? parseFloat(formData.monthlySalary) : null,
          address: formData.address || null,
          city: formData.city || null,
          state: formData.state || null,
          pincode: formData.pincode || null,
          employment_type: formData.employmentType || null,
          work_experience: formData.workExperience || null,
          loan_type: formData.loanType,
          loan_amount: parseFloat(formData.loanAmount),
          loan_purpose: formData.loanPurpose || null,
          tenure_months: formData.tenureMonths ? parseInt(formData.tenureMonths) : null,
          existing_loans: formData.existingLoans,
        });

      if (error) throw error;

      toast.success('Application submitted successfully!');
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error: any) {
      toast.error(error.message || 'Failed to submit application');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-grow py-12 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Loan Application</h1>
            <p className="mt-2 text-lg text-gray-600">Complete your application in just a few steps</p>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className={`flex flex-col items-center ${
                    step >= item ? "text-brandblue-600" : "text-gray-400"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      step >= item
                        ? "border-brandblue-600 bg-brandblue-50"
                        : "border-gray-300"
                    } mb-2`}
                  >
                    {step > item ? (
                      <CheckCircle className="h-6 w-6" />
                    ) : (
                      <span className="text-sm font-medium">{item}</span>
                    )}
                  </div>
                  <span className="text-xs hidden sm:block">
                    {item === 1
                      ? "Personal Details"
                      : item === 2
                      ? "Address"
                      : item === 3
                      ? "Employment"
                      : "Loan Details"}
                  </span>
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-200 h-1 mt-4">
              <div
                className="bg-brandblue-600 h-1"
                style={{ width: `${(step / 4) * 100}%` }}
              ></div>
            </div>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>
                {step === 1
                  ? "Personal Information"
                  : step === 2
                  ? "Address Details"
                  : step === 3
                  ? "Employment Details"
                  : "Loan Requirements"}
              </CardTitle>
              <CardDescription>
                {step === 1
                  ? "Please provide your basic details"
                  : step === 2
                  ? "Where do you currently live?"
                  : step === 3
                  ? "Tell us about your employment"
                  : "Specify your loan requirements"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                {step === 1 && (
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="fullName">
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor="email">
                        Email <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@example.com"
                        required
                      />
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor="phone">
                        Phone Number <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="10-digit mobile number"
                        required
                      />
                      <p className="text-xs text-gray-500">
                        We'll send an OTP to verify this number
                      </p>
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        name="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor="companyName">
                        Company Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="Enter your company name"
                        required
                      />
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor="monthlySalary">
                        Monthly Salary (₹) <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="monthlySalary"
                        name="monthlySalary"
                        type="number"
                        value={formData.monthlySalary}
                        onChange={handleChange}
                        placeholder="Enter your monthly salary"
                        required
                      />
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="address">
                        Address <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter your complete address"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="city">
                          City <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="Enter your city"
                          required
                        />
                      </div>

                      <div className="grid gap-3">
                        <Label htmlFor="state">
                          State <span className="text-red-500">*</span>
                        </Label>
                        <Select
                          value={formData.state}
                          onValueChange={(value) =>
                            handleSelectChange("state", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select your state" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="andhra_pradesh">
                              Andhra Pradesh
                            </SelectItem>
                            <SelectItem value="assam">Assam</SelectItem>
                            <SelectItem value="bihar">Bihar</SelectItem>
                            <SelectItem value="delhi">Delhi</SelectItem>
                            <SelectItem value="goa">Goa</SelectItem>
                            <SelectItem value="gujarat">Gujarat</SelectItem>
                            <SelectItem value="haryana">Haryana</SelectItem>
                            <SelectItem value="karnataka">Karnataka</SelectItem>
                            <SelectItem value="kerala">Kerala</SelectItem>
                            <SelectItem value="maharashtra">Maharashtra</SelectItem>
                            <SelectItem value="punjab">Punjab</SelectItem>
                            <SelectItem value="tamil_nadu">Tamil Nadu</SelectItem>
                            <SelectItem value="telangana">Telangana</SelectItem>
                            <SelectItem value="west_bengal">West Bengal</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor="pincode">
                        PIN Code <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        placeholder="6-digit PIN code"
                        required
                      />
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="employmentType">
                        Employment Type <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.employmentType}
                        onValueChange={(value) =>
                          handleSelectChange("employmentType", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select employment type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="salaried">Salaried</SelectItem>
                          <SelectItem value="self_employed">
                            Self Employed
                          </SelectItem>
                          <SelectItem value="business_owner">
                            Business Owner
                          </SelectItem>
                          <SelectItem value="government">
                            Government Employee
                          </SelectItem>
                          <SelectItem value="retired">Retired</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor="workExperience">
                        Work Experience (years)
                      </Label>
                      <Input
                        id="workExperience"
                        name="workExperience"
                        type="number"
                        value={formData.workExperience}
                        onChange={handleChange}
                        placeholder="Years of experience"
                      />
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="loanType">
                        Loan Type <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.loanType}
                        onValueChange={(value) =>
                          handleSelectChange("loanType", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select loan type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="personal">Personal Loan</SelectItem>
                          <SelectItem value="home">Home Loan</SelectItem>
                          <SelectItem value="business">Business Loan</SelectItem>
                          <SelectItem value="education">Education Loan</SelectItem>
                          <SelectItem value="car">Car Loan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor="loanAmount">
                        Loan Amount (₹) <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.loanAmount}
                        onValueChange={(value) =>
                          handleSelectChange("loanAmount", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select loan amount" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="100000">₹1,00,000</SelectItem>
                          <SelectItem value="200000">₹2,00,000</SelectItem>
                          <SelectItem value="300000">₹3,00,000</SelectItem>
                          <SelectItem value="500000">₹5,00,000</SelectItem>
                          <SelectItem value="750000">₹7,50,000</SelectItem>
                          <SelectItem value="1000000">₹10,00,000</SelectItem>
                          <SelectItem value="1500000">₹15,00,000</SelectItem>
                          <SelectItem value="2000000">₹20,00,000</SelectItem>
                          <SelectItem value="3000000">₹30,00,000</SelectItem>
                          <SelectItem value="5000000">₹50,00,000</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor="loanPurpose">Loan Purpose</Label>
                      <Textarea
                        id="loanPurpose"
                        name="loanPurpose"
                        value={formData.loanPurpose}
                        onChange={handleChange}
                        placeholder="Briefly describe why you need this loan"
                      />
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor="tenureMonths">Tenure (Months)</Label>
                      <Select
                        value={formData.tenureMonths}
                        onValueChange={(value) =>
                          handleSelectChange("tenureMonths", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select tenure" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="12">12 months</SelectItem>
                          <SelectItem value="24">24 months</SelectItem>
                          <SelectItem value="36">36 months</SelectItem>
                          <SelectItem value="48">48 months</SelectItem>
                          <SelectItem value="60">60 months</SelectItem>
                          <SelectItem value="72">72 months</SelectItem>
                          <SelectItem value="84">84 months</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="existingLoans"
                        checked={formData.existingLoans}
                        onCheckedChange={(checked) =>
                          handleSwitchChange("existingLoans", checked)
                        }
                      />
                      <Label htmlFor="existingLoans">
                        I have existing loans
                      </Label>
                    </div>

                    <div className="rounded-md border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900 mt-4">
                      IndiaLoanHub is a loan assistance / lead-generation platform and not a direct lender.
                      We may share your details with partner banks/NBFCs. Submission of this form does not guarantee
                      loan approval. Loan terms, rates and approval depend on lender policies and applicant profile.
                    </div>

                    <div className="flex items-start space-x-2 pt-4">
                      <Switch
                        id="acceptTerms"
                        checked={formData.acceptTerms}
                        onCheckedChange={(checked) =>
                          handleSwitchChange("acceptTerms", checked)
                        }
                      />
                      <Label htmlFor="acceptTerms" className="text-xs leading-relaxed">
                        By clicking Submit, I agree to the{" "}
                        <a href="/terms" className="text-brandblue-600 hover:underline">Terms &amp; Conditions</a>{" "}
                        and{" "}
                        <a href="/privacy" className="text-brandblue-600 hover:underline">Privacy Policy</a>,
                        and consent to be contacted by phone, SMS, WhatsApp and email by IndiaLoanHub and its lending
                        partners regarding my enquiry. This consent overrides any NDNC/DND registration.
                      </Label>
                    </div>

                  </div>
                )}
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              {step > 1 && (
                <Button variant="outline" onClick={prevStep}>
                  Previous
                </Button>
              )}
              {step < 4 ? (
                <Button
                  className="bg-brandblue-600 hover:bg-brandblue-700 ml-auto"
                  onClick={nextStep}
                >
                  Next
                </Button>
              ) : (
                <Button
                  className="bg-brandgreen-500 hover:bg-brandgreen-600 ml-auto"
                  onClick={handleSubmit}
                >
                  Submit Application
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Apply;
