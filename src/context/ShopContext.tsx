import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, CartItem, CakeWeight, Coupon, Order, OrderStatus, 
  CustomCakeRequest, Review, StoreSettings, ViewType, CustomerAddress 
} from '../types';
import { initialProducts } from '../data/products';
import { categories } from '../data/categories';
import { initialCoupons } from '../data/coupons';
import { initialReviews } from '../data/reviews';

export interface FilterState {
  category: string;
  minPrice: number;
  maxPrice: number;
  flavor: string;
  egglessOnly: boolean;
  minRating: number;
  sortBy: 'popularity' | 'latest' | 'price-asc' | 'price-desc' | 'rating';
}

const defaultFilters: FilterState = {
  category: 'All',
  minPrice: 0,
  maxPrice: 4000,
  flavor: 'All',
  egglessOnly: false,
  minRating: 0,
  sortBy: 'popularity'
};

const defaultSettings: StoreSettings = {
  storeName: 'Cake Paradise',
  tagline: 'Every Celebration Deserves a Beautiful Cake!',
  phone: '+91 98300 45678',
  email: 'celebrate@cakeparadise.in',
  address: 'Atelier 18A, Park Mansions, Park Street, Kolkata, West Bengal 700016',
  freeDeliveryThreshold: 999,
  standardDeliveryCharge: 80,
  taxRatePercent: 5,
  codEnabled: true,
  upiId: 'cakeparadise@okaxis',
  whatsappNumber: '+919830045678'
};

const sampleOrders: Order[] = [
  {
    id: 'ord-101',
    orderNumber: 'CP-94812',
    createdAt: '2026-10-25T14:30:00Z',
    customer: {
      fullName: 'Aarav Mukherjee',
      email: 'aarav.m@example.com',
      phone: '+91 98300 45678',
      addressLine1: 'Flat 402, Queens Mansion',
      area: 'Park Street',
      city: 'Kolkata',
      state: 'West Bengal',
      pincode: '700016'
    },
    items: [
      {
        id: 'ci-1',
        productId: 'prod-1',
        productName: 'Premium Chocolate Truffle Cake',
        image: '/images/products/chocolate-truffle.png',
        weight: '1kg',
        flavor: 'Chocolate',
        isEggless: true,
        cakeMessage: 'Happy 50th Birthday Ma!',
        quantity: 1,
        unitPrice: 1108,
        totalPrice: 1108
      }
    ],
    subtotal: 1108,
    discount: 110,
    deliveryCharge: 0,
    tax: 50,
    total: 1048,
    couponCode: 'WELCOME10',
    deliveryDate: '2026-10-28',
    deliveryTimeSlot: 'Evening (6:00 PM - 9:00 PM)',
    orderNotes: 'Please carry delicate candles and cake knife.',
    paymentMethod: 'upi',
    paymentStatus: 'Paid',
    status: 'Preparing'
  },
  {
    id: 'ord-102',
    orderNumber: 'CP-93104',
    createdAt: '2026-10-23T10:15:00Z',
    customer: {
      fullName: 'Pooja Banerjee',
      email: 'pooja.b@example.com',
      phone: '+91 98312 99881',
      addressLine1: 'Tower 4, Action Area 1',
      area: 'New Town / Salt Lake',
      city: 'Kolkata',
      state: 'West Bengal',
      pincode: '700156'
    },
    items: [
      {
        id: 'ci-2',
        productId: 'prod-3',
        productName: 'Red Velvet Cream Cake',
        image: '/images/products/red-velvet.png',
        weight: '1kg',
        flavor: 'Red Velvet',
        isEggless: true,
        cakeMessage: 'Forever & Always',
        quantity: 1,
        unitPrice: 1385,
        totalPrice: 1385
      }
    ],
    subtotal: 1385,
    discount: 50,
    deliveryCharge: 0,
    tax: 66,
    total: 1401,
    couponCode: 'CAKE50',
    deliveryDate: '2026-10-24',
    deliveryTimeSlot: 'Midnight (11:00 PM - 12:00 AM)',
    paymentMethod: 'cod',
    paymentStatus: 'Paid',
    status: 'Delivered'
  }
];

interface ShopContextType {
  products: Product[];
  categories: typeof categories;
  coupons: Coupon[];
  reviews: Review[];
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  customRequests: CustomCakeRequest[];
  storeSettings: StoreSettings;
  currentView: ViewType;
  selectedProduct: Product | null;
  quickViewProduct: Product | null;
  searchQuery: string;
  filters: FilterState;
  appliedCoupon: Coupon | null;
  lastPlacedOrder: Order | null;
  currentUser: {
    id: string;
    name: string;
    email: string;
    phone: string;
    addresses: CustomerAddress[];
  } | null;
  isCartOpen: boolean;

