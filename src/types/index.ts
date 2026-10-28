export type CakeWeight = '500g' | '1kg' | '1.5kg' | '2kg';

export interface Product {
  id: string;
  name: string;
  slug: string;
  regularPrice: number;
  salePrice?: number;
  rating: number;
  reviewsCount: number;
  category: string;
  flavor: string;
  weightOptions: CakeWeight[];
  isEggless: boolean;
  egglessAvailable: boolean;
  isBestseller?: boolean;
  isNew?: boolean;
  image: string;
  gallery: string[];
  description: string;
  ingredients: string[];
  allergens: string[];
  stock: number;
  isPublished: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  image: string;
  weight: CakeWeight;
  flavor: string;
  isEggless: boolean;
  cakeMessage?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  count: number;
}

export interface Coupon {
  code: string;
  discountPercent?: number;
  discountFlat?: number;
  minOrder: number;
  maxDiscount?: number;
  description: string;
  expiryDate: string;
  isActive: boolean;
}

export interface CustomerAddress {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
}

export type OrderStatus = 'Pending' | 'Confirmed' | 'Preparing' | 'Out for Delivery' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customer: CustomerAddress;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryCharge: number;
  tax: number;
  total: number;
  couponCode?: string;
  deliveryDate: string;
  deliveryTimeSlot: string;
  orderNotes?: string;
  paymentMethod: 'cod' | 'upi' | 'card';
  paymentStatus: 'Pending' | 'Paid' | 'Demo Completed';
  status: OrderStatus;
}

export interface CustomCakeRequest {
  id: string;
  referenceNumber: string;
  customerName: string;
  phone: string;
  email: string;
  shape: string;
  size: string;
  flavor: string;
  isEggless: boolean;
  creamColor: string;
  theme: string;
  occasion: string;
  cakeMessage: string;
  deliveryDate: string;
  deliveryTimeSlot: string;
  specialInstructions?: string;
  referenceImageUrl?: string;
  estimatedPrice: number;
  status: 'Received' | 'Under Review' | 'Baker Assigned' | 'Approved';
  createdAt: string;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  isVerified: boolean;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  freeDeliveryThreshold: number;
  standardDeliveryCharge: number;
  taxRatePercent: number;
  codEnabled: boolean;
  upiId: string;
  whatsappNumber: string;
}

export type ViewType = 
  | 'home' 
  | 'shop' 
  | 'categories' 
  | 'product-detail'
  | 'custom-cake' 
  | 'cart' 
  | 'checkout' 
  | 'order-confirmation'
  | 'order-tracking' 
  | 'wishlist' 
  | 'account' 
  | 'offers' 
  | 'about' 
  | 'contact' 
  | 'admin';
