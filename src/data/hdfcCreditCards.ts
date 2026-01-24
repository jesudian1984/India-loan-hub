// HDFC Bank Credit Card Data - Sourced from CC Products Features Consolidated Deck Dec'25

export interface CreditCard {
  id: string;
  name: string;
  category: 'Classic' | 'Super Premium' | 'Diners Club' | 'Co-Branded' | 'Business' | 'Virtual';
  annualFee: string;
  renewalFee: string;
  renewalWaiver: string;
  rewards: string[];
  loungeAccess: string;
  fuelWaiver: string;
  eligibility: {
    salaried: string;
    selfEmployed: string;
  };
  targetSegment: string;
  features: string[];
  welcomeBenefit: string;
  forexMarkup: string;
}

export const hdfcCreditCards: CreditCard[] = [
  // CLASSIC CARDS
  {
    id: 'freedom',
    name: 'HDFC Bank Freedom Credit Card',
    category: 'Classic',
    annualFee: '₹500 + Taxes',
    renewalFee: '₹500 + Taxes',
    renewalWaiver: 'Annual spends of ₹50,000',
    rewards: [
      '10X CashPoints on Big Basket, BookMyShow, OYO, Swiggy & Uber (max 2,500 CashPoints/month)',
      '1 CashPoint per ₹150 spent on other spends'
    ],
    loungeAccess: 'As per bank terms',
    fuelWaiver: '1% surcharge waiver (Min ₹400, Max ₹5,000 txn, Max waiver ₹250/statement cycle)',
    eligibility: {
      salaried: '₹12,000 per month',
      selfEmployed: '₹6 Lacs ITR p.a.'
    },
    targetSegment: 'Low to Middle income segment',
    features: [
      '10% additional discount on Swiggy Dineout using code HDFCCARDS',
      'Welcome & Renewal benefit of 500 Cash Points on fee payment'
    ],
    welcomeBenefit: '500 Cash Points on fee payment',
    forexMarkup: 'As per bank terms'
  },
  {
    id: 'moneyback-plus',
    name: 'HDFC Bank MoneyBack+ Credit Card',
    category: 'Classic',
    annualFee: '₹500 + Taxes',
    renewalFee: '₹500 + Taxes',
    renewalWaiver: 'Annual spends of ₹50,000',
    rewards: [
      '10X CashPoints (3.3% Valueback) on Amazon, Flipkart, Swiggy & more (up to 2,500 CashPoints/month)',
      '2 CashPoints per ₹150 spent on other spends',
      '₹500 gift vouchers on spends of ₹50,000+ each calendar quarter'
    ],
    loungeAccess: 'As per bank terms',
    fuelWaiver: '1% surcharge waiver (Min ₹400, Max ₹5,000 txn, Max waiver ₹250/statement cycle)',
    eligibility: {
      salaried: '₹20,000 per month',
      selfEmployed: '₹6 Lacs ITR p.a.'
    },
    targetSegment: 'Low to Middle income segment',
    features: [
      '10% additional discount on Swiggy Dineout using code HDFCCARDS',
      'Welcome & Renewal benefit of 500 Cash Points on fee payment'
    ],
    welcomeBenefit: '500 Cash Points on fee payment',
    forexMarkup: 'As per bank terms'
  },
  {
    id: 'millennia',
    name: 'HDFC Bank Millennia Credit Card',
    category: 'Classic',
    annualFee: '₹1,000',
    renewalFee: '₹1,000',
    renewalWaiver: 'Annual spends of ₹1,00,000',
    rewards: [
      '5% Cashback on Amazon, Flipkart, Myntra, Swiggy, Zomato & more (up to 1,000 Cashpoints/month)',
      '1% cashback on other spends (up to 1,000 Cashpoints/month)',
      '₹1,000 gift vouchers on spends of ₹1,00,000+ each calendar quarter'
    ],
    loungeAccess: 'As per bank terms',
    fuelWaiver: '1% surcharge waiver (Min ₹400, Max ₹5,000 txn, Max waiver ₹250/statement cycle)',
    eligibility: {
      salaried: '₹35,000 per month',
      selfEmployed: '₹6 Lacs ITR p.a.'
    },
    targetSegment: 'Middle to high income segment',
    features: [
      '10% additional discount on Swiggy Dineout using code HDFCCARDS',
      'Welcome Reward Points of 1,000 on joining fee realization'
    ],
    welcomeBenefit: '1,000 Reward Points on joining fee realization',
    forexMarkup: 'As per bank terms'
  },
  {
    id: 'regalia-gold',
    name: 'HDFC Bank Regalia Gold Credit Card',
    category: 'Classic',
    annualFee: '₹2,500',
    renewalFee: '₹2,500',
    renewalWaiver: 'Annual spends of ₹4,00,000',
    rewards: [
      '4 RP per ₹150 spent',
      '5X Reward Points on Marks & Spencer, Myntra, Nykaa & Reliance Digital',
      'Up to 10X Reward Points on MMT, Flight & stays via SmartBuy',
      '₹1,500 vouchers on quarterly spends of ₹1.5 lakh',
      '₹5,000 flight vouchers on annual spends of ₹5 lakh + additional ₹5,000 on ₹7.5 lakhs'
    ],
    loungeAccess: '12 domestic + 6 international (via Priority Pass) per year',
    fuelWaiver: 'As per bank terms',
    eligibility: {
      salaried: '₹1,50,000 per month',
      selfEmployed: '₹18 Lacs ITR p.a.'
    },
    targetSegment: 'Middle to high income segment',
    features: [
      'Complimentary Swiggy One membership as Welcome benefit',
      'MMT Black Gold membership as Welcome benefit',
      'Access to 1000+ airport lounges globally'
    ],
    welcomeBenefit: 'Complimentary Swiggy One & MMT Black Gold membership',
    forexMarkup: '2% on International transactions'
  },

  // SUPER PREMIUM CARDS
  {
    id: 'infinia-metal',
    name: 'HDFC Bank Infinia Metal Credit Card',
    category: 'Super Premium',
    annualFee: '₹12,500',
    renewalFee: '₹12,500',
    renewalWaiver: 'As per bank terms',
    rewards: [
      '5 RP per ₹150 spent',
      'Redeem RPs against Apple products, Tanishq vouchers & 14+ airmiles partners at up to 1:1 conversion'
    ],
    loungeAccess: 'Unlimited complimentary access globally',
    fuelWaiver: 'As per bank terms',
    eligibility: {
      salaried: '₹5,00,000+ per month',
      selfEmployed: '₹60 Lacs+ ITR p.a.'
    },
    targetSegment: 'HNI',
    features: [
      'Complimentary Club Marriott membership for first year',
      'Book 3 nights pay for 2 at participating ITC Hotels',
      '1+1 complimentary buffet at participating ITC Hotels',
      'Global Personal Concierge - 24x7',
      'Unlimited complimentary golf games'
    ],
    welcomeBenefit: 'Complimentary Club Marriott membership',
    forexMarkup: 'As per bank terms'
  },

  // DINERS CLUB CARDS
  {
    id: 'diners-privilege',
    name: 'HDFC Bank Diners Club Privilege Credit Card',
    category: 'Diners Club',
    annualFee: '₹1,000 + GST',
    renewalFee: '₹1,000',
    renewalWaiver: 'Annual spends of ₹3 lacs',
    rewards: [
      '4 RP per ₹150 spent',
      '5X Reward Points on Swiggy and Zomato',
      'Up to 10X Rewards on flight tickets & stays via SmartBuy',
      '₹1,500 worth vouchers on quarterly spends of ₹1.5 lakh'
    ],
    loungeAccess: '2 complimentary airport lounge access every calendar quarter worldwide',
    fuelWaiver: 'As per bank terms',
    eligibility: {
      salaried: '₹35,000 per month',
      selfEmployed: '₹6 Lacs ITR p.a.'
    },
    targetSegment: 'Middle to High income segment',
    features: [
      'Complimentary Swiggy One & Times Prime as Welcome Benefit',
      'Buy 1 Get 1 Free on movie/non-movie weekend tickets via BookMyShow',
      'Redeem 1RP = ₹0.5 on travel portal, Catalogue 1RP = ₹0.35, Airmiles 1RP = 0.5 Mile'
    ],
    welcomeBenefit: 'Complimentary Swiggy One & Times Prime annual memberships',
    forexMarkup: '3.5% on international spends'
  },
  {
    id: 'diners-black-metal',
    name: 'HDFC Bank Diners Club Black Metal Credit Card',
    category: 'Diners Club',
    annualFee: '₹10,000',
    renewalFee: '₹10,000',
    renewalWaiver: 'Annual spends of ₹8 lacs',
    rewards: [
      '5 RP per ₹150 spent',
      'Up to 10X Reward Points via SmartBuy & 2X on weekend dining',
      '10,000 Bonus Reward Points on spends of ₹4L every calendar quarter'
    ],
    loungeAccess: 'Unlimited for Primary and Add-on card holder',
    fuelWaiver: 'As per bank terms',
    eligibility: {
      salaried: '₹2.5 lac per month',
      selfEmployed: '₹30 Lacs ITR p.a.'
    },
    targetSegment: 'High income segment',
    features: [
      'Complimentary Club Marriott, Amazon Prime, Swiggy One as Welcome Benefit',
      'Complimentary Golf games (6 per quarter)',
      '24/7 Concierge Services',
      '1RP = ₹1 on travel portal, Catalogue 1RP = ₹0.50, Airmiles 1RP = 1 Mile'
    ],
    welcomeBenefit: 'Complimentary Club Marriott, Amazon Prime & Swiggy One memberships',
    forexMarkup: '2% on international spends'
  },

  // CO-BRANDED CARDS
  {
    id: 'marriott-bonvoy',
    name: 'Marriott Bonvoy HDFC Bank Credit Card',
    category: 'Co-Branded',
    annualFee: '₹3,000 + Taxes',
    renewalFee: '₹3,000 + Taxes',
    renewalWaiver: 'As per bank terms',
    rewards: [
      '8 MB Points per ₹150 at Marriott Bonvoy hotels (capped at ₹10,00,000/month)',
      '4 MB Points per ₹150 on Travel, Dining & Entertainment (capped at ₹5,00,000/month)',
      '2 MB Points per ₹150 on other purchases'
    ],
    loungeAccess: '12 Domestic + 12 International per year',
    fuelWaiver: 'As per bank terms',
    eligibility: {
      salaried: '₹1,00,000 per month',
      selfEmployed: '₹15 Lacs ITR p.a.'
    },
    targetSegment: 'Middle to high income segment',
    features: [
      'Marriott Bonvoy Silver Elite Status on approval',
      '1 Free Night Stay + 10 Elite Night Credits on 1st spend/fee levy',
      'Up to 3 Additional Free Night Stays on annual spends of ₹6, 9 & 15 lacs',
      '8 Golf games & lessons (2 per quarter)'
    ],
    welcomeBenefit: 'Marriott Bonvoy Silver Elite Status + 1 Free Night Stay',
    forexMarkup: 'As per bank terms'
  },
  {
    id: 'swiggy',
    name: 'Swiggy HDFC Bank Credit Card',
    category: 'Co-Branded',
    annualFee: '₹500 + Taxes',
    renewalFee: '₹500 + Taxes',
    renewalWaiver: 'As per bank terms',
    rewards: [
      '10% Cashback on Swiggy (Food, Instamart, Genie & Dineout) - capped at ₹1,500/billing cycle',
      '5% Cashback on online spends (Apparels, Electronics, Dept. Stores, etc.) - capped at ₹1,500/billing cycle',
      '1% Cashback on offline spends - capped at ₹500/billing cycle'
    ],
    loungeAccess: 'As per bank terms',
    fuelWaiver: 'As per bank terms',
    eligibility: {
      salaried: '₹15,000 per month',
      selfEmployed: '₹6 lakh p.a.'
    },
    targetSegment: 'Middle to high income segment',
    features: [
      'Complimentary Swiggy One Membership for 3 months as Welcome benefit',
      'Cashback redeemable as statement credit',
      'Minimum transaction size ₹100 for cashback'
    ],
    welcomeBenefit: 'Complimentary Swiggy One Membership for 3 months',
    forexMarkup: 'As per bank terms'
  },
  {
    id: 'indianoil',
    name: 'IndianOil HDFC Bank Credit Card',
    category: 'Co-Branded',
    annualFee: '₹500 + Taxes',
    renewalFee: '₹500 + Taxes',
    renewalWaiver: 'Annual spends of ₹50,000',
    rewards: [
      '5% fuel points at IndianOil outlets (250 pts/month for first 6 months, 150 pts/month after)',
      '5% fuel points on Groceries & Bill Payments (100 pts/month each)',
      '1 Fuel Point per ₹150 on other purchases'
    ],
    loungeAccess: 'As per bank terms',
    fuelWaiver: '1% surcharge waiver up to ₹250/statement (Min txn ₹400)',
    eligibility: {
      salaried: '₹12,000 per month',
      selfEmployed: '₹6 Lacs ITR p.a.'
    },
    targetSegment: 'Low to Middle income segment',
    features: [
      '1 Fuel Point = ₹0.96 value',
      '₹250 Gift Voucher on 1 transaction within first 37 days'
    ],
    welcomeBenefit: '₹250 Gift Voucher on 1st transaction',
    forexMarkup: 'As per bank terms'
  },
  {
    id: 'tata-neu-plus',
    name: 'Tata Neu Plus HDFC Bank Credit Card',
    category: 'Co-Branded',
    annualFee: '₹499 + Taxes',
    renewalFee: '₹499 + Taxes',
    renewalWaiver: 'Annual spends of ₹1,00,000+',
    rewards: [
      '2% back as NeuCoins on Non-EMI Spends on partner Tata Brands',
      '1% back as NeuCoins on Non-Tata Brand Spends',
      'Up to 1% back as NeuCoins on eligible UPI spends'
    ],
    loungeAccess: '4 Domestic per calendar year (1 per quarter) - ₹50,000 quarterly spend required from Jun\'25',
    fuelWaiver: '1% surcharge waiver (Min ₹400, Max ₹5,000 txn, Max waiver ₹250/statement cycle)',
    eligibility: {
      salaried: '₹25,000 per month',
      selfEmployed: '₹6 Lacs ITR p.a.'
    },
    targetSegment: 'Low to mid income segment',
    features: [
      'Additional 5% NeuCoins on Tata Neu App/Website with NeuPass registration',
      'Partner Tata brands: Westside, Tata 1mg, bigbasket, Air India, Taj, Tata CLiQ, Tanishq, Titan'
    ],
    welcomeBenefit: 'As per bank terms',
    forexMarkup: 'As per bank terms'
  },
  {
    id: 'tata-neu-infinity',
    name: 'Tata Neu Infinity HDFC Bank Credit Card',
    category: 'Co-Branded',
    annualFee: '₹1,499 + Taxes',
    renewalFee: '₹1,499 + Taxes',
    renewalWaiver: 'Annual spends of ₹3,00,000+',
    rewards: [
      '5% back as NeuCoins on Non-EMI Spends on partner Tata Brands',
      '1.5% back as NeuCoins on Non-Tata Brand Spends',
      'Up to 1.5% back as NeuCoins on eligible UPI spends'
    ],
    loungeAccess: '8 Domestic + 4 International per year',
    fuelWaiver: '1% surcharge waiver (Min ₹400, Max ₹5,000 txn, Max waiver ₹500/statement cycle)',
    eligibility: {
      salaried: '₹1 Lakh per month',
      selfEmployed: '₹12 Lacs ITR p.a.'
    },
    targetSegment: 'Mid to high income segment',
    features: [
      'Additional 5% NeuCoins on Tata Neu App/Website with NeuPass registration',
      'Max 500 NeuCoins per calendar month on UPI'
    ],
    welcomeBenefit: 'As per bank terms',
    forexMarkup: 'As per bank terms'
  },
  {
    id: 'paytm-digital',
    name: 'Paytm HDFC Bank Digital Credit Card',
    category: 'Co-Branded',
    annualFee: '₹149',
    renewalFee: '₹149',
    renewalWaiver: 'First year waived on ₹1,000 in first 40 days; Renewal waived on ₹25,000/year',
    rewards: [
      '2% cashpoints on Scan & Pay on Paytm App (capped at ₹250/month)',
      '2% cashpoints on Swiggy and Uber (capped at ₹250/month)',
      '1% cashpoints on all other retail spends (capped at ₹500/month)'
    ],
    loungeAccess: 'As per bank terms',
    fuelWaiver: '1% surcharge waived up to ₹500/statement cycle (Min txn ₹400)',
    eligibility: {
      salaried: 'Not Applicable',
      selfEmployed: 'Not Applicable'
    },
    targetSegment: 'New to Credit and Tech Savvy customers',
    features: [
      'Up to ₹150 cashpoints on first 2 transactions (min ₹250 each)'
    ],
    welcomeBenefit: 'Up to ₹150 cashpoints on first 2 transactions',
    forexMarkup: 'As per bank terms'
  },
  {
    id: 'paytm',
    name: 'Paytm HDFC Bank Credit Card',
    category: 'Co-Branded',
    annualFee: '₹500 + Taxes',
    renewalFee: '₹500 + Taxes',
    renewalWaiver: 'First year waived on ₹30,000 in 90 days; Renewal waived on ₹50,000/year',
    rewards: [
      '3% cashpoints on Paytm (Recharge, Utility, Movies, Mini App) - capped at ₹500/month',
      '2% cashpoints on other Paytm spends - capped at ₹500/month',
      '1% cashpoints on all other retail spends - capped at ₹1,000/month'
    ],
    loungeAccess: 'As per bank terms',
    fuelWaiver: '1% surcharge waived up to ₹250/statement cycle (Min txn ₹400)',
    eligibility: {
      salaried: 'Not Applicable',
      selfEmployed: 'Not Applicable'
    },
    targetSegment: 'Low to Middle income segment',
    features: [
      '1% cashpoints on spending ₹10,000 every month (capped at ₹100/month)'
    ],
    welcomeBenefit: 'As per bank terms',
    forexMarkup: 'As per bank terms'
  },
  {
    id: 'paytm-select',
    name: 'Paytm HDFC Bank Select Credit Card',
    category: 'Co-Branded',
    annualFee: '₹1,000 + Taxes',
    renewalFee: '₹1,000 + Taxes',
    renewalWaiver: 'First year waived on ₹50,000 in 90 days; Renewal waived on ₹1,50,000/year',
    rewards: [
      '5% cashpoints on Paytm (Recharge, Utilities, Movies, Mini App, Travel) - capped at ₹1,500/month',
      '3% cashpoints on Swiggy, Uber, AJIO and Big Basket - capped at ₹500/month',
      '1% cashpoints on all other retail spends - capped at ₹2,000/month'
    ],
    loungeAccess: '8 Complimentary Domestic Airport Lounge visits',
    fuelWaiver: '1% surcharge waived up to ₹500/statement cycle (Min txn ₹400)',
    eligibility: {
      salaried: 'Not Applicable',
      selfEmployed: 'Not Applicable'
    },
    targetSegment: 'Middle to high income segment',
    features: [
      '₹500 Gift Vouchers on spending ₹50,000 every Calendar Quarter'
    ],
    welcomeBenefit: 'As per bank terms',
    forexMarkup: 'As per bank terms'
  },
  {
    id: 'irctc',
    name: 'IRCTC HDFC Bank Credit Card',
    category: 'Co-Branded',
    annualFee: 'As per bank terms',
    renewalFee: 'As per bank terms',
    renewalWaiver: 'Annual spends of ₹1,50,000',
    rewards: [
      '5 RP per ₹100 on IRCTC ticketing website and Rail Connect App (capped at ₹1,000/month)',
      '1 RP per ₹100 on all other spends',
      'Additional 5% cashback on train ticket bookings via HDFC Bank SmartBuy'
    ],
    loungeAccess: '8 complimentary IRCTC Executive Lounges per year (2 per quarter)',
    fuelWaiver: 'As per bank terms',
    eligibility: {
      salaried: '₹15,000 per month',
      selfEmployed: '₹6 Lacs ITR p.a.'
    },
    targetSegment: 'Low to Middle Income Segment - Frequent Railway travellers',
    features: [
      '1% Transaction charges waiver on IRCTC (capped at ₹1,000/month)',
      'Milestone: ₹500 voucher on ₹30,000 spend per quarter (from Oct\'25)'
    ],
    welcomeBenefit: '₹500 Gift Voucher on activation within first 37 days',
    forexMarkup: 'As per bank terms'
  },
  {
    id: 'phonepe-ultimo',
    name: 'PhonePe HDFC Bank Ultimo Credit Card',
    category: 'Co-Branded',
    annualFee: '₹999 + Taxes',
    renewalFee: '₹999 + Taxes',
    renewalWaiver: 'Spending ₹2,00,000 (Non-EMI) in 12 months',
    rewards: [
      '10% Reward points on PhonePe categories (Recharges, Utilities, Hotels, Travel) - capped at ₹1,000/month',
      '5% Reward points on Online Brands (Amazon, Flipkart, Myntra, Swiggy, Uber) - capped at ₹500/month',
      '1% Reward points on Scan & Pay - capped at ₹500/month'
    ],
    loungeAccess: '8 complimentary domestic lounge access (2 per quarter)',
    fuelWaiver: '1% surcharge waived up to ₹250/statement cycle (Min txn ₹400)',
    eligibility: {
      salaried: 'Not Applicable',
      selfEmployed: 'Not Applicable'
    },
    targetSegment: 'Middle to high income segment',
    features: [
      '₹499 PhonePe Gift card on 1st RuPay CC on UPI transaction',
      '₹50 gift cards each for next 10 RuPay CC on UPI transactions'
    ],
    welcomeBenefit: '₹499 PhonePe Gift card on 1st UPI transaction',
    forexMarkup: 'As per bank terms'
  },
  {
    id: 'phonepe-uno',
    name: 'PhonePe HDFC Bank Uno Credit Card',
    category: 'Co-Branded',
    annualFee: '₹499 + Taxes',
    renewalFee: '₹499 + Taxes',
    renewalWaiver: 'Spending ₹1,00,000 (Non-EMI) in 12 months',
    rewards: [
      '2% Reward points on PhonePe categories - capped at ₹500/month',
      '1% Reward points on Online Brands - capped at ₹500/month',
      '1% Reward points on Scan & Pay - capped at ₹500/month'
    ],
    loungeAccess: 'As per bank terms',
    fuelWaiver: '1% surcharge waived up to ₹250/statement cycle (Min txn ₹400)',
    eligibility: {
      salaried: 'Not Applicable',
      selfEmployed: 'Not Applicable'
    },
    targetSegment: 'Middle to high income segment',
    features: [
      '₹249 PhonePe Gift card on 1st RuPay CC on UPI transaction',
      '₹25 gift cards each for next 10 RuPay CC on UPI transactions'
    ],
    welcomeBenefit: '₹249 PhonePe Gift card on 1st UPI transaction',
    forexMarkup: 'As per bank terms'
  },
  {
    id: 'flipkart-wholesale',
    name: 'Flipkart Wholesale HDFC Bank Credit Card',
    category: 'Co-Branded',
    annualFee: '₹499 + Taxes',
    renewalFee: '₹499 + Taxes',
    renewalWaiver: 'Annual spends of ₹3,00,000',
    rewards: [
      '5% cashback on Flipkart Wholesale Online Spends - capped at ₹2,000/month',
      '5% cashback on Telecom, Utility, Govt & Tax Payments - up to ₹250/month',
      '1% cashback on all other spends (25k cap/month)'
    ],
    loungeAccess: 'As per bank terms',
    fuelWaiver: '1% surcharge waiver up to ₹250/statement cycle',
    eligibility: {
      salaried: 'As per bank terms',
      selfEmployed: '₹6 lakh ITR p.a. (21-65 years)'
    },
    targetSegment: 'SME owners & Self-employed individuals',
    features: [
      'Activation Benefit - ₹500/txn on first 3 purchases within 90 days (min ₹2,000 each on Flipkart Wholesale)'
    ],
    welcomeBenefit: '₹500 per transaction on first 3 purchases',
    forexMarkup: 'As per bank terms'
  },
  {
    id: 'shoppers-stop',
    name: 'Shoppers Stop HDFC Bank Credit Card',
    category: 'Co-Branded',
    annualFee: '₹299 + Taxes',
    renewalFee: '₹299 + Taxes',
    renewalWaiver: 'As per bank terms',
    rewards: [
      '3% Savings on Shoppers Stop spends (capped at ₹500/statement cycle)',
      '1% Savings on Non-SS spends (capped at ₹1,000/statement cycle)'
    ],
    loungeAccess: 'As per bank terms',
    fuelWaiver: '1% surcharge waiver up to ₹250/month',
    eligibility: {
      salaried: '₹20,000 Monthly',
      selfEmployed: '₹6 Lacs ITR p.a.'
    },
    targetSegment: 'Middle to high income segment',
    features: [
      'Welcome Gift voucher worth ₹500 redeemable at Shoppers Stop',
      'Weekend offer: ₹500 on min ₹15,000 purchase (once/month, 5 times/year)',
      'Shoppers Stop Silver edge membership worth ₹350'
    ],
    welcomeBenefit: '₹500 Shoppers Stop voucher + Silver Edge membership',
    forexMarkup: 'As per bank terms'
  },
  {
    id: 'shoppers-stop-black',
    name: 'Shoppers Stop Black HDFC Bank Credit Card',
    category: 'Co-Branded',
    annualFee: '₹4,500 + Taxes',
    renewalFee: '₹4,500 + Taxes',
    renewalWaiver: 'As per bank terms',
    rewards: [
      '7% Savings on SS Spends (capped at ₹2,000/statement cycle)',
      '2% Savings on Non-SS Spends (capped at ₹2,000/statement cycle)'
    ],
    loungeAccess: '4 Domestic per quarter + 2 International per quarter',
    fuelWaiver: '1% surcharge waiver up to ₹500/month',
    eligibility: {
      salaried: '₹70,000 Monthly',
      selfEmployed: '₹8.4 Lacs ITR p.a.'
    },
    targetSegment: 'Super Premium Segment',
    features: [
      'Complimentary Shoppers Stop Black membership worth ₹4,500',
      'Weekend offer: ₹2,000 on min ₹50,000 purchase (once/month, 5 times/year)',
      'Welcome Gift voucher worth ₹1,500',
      'Accidental air death cover ₹3 Crore',
      'Emergency overseas hospitalization up to ₹50 lakhs',
      'Credit Liability Cover up to ₹9 Lakh'
    ],
    welcomeBenefit: '₹1,500 Shoppers Stop voucher + Black membership',
    forexMarkup: 'As per bank terms'
  },
  {
    id: 'times-card',
    name: 'HDFC Bank Times Card Credit',
    category: 'Co-Branded',
    annualFee: '₹500 + Taxes',
    renewalFee: '₹500 + Taxes',
    renewalWaiver: 'Spends of ₹1,50,000 in 12 months',
    rewards: [
      '2 Reward Points per ₹150 retail spends',
      '5 Reward Points per ₹150 on dining spends'
    ],
    loungeAccess: 'As per bank terms',
    fuelWaiver: '1% surcharge waiver',
    eligibility: {
      salaried: '₹25,000 per month',
      selfEmployed: '₹6 Lacs ITR p.a.'
    },
    targetSegment: 'Low to Middle income segment',
    features: [
      'Complimentary Annual Times Prime Membership',
      '25% off on movie tickets via BookMyShow',
      'Up to 20% off on online and offline shopping, wellness and hotel stay',
      'Up to 5% Cashback on Utility Bills/Shopping'
    ],
    welcomeBenefit: 'Complimentary Times Prime Membership',
    forexMarkup: 'As per bank terms'
  },
  {
    id: 'times-card-platinum',
    name: 'HDFC Bank Times Card Credit Platinum',
    category: 'Co-Branded',
    annualFee: '₹1,000 + Taxes',
    renewalFee: '₹1,000 + Taxes',
    renewalWaiver: 'Spends of ₹2,50,000 in 12 months',
    rewards: [
      '3 Reward Points per ₹150 retail spends',
      '10 Reward Points per ₹150 on dining spends'
    ],
    loungeAccess: 'As per bank terms',
    fuelWaiver: '1% surcharge waiver',
    eligibility: {
      salaried: '₹35,000 per month',
      selfEmployed: '₹6 Lacs ITR p.a.'
    },
    targetSegment: 'Low to Middle income segment',
    features: [
      'Complimentary Annual Times Prime Membership',
      '50% off on movie tickets via BookMyShow',
      'Up to 20% off on online and offline shopping, wellness and hotel stay',
      'Weekday Dining Bonanza Reward Points',
      'Up to 5% Cashback on Utility Bills/Shopping'
    ],
    welcomeBenefit: 'Complimentary Times Prime Membership',
    forexMarkup: 'As per bank terms'
  },
  {
    id: 'harley-davidson-diners',
    name: 'HDFC Bank Harley-Davidson Diners Club Credit Card',
    category: 'Co-Branded',
    annualFee: '₹2,500 + GST',
    renewalFee: '₹2,500',
    renewalWaiver: 'Annual spends of ₹3 lac',
    rewards: [
      '4 RP per ₹150 spent',
      '5X Reward Points on Swiggy and Zomato',
      'Up to 10X Rewards on flight tickets & stays via SmartBuy'
    ],
    loungeAccess: '2 complimentary airport lounge access every calendar quarter worldwide',
    fuelWaiver: 'As per bank terms',
    eligibility: {
      salaried: '₹35,000 per month',
      selfEmployed: '₹6 Lacs ITR p.a.'
    },
    targetSegment: 'Middle to High income segment',
    features: [
      'Complimentary Swiggy One, Times Prime & ₹750 Gift Card by Harley Davidson on ₹75,000 spends in 90 days',
      '₹1,500 worth vouchers on quarterly spends of ₹1.5 lakh',
      'Buy 1 Get 1 Free on movie/non-movie weekend tickets via BookMyShow'
    ],
    welcomeBenefit: 'Swiggy One + Times Prime + ₹750 Harley Gift Card (on spend milestone)',
    forexMarkup: 'As per bank terms'
  },
  {
    id: 'hog-diners',
    name: 'HDFC Bank H.O.G. Diners Club Credit Card',
    category: 'Co-Branded',
    annualFee: '₹10,000',
    renewalFee: '₹10,000',
    renewalWaiver: 'Annual spends of ₹5 lac',
    rewards: [
      '5 RP per ₹150 spent',
      'Up to 10X Reward Points via SmartBuy & 2X on weekend dining',
      '2 vouchers of ₹500 each monthly on spends of ₹80,000'
    ],
    loungeAccess: 'Unlimited for Primary and Add-on card holder',
    fuelWaiver: 'As per bank terms',
    eligibility: {
      salaried: '₹1.75 lac per month',
      selfEmployed: '₹21 Lacs ITR p.a.'
    },
    targetSegment: 'High income segment',
    features: [
      'Complimentary Club Marriott, Amazon Prime, Swiggy One, MMT Black, Forbes & ₹2,500 Harley Gift Card on ₹1.5 lacs in 90 days',
      'Complimentary Golf games (6 per quarter)',
      '24/7 Concierge Services',
      '1RP = ₹1 on travel portal, Catalogue 1RP = ₹0.50, Airmiles 1RP = 1 Mile'
    ],
    welcomeBenefit: 'Club Marriott + Amazon Prime + Swiggy One + MMT Black + Forbes + ₹2,500 Harley Gift Card',
    forexMarkup: '2% on international spends'
  },

  // BUSINESS CARDS
  {
    id: 'biz-first',
    name: 'HDFC Bank Biz First Credit Card',
    category: 'Business',
    annualFee: '₹500 + Taxes',
    renewalFee: '₹500 + Taxes',
    renewalWaiver: 'Annual spends of ₹50,000',
    rewards: [
      '3% Cash Points on EMI Spends (max 1,000/month)',
      '2% Cash Points on Utility, Electronics, SmartPay & Payzapp (max 500/month)',
      '1% Cash Points on all other spends (max 500) [1 CP = Up to ₹0.20]'
    ],
    loungeAccess: 'As per bank terms',
    fuelWaiver: '1% surcharge waiver (Min ₹400, Max ₹5,000 txn, Max ₹250/statement cycle)',
    eligibility: {
      salaried: 'As per bank terms',
      selfEmployed: '₹6 Lacs ITR p.a.'
    },
    targetSegment: 'Self-employed individuals (Kirana, Small café, Agri Trader, Mobile Repair)',
    features: [
      'Up to 55 days credit free period',
      'Up to 4% Savings on Business Spends - Utility Bills, GST, Income Tax',
      'Great Deals on Business Productivity Tools via Nuclei',
      'Business Insurance package at ₹3,785/year',
      '10% Extra off on Swiggy Dineout'
    ],
    welcomeBenefit: '₹250 gift voucher on 1 transaction within 30 days',
    forexMarkup: 'As per bank terms'
  },
  {
    id: 'biz-grow',
    name: 'HDFC Bank Biz Grow Credit Card',
    category: 'Business',
    annualFee: '₹500 + Taxes',
    renewalFee: '₹500 + Taxes',
    renewalWaiver: 'As per bank terms',
    rewards: [
      '2 Cash Points per ₹150 (excl. petrol, wallet, rent, education, EMI) [1 CP = Up to ₹0.30]',
      '10X Cash Points on Utility/Telecom via SmartPay, GST, Income Tax payments'
    ],
    loungeAccess: 'As per bank terms',
    fuelWaiver: '1% surcharge waiver (Min ₹400, Max ₹5,000 txn, Max ₹250/statement cycle)',
    eligibility: {
      salaried: 'As per bank terms',
      selfEmployed: '₹6 Lacs ITR p.a.'
    },
    targetSegment: 'Self-employed individuals (Mobile shop, Supermarket, Car service station)',
    features: [
      'Up to 55 days credit free period',
      'Up to 6% Savings on Business Spends',
      'Milestone: 2,000 Bonus CashPoints on quarterly spends of ₹1 Lakh+',
      'Business Insurance package at ₹3,785/year',
      '10% Extra off on Swiggy Dineout'
    ],
    welcomeBenefit: '₹250 gift voucher on 1 transaction within 30 days',
    forexMarkup: 'As per bank terms'
  },
  {
    id: 'biz-power',
    name: 'HDFC Bank Biz Power Credit Card',
    category: 'Business',
    annualFee: '₹2,500 + Taxes',
    renewalFee: '₹2,500 + Taxes',
    renewalWaiver: 'Annual spends of ₹4 lakhs',
    rewards: [
      '4 RP per ₹150 spent for business [1 RP = Up to ₹0.65]',
      '5X Reward Points on Utility/Telecom via SmartPay, GST, Income Tax, productivity tools'
    ],
    loungeAccess: '2 complimentary + 2 more on ₹75,000 spend + 6 international via Priority Pass',
    fuelWaiver: 'As per bank terms',
    eligibility: {
      salaried: 'As per bank terms',
      selfEmployed: '₹12 Lacs ITR p.a.'
    },
    targetSegment: 'Super premium self-employed (CA firm owner, Doctor, Consultant, Stock Trader)',
    features: [
      'Up to 55 days credit free period',
      'Up to 13% Savings on Business Spends',
      'Up to 10X reward points on SmartBuy',
      'Business Insurance package at ₹3,785/year',
      '10% Extra off on Swiggy Dineout'
    ],
    welcomeBenefit: 'Amazon voucher or Prime Membership worth ₹1,500 + Biz Prime (6 months)',
    forexMarkup: '2% on International transactions'
  },
  {
    id: 'biz-black',
    name: 'HDFC Bank Biz Black Credit Card',
    category: 'Business',
    annualFee: '₹10,000 + Taxes',
    renewalFee: '₹10,000 + Taxes',
    renewalWaiver: 'Annual spends of ₹7.5 lakhs',
    rewards: [
      '5 RP per ₹150 spent (excl. petrol, wallet, rent, education, EMI) [1 RP = Up to ₹1]',
      '5X Reward Points on Utility/Telecom via SmartPay, GST, Income Tax, productivity tools'
    ],
    loungeAccess: 'Unlimited access to 1000+ Lounges globally (for active customers)',
    fuelWaiver: 'As per bank terms',
    eligibility: {
      salaried: 'As per bank terms',
      selfEmployed: '₹30 Lacs ITR p.a.'
    },
    targetSegment: 'Super premium self-employed (Interior designer, Architect, Startup Founder)',
    features: [
      'Up to 55 days credit free period',
      'Up to 21% Savings on Business Spends',
      'Complimentary Golf games (6 per quarter)',
      'Milestone: SmartBuy/Taj voucher worth ₹5,000 on every ₹5 Lakhs spend (up to ₹20,000/year)',
      'Business Insurance package at ₹3,785/year'
    ],
    welcomeBenefit: 'Club Marriott membership + Taj stay voucher ₹5,000 on ₹1.5 lacs in 90 days',
    forexMarkup: '2% on International transactions'
  },
  {
    id: 'giga',
    name: 'HDFC Bank GIGA Credit Card',
    category: 'Business',
    annualFee: '₹500 + Taxes',
    renewalFee: '₹500 + Taxes',
    renewalWaiver: 'Annual spends of ₹50,000',
    rewards: [
      '6 Cashpoints per ₹150 on business spends (digital, bill payments, GST, Income Tax)',
      '2 Cashpoints per ₹150 on all other spends'
    ],
    loungeAccess: 'As per bank terms',
    fuelWaiver: '1% surcharge waiver (Min ₹400, Max ₹5,000 txn, Max ₹250/statement cycle)',
    eligibility: {
      salaried: 'As per bank terms',
      selfEmployed: '₹4 Lacs ITR p.a.'
    },
    targetSegment: 'Self employed (Freelancers, Consultant, Influencer, YouTuber, CAs)',
    features: [
      'Up to 55 days credit free period',
      'Up to ₹53,000 annual savings on spends',
      'Milestone: 800 cashpoints on monthly spending of ₹50,000',
      'Exclusive discounts on WeWork, 42 Courses, Harapa-Upgrad, Zoho, Legalwise',
      '10% Extra off on Swiggy Dineout'
    ],
    welcomeBenefit: 'OTT Play (1 month subscription) on 1 transaction within 30 days',
    forexMarkup: 'As per bank terms'
  },
  {
    id: 'paytm-business',
    name: 'Paytm HDFC Bank Business Credit Card',
    category: 'Business',
    annualFee: '₹500 + Taxes',
    renewalFee: '₹500 + Taxes',
    renewalWaiver: 'First year waived on ₹30,000 in 90 days; Renewal waived on ₹50,000/year',
    rewards: [
      '3% cashpoints on Paytm (Recharge, Utility, Movies, Mini App) - capped at ₹500/month',
      '2% cashpoints on other Paytm spends - capped at ₹500/month',
      '1% cashpoints on all other retail spends - capped at ₹1,000/month'
    ],
    loungeAccess: 'As per bank terms',
    fuelWaiver: '1% surcharge waived up to ₹250/statement cycle (Min txn ₹400)',
    eligibility: {
      salaried: 'Not Applicable',
      selfEmployed: 'As per bank terms'
    },
    targetSegment: 'Low to Middle income segment',
    features: [
      '₹250 gift voucher on card activation with 2 transactions in first 30 days',
      '₹500 Gift Voucher on spends of ₹1 Lac in a year'
    ],
    welcomeBenefit: '₹250 gift voucher on activation with 2 transactions',
    forexMarkup: 'As per bank terms'
  },
  {
    id: 'paytm-select-business',
    name: 'Paytm HDFC Bank Select Business Credit Card',
    category: 'Business',
    annualFee: '₹1,000 + Taxes',
    renewalFee: '₹1,000 + Taxes',
    renewalWaiver: 'First year waived on ₹60,000 in 90 days; Renewal waived on ₹1,00,000/year',
    rewards: [
      '5% cashback on Paytm (Recharge, Utilities, Movies, Mini App, Travel) - capped at ₹1,500/month',
      '3% cashback on Swiggy, Uber, AJIO and Big Basket - capped at ₹500/month',
      '1% cashback on all other retail spends - capped at ₹2,000/month'
    ],
    loungeAccess: '12 Complimentary Domestic Airport Lounge visits',
    fuelWaiver: '1% surcharge waived up to ₹250/statement cycle (Min txn ₹400)',
    eligibility: {
      salaried: 'Not Applicable',
      selfEmployed: 'As per bank terms'
    },
    targetSegment: 'Middle to high income segment',
    features: [
      '₹500 gift voucher on card activation with 4 transactions in first 30 days',
      '₹1,000 Gift Voucher on spends of ₹2 Lacs in a year'
    ],
    welcomeBenefit: '₹500 gift voucher on activation with 4 transactions',
    forexMarkup: 'As per bank terms'
  },

  // VIRTUAL CARDS
  {
    id: 'upi-rupay',
    name: 'HDFC Bank UPI RuPay Credit Card',
    category: 'Virtual',
    annualFee: 'Lifetime Free (LTF)',
    renewalFee: 'LTF',
    renewalWaiver: 'Spend ₹25,000 or more annually',
    rewards: [
      '3% Cashpoints on Groceries, Supermarket, Dining & PayZapp (max 500 pts/month)',
      '2% Cashpoints on Utility spends (max 500 pts/month)',
      '1% Cashpoints on other spends (max 500 pts/month)'
    ],
    loungeAccess: 'As per bank terms',
    fuelWaiver: 'As per bank terms',
    eligibility: {
      salaried: 'Existing HDFC Bank Credit Card holder',
      selfEmployed: 'Existing HDFC Bank Credit Card holder'
    },
    targetSegment: 'Low, middle, and high income segments with existing HDFC Bank credit card',
    features: [
      'Interest free period up to 50 days',
      'Smart EMI option available',
      'CashPoints redeemable at 1 CP = ₹0.25 via Net Banking'
    ],
    welcomeBenefit: '₹250 Gift Voucher on activation within first 37 days',
    forexMarkup: 'As per bank terms'
  },
  {
    id: 'upi-rupay-paid',
    name: 'HDFC Bank UPI RuPay Credit Card (Paid)',
    category: 'Virtual',
    annualFee: '₹99 + Taxes',
    renewalFee: '₹99 + Taxes',
    renewalWaiver: 'Spend ₹25,000 or more annually',
    rewards: [
      '3% Cashpoints on Groceries, Supermarket, Dining & PayZapp (max 500 pts/month)',
      '2% Cashpoints on Utility spends (max 500 pts/month)',
      '1% Cashpoints on other spends (max 500 pts/month)'
    ],
    loungeAccess: 'As per bank terms',
    fuelWaiver: 'As per bank terms',
    eligibility: {
      salaried: 'Existing HDFC Bank Credit Card holder',
      selfEmployed: 'Existing HDFC Bank Credit Card holder'
    },
    targetSegment: 'Low, middle, and high income segments with existing HDFC Bank credit card',
    features: [
      'Gift Voucher equivalent to Membership fee on Fee payment',
      'Interest free period up to 50 days',
      'Smart EMI option available'
    ],
    welcomeBenefit: 'Gift Voucher equivalent to Membership fee + ₹250 on activation',
    forexMarkup: 'As per bank terms'
  },
  {
    id: 'upi-rupay-biz',
    name: 'HDFC Bank UPI RuPay Biz Credit Card',
    category: 'Virtual',
    annualFee: 'Lifetime Free (LTF)',
    renewalFee: 'LTF',
    renewalWaiver: 'Spend ₹25,000 or more annually',
    rewards: [
      '3% Cashpoints on Groceries, Supermarket, Dining & PayZapp (max 500 pts/month)',
      '2% Cashpoints on Utility spends (max 500 pts/month)',
      '1% Cashpoints on other spends (max 500 pts/month)'
    ],
    loungeAccess: 'As per bank terms',
    fuelWaiver: 'As per bank terms',
    eligibility: {
      salaried: 'Existing HDFC Bank Business Credit Card holder',
      selfEmployed: 'Existing HDFC Bank Business Credit Card holder'
    },
    targetSegment: 'Low, middle, and high income segments with existing HDFC Bank credit card (Business)',
    features: [
      'Interest free period up to 50 days',
      'Smart EMI option available',
      'CashPoints redeemable at 1 CP = ₹0.25'
    ],
    welcomeBenefit: '₹250 Gift Voucher on activation within first 37 days',
    forexMarkup: 'As per bank terms'
  },
  {
    id: 'upi-mega-saver',
    name: 'HDFC Bank UPI RuPay Mega Saver Credit Card',
    category: 'Virtual',
    annualFee: 'Lifetime Free (LTF)',
    renewalFee: 'LTF',
    renewalWaiver: 'Spend ₹25,000 or more annually',
    rewards: [
      '3% Cashpoints on Groceries, Supermarket, Dining & PayZapp (max 500 pts/month)',
      '2% Cashpoints on Utility spends (max 500 pts/month)',
      '1% Cashpoints on other spends (max 500 pts/month)'
    ],
    loungeAccess: 'As per bank terms',
    fuelWaiver: 'As per bank terms',
    eligibility: {
      salaried: 'Existing Credit Card holder (other bank)',
      selfEmployed: 'Existing Credit Card holder (other bank)'
    },
    targetSegment: 'Low, middle, and high income segments with existing credit card',
    features: [
      '1.99% APR',
      'Interest free period up to 50 days',
      'Smart EMI option available'
    ],
    welcomeBenefit: '₹250 Gift Voucher on activation within first 37 days',
    forexMarkup: 'As per bank terms'
  },
  {
    id: 'pixel-go',
    name: 'HDFC Bank Pixel Go Credit Card',
    category: 'Virtual',
    annualFee: '₹250',
    renewalFee: '₹250',
    renewalWaiver: 'Joining fee waived on ₹10,000 in first quarter; Renewal waived on ₹50,000 annual spends',
    rewards: [
      '1% Cashback on all spends',
      '1% Cashback on UPI Spends (RuPay cards only) - capped at 500 cashpoints/month',
      '5% Cashback on SmartBuy spends - capped at 500 cashpoints/month'
    ],
    loungeAccess: 'As per bank terms',
    fuelWaiver: '1% surcharge waiver up to ₹250/statement cycle',
    eligibility: {
      salaried: 'As per bank terms',
      selfEmployed: 'As per bank terms'
    },
    targetSegment: 'Low to middle income segment',
    features: [
      'Up to 10% savings on Swiggy Dineout',
      'End-to-end control via PayZapp',
      'Pay in Parts with low-cost EMIs',
      'Interest Free Credit Period up to 50 days',
      'In-App Onboarding via PayZapp'
    ],
    welcomeBenefit: 'As per bank terms',
    forexMarkup: 'As per bank terms'
  },
  {
    id: 'pixel-play',
    name: 'HDFC Bank Pixel Play Credit Card',
    category: 'Virtual',
    annualFee: '₹500',
    renewalFee: '₹500',
    renewalWaiver: 'Joining fee waived on ₹20,000 in first quarter; Renewal waived on ₹1,00,000 annual spends',
    rewards: [
      '5% Cashback on choice brands (MakeMyTrip, Uber, Myntra, Nykaa, Zomato) - capped at 500 cashpoints/month',
      '3% Cashback on chosen E-Comm platform (Amazon, Flipkart, PayZapp) - capped at 500 cashpoints/month',
      '1% Cashback on UPI Spends (RuPay only) - capped at 500 cashpoints/month',
      '1% cashback on all other spends'
    ],
    loungeAccess: 'As per bank terms',
    fuelWaiver: '1% surcharge waiver up to ₹250/statement cycle',
    eligibility: {
      salaried: 'As per bank terms',
      selfEmployed: 'As per bank terms'
    },
    targetSegment: 'Middle to high income segment',
    features: [
      'Build Your Own Card (BYOC) - Pick your choice brands & e-comm platforms',
      '5% Cashback on SmartBuy spends',
      'Up to 10% discount on Swiggy Dineout',
      'End-to-end control via PayZapp',
      'Pay in Parts with low-cost EMIs'
    ],
    welcomeBenefit: 'As per bank terms',
    forexMarkup: 'As per bank terms'
  }
];

export const cardCategories = [
  { id: 'all', name: 'All Cards', description: 'View all HDFC Bank credit cards' },
  { id: 'Classic', name: 'Classic Cards', description: 'Entry-level cards for everyday rewards' },
  { id: 'Super Premium', name: 'Super Premium Cards', description: 'Premium cards for high-net-worth individuals' },
  { id: 'Diners Club', name: 'Diners Club Cards', description: 'Exclusive dining and travel privileges' },
  { id: 'Co-Branded', name: 'Co-Branded Cards', description: 'Partner cards with special benefits' },
  { id: 'Business', name: 'Business Cards', description: 'Cards designed for business owners' },
  { id: 'Virtual', name: 'Virtual Cards', description: 'Digital-first cards for modern users' }
];

export const getCardsByCategory = (category: string): CreditCard[] => {
  if (category === 'all') return hdfcCreditCards;
  return hdfcCreditCards.filter(card => card.category === category);
};

export const getCardById = (id: string): CreditCard | undefined => {
  return hdfcCreditCards.find(card => card.id === id);
};