  // View Navigation
  navigateTo: (view: ViewType, product?: Product) => void;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  setSearchQuery: (query: string) => void;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  setIsCartOpen: (open: boolean) => void;

  // Cart operations
  addToCart: (
    product: Product, 
    weight: CakeWeight, 
    flavor: string, 
    isEggless: boolean, 
    cakeMessage: string, 
    quantity?: number
  ) => void;
  updateCartQuantity: (cartItemId: string, delta: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Pricing calculations
  getWeightMultiplier: (weight: CakeWeight) => number;
  calculateProductPrice: (product: Product, weight: CakeWeight) => number;
  cartSubtotal: number;
  cartDiscount: number;
  cartDeliveryCharge: number;
  cartTax: number;
  cartTotal: number;

  // Wishlist
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  moveToCartFromWishlist: (productId: string) => void;

  // Orders & Checkout
  placeOrder: (orderPayload: {
    customer: CustomerAddress;
    deliveryDate: string;
    deliveryTimeSlot: string;
    orderNotes?: string;
    paymentMethod: 'cod' | 'upi' | 'card';
  }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  getOrderById: (orderId: string) => Order | undefined;
  getOrderByNumber: (orderNumber: string) => Order | undefined;

  // Custom cake orders
  submitCustomRequest: (request: Omit<CustomCakeRequest, 'id' | 'referenceNumber' | 'createdAt' | 'status'>) => CustomCakeRequest;

  // Reviews
  addReview: (review: Omit<Review, 'id' | 'date' | 'isVerified'>) => void;

  // User auth demo
  login: (email: string, name: string, phone: string) => void;
  logout: () => void;
  saveUserAddress: (address: CustomerAddress) => void;

  // Admin controls
  addProduct: (product: Omit<Product, 'id' | 'slug' | 'rating' | 'reviewsCount'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  addCoupon: (coupon: Coupon) => void;
  updateCoupon: (coupon: Coupon) => void;
  updateStoreSettings: (settings: StoreSettings) => void;

  // Delivery check
  checkPincodeDelivery: (pincode: string) => { serviceable: boolean; estimatedHours: string; message: string };
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('cp_products');
    if (saved) {
      try {
        const parsed: Product[] = JSON.parse(saved);
        return parsed.map((p) => {
          const fresh = initialProducts.find((ip) => ip.id === p.id);
          if (fresh) {
            // Keep user modifications if any, but synchronize updated image assets
            return {
              ...p,
              image: fresh.image,
              gallery: fresh.gallery && fresh.gallery.length > 0 ? fresh.gallery : p.gallery
            };
          }
          return p;
        });
      } catch (e) { /* ignore */ }
    }
    return initialProducts;
  });

  // Coupons
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('cp_coupons');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return initialCoupons;
  });

  // Reviews
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('cp_reviews');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return initialReviews;
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cp_cart');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [];
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('cp_wishlist');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return ['prod-1', 'prod-3'];
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('cp_orders');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return sampleOrders;
  });

  // Custom cake requests
  const [customRequests, setCustomRequests] = useState<CustomCakeRequest[]>(() => {
    const saved = localStorage.getItem('cp_custom_requests');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [
      {
        id: 'cust-1',
        referenceNumber: 'CC-5520',
        customerName: 'Kavita Roy',
        phone: '+91 99887 76655',
        email: 'kavita@example.com',
        shape: '2-Tier Round',
        size: '3 kg',
        flavor: 'Belgian Dark Chocolate & Strawberry',
        isEggless: true,
        creamColor: 'Lavender & Golden Leaf',
        theme: 'Enchanted Butterfly Garden',
        occasion: '1st Birthday Celebration',
        cakeMessage: 'Happy 1st Birthday Myra',
        deliveryDate: '2026-10-30',
        deliveryTimeSlot: 'Afternoon (1:00 PM - 5:00 PM)',
        specialInstructions: 'Minimal sweetness, pastel butterfly sugar cutouts',
        estimatedPrice: 3850,
        status: 'Baker Assigned',
        createdAt: '2026-10-26T11:00:00Z'
      }
    ];
  });

  // Store Settings
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(() => {
    const saved = localStorage.getItem('cp_settings');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return defaultSettings;
  });

  // User
  const [currentUser, setCurrentUser] = useState<{
    id: string;
    name: string;
    email: string;
    phone: string;
    addresses: CustomerAddress[];
  } | null>(() => {
    const saved = localStorage.getItem('cp_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return {
      id: 'usr-1',
      name: 'Priya Sen',
      email: 'priya.sen@example.com',
      phone: '+91 98300 45678',
      addresses: [
        {
          fullName: 'Priya Sen',
          email: 'priya.sen@example.com',
          phone: '+91 98300 45678',
          addressLine1: 'Flat 3B, Dover Court, Dover Terrace',
          area: 'Ballygunge',
          city: 'Kolkata',
          state: 'West Bengal',
          pincode: '700019'
        }
      ]
    };
  });

  // UI state
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('cp_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('cp_coupons', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem('cp_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('cp_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('cp_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('cp_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('cp_custom_requests', JSON.stringify(customRequests));
  }, [customRequests]);

  useEffect(() => {
    localStorage.setItem('cp_settings', JSON.stringify(storeSettings));
  }, [storeSettings]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('cp_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('cp_user');
    }
  }, [currentUser]);

  // Pricing helper
  const getWeightMultiplier = (weight: CakeWeight): number => {
    switch (weight) {
      case '500g': return 1.0;
      case '1kg': return 1.85;
      case '1.5kg': return 2.7;
      case '2kg': return 3.5;
      default: return 1.0;
    }
  };

  const calculateProductPrice = (product: Product, weight: CakeWeight): number => {
    const basePrice = product.salePrice && product.salePrice > 0 ? product.salePrice : product.regularPrice;
    const multiplier = getWeightMultiplier(weight);
    return Math.round(basePrice * multiplier);
  };

  // View navigation helper
  const navigateTo = (view: ViewType, product?: Product) => {
    if (product) {
      setSelectedProduct(product);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    setSearchQuery('');
  };

  // Cart operations
  const addToCart = (
    product: Product, 
    weight: CakeWeight, 
    flavor: string, 
    isEggless: boolean, 
    cakeMessage: string, 
    quantity: number = 1
  ) => {
    const unitPrice = calculateProductPrice(product, weight);
    const cartItemId = `${product.id}-${weight}-${flavor}-${isEggless ? 'eggless' : 'egg'}-${cakeMessage ? cakeMessage.slice(0, 10) : 'none'}`;

    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.id === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          totalPrice: newQty * unitPrice
        };
        return updated;
      } else {
        const newItem: CartItem = {
          id: cartItemId,
          productId: product.id,
          productName: product.name,
          image: product.image,
          weight,
          flavor: flavor || product.flavor,
          isEggless,
          cakeMessage: cakeMessage.trim(),
          quantity,
          unitPrice,
          totalPrice: unitPrice * quantity
        };
        return [...prev, newItem];
      }
    });

    setIsCartOpen(true);
  };

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === cartItemId) {
          const newQty = item.quantity + delta;
          if (newQty <= 0) return null;
          return {
            ...item,
            quantity: newQty,
            totalPrice: newQty * item.unitPrice
          };
        }
        return item;
      }).filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Coupons
  const applyCoupon = (code: string): { success: boolean; message: string } => {
    const cleanCode = code.trim().toUpperCase();
    const found = coupons.find(c => c.code === cleanCode && c.isActive);

    if (!found) {
      return { success: false, message: `Coupon "${cleanCode}" is invalid or expired.` };
    }

    if (cartSubtotal < found.minOrder) {
      return { 
        success: false, 
        message: `Coupon "${cleanCode}" requires minimum order of ₹${found.minOrder}. Current subtotal is ₹${cartSubtotal}.` 
      };
    }

    setAppliedCoupon(found);
    return { success: true, message: `Coupon "${cleanCode}" applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  // Cart financial calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  let cartDiscount = 0;
  if (appliedCoupon && cartSubtotal >= appliedCoupon.minOrder) {
    if (appliedCoupon.discountPercent) {
      const calcDiscount = Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100);
      cartDiscount = appliedCoupon.maxDiscount ? Math.min(calcDiscount, appliedCoupon.maxDiscount) : calcDiscount;
    } else if (appliedCoupon.discountFlat) {
      cartDiscount = appliedCoupon.discountFlat;
    }
  }

  const discountedSubtotal = Math.max(0, cartSubtotal - cartDiscount);
  const cartDeliveryCharge = cart.length === 0 
    ? 0 
    : discountedSubtotal >= storeSettings.freeDeliveryThreshold 
      ? 0 
      : storeSettings.standardDeliveryCharge;

  const cartTax = cart.length === 0 ? 0 : Math.round((discountedSubtotal * storeSettings.taxRatePercent) / 100);
  const cartTotal = discountedSubtotal + cartDeliveryCharge + cartTax;

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string): boolean => {
    return wishlist.includes(productId);
  };

  const moveToCartFromWishlist = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      addToCart(product, '500g', product.flavor, product.isEggless, '', 1);
      toggleWishlist(productId);
    }
  };

  // Orders
  const placeOrder = (orderPayload: {
    customer: CustomerAddress;
    deliveryDate: string;
    deliveryTimeSlot: string;
    orderNotes?: string;
    paymentMethod: 'cod' | 'upi' | 'card';
  }): Order => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: `CP-${randomNum}`,
      createdAt: new Date().toISOString(),
      customer: orderPayload.customer,
      items: [...cart],
      subtotal: cartSubtotal,
      discount: cartDiscount,
      deliveryCharge: cartDeliveryCharge,
      tax: cartTax,
      total: cartTotal,
      couponCode: appliedCoupon?.code,
      deliveryDate: orderPayload.deliveryDate,
      deliveryTimeSlot: orderPayload.deliveryTimeSlot,
      orderNotes: orderPayload.orderNotes,
      paymentMethod: orderPayload.paymentMethod,
      paymentStatus: orderPayload.paymentMethod === 'cod' ? 'Pending' : 'Demo Completed',
      status: 'Confirmed'
    };

    setOrders(prev => [newOrder, ...prev]);
    setLastPlacedOrder(newOrder);
    clearCart();
    setCurrentView('order-confirmation');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const getOrderById = (orderId: string) => orders.find(o => o.id === orderId);
  const getOrderByNumber = (orderNumber: string) => {
    const clean = orderNumber.trim().toUpperCase();
    return orders.find(o => o.orderNumber.toUpperCase() === clean);
  };

  // Custom cake request
  const submitCustomRequest = (
    data: Omit<CustomCakeRequest, 'id' | 'referenceNumber' | 'createdAt' | 'status'>
  ): CustomCakeRequest => {
    const randomReq = Math.floor(1000 + Math.random() * 9000);
    const newRequest: CustomCakeRequest = {
      ...data,
      id: `cust-${Date.now()}`,
      referenceNumber: `CC-${randomReq}`,
      status: 'Received',
      createdAt: new Date().toISOString()
    };

    setCustomRequests(prev => [newRequest, ...prev]);
    return newRequest;
  };

  // Review
  const addReview = (reviewData: Omit<Review, 'id' | 'date' | 'isVerified'>) => {
    const newReview: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      isVerified: true
    };
    setReviews(prev => [newReview, ...prev]);
  };

  // User auth
  const login = (email: string, name: string, phone: string) => {
    const user = {
      id: `usr-${Date.now()}`,
      name: name || 'Valued Guest',
      email,
      phone: phone || '+91 98300 00000',
      addresses: [
        {
          fullName: name || 'Valued Guest',
          email,
          phone: phone || '+91 98300 00000',
          addressLine1: 'Flat 204, Park Chambers',
          area: 'Park Street',
          city: 'Kolkata',
          state: 'West Bengal',
          pincode: '700016'
        }
      ]
    };
    setCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const saveUserAddress = (address: CustomerAddress) => {
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        addresses: [address, ...currentUser.addresses.filter(a => a.addressLine1 !== address.addressLine1)]
      });
    }
  };

  // Admin Product CRUD
  const addProduct = (pData: Omit<Product, 'id' | 'slug' | 'rating' | 'reviewsCount'>) => {
    const newProd: Product = {
      ...pData,
      id: `prod-${Date.now()}`,
      slug: pData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      rating: 5.0,
      reviewsCount: 1
    };
    setProducts(prev => [newProd, ...prev]);
  };

  const updateProduct = (p: Product) => {
    setProducts(prev => prev.map(item => item.id === p.id ? p : item));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(item => item.id !== id));
  };

  const addCoupon = (coupon: Coupon) => {
    setCoupons(prev => [coupon, ...prev]);
  };

  const updateCoupon = (coupon: Coupon) => {
    setCoupons(prev => prev.map(c => c.code === coupon.code ? coupon : c));
  };

  const updateStoreSettings = (settings: StoreSettings) => {
    setStoreSettings(settings);
  };

  // Pincode delivery check
  // Kolkata Serviceable PIN Codes database
  const kolkataAreas: Record<string, string> = {
    '700016': 'Park Street / Camac Street / Entally (Central Kolkata)',
    '700019': 'Ballygunge / Dover Terrace / Gariahat (South Kolkata)',
    '700029': 'Gariahat / Southern Avenue / Lake Market (South Kolkata)',
    '700020': 'Elgin Road / Rabindra Sadan / Circus Avenue',
    '700025': 'Bhowanipore / Lansdowne / Kalighat',
    '700027': 'Alipore / New Alipore (South Kolkata)',
    '700064': 'Salt Lake Sector I & II (Bidhannagar)',
    '700091': 'Salt Lake Sector V (IT Tech Park)',
    '700098': 'Salt Lake Sector III',
    '700106': 'Salt Lake Sector III / Bidhannagar',
    '700156': 'New Town Action Area 1 & 2 / Rajarhat',
    '700135': 'New Town Action Area 3 / Eco Park',
    '700004': 'Shyambazar / Bagbazar (North Kolkata)',
    '700006': 'Girish Park / Central Avenue / Sovabazar',
    '700032': 'Jadavpur / Santoshpur (South Kolkata)',
    '700033': 'Tollygunge / Prince Anwar Shah Road',
    '700034': 'Behala / Taratala (South West Kolkata)',
    '700028': 'Dum Dum / Nagerbazar (North Kolkata)',
    '700084': 'Garia / Mahamayatala',
    '700107': 'Kasba / Ruby Connector / EM Bypass',
    '700001': 'BBD Bagh / Dalhousie (Central Business District)',
    '700017': 'Park Circus / Beckbagan',
    '700071': 'Park Circus / CIT Road',
    '700053': 'New Alipore / Taratala Road',
    '700040': 'Tollygunge / Regent Park',
    '700047': 'Naktala / Garia Main Road',
    '700078': 'Haltu / Jadavpur East',
    '700099': 'Mukundapur / EM Bypass Hospital Hub',
    '700100': 'Madurdaha / Anandapur'
  };

  const checkPincodeDelivery = (pincode: string) => {
    const cleanPin = pincode.trim();
    if (!/^\d{6}$/.test(cleanPin)) {
      return {
        serviceable: false,
        estimatedHours: '',
        message: 'Please enter a valid 6-digit Kolkata PIN code.'
      };
    }

    const pinNum = parseInt(cleanPin, 10);
    // Kolkata PIN codes are strictly in the 700001 - 700160 series
    const isKolkataPin = cleanPin.startsWith('700') && pinNum >= 700001 && pinNum <= 700160;

    if (isKolkataPin) {
      const areaName = kolkataAreas[cleanPin];
      const areaLabel = areaName ? ` (${areaName})` : ' (Kolkata)';
      return {
        serviceable: true,
        estimatedHours: 'Same-day 3-4 hours or scheduled delivery',
        message: `✓ Express Delivery Available to PIN ${cleanPin}${areaLabel}! Delivered cold from our Park Street atelier.`
      };
    } else {
      return {
        serviceable: false,
        estimatedHours: '',
        message: `Cake Paradise currently delivers exclusively across Kolkata & Greater Kolkata (PINs 700001 – 700160). PIN ${cleanPin} is outside our Kolkata service zone.`
      };
    }
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        categories,
        coupons,
        reviews,
        cart,
        wishlist,
        orders,
        customRequests,
        storeSettings,
        currentView,
        selectedProduct,
        quickViewProduct,
        searchQuery,
        filters,
        appliedCoupon,
        lastPlacedOrder,
        currentUser,
        isCartOpen,
        navigateTo,
        openQuickView,
        closeQuickView,
        setSearchQuery,
        setFilters,
        resetFilters,
        setIsCartOpen,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        applyCoupon,
        removeCoupon,
        getWeightMultiplier,
        calculateProductPrice,
        cartSubtotal,
        cartDiscount,
        cartDeliveryCharge,
        cartTax,
        cartTotal,
        toggleWishlist,
        isInWishlist,
        moveToCartFromWishlist,
        placeOrder,
        updateOrderStatus,
        getOrderById,
        getOrderByNumber,
        submitCustomRequest,
        addReview,
        login,
        logout,
        saveUserAddress,
        addProduct,
        updateProduct,
        deleteProduct,
        addCoupon,
        updateCoupon,
        updateStoreSettings,
        checkPincodeDelivery
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
