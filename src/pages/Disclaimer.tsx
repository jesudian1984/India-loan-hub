import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-8">
    <h2 className="text-xl font-semibold text-gray-900 mb-3">{title}</h2>
    <div className="text-gray-700 leading-relaxed space-y-3">{children}</div>
  </section>
);

const Disclaimer = () => (
  <div className="min-h-screen flex flex-col bg-white">
    <Navbar />
    <main className="flex-grow max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Disclaimer</h1>
      <p className="text-muted-foreground mb-8">Last updated: 26 May 2026</p>

      <Section title="General">
        <p>
          The information provided on IndiaLoanHub (operated by FINGRANDZ BUSINESS SOLUTIONS) is for general informational
          purposes only. While we strive to keep the information current and correct, we make no representations or warranties
          of any kind, express or implied, about the completeness, accuracy, reliability or availability of the content on the website.
        </p>
      </Section>

      <Section title="Not financial advice">
        <p>
          Nothing on this website constitutes financial, legal or tax advice. Users are advised to consult qualified professionals
          before making any borrowing or financial decisions.
        </p>
      </Section>

      <Section title="Lender-approval disclaimer">
        <p>
          IndiaLoanHub does not approve loans. All loan applications are subject to the credit and underwriting policies of our
          partner lenders. Loan approval, sanctioned amount, interest rate, processing fees, prepayment charges and other terms
          are at the sole discretion of the partner lender, based on the applicant's profile, documentation and eligibility.
        </p>
      </Section>

      <Section title="No guarantees">
        <p>
          We do not guarantee any specific outcome including, but not limited to, approval of a loan, sanction within a particular
          timeframe, or specific interest rates or charges. Any indicative figures shown on calculators or product pages are estimates
          for illustration only.
        </p>
      </Section>

      <Section title="Third-party links">
        <p>
          Our website may contain links to third-party websites. We are not responsible for the content, accuracy or practices of
          those external sites.
        </p>
      </Section>
    </main>
    <Footer />
  </div>
);

export default Disclaimer;
