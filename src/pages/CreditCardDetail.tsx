import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getCardById } from '@/data/hdfcCreditCards';
import { ArrowLeft, CreditCard, Gift, Plane, Fuel, Users, Check, IndianRupee, Globe } from 'lucide-react';

const CreditCardDetail = () => {
  const { cardId } = useParams();
  const card = getCardById(cardId || '');

  if (!card) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Card Not Found</h1>
          <Button asChild><Link to="/credit-cards">Back to Cards</Link></Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#004C8F] to-[#ED1C24] text-white py-12">
        <div className="container mx-auto px-4">
          <Link to="/credit-cards" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4">
            <ArrowLeft className="h-4 w-4" /> Back to all cards
          </Link>
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div>
              <Badge className="bg-white/20 text-white mb-2">{card.category}</Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{card.name}</h1>
              <p className="text-white/80">{card.targetSegment}</p>
            </div>
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardContent className="p-6 text-white">
                <p className="text-sm opacity-80">Annual Fee</p>
                <p className="text-2xl font-bold">{card.annualFee}</p>
                <p className="text-xs mt-2 opacity-70">Waiver: {card.renewalWaiver}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Rewards */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#004C8F]">
                  <Gift className="h-5 w-5" /> Rewards & Cashback
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {card.rewards.map((reward, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                      <span>{reward}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Lounge Access */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#004C8F]">
                  <Plane className="h-5 w-5" /> Lounge Access
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{card.loungeAccess}</p>
              </CardContent>
            </Card>

            {/* Fuel Waiver */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#004C8F]">
                  <Fuel className="h-5 w-5" /> Fuel Waiver
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{card.fuelWaiver}</p>
              </CardContent>
            </Card>

            {/* Eligibility */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#004C8F]">
                  <Users className="h-5 w-5" /> Income Eligibility
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground">Salaried</p>
                  <p className="font-medium">{card.eligibility.salaried}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Self Employed</p>
                  <p className="font-medium">{card.eligibility.selfEmployed}</p>
                </div>
              </CardContent>
            </Card>

            {/* Welcome Benefit */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#004C8F]">
                  <CreditCard className="h-5 w-5" /> Welcome Benefit
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{card.welcomeBenefit}</p>
              </CardContent>
            </Card>

            {/* Forex */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#004C8F]">
                  <Globe className="h-5 w-5" /> Forex Markup
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{card.forexMarkup}</p>
              </CardContent>
            </Card>
          </div>

          {/* Features */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-[#004C8F]">Key Features & Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid md:grid-cols-2 gap-3">
                {card.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Fee Details */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#004C8F]">
                <IndianRupee className="h-5 w-5" /> Pricing Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground">Annual/Joining Fee</p>
                  <p className="text-lg font-semibold text-[#004C8F]">{card.annualFee}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Renewal Fee</p>
                  <p className="text-lg font-semibold">{card.renewalFee}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Fee Waiver Criteria</p>
                  <p className="text-lg font-semibold">{card.renewalWaiver}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-6 bg-muted/50 border-t">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>T&C apply. Features subject to bank policy. Information sourced from HDFC Bank Credit Card Product Deck Dec'25.</p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CreditCardDetail;
