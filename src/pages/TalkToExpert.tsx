
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { PhoneCall, MessageSquare } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const TalkToExpert = () => {
  const handleCallExpert = (e) => {
    e.preventDefault();
    const phoneNumber = "9176244465";
    
    // Use the tel: protocol to initiate a phone call
    const telLink = `tel:${phoneNumber}`;
    
    // Create and click an anchor element to trigger the call
    const a = document.createElement('a');
    a.href = telLink;
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener noreferrer');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    // Show a toast notification
    toast({
      title: "Calling Loan Expert",
      description: `Connecting you with our loan expert at ${phoneNumber}`,
      duration: 5000, // Show toast for 5 seconds
    });
  };

  const handleWhatsAppChat = (e) => {
    e.preventDefault();
    const phoneNumber = "9176244465";
    const message = encodeURIComponent("Hi, I'm interested in learning more about IndiaLoanHub loans. Can you help me?");
    
    // Create WhatsApp URL with phone number and pre-filled message
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    
    // Show a toast notification
    toast({
      title: "WhatsApp Chat",
      description: "Opening WhatsApp chat with our loan expert",
      duration: 5000, // Show toast for 5 seconds
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-brandblue-600 to-brandblue-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-6">Talk to Our Loan Experts</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Get personalized assistance for all your loan needs. Our experts are just a call or message away.
            </p>
          </div>
        </div>
        
        {/* Contact Options */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Choose How You Want to Connect</h2>
              <p className="mt-4 text-lg text-gray-600">
                Our loan experts are available to help you with any questions or concerns
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Call Expert Card */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-8 text-center hover:scale-105 transition-transform duration-300">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-brandblue-100 mb-6">
                  <PhoneCall className="h-8 w-8 text-brandblue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Call an Expert</h3>
                <p className="text-gray-600 mb-6">
                  Speak directly with one of our loan experts who can guide you through our loan options and answer your specific questions.
                </p>
                <Button 
                  onClick={handleCallExpert}
                  className="bg-brandblue-600 hover:bg-brandblue-700 w-full text-lg py-6 flex items-center justify-center gap-2"
                >
                  <PhoneCall className="h-5 w-5" />
                  Call Now (91762 44465)
                </Button>
                <p className="mt-4 text-sm text-gray-500">Available Mon-Sat, 9AM to 6PM</p>
              </div>
              
              {/* WhatsApp Card */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-8 text-center hover:scale-105 transition-transform duration-300">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-6">
                  <MessageSquare className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Chat on WhatsApp</h3>
                <p className="text-gray-600 mb-6">
                  Connect with us on WhatsApp for quick responses to your queries and get loan information sent directly to your phone.
                </p>
                <Button 
                  onClick={handleWhatsAppChat}
                  className="bg-green-600 hover:bg-green-700 w-full text-lg py-6 flex items-center justify-center gap-2"
                >
                  <MessageSquare className="h-5 w-5" />
                  Chat on WhatsApp
                </Button>
                <p className="mt-4 text-sm text-gray-500">Typically replies within minutes</p>
              </div>
            </div>
            
            <div className="mt-16 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Connect With Our Experts?</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
                <div className="p-4">
                  <div className="h-12 w-12 rounded-full bg-brandblue-100 flex items-center justify-center mx-auto mb-4">
                    <span className="text-brandblue-600 font-bold">1</span>
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Personalized Advice</h4>
                  <p className="text-gray-600">Get loan options customized to your specific financial situation</p>
                </div>
                
                <div className="p-4">
                  <div className="h-12 w-12 rounded-full bg-brandblue-100 flex items-center justify-center mx-auto mb-4">
                    <span className="text-brandblue-600 font-bold">2</span>
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Quick Responses</h4>
                  <p className="text-gray-600">No more waiting for days - get answers to your questions instantly</p>
                </div>
                
                <div className="p-4">
                  <div className="h-12 w-12 rounded-full bg-brandblue-100 flex items-center justify-center mx-auto mb-4">
                    <span className="text-brandblue-600 font-bold">3</span>
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Expert Knowledge</h4>
                  <p className="text-gray-600">Our loan experts have years of experience in the financial industry</p>
                </div>
                
                <div className="p-4">
                  <div className="h-12 w-12 rounded-full bg-brandblue-100 flex items-center justify-center mx-auto mb-4">
                    <span className="text-brandblue-600 font-bold">4</span>
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Application Help</h4>
                  <p className="text-gray-600">Get assistance with filling out loan applications correctly</p>
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

export default TalkToExpert;
