
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import bankComparisonData, { BankLoanData } from "@/utils/bankComparisonData";

const BankComparison = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loanType, setLoanType] = useState<"personalLoan" | "homeLoan" | "businessLoan">("personalLoan");

  // Filter banks based on search term
  const filteredBanks = bankComparisonData.filter(bank => 
    bank.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bank.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (bank.category && bank.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Get feature label based on key
  const getFeatureLabel = (key: string): string => {
    const labels: Record<string, string> = {
      interestRate: "Interest Rate",
      processingFee: "Processing Fee",
      maxLoanAmount: "Maximum Loan Amount",
      maxTenure: "Maximum Tenure",
      prepaymentPenalty: "Prepayment Penalty",
      eligibilityCriteria: "Eligibility Criteria",
      turnaroundTime: "Turnaround Time",
      specialFeatures: "Special Features"
    };
    return labels[key] || key;
  };

  // Get loan type label
  const getLoanTypeLabel = (): string => {
    switch(loanType) {
      case "personalLoan": return "Personal Loans";
      case "homeLoan": return "Home Loans";
      case "businessLoan": return "Business Loans";
      default: return "Loans";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-brandblue-600 to-brandblue-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-6">Compare Banks & NBFCs</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Find the best loan offerings across major banks and NBFCs in India. Compare rates, features, and eligibility criteria.
            </p>
          </div>
        </div>
        
        {/* Comparison Section */}
        <div className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Loan Comparison Tool</h2>
              <p className="text-lg text-gray-600 mb-8">
                Compare loan products from HDFC Bank, ICICI Bank, Axis Bank, IndusInd Bank, Bandhan Bank, 
                Bajaj Finance, Axis Finance, Muthoot Finance, Yes Bank, L&T Finance, IDFC First Bank and more.
              </p>
              
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <Input
                  type="text"
                  placeholder="Search by bank name, type or category..."
                  className="max-w-md"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Tabs defaultValue="personalLoan" onValueChange={(value) => setLoanType(value as any)} className="w-full">
                <TabsList className="grid grid-cols-3 mb-8">
                  <TabsTrigger value="personalLoan">Personal Loans</TabsTrigger>
                  <TabsTrigger value="homeLoan">Home Loans</TabsTrigger>
                  <TabsTrigger value="businessLoan">Business Loans</TabsTrigger>
                </TabsList>
                
                {["personalLoan", "homeLoan", "businessLoan"].map((type) => (
                  <TabsContent key={type} value={type} className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-2xl">{getLoanTypeLabel()} Comparison</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="overflow-auto">
                          <Table className="min-w-[800px]">
                            <TableHeader>
                              <TableRow>
                                <TableHead className="w-[200px] font-bold">Bank / NBFC</TableHead>
                                <TableHead className="font-bold">Interest Rate</TableHead>
                                <TableHead className="font-bold">Processing Fee</TableHead>
                                <TableHead className="font-bold">Max Amount</TableHead>
                                <TableHead className="font-bold">Max Tenure</TableHead>
                                <TableHead className="font-bold">Prepayment Penalty</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {filteredBanks.map((bank) => (
                                <TableRow key={bank.id}>
                                  <TableCell className="font-medium">
                                    <div>
                                      <div className="font-bold">{bank.name}</div>
                                      <div className="text-xs text-gray-500">{bank.type} {bank.category ? `• ${bank.category}` : ''}</div>
                                    </div>
                                  </TableCell>
                                  <TableCell>{bank[loanType] && bank[loanType].interestRate || "N/A"}</TableCell>
                                  <TableCell>{bank[loanType] && bank[loanType].processingFee || "N/A"}</TableCell>
                                  <TableCell>{bank[loanType] && bank[loanType].maxLoanAmount || "N/A"}</TableCell>
                                  <TableCell>{bank[loanType] && bank[loanType].maxTenure || "N/A"}</TableCell>
                                  <TableCell>{bank[loanType] && bank[loanType].prepaymentPenalty || "N/A"}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredBanks.map((bank) => (
                        <Card key={bank.id} className="overflow-hidden">
                          <CardHeader className="bg-gray-50">
                            <CardTitle className="flex items-center justify-between">
                              <div>
                                <div>{bank.name}</div>
                                <div className="text-xs text-gray-500 font-normal mt-1">{bank.type} {bank.category ? `• ${bank.category}` : ''}</div>
                              </div>
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-6">
                            <div className="space-y-4 text-sm">
                              <div>
                                <div className="font-semibold text-gray-700">Eligibility Criteria</div>
                                <div className="mt-1">{bank[loanType] && bank[loanType].eligibilityCriteria || "N/A"}</div>
                              </div>
                              
                              <div>
                                <div className="font-semibold text-gray-700">Turnaround Time</div>
                                <div className="mt-1">{bank[loanType] && bank[loanType].turnaroundTime || "N/A"}</div>
                              </div>
                              
                              <div>
                                <div className="font-semibold text-gray-700">Special Features</div>
                                <ul className="mt-1 list-disc pl-4">
                                  {bank[loanType] && bank[loanType].specialFeatures ? 
                                    bank[loanType].specialFeatures.map((feature, index) => (
                                      <li key={index}>{feature}</li>
                                    )) 
                                    : "N/A"}
                                </ul>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
            
            <div className="mt-12 bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Understanding Loan Comparison Factors</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Interest Rate</h4>
                  <p className="text-gray-600">Interest rates are the cost of borrowing expressed as a percentage of the loan amount. Lower rates save you money over the life of the loan. Banks typically offer lower rates than NBFCs.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Processing Fee</h4>
                  <p className="text-gray-600">A one-time fee charged by lenders to process your loan application, typically calculated as a percentage of the loan amount with a cap in many cases.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Prepayment Penalty</h4>
                  <p className="text-gray-600">A charge applied when you repay your loan before the end of the term. RBI regulations prohibit floating-rate home loan prepayment penalties, but other loan types may have them.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Turnaround Time</h4>
                  <p className="text-gray-600">The time taken from application to disbursal. NBFCs often process loans faster than banks but may charge higher interest rates for the convenience.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BankComparison;
