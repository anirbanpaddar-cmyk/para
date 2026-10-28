import React, { useState } from 'react';
import { Tag, Check, Copy, Sparkles, Gift, Percent, Calendar, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const OffersView: React.FC = () => {
  const { coupons, navigateTo, applyCoupon, setIsCartOpen } = useShop();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    applyCoupon(code);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  const curatedPromos = [
    {
      title: 'Birthday Celebration Special',
      badge: 'Special Occasion',
      desc: 'Get up to ₹400 OFF on designer and photo cakes when you celebrate with family and friends.',
      code: 'BIRTHDAY20',
      minSpend: '₹1,199',
      icon: Gift,
      color: 'bg-rose-50 text-rose-800 border-rose-200'
    },
    {
      title: 'First-Time Sweet Welcome',
      badge: 'New Customers',
      desc: '10% discount on your very first freshly baked handcrafted cake order from Cake Paradise.',
      code: 'WELCOME10',
      minSpend: '₹499',
      icon: Sparkles,
      color: 'bg-amber-50 text-amber-900 border-amber-200'
    },
    {
      title: 'Flat Sweet Fifty',
      badge: 'Everyday Deal',
      desc: 'Instant flat ₹50 OFF across the entire catalog including all cheesecakes & fruit cakes.',
      code: 'CAKE50',
      minSpend: '₹599',
      icon: Tag,
      color: 'bg-emerald-50 text-emerald-800 border-emerald-200'
    },
    {
      title: 'Party & Anniversary Combo',
      badge: 'Party Bulk',
      desc: 'Enjoy 15% OFF (up to ₹250) on 1.5kg and 2kg celebration centerpieces.',
      code: 'SWEET15',
      minSpend: '₹899',
      icon: Percent,
      color: 'bg-purple-50 text-purple-800 border-purple-200'
    }
  ];

  return (
    <div className="bg-[#FFFAF7] min-h-screen py-10 sm:py-16 border-b border-[#F7E7EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#7B2948] bg-[#F7E7EC] px-3.5 py-1 rounded-full">
            Sweet Savings & Discounts
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#34252B]">
            Exclusive Cake Paradise Offers
          </h1>
          <p className="text-xs sm:text-sm text-[#553C46]">
            Copy your coupon code and apply it during checkout for instant celebration savings!
          </p>
        </div>

        {/* Promo Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {curatedPromos.map((promo, idx) => {
            const Icon = promo.icon;
            const isCopied = copiedCode === promo.code;

            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#F7E7EC] p-6 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${promo.color}`}>
                      {promo.badge}
                    </span>
                    <Icon className="w-5 h-5 text-[#D6A85A]" />
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#34252B]">
                    {promo.title}
                  </h3>
                  <p className="text-xs text-[#553C46] mt-1.5 leading-relaxed">
                    {promo.desc}
                  </p>
                </div>

                {/* Coupon Code Strip */}
                <div className="mt-6 pt-4 border-t border-[#F7E7EC] flex items-center justify-between gap-3">
                  <div className="bg-[#FFFAF7] border border-dashed border-[#7B2948] px-3 py-1.5 rounded-lg flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5 text-[#7B2948]" />
                    <span className="font-mono font-bold text-sm tracking-wider text-[#7B2948]">
                      {promo.code}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopy(promo.code)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                      isCopied
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#7B2948] hover:bg-[#621F38] text-white shadow-2xs'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied & Applied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Free Delivery Banner */}
        <div className="bg-gradient-to-r from-[#7B2948] to-[#551C31] text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-serif text-2xl font-bold">
              FREE Express Delivery on Orders Over ₹999
            </h4>
            <p className="text-xs text-[#F7E7EC]/90 max-w-xl">
              No coupon required. Free doorstep delivery in temperature-controlled bakery chiller vans across all serviced PIN codes.
            </p>
          </div>
          <button
            onClick={() => navigateTo('shop')}
            className="px-6 py-3 bg-[#D6A85A] hover:bg-[#c29648] text-[#34252B] font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer shrink-0 shadow-xs"
          >
            Shop Now & Save
          </button>
        </div>

      </div>
    </div>
  );
};
