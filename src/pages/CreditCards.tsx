import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductsPoster from '@/components/ProductsPoster';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { hdfcCreditCards, cardCategories, getCardsByCategory, CreditCard } from '@/data/hdfcCreditCards';
import { Search, CreditCard as CreditCardIcon, Plane, Fuel, Gift, Users, Check, X, Filter } from 'lucide-react';

// Card thumbnail colors based on category
const getCategoryColor = (category: string): string => {
  switch (category) {
    case 'Super Premium': return 'from-gray-800 to-gray-900';
    case 'Diners Club': return 'from-[#004C8F] to-[#002D54]';
    case 'Co-Branded': return 'from-orange-600 to-orange-800';
    case 'Business': return 'from-slate-700 to-slate-900';
    case 'Virtual': return 'from-cyan-600 to-cyan-800';
    default: return 'from-blue-600 to-blue-800';
  }
};

// Helper to parse fee string to number
const parseFee = (feeStr: string): number => {
  if (feeStr.toLowerCase().includes('nil') || feeStr.toLowerCase().includes('lifetime free')) return 0;
  const match = feeStr.replace(/,/g, '').match(/₹?([\d.]+)/);
  return match ? parseFloat(match[1]) : 0;
};

// Helper to parse income string to number
const parseIncome = (incomeStr: string): number => {
  if (!incomeStr || incomeStr === 'As per bank terms') return 0;
  const normalized = incomeStr.replace(/,/g, '').toLowerCase();
  const match = normalized.match(/([\d.]+)\s*(l|lakh|lac|k)?/);
  if (!match) return 0;
  let value = parseFloat(match[1]);
  if (match[2] === 'l' || match[2] === 'lakh' || match[2] === 'lac') value *= 100000;
  else if (match[2] === 'k') value *= 1000;
  return value;
};

