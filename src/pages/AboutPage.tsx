
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronLeft, Users, Target, Award, Phone, Mail, MapPin, Building2, FileText, Shield, Handshake, TrendingUp, Building } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-brandblue-600 to-brandblue-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center mb-4">
              <Link to="/" className="flex items-center text-white hover:text-brandblue-100">
                <ChevronLeft className="h-5 w-5 mr-1" />
                Back to Home
              </Link>
            </div>
            <h1 className="text-4xl font-bold mb-6">About Fingrandz Business Solutions</h1>
            <p className="text-xl max-w-3xl">
              India Loan Hub is an MSME-focused loan-distribution and lead-generation platform that connects businesses with partner banks and NBFCs to explore tailored loan offers.
            </p>
          </div>
        </div>
        
        {/* Platform Overview */}
        <div className="py-12 bg-brandblue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-brandblue-900 mb-6">What is India Loan Hub?</h2>
                <p className="text-lg text-gray-700 mb-4">
                  India Loan Hub is a specialized <strong>loan-distribution and lead-generation platform</strong> focused on serving Micro, Small, and Medium Enterprises (MSMEs) across India.
                </p>
                <p className="text-lg text-gray-700 mb-4">
                  We work with leading banks and NBFCs to help businesses access financing through innovative surrogate-based lending programs—including Banking Surrogate, GST Surrogate, and Income Surrogate loans.
                </p>
                <div className="bg-white p-4 rounded-lg border-l-4 border-brandblue-600 mt-6">
                  <p className="text-gray-700 flex items-start gap-2">
                    <Shield className="h-5 w-5 text-brandblue-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Important:</strong> India Loan Hub does not act as a lender. All loans are issued by our partner banks and NBFCs, subject to their terms, conditions, and approval criteria.</span>
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                  <Building className="h-10 w-10 text-brandblue-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900">Partner Banks</h3>
                  <p className="text-sm text-gray-600 mt-1">HDFC, ICICI, SBI, Axis & more</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                  <Handshake className="h-10 w-10 text-brandblue-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900">NBFC Partners</h3>
                  <p className="text-sm text-gray-600 mt-1">Leading NBFCs for MSME lending</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                  <TrendingUp className="h-10 w-10 text-brandblue-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900">₹50L+ Facilitated</h3>
                  <p className="text-sm text-gray-600 mt-1">Loans facilitated for MSMEs</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                  <Users className="h-10 w-10 text-brandblue-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900">10,000+ Leads</h3>
                  <p className="text-sm text-gray-600 mt-1">Connected with lenders</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Services Section */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Services</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-brandblue-700 mb-4">MSME Business Loan Distribution</h3>
                <p className="text-gray-700 mb-4">
                  We facilitate business loan applications for MSMEs by connecting them with our network of partner banks and NBFCs. Our platform streamlines the application process and helps businesses find suitable financing options.
                </p>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Working capital loans</li>
                  <li>• Business expansion financing</li>
                  <li>• Equipment and machinery loans</li>
                  <li>• Term loans for MSMEs</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-brandblue-700 mb-4">Surrogate-Based Lending</h3>
                <p className="text-gray-700 mb-4">
                  We specialize in surrogate-based lending programs that allow businesses to qualify for loans without traditional income proof:
                </p>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• <strong>Banking Surrogate:</strong> Based on Average Bank Balance (ABB)</li>
                  <li>• <strong>GST Surrogate:</strong> Based on GST returns and turnover</li>
                  <li>• <strong>Income Surrogate (ABP):</strong> Based on CIBIL score and credit profile</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-brandblue-700 mb-4">Lead Generation & Distribution</h3>
                <p className="text-gray-700 mb-4">
                  Qualified leads are shared with our partner banks and NBFCs for final credit assessment, approval, and loan disbursal. Our role is to:
                </p>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Collect and verify customer information</li>
                  <li>• Route leads to appropriate lenders</li>
                  <li>• Facilitate communication between parties</li>
                  <li>• Support the application process</li>
                </ul>
              </div>
            </div>
            
            {/* Services Disclaimer */}
            <div className="mt-8 p-4 bg-brandblue-50 rounded-lg border border-brandblue-200">
              <p className="text-sm text-gray-700 text-center">
                <strong>Note:</strong> India Loan Hub acts as a facilitator and lead-generation platform. Final loan approval, terms, interest rates, and disbursal are at the sole discretion of partner banks and NBFCs based on their credit assessment policies.
              </p>
            </div>
          </div>
        </div>
        
        {/* Company Summary */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About FINGRANDZ BUSINESS SOLUTIONS</h2>
              <p className="text-lg text-gray-700 mb-6">
                FINGRANDZ BUSINESS SOLUTIONS is a dynamic financial consulting firm that operates India Loan Hub. Founded in June 2019, we specialize in connecting MSMEs and salaried individuals with suitable loan opportunities through our network of partner banks and NBFCs.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Our unique strategies, grounded in deep market knowledge and real-world experience, allow us to craft impactful financial solutions. We combine innovation, empathetic engagement, and cutting-edge marketing techniques to deliver consistent, measurable results for our clients.
              </p>
              
              {/* Business Details */}
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-brandblue-600" />
                    Company Details
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>Legal Entity:</strong> FINGRANDZ BUSINESS SOLUTIONS</li>
                    <li><strong>UDYAM Registration:</strong> UDYAM-TN-02-0203436</li>
                    <li><strong>Founded:</strong> June 2019</li>
                    <li><strong>Industry:</strong> Financial Services / Lead Generation</li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-brandblue-600" />
                    Registered Office
                  </h3>
                  <p className="text-gray-700">
                    No. 5, 1st Floor, Arunachalam Road,<br />
                    Saidapet, Chennai - 600015,<br />
                    Tamil Nadu, India
                  </p>
                  <div className="mt-4 space-y-1 text-gray-700">
                    <p><strong>Phone:</strong> <a href="tel:+919176244465" className="text-brandblue-600">+91 9176244465</a></p>
                    <p><strong>Email:</strong> <a href="mailto:reachus@indialoanhub.com" className="text-brandblue-600">reachus@indialoanhub.com</a></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Partner with Us */}
            <div className="mb-16 bg-brandblue-50 p-8 rounded-lg">
              <h2 className="text-3xl font-bold text-brandblue-900 mb-6">Partner with Us to...</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Target className="h-6 w-6 text-brandblue-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-lg text-gray-700">Unlock productive outcomes and fresh approaches to your business challenges</span>
                </li>
                <li className="flex items-start">
                  <Target className="h-6 w-6 text-brandblue-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-lg text-gray-700">Combine modern telemarketing strategies with traditional financial advisory for higher ROI</span>
                </li>
                <li className="flex items-start">
                  <Target className="h-6 w-6 text-brandblue-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-lg text-gray-700">Drive growth with human-centric consultation and market-driven insights</span>
                </li>
                <li className="flex items-start">
                  <Target className="h-6 w-6 text-brandblue-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-lg text-gray-700">Reimagine sales and customer engagement through the 3C's: Connect. Convince. Convert.</span>
                </li>
              </ul>
            </div>

            {/* Core Capabilities */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Core Capabilities</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Telemarketing-Focused Financial Consultation</h3>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Lead Generation & Conversion for Investment and Insurance Products</h3>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Sales Training, Performance Management & Quality Delivery</h3>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Customer-Centric Script Development & Objection Handling</h3>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg md:col-span-2">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">End-to-End Recruitment & Training for Telesales Operations</h3>
                </div>
              </div>
            </div>

            {/* What Sets Us Apart */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What Sets Us Apart</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-center">
                  <Users className="h-12 w-12 text-brandblue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Empowered Consultants</h3>
                  <p className="text-gray-700">Our consultants are entrepreneurial, bold, and result-oriented.</p>
                </div>
                <div className="text-center">
                  <Target className="h-12 w-12 text-brandblue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Human Approach</h3>
                  <p className="text-gray-700">We solve business challenges with empathy, not just data.</p>
                </div>
                <div className="text-center">
                  <Award className="h-12 w-12 text-brandblue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Industry Knowledge</h3>
                  <p className="text-gray-700">Our leadership team brings decades of experience in banking, insurance, and tele-sales.</p>
                </div>
                <div className="text-center">
                  <Users className="h-12 w-12 text-brandblue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Rigorous Training</h3>
                  <p className="text-gray-700">From communication to real-life marketing modules, our team is groomed to deliver excellence.</p>
                </div>
                <div className="text-center md:col-span-2 lg:col-span-2">
                  <Award className="h-12 w-12 text-brandblue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Obsessed with Quality</h3>
                  <p className="text-gray-700">We follow the belief: "QUALITY IS CUSTOMER"—no compromises, at any stage.</p>
                </div>
              </div>
            </div>

            {/* Founder Profile */}
            <div className="mb-16 bg-white p-8 rounded-lg border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Team</h2>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-brandblue-700 mb-4">Founder & CEO: Joseph Jesudian</h3>
              <p className="text-lg text-gray-700 mb-6">
                A B.Com graduate from Madras University (2004), Joseph brings over 15 years of hands-on experience in financial services. His journey includes pivotal roles at SBI Cards, GE Capital, Kotak Life Insurance, and HDFC Bank.
              </p>
              <ul className="space-y-3 text-gray-700">
                <li>• Began as a sales associate, quickly rising to Territory Sales Manager at GE Capital</li>
                <li>• Successfully built and scaled tele-sales operations at Kotak Life with over 150 workstations</li>
                <li>• Led personal loan sales at HDFC Bank, achieving up to ₹13 Cr/month in disbursements</li>
                <li>• Headed Chennai inbound sales team as Champion Manager, directly reporting to the Regional Head</li>
                <li>• Founded TALNET Business Solutions Pvt. Ltd. in 2018 to offer recruitment and manpower solutions</li>
              </ul>
              <p className="text-lg text-gray-700 mt-6">
                Joseph's entrepreneurial mindset, strong network, and operational expertise laid the foundation for FINGRANDZ's high-performance teleconsulting model.
              </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-brandblue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="h-8 w-8 text-brandblue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900">Operations Team</h4>
                  <p className="text-sm text-gray-600 mt-1">Lead verification, documentation & customer support</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-brandblue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Handshake className="h-8 w-8 text-brandblue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900">Partnerships Team</h4>
                  <p className="text-sm text-gray-600 mt-1">Bank & NBFC relationship management</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-brandblue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="h-8 w-8 text-brandblue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900">Sales Team</h4>
                  <p className="text-sm text-gray-600 mt-1">Lead generation & customer acquisition</p>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-brandblue-50 border border-brandblue-200 p-8 rounded-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-center">
                  <MapPin className="h-6 w-6 text-brandblue-600 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Address</h3>
                    <p className="text-gray-700">No. 5, 1st Floor, Arunachalam Road, Saidapet, Chennai - 600015</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="h-6 w-6 text-brandblue-600 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Phone</h3>
                    <p className="text-gray-700">+91 9176244465</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="h-6 w-6 text-brandblue-600 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-700">reachus@indialoanhub.com</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Link to="/contact">
                  <Button className="bg-brandblue-600 hover:bg-brandblue-700">
                    Get in Touch
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
