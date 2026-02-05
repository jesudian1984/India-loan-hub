
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: (
      <svg className="h-8 w-8 text-brandgreen-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Quick Eligibility Check",
    description: "Check if you're eligible for loans in minutes without affecting your credit score.",
  },
  {
    icon: (
      <svg className="h-8 w-8 text-brandgreen-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
    ),
    title: "Compare Multiple Offers",
    description: "Compare loan offers from various lenders to find the best rates and terms.",
  },
  {
    icon: (
      <svg className="h-8 w-8 text-brandgreen-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Streamlined Application",
    description: "Submit your application through our digital process and get connected with partner lenders.",
  },
  {
    icon: (
      <svg className="h-8 w-8 text-brandgreen-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: "Safe & Secure",
    description: "Your data is protected with bank-level security and encryption technology.",
  },
  {
    icon: (
      <svg className="h-8 w-8 text-brandgreen-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Quick Processing",
    description: "Partner lenders process applications quickly, with disbursement timelines depending on lender policies.",
  },
  {
    icon: (
      <svg className="h-8 w-8 text-brandgreen-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
      </svg>
    ),
    title: "Dedicated Support",
    description: "Our experts are available to guide you through the entire loan journey.",
  },
];

const Features = () => {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose IndiaLoanHub</h2>
          <p className="mt-4 text-lg text-gray-600">
            We make the loan process simple, fast, and transparent
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-t-4 border-brandblue-500">
              <CardContent className="pt-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">{feature.icon}</div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                    <p className="mt-2 text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
