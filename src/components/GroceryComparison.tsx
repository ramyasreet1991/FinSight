import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  ShoppingCart, 
  Search, 
  Filter,
  TrendingUp,
  TrendingDown,
  Star,
  Clock,
  Truck,
  Shield,
  DollarSign,
  Percent,
  CheckCircle,
  AlertTriangle,
  Info,
  ExternalLink,
  Zap,
  Award,
  Target,
  BarChart3,
  PieChart,
  MapPin,
  Calendar
} from 'lucide-react';

interface GroceryItem {
  id: string;
  name: string;
  category: string;
  brand: string;
  image: string;
  prices: {
    platform: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    availability: 'In Stock' | 'Out of Stock' | 'Limited';
    deliveryTime: string;
    deliveryFee: number;
    rating: number;
    reviews: number;
    platformIcon: string;
    platformColor: string;
  }[];
  bestPrice: {
    platform: string;
    price: number;
    savings: number;
  };
  averagePrice: number;
  priceRange: {
    min: number;
    max: number;
  };
}

interface Platform {
  id: string;
  name: string;
  icon: string;
  color: string;
  deliveryTime: string;
  deliveryFee: number;
  features: string[];
  rating: number;
}

const GroceryComparison: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('price');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>([]);

  const platforms: Platform[] = [
    {
      id: 'flipkart',
      name: 'Flipkart',
      icon: '🛒',
      color: 'bg-blue-500',
      deliveryTime: '1-2 days',
      deliveryFee: 0,
      features: ['Free delivery', 'Wide selection', 'Grocery plus'],
      rating: 4.2
    },
    {
      id: 'dmart',
      name: 'DMart',
      icon: '🏪',
      color: 'bg-red-500',
      deliveryTime: '2-3 days',
      deliveryFee: 50,
      features: ['Low prices', 'Bulk discounts', 'Quality products'],
      rating: 4.0
    },
    {
      id: 'zepto',
      name: 'Zepto',
      icon: '⚡',
      color: 'bg-green-500',
      deliveryTime: '10-15 mins',
      deliveryFee: 0,
      features: ['Quick delivery', 'Fresh products', 'Local stores'],
      rating: 4.5
    },
    {
      id: 'amazon',
      name: 'Amazon',
      icon: '📦',
      color: 'bg-orange-500',
      deliveryTime: '1-2 days',
      deliveryFee: 0,
      features: ['Prime delivery', 'Wide selection', 'Subscribe & Save'],
      rating: 4.3
    },
    {
      id: 'instamart',
      name: 'Instamart',
      icon: '🚚',
      color: 'bg-purple-500',
      deliveryTime: '15-30 mins',
      deliveryFee: 0,
      features: ['Quick delivery', 'Fresh products', 'Local stores'],
      rating: 4.1
    },
    {
      id: 'blinkit',
      name: 'Blinkit',
      icon: '⚡',
      color: 'bg-yellow-500',
      deliveryTime: '10-15 mins',
      deliveryFee: 0,
      features: ['Ultra-fast delivery', 'Fresh products', 'Local stores'],
      rating: 4.4
    }
  ];

  const categories = [
    { id: 'all', name: 'All Categories', icon: '🛒' },
    { id: 'vegetables', name: 'Vegetables', icon: '🥬' },
    { id: 'fruits', name: 'Fruits', icon: '🍎' },
    { id: 'dairy', name: 'Dairy', icon: '🥛' },
    { id: 'grains', name: 'Grains & Cereals', icon: '🌾' },
    { id: 'spices', name: 'Spices', icon: '🌶️' },
    { id: 'snacks', name: 'Snacks', icon: '🍿' },
    { id: 'beverages', name: 'Beverages', icon: '🥤' }
  ];

  // Mock data for grocery items
  const mockGroceryItems: GroceryItem[] = [
    {
      id: 'rice-basmati',
      name: 'Basmati Rice 1kg',
      category: 'grains',
      brand: 'India Gate',
      image: '🍚',
      prices: [
        {
          platform: 'Flipkart',
          price: 180,
          originalPrice: 200,
          discount: 10,
          availability: 'In Stock',
          deliveryTime: '1-2 days',
          deliveryFee: 0,
          rating: 4.2,
          reviews: 1250,
          platformIcon: '🛒',
          platformColor: 'bg-blue-500'
        },
        {
          platform: 'DMart',
          price: 165,
          originalPrice: 180,
          discount: 8.3,
          availability: 'In Stock',
          deliveryTime: '2-3 days',
          deliveryFee: 50,
          rating: 4.0,
          reviews: 890,
          platformIcon: '🏪',
          platformColor: 'bg-red-500'
        },
        {
          platform: 'Zepto',
          price: 175,
          originalPrice: 190,
          discount: 7.9,
          availability: 'In Stock',
          deliveryTime: '10-15 mins',
          deliveryFee: 0,
          rating: 4.5,
          reviews: 2100,
          platformIcon: '⚡',
          platformColor: 'bg-green-500'
        },
        {
          platform: 'Amazon',
          price: 185,
          originalPrice: 200,
          discount: 7.5,
          availability: 'In Stock',
          deliveryTime: '1-2 days',
          deliveryFee: 0,
          rating: 4.3,
          reviews: 3200,
          platformIcon: '📦',
          platformColor: 'bg-orange-500'
        },
        {
          platform: 'Instamart',
          price: 170,
          originalPrice: 185,
          discount: 8.1,
          availability: 'In Stock',
          deliveryTime: '15-30 mins',
          deliveryFee: 0,
          rating: 4.1,
          reviews: 1500,
          platformIcon: '🚚',
          platformColor: 'bg-purple-500'
        },
        {
          platform: 'Blinkit',
          price: 168,
          originalPrice: 180,
          discount: 6.7,
          availability: 'In Stock',
          deliveryTime: '10-15 mins',
          deliveryFee: 0,
          rating: 4.4,
          reviews: 1800,
          platformIcon: '⚡',
          platformColor: 'bg-yellow-500'
        }
      ],
      bestPrice: {
        platform: 'DMart',
        price: 165,
        savings: 35
      },
      averagePrice: 174,
      priceRange: {
        min: 165,
        max: 185
      }
    },
    {
      id: 'milk-1l',
      name: 'Fresh Milk 1L',
      category: 'dairy',
      brand: 'Amul',
      image: '🥛',
      prices: [
        {
          platform: 'Flipkart',
          price: 65,
          originalPrice: 70,
          discount: 7.1,
          availability: 'In Stock',
          deliveryTime: '1-2 days',
          deliveryFee: 0,
          rating: 4.2,
          reviews: 1250,
          platformIcon: '🛒',
          platformColor: 'bg-blue-500'
        },
        {
          platform: 'DMart',
          price: 58,
          originalPrice: 65,
          discount: 10.8,
          availability: 'In Stock',
          deliveryTime: '2-3 days',
          deliveryFee: 50,
          rating: 4.0,
          reviews: 890,
          platformIcon: '🏪',
          platformColor: 'bg-red-500'
        },
        {
          platform: 'Zepto',
          price: 62,
          originalPrice: 68,
          discount: 8.8,
          availability: 'In Stock',
          deliveryTime: '10-15 mins',
          deliveryFee: 0,
          rating: 4.5,
          reviews: 2100,
          platformIcon: '⚡',
          platformColor: 'bg-green-500'
        },
        {
          platform: 'Amazon',
          price: 68,
          originalPrice: 75,
          discount: 9.3,
          availability: 'In Stock',
          deliveryTime: '1-2 days',
          deliveryFee: 0,
          rating: 4.3,
          reviews: 3200,
          platformIcon: '📦',
          platformColor: 'bg-orange-500'
        },
        {
          platform: 'Instamart',
          price: 60,
          originalPrice: 65,
          discount: 7.7,
          availability: 'In Stock',
          deliveryTime: '15-30 mins',
          deliveryFee: 0,
          rating: 4.1,
          reviews: 1500,
          platformIcon: '🚚',
          platformColor: 'bg-purple-500'
        },
        {
          platform: 'Blinkit',
          price: 59,
          originalPrice: 64,
          discount: 7.8,
          availability: 'In Stock',
          deliveryTime: '10-15 mins',
          deliveryFee: 0,
          rating: 4.4,
          reviews: 1800,
          platformIcon: '⚡',
          platformColor: 'bg-yellow-500'
        }
      ],
      bestPrice: {
        platform: 'DMart',
        price: 58,
        savings: 12
      },
      averagePrice: 62,
      priceRange: {
        min: 58,
        max: 68
      }
    },
    {
      id: 'onions-1kg',
      name: 'Onions 1kg',
      category: 'vegetables',
      brand: 'Fresh',
      image: '🧅',
      prices: [
        {
          platform: 'Flipkart',
          price: 45,
          originalPrice: 50,
          discount: 10,
          availability: 'In Stock',
          deliveryTime: '1-2 days',
          deliveryFee: 0,
          rating: 4.2,
          reviews: 1250,
          platformIcon: '🛒',
          platformColor: 'bg-blue-500'
        },
        {
          platform: 'DMart',
          price: 38,
          originalPrice: 45,
          discount: 15.6,
          availability: 'In Stock',
          deliveryTime: '2-3 days',
          deliveryFee: 50,
          rating: 4.0,
          reviews: 890,
          platformIcon: '🏪',
          platformColor: 'bg-red-500'
        },
        {
          platform: 'Zepto',
          price: 42,
          originalPrice: 48,
          discount: 12.5,
          availability: 'In Stock',
          deliveryTime: '10-15 mins',
          deliveryFee: 0,
          rating: 4.5,
          reviews: 2100,
          platformIcon: '⚡',
          platformColor: 'bg-green-500'
        },
        {
          platform: 'Amazon',
          price: 48,
          originalPrice: 55,
          discount: 12.7,
          availability: 'In Stock',
          deliveryTime: '1-2 days',
          deliveryFee: 0,
          rating: 4.3,
          reviews: 3200,
          platformIcon: '📦',
          platformColor: 'bg-orange-500'
        },
        {
          platform: 'Instamart',
          price: 40,
          originalPrice: 45,
          discount: 11.1,
          availability: 'In Stock',
          deliveryTime: '15-30 mins',
          deliveryFee: 0,
          rating: 4.1,
          reviews: 1500,
          platformIcon: '🚚',
          platformColor: 'bg-purple-500'
        },
        {
          platform: 'Blinkit',
          price: 39,
          originalPrice: 44,
          discount: 11.4,
          availability: 'In Stock',
          deliveryTime: '10-15 mins',
          deliveryFee: 0,
          rating: 4.4,
          reviews: 1800,
          platformIcon: '⚡',
          platformColor: 'bg-yellow-500'
        }
      ],
      bestPrice: {
        platform: 'DMart',
        price: 38,
        savings: 10
      },
      averagePrice: 42,
      priceRange: {
        min: 38,
        max: 48
      }
    }
  ];

  useEffect(() => {
    setGroceryItems(mockGroceryItems);
  }, []);

  const filteredItems = groceryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.bestPrice.price - b.bestPrice.price;
      case 'savings':
        return b.bestPrice.savings - a.bestPrice.savings;
      case 'rating':
        return Math.max(...b.prices.map(p => p.rating)) - Math.max(...a.prices.map(p => p.rating));
      default:
        return 0;
    }
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'In Stock': return 'text-green-600';
      case 'Limited': return 'text-yellow-600';
      case 'Out of Stock': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getDiscountColor = (discount: number) => {
    if (discount >= 15) return 'text-green-600';
    if (discount >= 10) return 'text-blue-600';
    if (discount >= 5) return 'text-yellow-600';
    return 'text-gray-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Grocery Price Comparison</h2>
          <p className="text-gray-600">Compare prices across multiple grocery platforms</p>
        </div>
        <div className="flex items-center space-x-2">
          <ShoppingCart className="h-8 w-8 text-green-600" />
        </div>
      </div>

      {/* Educational Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-yellow-800">Educational Purpose Only</h3>
            <p className="text-sm text-yellow-700 mt-1">
              This price comparison is for educational purposes only. Prices may vary. 
              Always verify current prices and availability on the respective platforms.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Products</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for groceries..."
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.icon} {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="price">Lowest Price</option>
              <option value="savings">Highest Savings</option>
              <option value="rating">Highest Rating</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Grocery Items */}
      <div className="space-y-4">
        {sortedItems.map((item) => (
          <Card key={item.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="text-4xl">{item.image}</div>
                <div>
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-gray-600">{item.brand}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="outline" className="bg-green-100 text-green-800">
                      Best Price: {formatCurrency(item.bestPrice.price)}
                    </Badge>
                    <Badge variant="outline" className="bg-blue-100 text-blue-800">
                      Save: {formatCurrency(item.bestPrice.savings)}
                    </Badge>
                  </div>
                </div>
              </div>
              <Button 
                onClick={() => setSelectedItem(selectedItem === item.id ? null : item.id)}
                variant="outline"
              >
                {selectedItem === item.id ? 'Hide Details' : 'View Details'}
              </Button>
            </div>

            {/* Price Comparison Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {item.prices.map((price, index) => (
                <div key={index} className="border rounded-lg p-3 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{price.platformIcon}</span>
                      <span className="font-medium text-sm">{price.platform}</span>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${price.platformColor}`}></div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold">{formatCurrency(price.price)}</span>
                      {price.discount && (
                        <Badge className={`text-xs ${getDiscountColor(price.discount)}`}>
                          {price.discount}% off
                        </Badge>
                      )}
                    </div>
                    
                    {price.originalPrice && (
                      <div className="text-sm text-gray-500 line-through">
                        {formatCurrency(price.originalPrice)}
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 text-yellow-400" />
                      <span className="text-xs">{price.rating}</span>
                      <span className="text-xs text-gray-500">({price.reviews})</span>
                    </div>
                    
                    <div className="text-xs text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{price.deliveryTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Truck className="h-3 w-3" />
                        <span>{price.deliveryFee === 0 ? 'Free' : formatCurrency(price.deliveryFee)}</span>
                      </div>
                    </div>
                    
                    <div className={`text-xs ${getAvailabilityColor(price.availability)}`}>
                      {price.availability}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Detailed View */}
            {selectedItem === item.id && (
              <div className="mt-6 pt-6 border-t">
                <Tabs defaultValue="analysis" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="analysis">Price Analysis</TabsTrigger>
                    <TabsTrigger value="platforms">Platform Comparison</TabsTrigger>
                    <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                  </TabsList>

                  <TabsContent value="analysis" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">Average Price</p>
                            <p className="text-2xl font-bold text-blue-600">{formatCurrency(item.averagePrice)}</p>
                          </div>
                          <BarChart3 className="h-8 w-8 text-blue-600" />
                        </div>
                      </Card>

                      <Card className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">Price Range</p>
                            <p className="text-2xl font-bold text-green-600">
                              {formatCurrency(item.priceRange.min)} - {formatCurrency(item.priceRange.max)}
                            </p>
                          </div>
                          <TrendingUp className="h-8 w-8 text-green-600" />
                        </div>
                      </Card>

                      <Card className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">Best Savings</p>
                            <p className="text-2xl font-bold text-red-600">{formatCurrency(item.bestPrice.savings)}</p>
                          </div>
                          <Award className="h-8 w-8 text-red-600" />
                        </div>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="platforms" className="space-y-4">
                    <div className="space-y-4">
                      {item.prices.map((price, index) => (
                        <Card key={index} className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <span className="text-2xl">{price.platformIcon}</span>
                              <div>
                                <h4 className="font-semibold">{price.platform}</h4>
                                <p className="text-sm text-gray-600">{price.deliveryTime} • {price.deliveryFee === 0 ? 'Free delivery' : formatCurrency(price.deliveryFee)}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-xl font-bold">{formatCurrency(price.price)}</p>
                              {price.discount && (
                                <p className="text-sm text-green-600">{price.discount}% off</p>
                              )}
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="recommendations" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="p-4">
                        <h4 className="font-semibold mb-3">Best Value</h4>
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{item.prices.find(p => p.platform === item.bestPrice.platform)?.platformIcon}</span>
                          <div>
                            <p className="font-medium">{item.bestPrice.platform}</p>
                            <p className="text-sm text-gray-600">Save {formatCurrency(item.bestPrice.savings)}</p>
                          </div>
                        </div>
                      </Card>

                      <Card className="p-4">
                        <h4 className="font-semibold mb-3">Fastest Delivery</h4>
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">⚡</span>
                          <div>
                            <p className="font-medium">Zepto/Blinkit</p>
                            <p className="text-sm text-gray-600">10-15 minutes</p>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GroceryComparison;
