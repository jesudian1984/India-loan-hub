 import Navbar from "@/components/Navbar";
 import Footer from "@/components/Footer";
 import { Link } from "react-router-dom";
 import { ChevronLeft, Shield } from "lucide-react";
 
 const Privacy = () => {
   return (
     <div className="min-h-screen flex flex-col">
       <Navbar />
       
       <main className="flex-grow">
         {/* Hero Section */}
         <div className="bg-gradient-to-r from-brandblue-600 to-brandblue-800 text-white py-12">
           <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="flex items-center mb-4">
               <Link to="/" className="flex items-center text-white hover:text-brandblue-100">
                 <ChevronLeft className="h-5 w-5 mr-1" />
                 Back to Home
               </Link>
             </div>
             <h1 className="text-3xl font-bold">Privacy Policy</h1>
             <p className="mt-2 text-brandblue-100">Last updated: February 2025</p>
           </div>
         </div>
         
         {/* Content */}
         <div className="py-12 bg-white">
           <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="prose prose-lg max-w-none">
               
               <div className="bg-brandblue-50 p-6 rounded-lg mb-8 border border-brandblue-200">
                 <div className="flex items-start gap-3">
                   <Shield className="h-6 w-6 text-brandblue-600 mt-1 flex-shrink-0" />
                   <div>
                     <h3 className="text-lg font-semibold text-brandblue-900 mb-2">Important Notice</h3>
                     <p className="text-gray-700">
                       India Loan Hub, operated by FINGRANDZ BUSINESS SOLUTIONS, is a loan-distribution and lead-generation platform. We collect and process your data to facilitate loan applications with our partner banks and NBFCs.
                     </p>
                   </div>
                 </div>
               </div>
               
               <section className="mb-8">
                 <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
                 <p className="text-gray-700 mb-4">
                   We collect information that you provide directly to us when using our platform, including:
                 </p>
                 <ul className="list-disc pl-6 text-gray-700 space-y-2">
                   <li><strong>Personal Information:</strong> Name, email address, phone number, date of birth</li>
                   <li><strong>Business Information:</strong> Business name, type, vintage, turnover, GST registration status</li>
                   <li><strong>Financial Information:</strong> Monthly income, existing EMIs, CIBIL score range, bank statements</li>
                   <li><strong>Employment Information:</strong> Employer name, designation, work experience</li>
                   <li><strong>Address Information:</strong> Residential and business addresses</li>
                 </ul>
               </section>
               
               <section className="mb-8">
                 <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
                 <p className="text-gray-700 mb-4">
                   Your information is used for the following purposes:
                 </p>
                 <ul className="list-disc pl-6 text-gray-700 space-y-2">
                   <li>To assess your eligibility for loan products</li>
                   <li>To share your application with partner banks and NBFCs for loan processing</li>
                   <li>To communicate with you about loan offers and application status</li>
                   <li>To improve our services and user experience</li>
                   <li>To comply with legal and regulatory requirements</li>
                 </ul>
               </section>
               
               <section className="mb-8">
                 <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Data Sharing with Partner Lenders</h2>
                 <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mb-4">
                   <p className="text-gray-700">
                     <strong>Important:</strong> As a loan-distribution and lead-generation platform, we share your information with our partner banks and NBFCs to facilitate your loan application. This includes:
                   </p>
                 </div>
                 <ul className="list-disc pl-6 text-gray-700 space-y-2">
                   <li>HDFC Bank, ICICI Bank, SBI, Axis Bank, Yes Bank</li>
                   <li>Partner NBFCs including Bajaj Finance, Tata Capital, and others</li>
                   <li>Credit bureaus for credit score verification</li>
                 </ul>
                 <p className="text-gray-700 mt-4">
                   By submitting your information on our platform, you consent to this data sharing for the purpose of loan processing.
                 </p>
               </section>
               
               <section className="mb-8">
                 <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
                 <p className="text-gray-700">
                   We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
                 </p>
               </section>
               
               <section className="mb-8">
                 <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Your Rights</h2>
                 <p className="text-gray-700 mb-4">You have the right to:</p>
                 <ul className="list-disc pl-6 text-gray-700 space-y-2">
                   <li>Access your personal information</li>
                   <li>Request correction of inaccurate data</li>
                   <li>Request deletion of your data (subject to legal requirements)</li>
                   <li>Withdraw consent for data processing</li>
                 </ul>
               </section>
               
               <section className="mb-8">
                 <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Contact Us</h2>
                 <p className="text-gray-700">
                   For privacy-related inquiries, please contact us at:
                 </p>
                 <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                   <p className="text-gray-700">
                     <strong>FINGRANDZ BUSINESS SOLUTIONS</strong><br />
                     No. 5, 1st Floor, Arunachalam Road, Saidapet, Chennai - 600015<br />
                     Email: <a href="mailto:reachus@indialoanhub.com" className="text-brandblue-600">reachus@indialoanhub.com</a><br />
                     Phone: <a href="tel:+919176244465" className="text-brandblue-600">+91 9176244465</a>
                   </p>
                 </div>
               </section>
               
             </div>
           </div>
         </div>
       </main>
       
       <Footer />
     </div>
   );
 };
 
 export default Privacy;