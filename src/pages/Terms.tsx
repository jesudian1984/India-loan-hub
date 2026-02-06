import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ChevronLeft, AlertTriangle } from "lucide-react";
import { useEffect } from "react";

const Terms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
             <h1 className="text-3xl font-bold">Terms of Service</h1>
             <p className="mt-2 text-brandblue-100">Last updated: February 2025</p>
           </div>
         </div>
         
         {/* Content */}
         <div className="py-12 bg-white">
           <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="prose prose-lg max-w-none">
               
               <div className="bg-yellow-50 p-6 rounded-lg mb-8 border border-yellow-200">
                 <div className="flex items-start gap-3">
                   <AlertTriangle className="h-6 w-6 text-yellow-600 mt-1 flex-shrink-0" />
                   <div>
                     <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Disclaimer</h3>
                     <p className="text-gray-700">
                       India Loan Hub, operated by FINGRANDZ BUSINESS SOLUTIONS, is a <strong>loan-distribution and lead-generation platform</strong> and <strong>does not act as a lender</strong>. All loans are issued by partner banks and NBFCs, and approval is at their sole discretion based on their credit assessment policies.
                     </p>
                   </div>
                 </div>
               </div>
               
               <section className="mb-8">
                 <h2 className="text-2xl font-bold text-gray-900 mb-4">1. About Our Service</h2>
                 <p className="text-gray-700 mb-4">
                   India Loan Hub ("Platform") is operated by FINGRANDZ BUSINESS SOLUTIONS ("Company", "we", "us"). By using our platform, you agree to these terms.
                 </p>
                 <p className="text-gray-700">
                   <strong>Our Role:</strong> We are a lead-generation and loan-distribution platform that connects potential borrowers with partner banks and NBFCs. We do not:
                 </p>
                 <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-2">
                   <li>Act as a lender or financial institution</li>
                   <li>Make lending decisions</li>
                   <li>Set interest rates or loan terms</li>
                   <li>Disburse loans</li>
                   <li>Guarantee loan approval</li>
                 </ul>
               </section>
               
               <section className="mb-8">
                 <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Loan Approval</h2>
                 <p className="text-gray-700 mb-4">
                   Eligibility and approval for any loan product depend entirely on our partner lenders' criteria. By using our platform:
                 </p>
                 <ul className="list-disc pl-6 text-gray-700 space-y-2">
                   <li>You understand that checking eligibility does not guarantee loan approval</li>
                   <li>You acknowledge that final approval rests with the partner bank or NBFC</li>
                   <li>You accept that loan terms, interest rates, and conditions are set by the lender</li>
                   <li>You consent to your information being shared with partner lenders for loan processing</li>
                 </ul>
               </section>
               
               <section className="mb-8">
                 <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Responsibilities</h2>
                 <p className="text-gray-700 mb-4">When using our platform, you agree to:</p>
                 <ul className="list-disc pl-6 text-gray-700 space-y-2">
                   <li>Provide accurate and truthful information</li>
                   <li>Not submit fraudulent or misleading applications</li>
                   <li>Authorize us to share your information with partner lenders</li>
                   <li>Comply with all applicable laws and regulations</li>
                 </ul>
               </section>
               
               <section className="mb-8">
                 <h2 className="text-2xl font-bold text-gray-900 mb-4">4. No Guarantee of Approval</h2>
                 <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                   <p className="text-gray-700">
                     <strong>We do not guarantee:</strong>
                   </p>
                   <ul className="list-disc pl-6 text-gray-700 space-y-1 mt-2">
                     <li>Loan approval</li>
                     <li>Specific interest rates</li>
                     <li>Loan amounts</li>
                     <li>Disbursement timelines</li>
                     <li>Approval speed</li>
                   </ul>
                   <p className="text-gray-700 mt-4">
                     All such factors depend on the partner lender's assessment and policies.
                   </p>
                 </div>
               </section>
               
               <section className="mb-8">
                 <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Partner Lenders</h2>
                 <p className="text-gray-700">
                   Our partner network includes banks such as HDFC, ICICI, SBI, Axis Bank, Yes Bank, and NBFCs including Bajaj Finance, Tata Capital, and others. The availability of specific lenders may vary based on your location and profile.
                 </p>
               </section>
               
               <section className="mb-8">
                 <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Limitation of Liability</h2>
                 <p className="text-gray-700">
                   FINGRANDZ BUSINESS SOLUTIONS shall not be liable for any losses, damages, or claims arising from:
                 </p>
                 <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-2">
                   <li>Loan rejection by partner lenders</li>
                   <li>Terms and conditions set by partner lenders</li>
                   <li>Delays in loan processing or disbursement</li>
                   <li>Actions or decisions of partner banks and NBFCs</li>
                 </ul>
               </section>
               
               <section className="mb-8">
                 <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Contact Information</h2>
                 <div className="p-4 bg-gray-50 rounded-lg">
                   <p className="text-gray-700">
                     <strong>FINGRANDZ BUSINESS SOLUTIONS</strong><br />
                     UDYAM Registration: UDYAM-TN-02-0203436<br />
                     No. 29, Dharamarajar Koil Street, Saidapet, Chennai - 600015<br />
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
 
 export default Terms;