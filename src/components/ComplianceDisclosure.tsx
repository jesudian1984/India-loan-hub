import { Info } from "lucide-react";
import { Link } from "react-router-dom";

const ComplianceDisclosure = ({ compact = false }: { compact?: boolean }) => {
  if (compact) {
    return (
      <p className="text-xs text-muted-foreground leading-relaxed">
        IndiaLoanHub is a loan assistance / lead-generation platform and not a direct lender.
        We may connect you with partner banks, NBFCs and lenders. Loan approval, interest rates and
        terms are at the sole discretion of the lender, based on their policies and your eligibility.
      </p>
    );
  }
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 sm:p-5 flex gap-3">
      <Info className="h-5 w-5 text-blue-700 flex-shrink-0 mt-0.5" />
      <div className="text-sm text-blue-900 leading-relaxed">
        <strong>Important disclosure: </strong>
        IndiaLoanHub is a loan assistance and lead-generation platform operated by FINGRANDZ BUSINESS SOLUTIONS.
        We are <strong>not a direct lender</strong>. We may share your enquiry with partner banks, NBFCs and
        lending institutions. Submission of any form on this site <strong>does not guarantee loan approval</strong>.
        Final loan amount, interest rate, processing fees and other terms depend on the lender's policy and your eligibility profile.
        Read our <Link to="/disclosure" className="underline">Disclosure</Link> and{" "}
        <Link to="/disclaimer" className="underline">Disclaimer</Link> for more details.
      </div>
    </div>
  );
};

export default ComplianceDisclosure;
