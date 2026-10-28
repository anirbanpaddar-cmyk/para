import React, { useState, useEffect } from 'react';
import { X, Star, Heart, ShoppingBag, Check, ShieldCheck, Clock } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CakeWeight } from '../types';

export const QuickViewModal: React.FC = () => {
  const { 
    quickViewProduct, 
    closeQuickView, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    calculateProductPrice,
    navigateTo 
  } = useShop();

  const product = quickViewProduct;

  const [selectedWeight, setSelectedWeight] = useState<CakeWeight>('500g');
  const [selectedFlavor, setSelectedFlavor] = useState<string>('');
  const [isEggless, setIsEggless] = useState<boolean>(true);
  const [cakeMessage, setCakeMessage] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedWeight(product.weightOptions[0] || '500g');
      setSelectedFlavor(product.flavor);
      setIsEggless(product.isEggless);
      setCakeMessage('');
      setQuantity(1);
      setAdded(false);
    }
  }, [product]);

  if (!product) return null;

  const currentPrice = calculateProductPrice(product, selectedWeight);
  const isFavorited = isInWishlist(product.id);

  const handleAdd = () => {
    addToCart(
      product,
      selectedWeight,
      selectedFlavor || product.flavor,
      isEggless,
      cakeMessage,
      quantity
    );
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      closeQuickView();
    }, 1200);
  };

  const handleViewFullPage = () => {
    closeQuickView();
    navigateTo('product-detail', product);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#F7E7EC] flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={closeQuickView}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 text-[#34252B] hover:text-[#7B2948] flex items-center justify-center shadow-md cursor-pointer transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image */}
        <div className="md:w-1/2 bg-[#FFFAF7] relative aspect-[4/3] md:aspect-auto">
          <img
            src={product.image || '/images/hero/cake-hero.png'}
            alt={
              product.slug === 'ferrero-rocher-cake'
                ? 'Artisan Ferrero Rocher Chocolate Hazelnut Cake with 24k Gold Accents'
                : `${product.name} - Premium Fresh Cake`
            }
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.src.includes('cake-hero.png')) {
                target.src = '/images/hero/cake-hero.png';
              }
            }}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded text-xs font-semibold text-[#7B2948] flex items-center gap-1.5 shadow-2xs">
            <span>{product.category}</span>
            {product.slug === 'ferrero-rocher-cake' && (
              <span className="text-[#8C5E2D] font-bold">• Royal Gold Edition</span>
            )}
          </div>
        </div>

        {/* Right Column: Details & Customization */}
        <div className="md:w-1/2 p-6 overflow-y-auto flex flex-col justify-between space-y-4">
          <div>
            {/* Header info */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#7B2948]">
                {product.category}
              </span>
              <div className="flex items-center gap-1 text-xs font-semibold text-[#34252B]">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>{product.rating}</span>
                <span className="text-gray-400">({product.reviewsCount} reviews)</span>
              </div>
            </div>

            <h2 className="font-serif text-2xl font-bold text-[#34252B] mt-1">
              {product.name}
            </h2>

            {/* Price display */}
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl font-bold font-serif text-[#7B2948] tabular-nums">
                ₹{currentPrice}
              </span>
              {product.salePrice && product.regularPrice > product.salePrice && (
                <span className="text-sm text-gray-400 line-through tabular-nums">
                  ₹{Math.round(product.regularPrice * (selectedWeight === '500g' ? 1 : 1.85))}
                </span>
              )}
            </div>

            <p className="text-xs text-[#553C46] mt-2 leading-relaxed">
              {product.description}
            </p>

            {/* Weight selector */}
            <div className="mt-4">
              <label className="block text-xs font-bold text-[#34252B] uppercase tracking-wide mb-1.5">
                Select Cake Weight
              </label>
              <div className="flex flex-wrap gap-2">
                {product.weightOptions.map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => setSelectedWeight(w)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedWeight === w
                        ? 'bg-[#7B2948] text-white shadow-xs'
                        : 'bg-[#FFFAF7] text-[#34252B] border border-[#E8D3DC] hover:border-[#7B2948]'
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            {/* Dietary Preference (Egg / Eggless) */}
            <div className="mt-4">
              <label className="block text-xs font-bold text-[#34252B] uppercase tracking-wide mb-1.5">
                Dietary Option
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsEggless(true)}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    isEggless
                      ? 'bg-emerald-50 text-emerald-800 border-2 border-emerald-600'
                      : 'bg-white text-gray-600 border border-gray-200'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  <span>100% Eggless</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsEggless(false)}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    !isEggless
                      ? 'bg-amber-50 text-amber-900 border-2 border-amber-800'
                      : 'bg-white text-gray-600 border border-gray-200'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-amber-800" />
                  <span>With Egg</span>
                </button>
              </div>
            </div>

            {/* Inscription Message on Cake */}
            <div className="mt-4">
              <label className="block text-xs font-bold text-[#34252B] uppercase tracking-wide mb-1">
                Message on Cake (Optional)
              </label>
              <input
                type="text"
                maxLength={35}
                placeholder="e.g., Happy Birthday Anya!"
                value={cakeMessage}
                onChange={(e) => setCakeMessage(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-[#FFFAF7] border border-[#E8D3DC] rounded-lg focus:outline-none focus:border-[#7B2948]"
              />
              <span className="text-[10px] text-gray-400 mt-0.5 block text-right">
                {cakeMessage.length}/35 characters
              </span>
            </div>

            {/* Quantity Stepper */}
            <div className="mt-4 flex items-center gap-3">
              <label className="text-xs font-bold text-[#34252B] uppercase tracking-wide">
                Quantity:
              </label>
              <div className="flex items-center border border-[#E8D3DC] rounded-lg bg-[#FFFAF7]">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2.5 py-1 text-sm font-bold text-[#34252B] hover:text-[#7B2948] cursor-pointer"
                >
                  -
                </button>
                <span className="px-3 py-1 text-xs font-bold tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2.5 py-1 text-sm font-bold text-[#34252B] hover:text-[#7B2948] cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-[#F7E7EC] space-y-2">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleAdd}
                className={`flex-1 py-3 px-4 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  added
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#7B2948] hover:bg-[#621F38] text-white shadow-md'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart (₹{currentPrice * quantity})</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                  isFavorited
                    ? 'border-[#7B2948] bg-[#F7E7EC] text-[#7B2948]'
                    : 'border-[#E8D3DC] hover:border-[#7B2948] text-gray-600'
                }`}
                title="Save to Wishlist"
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-[#7B2948]' : ''}`} />
              </button>
            </div>

            <button
              type="button"
              onClick={handleViewFullPage}
              className="w-full text-center text-xs font-semibold text-[#7B2948] hover:underline cursor-pointer py-1"
            >
              View Full Product Details & Allergen Info →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
