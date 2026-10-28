import { Coupon } from '../types';

export const initialCoupons: Coupon[] = [
  {
    code: 'WELCOME10',
    discountPercent: 10,
    minOrder: 499,
    maxDiscount: 150,
    description: '10% OFF on your celebration order (Min. ₹499)',
    expiryDate: '2026-12-31',
    isActive: true
  },
  {
    code: 'CAKE50',
    discountFlat: 50,
    minOrder: 599,
    description: 'Flat ₹50 OFF on any fresh cake (Min. ₹599)',
    expiryDate: '2026-11-30',
    isActive: true
  },
  {
    code: 'SWEET15',
    discountPercent: 15,
    minOrder: 899,
    maxDiscount: 250,
    description: '15% OFF on premium & party cakes (Min. ₹899)',
    expiryDate: '2026-12-31',
    isActive: true
  },
  {
    code: 'BIRTHDAY20',
    discountPercent: 20,
    minOrder: 1199,
    maxDiscount: 400,
    description: '20% OFF Birthday Special discount (Min. ₹1,199)',
    expiryDate: '2026-12-31',
    isActive: true
  }
];
