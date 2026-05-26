import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-8">
    <h2 className="text-xl font-semibold text-gray-900 mb-3">{title}</h2>
    <div className="text-gray-700 leading-relaxed space-y-3">{children}</div>
  </section>
);

const Disclosure = () => (
  <div className="min-h-screen flex flex-col bg-white">
    <Navbar />
    <main className="flex-grow max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Disclosure</h1>
      <p className="text-muted-foreground mb-8">Last updated: 26 May 2026</p>

      <Section title="About IndiaLoanHub">
        <p>
          IndiaLoanHub (the "Platform") is owned and operated by <strong>FINGRANDZ BUSINESS SOLUTIONS</strong>,
          having its registered office at No. 29, Dharamarajar Koil Street, Saidapet, Chennai – 600015, Tamil Nadu, India.
          UDYAM Registration: UDYAM-TN-02-0203436.
        </p>
      </Section>

      <Section title="Nature of services">
        <p>
          IndiaLoanHub is a <strong>loan assistance, comparison and lead-generation platform</strong>. We are <strong>not a bank, NBFC or direct lender</strong>.
          We do not sanction, approve, disburse or recover loans. The platform helps users discover, compare and apply for
          financial products offered by our partner banks, NBFCs and other lending institutions.
        </p>
      </Section>

      <Section title="Lender relationships">
        <p>
          We may have referral, distribution or commercial arrangements with partner lenders. When you submit an enquiry,
          we may share the information you provide with one or more such partners so they can evaluate your eligibility
          and contact you with their offers.
        </p>
      </Section>

      <Section title="No guarantee of approval">
        <p>
          Submission of an enquiry, lead form or application through IndiaLoanHub <strong>does not guarantee approval</strong> of any loan or credit product.
          The final decision regarding sanction, loan amount, interest rate, tenure, processing fees and other terms is taken solely by the
          partner lender based on its internal credit policy and your eligibility profile.
        </p>
      </Section>

      <Section title="Information accuracy">
        <p>
          Rates, fees, features and other product information shown on the Platform are indicative and sourced from publicly available
          information or our partner lenders. They are subject to change without notice. Please confirm the latest terms directly with the lender
          before making a borrowing decision.
        </p>
      </Section>
    </main>
    <Footer />
  </div>
);

export default Disclosure;
