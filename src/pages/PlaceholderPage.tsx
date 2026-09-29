
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronLeft, Construction } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
}

const PlaceholderPage = ({ title }: PlaceholderPageProps) => {
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
              This page is currently under construction and will be available soon.
            </p>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Construction className="h-16 w-16 text-brandblue-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900">Coming Soon</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                We're working hard to bring you this content. In the meantime, 
                feel free to check our other services or contact our team for more information.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/#enquiry">
                  <Button className="bg-brandblue-600 hover:bg-brandblue-700">
                    Check Loan Eligibility
                  </Button>
                </Link>
                <Link to="/talk-to-expert">
                  <Button variant="outline">
                    Talk to an Expert
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

export default PlaceholderPage;
