

import { Link } from "react-router-dom";
import { Building2, Phone, Mail, MapPin, FileText } from "lucide-react";
import logo from "@/assets/indialoanhub-logo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Compliance Disclaimer Banner */}
      <div className="bg-brandblue-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-white/90 text-center">
           <strong>Disclaimer:</strong> India Loan Hub is a loan-distribution and lead-generation platform operated by FINGRANDZ BUSINESS SOLUTIONS and does not act as a lender. All loans are issued by partner banks and NBFCs, subject to their terms and conditions. Eligibility and approval depend on partner lenders' criteria. By using this platform, you agree to our <Link to="/privacy" className="underline text-white hover:text-white/80">Privacy Policy</Link> and <Link to="/terms" className="underline text-white hover:text-white/80">Terms of Service</Link>.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="IndiaLoanHub logo" className="h-12 w-12 object-contain bg-white rounded p-1" />
              <span className="text-2xl font-bold text-white">India<span className="text-brandgreen-400">LoanHub</span></span>
            </Link>
            <p className="mt-2 text-sm text-gray-400 flex items-center gap-2">
              <Building2 size={14} />
              A product of FINGRANDZ BUSINESS SOLUTIONS
            </p>
            <p className="mt-3 text-gray-300 max-w-md text-sm">
              India's trusted loan-distribution and lead-generation platform. Connect with partner banks and NBFCs to explore Personal Loans, Home Loans, Business Loans, and Credit Cards tailored to your needs.
            </p>
            <div className="mt-4 space-y-2 text-sm text-gray-400">
              <p className="flex items-center gap-2">
                <MapPin size={14} />
                No. 29, Dharamarajar Koil Street, Saidapet, Chennai - 600015, Tamil Nadu, India
              </p>
              <p className="flex items-center gap-2">
                <Phone size={14} />
                <a href="tel:+919176244465" className="hover:text-white">+91 9176244465</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail size={14} />
                <a href="mailto:reachus@indialoanhub.com" className="hover:text-white">reachus@indialoanhub.com</a>
              </p>
              <p className="flex items-center gap-2">
                <FileText size={14} />
                UDYAM: UDYAM-TN-02-0203436
              </p>
            </div>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Loan Products</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/loans/home" className="text-gray-300 hover:text-white">Home Loans</Link></li>
              <li><Link to="/loans/personal" className="text-gray-300 hover:text-white">Personal Loans</Link></li>
              <li><Link to="/loans/business" className="text-gray-300 hover:text-white">Business Loans</Link></li>
              <li><Link to="/loans/credit-cards" className="text-gray-300 hover:text-white">Credit Cards</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Tools</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/eligibility" className="text-gray-300 hover:text-white">Eligibility Calculator</Link></li>
              <li><Link to="/compare" className="text-gray-300 hover:text-white">Compare Loans</Link></li>
              <li><Link to="/emi-calculator" className="text-gray-300 hover:text-white">EMI Calculator</Link></li>
              <li><Link to="/resources" className="text-gray-300 hover:text-white">Resources</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">About & Careers</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-white">About Us</Link></li>
              <li><Link to="/careers" className="text-gray-300 hover:text-white">Careers</Link></li>
              <li><Link to="/our-team" className="text-gray-300 hover:text-white">Our Team</Link></li>
              <li><Link to="/blog" className="text-gray-300 hover:text-white">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal & Trust</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/privacy" className="text-gray-300 hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-white">Terms &amp; Conditions</Link></li>
              <li><Link to="/disclosure" className="text-gray-300 hover:text-white">Disclosure</Link></li>
              <li><Link to="/disclaimer" className="text-gray-300 hover:text-white">Disclaimer</Link></li>
              <li><Link to="/grievance" className="text-gray-300 hover:text-white">Grievance Redressal</Link></li>
              <li><Link to="/talk-to-expert" className="text-gray-300 hover:text-white">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-gray-800 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-300">
          <div>
            <h4 className="font-semibold text-white mb-2">Business Identity</h4>
            <p>FINGRANDZ BUSINESS SOLUTIONS</p>
            <p className="text-gray-400">UDYAM: UDYAM-TN-02-0203436</p>
            <p className="text-gray-400">No. 29, Dharamarajar Koil Street,<br />Saidapet, Chennai – 600015, Tamil Nadu, India</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">Reach us</h4>
            <p>📞 <a href="tel:+919176244465" className="hover:text-white">+91 9176244465</a></p>
            <p>✉️ <a href="mailto:reachus@indialoanhub.com" className="hover:text-white">reachus@indialoanhub.com</a></p>
            <p className="text-gray-400">Working hours: Mon – Sat, 10:00 AM – 7:00 PM IST</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">Grievance Officer</h4>
            <p>Grievance Officer, IndiaLoanHub</p>
            <p>✉️ <a href="mailto:grievance@indialoanhub.com" className="hover:text-white">grievance@indialoanhub.com</a></p>
            <p className="text-gray-400">Acknowledgement within 48 hours.</p>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-gray-800 md:flex md:items-center md:justify-between">
          <div className="text-sm text-gray-400">
            <p>&copy; 2026 FINGRANDZ BUSINESS SOLUTIONS. All rights reserved.</p>
            <p className="mt-1">IndiaLoanHub is a loan assistance and lead-generation platform. Not a direct lender.</p>
          </div>
          <div className="mt-4 md:mt-0 text-sm">
            <Link to="/terms" className="text-gray-400 hover:text-gray-300 mr-4">Terms</Link>
            <Link to="/privacy" className="text-gray-400 hover:text-gray-300 mr-4">Privacy</Link>
            <Link to="/grievance" className="text-gray-400 hover:text-gray-300">Grievance</Link>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;

