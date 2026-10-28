import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Star, Check, Sparkles } from 'lucide-react';
import { Product, CakeWeight } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    navigateTo, 
    openQuickView, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    calculateProductPrice 
  } = useShop();

  const [selectedWeight, setSelectedWeight] = useState<CakeWeight>(
    product.weightOptions[0] || '500g'
  );
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const currentPrice = calculateProductPrice(product, selectedWeight);
  const isFerreroRocher = product.slug === 'ferrero-rocher-cake' || product.id === 'prod-19';
  
  // Calculate original price for chosen weight if on sale
  const originalPrice = product.salePrice && product.regularPrice > product.salePrice
    ? Math.round(product.regularPrice * (selectedWeight === '500g' ? 1.0 : selectedWeight === '1kg' ? 1.85 : selectedWeight === '1.5kg' ? 2.7 : 3.5))
    : null;

  const discountAmount = originalPrice ? originalPrice - currentPrice : null;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(
      product,
      selectedWeight,
      product.flavor,
      product.isEggless,
      '',
      1
    );
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 2000);
  };

  const handleCardClick = () => {
    navigateTo('product-detail', product);
  };

  return (
    <div 
      onClick={handleCardClick}
      className={`group relative bg-white rounded-2xl overflow-hidden transition-all duration-300 ease-out flex flex-col justify-between text-left cursor-pointer transform hover:-translate-y-2 will-change-transform ${
        isFerreroRocher 
          ? 'border-2 border-[#D6A85A] shadow-md hover:shadow-2xl hover:shadow-[#D6A85A]/30 ring-1 ring-[#8C5E2D]/20 hover:ring-[#D6A85A]' 
          : product.isBestseller
          ? 'border border-[#E8D3DC] shadow-xs hover:shadow-[0_14px_30px_rgba(214,168,90,0.25)] hover:border-[#D6A85A]/70'
          : 'border border-[#F7E7EC] shadow-2xs hover:shadow-xl hover:border-[#E8D3DC]'
      }`}
    >
      {/* Top Media Area with Smooth Image Zoom */}
      <div className={`relative aspect-[4/3] w-full overflow-hidden ${isFerreroRocher ? 'bg-[#2A160C]/5' : 'bg-[#FFFAF7]'}`}>
        <img
          src={product.image || '/images/hero/cake-hero.png'}
          alt={
            isFerreroRocher
              ? 'Artisan Ferrero Rocher Chocolate Hazelnut Cake with 24k Gold Leaf Accents'
              : `${product.name} - Handcrafted Fresh Bakery Cake`
          }
          loading="lazy"
          onError={(e) => {
            const target = e.currentTarget;
            if (!target.src.includes('cake-hero.png')) {
              target.src = '/images/hero/cake-hero.png';
            }
          }}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />

        {/* Floating Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10">
          {isFerreroRocher && (
            <span className="bg-gradient-to-r from-[#3B1F0E] via-[#633518] to-[#D6A85A] text-[#FFF9F0] text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider shadow-sm flex items-center gap-1 border border-amber-300/40">
              <Sparkles className="w-2.5 h-2.5 text-amber-300" />
              Royal Gold Edition
            </span>
          )}
          {discountAmount && discountAmount > 0 && (
            <span className="bg-[#7B2948] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm tracking-wide shadow-xs uppercase">
              Save ₹{discountAmount}
            </span>
          )}
          {product.isBestseller && (
            <span className="bg-[#D6A85A] text-[#34252B] text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide shadow-xs flex items-center gap-1">
              <span>★ Bestseller</span>
            </span>
          )}
        </div>

        {/* Dietary Icon: Green dot inside square for 100% Eggless */}
        <div className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-xs p-1 rounded-sm shadow-xs z-10" title={product.isEggless ? '100% Eggless' : 'Contains Egg'}>
          {product.isEggless ? (
            <div className="w-3.5 h-3.5 border border-emerald-600 flex items-center justify-center p-0.5" title="100% Pure Vegetarian / Eggless">
              <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full" />
            </div>
          ) : (
            <div className="w-3.5 h-3.5 border border-amber-800 flex items-center justify-center p-0.5" title="Contains Egg">
              <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[6px] border-b-amber-800" />
            </div>
          )}
        </div>

        {/* Floating Action Buttons: Always visible on mobile, smooth slide-in on hover for desktop */}
        <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 z-10 opacity-100 sm:opacity-90 sm:group-hover:opacity-100 sm:translate-y-1 sm:group-hover:translate-y-0 transition-all duration-200">
          {/* Wishlist button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className="w-8 h-8 rounded-full bg-white/95 text-[#34252B] hover:text-[#7B2948] hover:scale-110 active:scale-95 flex items-center justify-center shadow-md transition-all duration-150 cursor-pointer"
            aria-label="Save to Wishlist"
            title="Wishlist"
          >
            <Heart className={`w-4 h-4 transition-colors ${isFavorited ? 'text-[#7B2948] fill-[#7B2948]' : ''}`} />
          </button>

          {/* Quick View */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openQuickView(product);
            }}
            className="w-8 h-8 rounded-full bg-white/95 text-[#34252B] hover:text-[#7B2948] hover:scale-110 active:scale-95 flex items-center justify-center shadow-md transition-all duration-150 cursor-pointer"
            aria-label="Quick View"
            title="Quick view"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-[#553C46] mb-1">
            <span className="uppercase tracking-wider font-semibold text-[11px] text-[#7B2948]">
              {product.category}
            </span>
            <div className="flex items-center gap-1 font-semibold tabular-nums text-[#34252B]">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{product.rating}</span>
              <span className="text-gray-400 font-normal">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-serif font-bold text-base text-[#34252B] group-hover:text-[#7B2948] transition-colors line-clamp-1 mb-1">
            {product.name}
          </h3>

          <p className="text-xs text-[#553C46] line-clamp-2 mb-3">
            {product.description}
          </p>
        </div>

        {/* Options & Price Section */}
        <div className="pt-2 border-t border-[#F7E7EC]/70">
          {/* Weight Selector */}
          <div className="flex items-center gap-1.5 mb-3" onClick={(e) => e.stopPropagation()}>
            <span className="text-[11px] font-medium text-gray-500 mr-1">Weight:</span>
            {product.weightOptions.map((weight) => (
              <button
                key={weight}
                type="button"
                onClick={() => setSelectedWeight(weight)}
                className={`text-[11px] font-semibold px-2 py-0.5 rounded transition-all cursor-pointer ${
                  selectedWeight === weight
                    ? 'bg-[#7B2948] text-white shadow-2xs'
                    : 'bg-[#FFFAF7] text-[#34252B] border border-[#E8D3DC] hover:border-[#7B2948]'
                }`}
              >
                {weight}
              </button>
            ))}
          </div>

          {/* Pricing & Add to Cart button */}
          <div className="flex items-center justify-between gap-2 mt-1">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-bold font-serif text-[#7B2948] tabular-nums">
                  ₹{currentPrice}
                </span>
                {originalPrice && (
                  <span className="text-xs text-gray-400 line-through tabular-nums">
                    ₹{originalPrice}
                  </span>
                )}
              </div>
              <span className="text-[10px] text-[#553C46]">
                {product.isEggless ? '100% Eggless' : 'Regular Cake'}
              </span>
            </div>

            <button
              type="button"
              onClick={handleQuickAdd}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-1.5 shrink-0 transform active:scale-95 hover:scale-103 shadow-xs hover:shadow-md ${
                isAddedRecently
                  ? 'bg-emerald-600 text-white shadow-emerald-700/20'
                  : 'bg-[#7B2948] hover:bg-[#621F38] text-white hover:ring-2 hover:ring-[#D6A85A]/40'
              }`}
            >
              {isAddedRecently ? (
                <>
                  <Check className="w-3.5 h-3.5 animate-bounce" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 transition-transform group-hover:rotate-6" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
