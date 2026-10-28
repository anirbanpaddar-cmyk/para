import React, { useState } from 'react';
import { Sparkles, Phone, Mail, MapPin, Instagram, Facebook, Twitter, Heart, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ViewType } from '../types';

export const Footer: React.FC = () => {
  const { navigateTo, setFilters, storeSettings } = useShop();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNav = (view: ViewType) => {
    navigateTo(view);
  };

  const handleCategoryNav = (catName: string) => {
    setFilters(f => ({ ...f, category: catName }));
    navigateTo('shop');
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 4000);
  };

  return (
    <footer className="bg-[#34252B] text-white pt-16 pb-12 border-t border-[#7B2948]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand & Bio (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-white shadow-xl border-2 border-[#D6A85A] flex items-center justify-center shrink-0 p-1.5 transition-transform hover:scale-105">
                <img
                  src="/images/logo/cake-paradise-logo.png"
                  alt="Cake Paradise Original Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white block">
                  Cake Paradise
                </span>
                <span className="text-xs text-[#D6A85A] italic font-serif block mt-0.5">
                  Every Celebration Deserves a Beautiful Cake!
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed max-w-sm pt-1">
              Handcrafted Kolkata artisan pâtisserie baking fresh to order with Belgian cocoa, pure butter, and love. Same-day & midnight delivery across Kolkata.
            </p>

            <div className="space-y-2 text-xs text-gray-300 pt-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D6A85A] shrink-0" />
                <span>{storeSettings.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D6A85A] shrink-0" />
                <span>{storeSettings.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D6A85A] shrink-0" />
                <span>{storeSettings.email}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-3">
              <span className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#D6A85A] hover:text-[#34252B] flex items-center justify-center transition-all cursor-pointer text-gray-300 shadow-xs hover:scale-105">
                <Instagram className="w-4 h-4" />
              </span>
              <span className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#D6A85A] hover:text-[#34252B] flex items-center justify-center transition-all cursor-pointer text-gray-300 shadow-xs hover:scale-105">
                <Facebook className="w-4 h-4" />
              </span>
              <span className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#D6A85A] hover:text-[#34252B] flex items-center justify-center transition-all cursor-pointer text-gray-300 shadow-xs hover:scale-105">
                <Twitter className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#D6A85A] uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-white transition-colors cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('shop')} className="hover:text-white transition-colors cursor-pointer">
                  Shop All Cakes
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('categories')} className="hover:text-white transition-colors cursor-pointer">
                  Cake Categories
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('custom-cake')} className="hover:text-white transition-colors cursor-pointer">
                  Custom Cake Design
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('offers')} className="hover:text-white transition-colors cursor-pointer">
                  Offers & Coupons
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('order-tracking')} className="hover:text-white transition-colors cursor-pointer">
                  Track Delivery
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('admin')} className="text-[#D6A85A] font-semibold hover:underline cursor-pointer">
                  Store Admin Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Categories */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#D6A85A] uppercase tracking-wider">
              Popular Cakes
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <button onClick={() => handleCategoryNav('Birthday Cakes')} className="hover:text-white transition-colors cursor-pointer">
                  Birthday Cakes
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryNav('Chocolate Cakes')} className="hover:text-white transition-colors cursor-pointer">
                  Belgian Chocolate Truffle
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryNav('Red Velvet Cakes')} className="hover:text-white transition-colors cursor-pointer">
                  Red Velvet Cakes
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryNav('Cheesecakes')} className="hover:text-white transition-colors cursor-pointer">
                  Artisanal Cheesecakes
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryNav('Eggless Cakes')} className="hover:text-white transition-colors cursor-pointer">
                  100% Eggless Cakes
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryNav('Bento Cakes')} className="hover:text-white transition-colors cursor-pointer">
                  Mini Korean Bento Cakes
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryNav('Wedding Cakes')} className="hover:text-white transition-colors cursor-pointer">
                  Wedding Showpieces
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Customer Support & Policies */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#D6A85A] uppercase tracking-wider">
              Customer Support
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-white transition-colors cursor-pointer">
                  About Our Bakery
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-white transition-colors cursor-pointer">
                  Contact Atelier
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('account')} className="hover:text-white transition-colors cursor-pointer">
                  My Account & Orders
                </button>
              </li>
              <li className="pt-2 text-gray-400">
                <span>Shipping & Delivery Policy</span>
              </li>
              <li className="text-gray-400">
                <span>Cancellation & Return Policy</span>
              </li>
              <li className="text-gray-400">
                <span>Privacy & Terms</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Strip: Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>
            © {new Date().getFullYear()} Cake Paradise Pâtisserie. All rights reserved. Handcrafted with love.
          </p>
          <div className="flex items-center gap-1 text-[11px] text-gray-400">
            <span>Every Celebration Deserves a Beautiful Cake!</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
