import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Clock, User } from "lucide-react";

const GrievanceRedressal = () => (
  <div className="min-h-screen flex flex-col bg-white">
    <Navbar />
    <main className="flex-grow max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Grievance Redressal</h1>
      <p className="text-muted-foreground mb-8">Last updated: 26 May 2026</p>

      <p className="text-gray-700 leading-relaxed mb-6">
        At IndiaLoanHub (operated by FINGRANDZ BUSINESS SOLUTIONS), we are committed to providing a transparent and
        responsive service. If you have any concern, complaint or feedback regarding our platform, please reach out
        using the channels below. We aim to acknowledge every grievance within <strong>48 hours</strong> and resolve it
        within <strong>15 working days</strong>.
      </p>

      <div className="rounded-xl border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Level 1 – Customer Support</h2>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> <a href="mailto:reachus@indialoanhub.com" className="underline">reachus@indialoanhub.com</a></li>
          <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> <a href="tel:+919176244465" className="underline">+91 9176244465</a></li>
          <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> Mon – Sat, 10:00 AM – 7:00 PM IST</li>
        </ul>
      </div>

      <div className="rounded-xl border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Level 2 – Grievance Officer</h2>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-center gap-2"><User className="h-4 w-4 text-primary" /> <strong>Grievance Officer, IndiaLoanHub</strong></li>
          <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> <a href="mailto:grievance@indialoanhub.com" className="underline">grievance@indialoanhub.com</a></li>
          <li className="flex items-start gap-2"><MapPin className="h-4 w-4 text-primary mt-1" /> FINGRANDZ BUSINESS SOLUTIONS, No. 29, Dharamarajar Koil Street, Saidapet, Chennai – 600015, Tamil Nadu, India</li>
        </ul>
        <p className="text-sm text-muted-foreground mt-4">
          Please include your name, registered mobile number, nature of complaint and any reference IDs while writing to us.
        </p>
      </div>

      <p className="text-sm text-muted-foreground">
        For complaints regarding a specific lender (e.g. loan sanction, interest, EMI, recovery), please raise the
        complaint directly with the lender first. If unresolved, you may also approach the relevant regulator such as the
        Reserve Bank of India through its Integrated Ombudsman Scheme.
      </p>
    </main>
    <Footer />
  </div>
);

export default GrievanceRedressal;
