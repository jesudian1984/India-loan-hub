
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, Building2 } from "lucide-react";
import logo from "@/assets/indialoanhub-logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar with legal entity */}
      <div className="bg-brandblue-800 text-white text-xs py-1.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 size={12} />
            <span>FINGRANDZ BUSINESS SOLUTIONS</span>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <span>📞 +91 9176244465</span>
            <span>✉️ reachus@indialoanhub.com</span>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pl-3 pr-3 sm:pl-4 sm:pr-6 lg:pl-4 lg:pr-8">
        <div className="flex justify-between items-center gap-3 h-20 md:h-24">
          <div className="flex items-center min-w-0">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img src={logo} alt="IndiaLoanHub logo" className="h-14 sm:h-16 md:h-20 w-auto object-contain" />
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-1 lg:space-x-3">
            <Link to="/" className="text-gray-700 hover:text-brandblue-600 px-2 py-2 text-sm font-medium whitespace-nowrap">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-brandblue-600 px-2 py-2 text-sm font-medium whitespace-nowrap">
              About
            </Link>
            <Link to="/loans" className="text-gray-700 hover:text-brandblue-600 px-2 py-2 text-sm font-medium whitespace-nowrap">
              Loans
            </Link>
            <Link to="/credit-cards" className="text-gray-700 hover:text-brandblue-600 px-2 py-2 text-sm font-medium whitespace-nowrap">
              Credit Cards
            </Link>
            <Link to="/#enquiry" className="text-gray-700 hover:text-brandblue-600 px-2 py-2 text-sm font-medium whitespace-nowrap">
              Check Eligibility
            </Link>
            <Link to="/talk-to-expert" className="text-gray-700 hover:text-brandblue-600 px-2 py-2 text-sm font-medium whitespace-nowrap">
              Contact
            </Link>
            <Link to="/apply">
              <Button size="sm" className="ml-4 bg-brandblue-600 hover:bg-brandblue-700">
                Apply Now
              </Button>
            </Link>
            <Link to="/admin" className="text-gray-500 hover:text-brandblue-600 p-2" title="Admin Login">
              <Shield size={18} />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brandblue-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-white border-t border-gray-200`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
            Home
          </Link>
          <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
            About
          </Link>
          <Link to="/loans" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
            Loans
          </Link>
          <Link to="/credit-cards" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
            Credit Cards
          </Link>
          <Link to="/#enquiry" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
            Check Eligibility
          </Link>
          <Link to="/talk-to-expert" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
            Contact
          </Link>
          <Link to="/apply" className="block w-full">
            <Button className="w-full mt-3 bg-brandblue-600 hover:bg-brandblue-700">
              Apply Now
            </Button>
          </Link>
          <Link to="/admin" className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50">
            <Shield size={18} />
            Admin Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