const CreditCards = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [compareCards, setCompareCards] = useState<string[]>([]);
  const [feeFilter, setFeeFilter] = useState('all');
  const [incomeFilter, setIncomeFilter] = useState('all');

  const filteredCards = useMemo(() => {
    let cards = getCardsByCategory(selectedCategory).filter(card =>
      card.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Apply fee filter
    if (feeFilter !== 'all') {
      cards = cards.filter(card => {
        const fee = parseFee(card.annualFee);
        switch (feeFilter) {
          case 'free': return fee === 0;
          case 'under1k': return fee > 0 && fee < 1000;
          case '1k-5k': return fee >= 1000 && fee <= 5000;
          case 'above5k': return fee > 5000;
          default: return true;
        }
      });
    }

    // Apply income filter
    if (incomeFilter !== 'all') {
      cards = cards.filter(card => {
        const income = parseIncome(card.eligibility.salaried);
        switch (incomeFilter) {
          case 'under25k': return income > 0 && income < 25000;
          case '25k-50k': return income >= 25000 && income <= 50000;
          case '50k-1l': return income > 50000 && income <= 100000;
          case 'above1l': return income > 100000;
          default: return true;
        }
      });
    }

    return cards;
  }, [selectedCategory, searchTerm, feeFilter, incomeFilter]);

  const toggleCompare = (cardId: string) => {
    if (compareCards.includes(cardId)) {
      setCompareCards(compareCards.filter(id => id !== cardId));
    } else if (compareCards.length < 3) {
      setCompareCards([...compareCards, cardId]);
    }
  };

  const getComparedCards = (): CreditCard[] => {
    return compareCards.map(id => hdfcCreditCards.find(c => c.id === id)!).filter(Boolean);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFeeFilter('all');
    setIncomeFilter('all');
  };

  const hasActiveFilters = feeFilter !== 'all' || incomeFilter !== 'all' || searchTerm !== '';

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Products Poster Section */}
      <ProductsPoster />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#004C8F] to-[#ED1C24] text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">HDFC Bank Credit Cards</h1>
          <p className="text-xl opacity-90 max-w-2xl">
            Compare and choose from our range of credit cards designed for every lifestyle and need.
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-card border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-4">
            {/* Top row: Search and Compare */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search credit cards..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              {compareCards.length > 0 && (
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{compareCards.length}/3 cards selected</Badge>
                  <Button asChild size="sm" className="bg-[#ED1C24] hover:bg-[#c41920]">
                    <a href="#compare-section">Compare Now</a>
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setCompareCards([])}>
                    Clear
                  </Button>
                </div>
              )}
            </div>

            {/* Filter row */}
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Filter className="h-4 w-4" />
                <span>Filters:</span>
              </div>
              
              <Select value={feeFilter} onValueChange={setFeeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Annual Fee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Fees</SelectItem>
                  <SelectItem value="free">Lifetime Free / Nil</SelectItem>
                  <SelectItem value="under1k">Under ₹1,000</SelectItem>
                  <SelectItem value="1k-5k">₹1,000 - ₹5,000</SelectItem>
                  <SelectItem value="above5k">Above ₹5,000</SelectItem>
                </SelectContent>
              </Select>

              <Select value={incomeFilter} onValueChange={setIncomeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Min. Income" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Income Levels</SelectItem>
                  <SelectItem value="under25k">Under ₹25,000/month</SelectItem>
                  <SelectItem value="25k-50k">₹25,000 - ₹50,000</SelectItem>
                  <SelectItem value="50k-1l">₹50,000 - ₹1 Lakh</SelectItem>
                  <SelectItem value="above1l">Above ₹1 Lakh</SelectItem>
                </SelectContent>
              </Select>

              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground">
                  Clear filters
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="flex flex-wrap h-auto gap-2 bg-transparent">
              {cardCategories.map(cat => (
                <TabsTrigger
                  key={cat.id}
                  value={cat.id}
                  className="data-[state=active]:bg-[#004C8F] data-[state=active]:text-white"
                >
                  {cat.name}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={selectedCategory} className="mt-8">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="w-12">Compare</TableHead>
                      <TableHead className="w-20">Card</TableHead>
                      <TableHead>Card Name</TableHead>
                      <TableHead>Annual Fee</TableHead>
                      <TableHead>Key Rewards</TableHead>
                      <TableHead>Lounge Access</TableHead>
                      <TableHead>Fuel Waiver</TableHead>
                      <TableHead>Min. Income (Salaried)</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCards.map(card => (
                      <TableRow key={card.id} className="hover:bg-muted/30">
                        <TableCell>
                          <input
                            type="checkbox"
                            checked={compareCards.includes(card.id)}
                            onChange={() => toggleCompare(card.id)}
                            disabled={!compareCards.includes(card.id) && compareCards.length >= 3}
                            className="h-4 w-4 accent-[#ED1C24]"
                          />
                        </TableCell>
                        <TableCell>
                          {/* Card Thumbnail */}
                          <div className={`w-14 h-9 rounded-md bg-gradient-to-br ${getCategoryColor(card.category)} flex items-center justify-center shadow-md`}>
                            <CreditCardIcon className="h-4 w-4 text-white/90" />
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          <div>
                            <p className="font-semibold text-foreground">{card.name}</p>
                            <Badge variant="outline" className="mt-1 text-xs">{card.category}</Badge>
                          </div>
                        </TableCell>
                        <TableCell className="text-[#004C8F] font-semibold">{card.annualFee}</TableCell>
                        <TableCell className="max-w-xs">
                          <p className="text-sm text-muted-foreground line-clamp-2">{card.rewards[0]}</p>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Plane className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{card.loungeAccess.includes('Unlimited') ? 'Unlimited' : card.loungeAccess.includes('per') ? card.loungeAccess.split(' ')[0] : 'Limited'}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Fuel className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{card.fuelWaiver.includes('1%') ? '1% waiver' : 'As per terms'}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">{card.eligibility.salaried}</TableCell>
                        <TableCell>
                          <Button asChild size="sm" variant="outline" className="border-[#004C8F] text-[#004C8F] hover:bg-[#004C8F] hover:text-white">
                            <Link to={`/credit-cards/${card.id}`}>View Details</Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {filteredCards.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  No cards found matching your search.
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Comparison Section */}
      {compareCards.length >= 2 && (
        <section id="compare-section" className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 text-center">Card Comparison</h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-48">Feature</TableHead>
                    {getComparedCards().map(card => (
                      <TableHead key={card.id} className="text-center min-w-[200px]">
                        <div className="flex flex-col items-center gap-2">
                          <div className={`w-16 h-10 rounded-md bg-gradient-to-br ${getCategoryColor(card.category)} flex items-center justify-center shadow-md`}>
                            <CreditCardIcon className="h-5 w-5 text-white/90" />
                          </div>
                          <p className="font-semibold">{card.name.replace('HDFC Bank ', '')}</p>
                        </div>
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Annual Fee</TableCell>
                    {getComparedCards().map(card => (
                      <TableCell key={card.id} className="text-center text-[#004C8F] font-semibold">{card.annualFee}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Key Reward</TableCell>
                    {getComparedCards().map(card => (
                      <TableCell key={card.id} className="text-center text-sm">{card.rewards[0]}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Lounge Access</TableCell>
                    {getComparedCards().map(card => (
                      <TableCell key={card.id} className="text-center text-sm">{card.loungeAccess}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Fuel Waiver</TableCell>
                    {getComparedCards().map(card => (
                      <TableCell key={card.id} className="text-center text-sm">{card.fuelWaiver}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Income (Salaried)</TableCell>
                    {getComparedCards().map(card => (
                      <TableCell key={card.id} className="text-center text-sm">{card.eligibility.salaried}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Income (Self-Employed)</TableCell>
                    {getComparedCards().map(card => (
                      <TableCell key={card.id} className="text-center text-sm">{card.eligibility.selfEmployed}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Welcome Benefit</TableCell>
                    {getComparedCards().map(card => (
                      <TableCell key={card.id} className="text-center text-sm">{card.welcomeBenefit}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Forex Markup</TableCell>
                    {getComparedCards().map(card => (
                      <TableCell key={card.id} className="text-center text-sm">{card.forexMarkup}</TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </section>
      )}

      {/* Footer Disclaimer */}
      <section className="py-6 bg-muted/50 border-t">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>T&C apply. Features subject to bank policy. Information sourced from HDFC Bank Credit Card Product Deck Dec'25.</p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CreditCards;
