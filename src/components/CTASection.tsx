
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <div className="py-16 bg-brandblue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white">Ready to Find Your Perfect Loan?</h2>
        <p className="mt-4 text-lg text-brandblue-100 max-w-2xl mx-auto">
          Check your eligibility, compare rates, and apply with confidence. It only takes a few minutes.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/#enquiry" className="block">
            <Button size="lg" variant="default" className="bg-white text-brandblue-600 hover:bg-gray-100 w-full sm:w-auto">
              Check Eligibility
            </Button>
          </Link>
          <Link to="/compare" className="block">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-brandblue-700 w-full sm:w-auto">
              Compare Rates
            </Button>
          </Link>
          <Link to="/apply" className="block">
            <Button size="lg" variant="default" className="bg-brandgreen-500 text-white hover:bg-brandgreen-600 w-full sm:w-auto">
              Apply Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
