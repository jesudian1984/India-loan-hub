
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

import Admin from "./pages/Admin";
import Apply from "./pages/Apply";
import Contact from "./pages/Contact";
import TalkToExpert from "./pages/TalkToExpert";
import AboutPage from "./pages/AboutPage";
import Careers from "./pages/Careers";
import Auth from "./pages/Auth";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Disclosure from "./pages/Disclosure";
import Disclaimer from "./pages/Disclaimer";
import GrievanceRedressal from "./pages/GrievanceRedressal";


// Loan type pages
import LoanTypePage from "./pages/LoanTypePage";
import BusinessLoans from "./pages/BusinessLoans";
import CompareLoans from "./pages/CompareLoans";
import BankComparison from "./pages/BankComparison";

// Credit card pages
import CreditCards from "./pages/CreditCards";
import CreditCardDetail from "./pages/CreditCardDetail";

// Import placeholder pages for new routes
import PlaceholderPage from "./pages/PlaceholderPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/eligibility" element={<Navigate to="/#enquiry" replace />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/compare" element={<Navigate to="/bank-comparison" />} />
          <Route path="/bank-comparison" element={<BankComparison />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/contact" element={<Navigate to="/talk-to-expert" />} />
          <Route path="/talk-to-expert" element={<TalkToExpert />} />
          
          {/* Loan type routes */}
          <Route path="/loans" element={<LoanTypePage title="All Loans" />} />
          <Route path="/loans/home" element={<LoanTypePage title="Home Loans" />} />
          <Route path="/loans/personal" element={<LoanTypePage title="Personal Loans" />} />
          <Route path="/loans/business" element={<BusinessLoans />} />
          <Route path="/loans/doctor" element={<LoanTypePage title="Doctor Loans" />} />
          <Route path="/loans/credit-cards" element={<Navigate to="/credit-cards" />} />
          
          {/* Credit card routes */}
          <Route path="/credit-cards" element={<CreditCards />} />
          <Route path="/credit-cards/:cardId" element={<CreditCardDetail />} />
          
          {/* New routes for About, Careers */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/our-team" element={<PlaceholderPage title="Our Team" />} />
          <Route path="/blog" element={<PlaceholderPage title="Blog" />} />
          <Route path="/help-center" element={<PlaceholderPage title="Help Center" />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/disclosure" element={<Disclosure />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/grievance" element={<GrievanceRedressal />} />

          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
