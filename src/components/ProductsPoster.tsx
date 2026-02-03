import { Link } from 'react-router-dom';
import { Home, Briefcase, UserRound, CreditCard, Wallet } from 'lucide-react';

interface ProductItem {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  gradient: string;
}

const products: ProductItem[] = [
  {
    id: 'personal-loans',
    name: 'Personal Loans',
    description: 'Quick disbursement for all your needs',
    icon: <Wallet className="h-8 w-8" />,
    link: '/loans/personal',
    gradient: 'from-blue-600 to-blue-800',
  },
  {
    id: 'home-loans',
    name: 'Home Loans',
    description: 'Make your dream home a reality',
    icon: <Home className="h-8 w-8" />,
    link: '/loans/home',
    gradient: 'from-green-600 to-green-800',
  },
  {
    id: 'business-loans',
    name: 'Business Loans',
    description: 'Fuel your business growth',
    icon: <Briefcase className="h-8 w-8" />,
    link: '/loans/business',
    gradient: 'from-purple-600 to-purple-800',
  },
  {
    id: 'doctor-loans',
    name: 'Doctor Loans',
    description: 'Specialized loans for medical professionals',
    icon: <UserRound className="h-8 w-8" />,
    link: '/loans/doctor',
    gradient: 'from-red-600 to-red-800',
  },
  {
    id: 'credit-cards',
    name: 'Credit Cards',
    description: 'Premium cards with exclusive rewards',
    icon: <CreditCard className="h-8 w-8" />,
    link: '/credit-cards',
    gradient: 'from-amber-600 to-amber-800',
  },
];

const ProductsPoster = () => {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Our Products</h2>
          <p className="text-muted-foreground">Choose from our range of financial products</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {products.map((product) => (
            <Link
              key={product.id}
              to={product.link}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className={`bg-gradient-to-br ${product.gradient} p-6 h-full min-h-[180px] flex flex-col justify-between`}>
                <div className="text-white/90 mb-4">
                  {product.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{product.name}</h3>
                  <p className="text-white/80 text-sm line-clamp-2">{product.description}</p>
                </div>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsPoster;
