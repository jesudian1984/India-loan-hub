import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import { 
  ChevronLeft, 
  Building2, 
  FileText, 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  Shield, 
  Users,
  ArrowRight,
  Landmark,
  Receipt,
  TrendingUp,
  Briefcase,
  Store,
  UserCheck,
  Zap,
  FileCheck,
  BadgeCheck
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BusinessLoans = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    businessVintage: "",
    annualTurnover: "",
    gstRegistered: "",
    cibilRange: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Thank you for your interest!",
      description: "Our team will contact you shortly with pre-qualified offers.",
    });
  };

  const steps = [
    {
      icon: FileText,
      title: "Share Your Documents",
      description: "Share your bank statements, GST returns, or CIBIL score."
    },
    {
      icon: TrendingUp,
      title: "Auto-Route to Best Product",
      description: "We auto-route you to the right surrogate: Banking, GST, or Income."
    },
    {
      icon: Zap,
      title: "Get Pre-Approved Offers",
      description: "Get pre-approved offers in minutes and disbursal in days."
    }
  ];

  const products = [
    {
      id: "banking",
      title: "Banking Surrogate Loan",
      subtitle: "ABB-based",
      icon: Landmark,
      color: "from-blue-500 to-blue-700",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      features: [
        "No traditional income proof needed",
        "Based on Average Bank Balance (ABB)",
        "Collateral-free, quick approval",
        "Loan range: ₹50,000 – ₹50 Lakh"
      ],
      approval: "2–7 days",
      cibil: "650+",
      vintage: "6-12 months"
    },
    {
      id: "gst",
      title: "GST Surrogate Loan",
      subtitle: "GST-based",
      icon: Receipt,
      color: "from-emerald-500 to-emerald-700",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      features: [
        "Use GST returns as income proof",
        "Higher loan amounts available",
        "Collateral-free working capital",
        "Loan range: ₹1 Lakh – ₹1 Crore"
      ],
      approval: "3–10 days",
      cibil: "650+",
      vintage: "12-36 months"
    },
    {
      id: "income",
      title: "Income Surrogate Loan",
      subtitle: "ABP-based",
      icon: CreditCard,
      color: "from-purple-500 to-purple-700",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      features: [
        "Bureau data replaces income proof",
        "Fastest approval process",
        "No business documents required",
        "Loan range: ₹50,000 – ₹25 Lakh"
      ],
      approval: "1–3 days",
      cibil: "750+",
      vintage: "Credit profile-based"
    }
  ];

  const audiences = [
    {
      icon: Store,
      title: "New Businesses",
      description: "Strong bank deposits but no GST yet? Banking Surrogate is perfect for you."
    },
    {
      icon: Briefcase,
      title: "Established MSMEs",
      description: "Clean GST filing and steady turnover? Get higher amounts with GST Surrogate."
    },
    {
      icon: UserCheck,
      title: "Professionals & Freelancers",
      description: "750+ CIBIL but no ITR? Income Surrogate offers quick approval."
    }
  ];

  const comparisonData = [
    {
      criterion: "Primary Data Used",
      banking: "Bank statements (12 months)",
      gst: "GST returns (12–36 months)",
      income: "CIBIL/Bureau data"
    },
    {
      criterion: "Minimum Business Vintage",
      banking: "6–12 months",
      gst: "12–36 months",
      income: "Credit profile-based"
    },
    {
      criterion: "Turnover Requirement",
      banking: "Based on ABB",
      gst: "₹20L–₹50L annually",
      income: "No requirement"
    },
    {
      criterion: "CIBIL Requirement",
      banking: "650–700+",
      gst: "650+",
      income: "750+ (mandatory)"
    },
    {
      criterion: "Typical Loan Amount",
      banking: "₹50K–₹50L",
      gst: "₹1L–₹1Cr",
      income: "₹50K–₹25L"
    },
    {
      criterion: "Approval Speed",
      banking: "2–7 days",
      gst: "3–10 days",
      income: "1–3 days"
    }
  ];

  const partners = [
    "HDFC Bank",
    "ICICI Bank",
    "SBI",
    "Axis Bank",
    "Yes Bank",
    "Bajaj Finserv",
    "Kinara Capital"
  ];

  const faqs = [
    {
      question: "Can I get a loan without GST registration?",
      answer: "Yes! Banking Surrogate (using your bank balance) or Income Surrogate (using your CIBIL score) don't require GST registration. These are perfect for new businesses or freelancers."
    },
    {
      question: "Is collateral required for these loans?",
      answer: "No, all three surrogate loan products are 100% collateral-free. Your eligibility is based on your banking patterns, GST compliance, or credit score—not your assets."
    },
    {
      question: "How fast is the disbursal?",
      answer: "Disbursal speed varies by product: Income Surrogate is fastest (1–3 days), Banking Surrogate takes 2–7 days, and GST Surrogate takes 3–10 days. The exact time depends on your document submission."
    },
    {
      question: "What documents do I need?",
      answer: "Banking Surrogate: 12-month bank statements + KYC. GST Surrogate: Last 6–12 GST returns + Udyam certificate + KYC. Income Surrogate: Only KYC documents (we pull your credit report automatically)."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-accent py-16 md:py-24">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] opacity-20"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="flex items-center mb-6">
              <Link to="/" className="flex items-center text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <ChevronLeft className="h-5 w-5 mr-1" />
                Back to Home
              </Link>
            </div>
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-6 leading-tight">
                Get Business Loans Without Traditional Income Proof
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
                Use your bank balance, GST returns, or credit score to qualify instantly. 
                Fast disbursal, no collateral, and minimal paperwork.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-white/90 font-semibold shadow-lg"
                  onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Check Eligibility
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white/30 text-primary-foreground hover:bg-white/10"
                  onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View Products
                </Button>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {[
                { icon: Zap, label: "Fast Disbursal", value: "1-10 Days" },
                { icon: Shield, label: "Collateral Free", value: "100%" },
                { icon: FileCheck, label: "Minimal Docs", value: "Simple Process" },
                { icon: Users, label: "Happy MSMEs", value: "10,000+" }
              ].map((item, idx) => (
                <div key={idx} className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                  <item.icon className="h-8 w-8 text-primary-foreground mx-auto mb-2" />
                  <div className="text-xl md:text-2xl font-bold text-primary-foreground">{item.value}</div>
                  <div className="text-sm text-primary-foreground/80">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                How It Works
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Get your business loan in 3 simple steps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Connection line for desktop */}
              <div className="hidden md:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary opacity-20" 
                   style={{ width: 'calc(100% - 200px)', marginLeft: '100px' }} />
              
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="flex flex-col items-center text-center group">
                    <div className="relative mb-6">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                        <step.icon className="h-12 w-12 text-primary-foreground" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm shadow-md">
                        {index + 1}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Product Cards */}
        <section id="products" className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Smart Loan Products for MSMEs
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose the product that matches your business profile
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className={`relative overflow-hidden border-2 ${product.borderColor} hover:shadow-xl transition-all duration-300 group`}>
                  <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${product.color}`}></div>
                  <CardHeader className={`${product.bgColor} pb-4`}>
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${product.color} flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                      <product.icon className="h-7 w-7 text-white" />
                    </div>
                    <CardTitle className="text-xl">{product.title}</CardTitle>
                    <CardDescription className="font-medium">{product.subtitle}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <ul className="space-y-3 mb-6">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="space-y-2 pt-4 border-t border-border">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Approval:</span>
                        <span className="font-semibold text-foreground">{product.approval}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Min CIBIL:</span>
                        <span className="font-semibold text-foreground">{product.cibil}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Vintage:</span>
                        <span className="font-semibold text-foreground">{product.vintage}</span>
                      </div>
                    </div>

                    <Button 
                      className={`w-full mt-6 bg-gradient-to-r ${product.color} hover:opacity-90 text-white`}
                      onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      Check Eligibility
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Who It's For */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Who It's For
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Find the perfect loan product for your business profile
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {audiences.map((audience, idx) => (
                <Card key={idx} className="text-center hover:shadow-lg transition-shadow border-border">
                  <CardContent className="pt-8 pb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mx-auto mb-4">
                      <audience.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">{audience.title}</h3>
                    <p className="text-muted-foreground">{audience.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Compare Loan Products
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                See which surrogate loan fits your business best
              </p>
            </div>

            <div className="overflow-x-auto">
              <Table className="border border-border rounded-lg">
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">Criterion</TableHead>
                    <TableHead className="font-semibold text-blue-600">
                      <div className="flex items-center gap-2">
                        <Landmark className="h-4 w-4" />
                        Banking Surrogate
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold text-emerald-600">
                      <div className="flex items-center gap-2">
                        <Receipt className="h-4 w-4" />
                        GST Surrogate
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold text-purple-600">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        Income Surrogate
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {comparisonData.map((row, idx) => (
                    <TableRow key={idx} className="hover:bg-muted/30">
                      <TableCell className="font-medium">{row.criterion}</TableCell>
                      <TableCell>{row.banking}</TableCell>
                      <TableCell>{row.gst}</TableCell>
                      <TableCell>{row.income}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </section>

        {/* Trust & Partners */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Partnered with Leading Banks & NBFCs
              </h2>
              <p className="text-muted-foreground">Trusted by thousands of MSMEs across India</p>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-6 mb-12">
              {partners.map((partner, idx) => (
                <div 
                  key={idx} 
                  className="px-6 py-3 bg-card rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow"
                >
                  <span className="text-foreground font-semibold text-sm">{partner}</span>
                </div>
              ))}
            </div>

            {/* Testimonial */}
            <div className="max-w-2xl mx-auto">
              <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
                <CardContent className="pt-6 text-center">
                  <div className="flex justify-center mb-4">
                    {[1,2,3,4,5].map((star) => (
                      <svg key={star} className="h-5 w-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                    ))}
                  </div>
                  <p className="text-lg text-foreground italic mb-4">
                    "Approved my ₹10 lakh GST-based working capital loan in just 5 days. 
                    The process was smooth and completely paperless!"
                  </p>
                  <p className="text-sm text-muted-foreground">— Rajesh Kumar, Manufacturing MSME, Pune</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Lead Capture Form */}
        <section id="lead-form" className="py-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="border-2 border-primary/20 shadow-xl">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl md:text-3xl">See Which Surrogate Fits Your Business</CardTitle>
                <CardDescription className="text-base">
                  Fill in your details to get pre-qualified offers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="businessVintage">Business Vintage</Label>
                    <div className="grid grid-cols-3 gap-3">
                      {["< 6 months", "6-12 months", "1+ years"].map((option) => (
                        <Button
                          key={option}
                          type="button"
                          variant={formData.businessVintage === option ? "default" : "outline"}
                          className="w-full"
                          onClick={() => setFormData({...formData, businessVintage: option})}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="annualTurnover">Approx. Annual Turnover</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {["< ₹20 Lakh", "₹20L - ₹50L", "₹50L - ₹1Cr", "> ₹1 Crore"].map((option) => (
                        <Button
                          key={option}
                          type="button"
                          variant={formData.annualTurnover === option ? "default" : "outline"}
                          className="w-full text-sm"
                          onClick={() => setFormData({...formData, annualTurnover: option})}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>GST Registered?</Label>
                    <RadioGroup 
                      value={formData.gstRegistered}
                      onValueChange={(value) => setFormData({...formData, gstRegistered: value})}
                      className="flex gap-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="gst-yes" />
                        <Label htmlFor="gst-yes" className="cursor-pointer">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="gst-no" />
                        <Label htmlFor="gst-no" className="cursor-pointer">No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label>CIBIL Score Range</Label>
                    <div className="grid grid-cols-3 gap-3">
                      {["650-700", "700-750", "750+"].map((option) => (
                        <Button
                          key={option}
                          type="button"
                          variant={formData.cibilRange === option ? "default" : "outline"}
                          className="w-full"
                          onClick={() => setFormData({...formData, cibilRange: option})}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground font-semibold text-lg"
                  >
                    <BadgeCheck className="mr-2 h-5 w-5" />
                    Get Pre-Qualified Offers
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-background">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Frequently Asked Questions
              </h2>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`}>
                  <AccordionTrigger className="text-left hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="text-center mt-8">
              <p className="text-muted-foreground mb-4">Still have questions?</p>
              <Link to="/talk-to-expert">
                <Button variant="outline" size="lg">
                  Talk to an Expert
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default BusinessLoans;
