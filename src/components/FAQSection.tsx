import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "Is IndiaLoanHub a bank or a lender?",
    a: "No. IndiaLoanHub is a loan assistance and lead-generation platform operated by FINGRANDZ BUSINESS SOLUTIONS. We help you compare and connect with partner banks, NBFCs and lending institutions. We do not sanction or disburse loans ourselves.",
  },
  {
    q: "Does submitting the form guarantee my loan approval?",
    a: "No. Submitting an enquiry only initiates a review. Final approval, loan amount, interest rate and processing fees are decided solely by the partner lender based on their policies and your profile.",
  },
  {
    q: "What information do you ask for at the first step?",
    a: "Only the basics: name, mobile, city, loan type, monthly income and employment type. We do not ask for sensitive documents like PAN, Aadhaar or bank statements at the enquiry stage.",
  },
  {
    q: "Are there any charges for using IndiaLoanHub?",
    a: "Checking eligibility and submitting an enquiry through IndiaLoanHub is free. Lenders may charge their own processing fees, GST and other charges if your loan is approved and disbursed.",
  },
  {
    q: "How is my data protected?",
    a: "Your details are transmitted over encrypted connections and shared only with relevant partner lenders for the purpose of processing your enquiry. Please review our Privacy Policy for full details.",
  },
  {
    q: "How can I raise a complaint?",
    a: "You can write to reachus@indialoanhub.com or contact our Grievance Officer using the details on our Grievance Redressal page. We aim to acknowledge complaints within 48 hours.",
  },
];

const FAQSection = () => (
  <section className="py-16 bg-white">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Frequently Asked Questions</h2>
        <p className="mt-3 text-muted-foreground">Clear answers about how IndiaLoanHub works.</p>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger className="text-left text-base font-semibold">{f.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQSection;
