import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeadEnquiryForm from "@/components/LeadEnquiryForm";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

interface LoanTypePageProps {
  title: string;
}

const LoanTypePage = ({ title }: LoanTypePageProps) => {
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
            <h1 className="text-4xl font-bold mb-6">{title}</h1>
            <p className="text-xl max-w-2xl">
              Compare offers from our partner lenders for {title.toLowerCase()} and get help from our loan experts.
            </p>
            <div className="mt-6">
              <Link to="/#enquiry">
                <Button className="bg-white text-brandblue-700 hover:bg-gray-100">
                  Get a free eligibility check
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Enquiry Section */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <LeadEnquiryForm
              title="Get a free loan eligibility check"
              description={`Share a few details and our team will help you compare ${title.toLowerCase()} offers from our lending partners.`}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LoanTypePage;
