import React, { useState, useEffect } from 'react';
import { 
  Star, Heart, ShoppingBag, ArrowLeft, Check, 
  Clock, ShieldAlert, Sparkles, MapPin, Truck, ChevronRight 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CakeWeight, Product } from '../types';
import { ProductCard } from './ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { 
    selectedProduct, 
    products, 
    reviews, 
    addReview, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    calculateProductPrice, 
    navigateTo, 
    checkPincodeDelivery 
  } = useShop();

  const product = selectedProduct || products[0];

  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [selectedWeight, setSelectedWeight] = useState<CakeWeight>(
    product.weightOptions[0] || '500g'
  );
  const [selectedFlavor, setSelectedFlavor] = useState<string>(product.flavor);
  const [isEggless, setIsEggless] = useState<boolean>(product.isEggless);
  const [quantity, setQuantity] = useState<number>(1);
  const [cakeMessage, setCakeMessage] = useState<string>('');
  const [deliveryDate, setDeliveryDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState<string>('Evening (6:00 PM - 9:00 PM)');
  
  // Pincode checker state
  const [pincode, setPincode] = useState('');
  const [pincodeResult, setPincodeResult] = useState<{ serviceable: boolean; estimatedHours: string; message: string } | null>(null);

  // Review submission state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  // Added to cart feedback
  const [addedNotice, setAddedNotice] = useState(false);

  useEffect(() => {
    if (product) {
      setActiveImage(product.image || '/images/hero/cake-hero.png');
      setSelectedWeight(product.weightOptions[0] || '500g');
      setSelectedFlavor(product.flavor);
      setIsEggless(product.isEggless);
      setQuantity(1);
    }
  }, [product]);

  const currentPrice = calculateProductPrice(product, selectedWeight);
  const isFavorited = isInWishlist(product.id);
  const isFerreroRocher = product.slug === 'ferrero-rocher-cake' || product.id === 'prod-19';

  // Product reviews
  const productReviews = reviews.filter(r => r.productId === product.id);

  // Related products
  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.flavor === product.flavor))
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(
      product,
      selectedWeight,
      selectedFlavor,
      isEggless,
      cakeMessage,
      quantity
    );
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  const handleBuyNow = () => {
    addToCart(
      product,
      selectedWeight,
      selectedFlavor,
      isEggless,
      cakeMessage,
      quantity
    );
    navigateTo('checkout');
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode.trim()) return;
    const res = checkPincodeDelivery(pincode);
    setPincodeResult(res);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewComment.trim()) return;
    addReview({
      productId: product.id,
      author: reviewerName.trim(),
      rating: reviewRating,
      title: reviewTitle.trim() || 'Delicious Cake Experience',
      comment: reviewComment.trim()
    });
    setReviewSuccess(true);
    setShowReviewForm(false);
    setReviewerName('');
    setReviewTitle('');
    setReviewComment('');
    setTimeout(() => setReviewSuccess(false), 4000);
  };

  return (
    <div className="bg-[#FFFAF7] min-h-screen py-8 sm:py-12 border-b border-[#F7E7EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#553C46] mb-6">
          <button onClick={() => navigateTo('home')} className="hover:text-[#7B2948] cursor-pointer">
            Home
          </button>
          <span>/</span>
          <button onClick={() => navigateTo('shop')} className="hover:text-[#7B2948] cursor-pointer">
            Shop
          </button>
          <span>/</span>
          <span className="text-[#7B2948] font-semibold truncate max-w-xs">{product.name}</span>
        </div>

        {/* Back button */}
        <button
          onClick={() => navigateTo('shop')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7B2948] hover:text-[#621F38] mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Cake Catalog</span>
        </button>

        {/* Main Product Layout: Sticky Media (Left) & Contiguous Purchase Module (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Image Gallery (5 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className={`relative aspect-[4/3] rounded-2xl overflow-hidden bg-white shadow-sm transition-all ${
              isFerreroRocher 
                ? 'border-2 border-[#D6A85A] shadow-xl shadow-[#D6A85A]/15 ring-2 ring-[#8C5E2D]/20' 
                : 'border border-[#F7E7EC]'
            }`}>
              <img
                src={activeImage}
                alt={
                  isFerreroRocher 
                    ? 'Artisan Ferrero Rocher Chocolate Hazelnut Cake with 24k Gold Accents and Ganache Drip' 
                    : `${product.name} - Handcrafted Fresh Bakery Cake`
                }
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('cake-hero.png')) {
                    target.src = '/images/hero/cake-hero.png';
                  }
                }}
                className="w-full h-full object-cover transition-all duration-300"
              />
              
              {/* Ferrero Gold Badge overlay on image */}
              {isFerreroRocher && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-[#2A160C] via-[#5C2E14] to-[#D6A85A] text-amber-100 text-[11px] font-bold px-3 py-1 rounded-md uppercase tracking-wider shadow-md flex items-center gap-1.5 border border-amber-300/40">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Royal Gold Collection</span>
                </div>
              )}

              {product.isEggless && (
                <div className="absolute top-4 right-4 bg-white/95 px-2.5 py-1 rounded text-xs font-bold text-emerald-800 border border-emerald-300 shadow-2xs flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-600" />
                  <span>100% Eggless</span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.gallery && product.gallery.length > 1 && (
              <div className="flex gap-3">
                {product.gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(imgUrl)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImage === imgUrl
                        ? isFerreroRocher ? 'border-[#D6A85A] shadow-md scale-102' : 'border-[#7B2948] shadow-xs scale-102'
                        : 'border-[#F7E7EC] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`${product.name} Gallery Photo ${idx + 1}`}
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.src.includes('cake-hero.png')) {
                          target.src = '/images/hero/cake-hero.png';
                        }
                      }}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Quality and freshness promise card */}
            <div className={`p-4 rounded-xl border text-xs space-y-2 ${
              isFerreroRocher 
                ? 'bg-gradient-to-r from-[#FFFDF9] to-[#FDF8EE] border-[#D6A85A]/50 text-[#4A3222]' 
                : 'bg-white border-[#F7E7EC] text-[#553C46]'
            }`}>
              <div className="flex items-center gap-2 text-[#7B2948] font-bold">
                <Sparkles className="w-4 h-4 text-[#D6A85A]" />
                <span className={isFerreroRocher ? 'text-[#8C5E2D]' : 'text-[#7B2948]'}>
                  {isFerreroRocher ? 'Signature Artisan Confectionery' : 'Our Bakery Quality Standards'}
                </span>
              </div>
              <p>
                {isFerreroRocher 
                  ? 'Handcrafted with imported Italian Nutella, freshly slow-roasted hazelnuts, dark Belgian cocoa ganache drip, and crowned with whole Ferrero Rocher pralines and 24k edible gold flakes.'
                  : 'Each cake is baked completely from scratch on the morning of your chosen delivery date using pure cream butter, high-cocoa Belgian chocolate, and unbleached flour.'
                }
              </p>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module (7 cols) */}
          <div className={`p-6 sm:p-8 rounded-2xl border shadow-sm space-y-6 ${
            isFerreroRocher 
              ? 'bg-white border-2 border-[#D6A85A]/60 shadow-lg shadow-[#D6A85A]/10' 
              : 'bg-white border border-[#F7E7EC]'
          }`}>
            
            {/* Header info */}
            <div>
              {isFerreroRocher && (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#2A160C] via-[#5C2E14] to-[#D6A85A] text-amber-100 text-xs font-bold uppercase tracking-wider shadow-sm border border-amber-300/40 mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Royal Gold Collection • Authentic Ferrero Rocher & Nutella</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest font-bold text-[#7B2948]">
                  {product.category}
                </span>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#34252B]">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="text-sm">{product.rating}</span>
                  <span className="text-gray-400">({product.reviewsCount} customer reviews)</span>
                </div>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#34252B] mt-1.5">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-3">
                <span className="text-3xl font-bold font-serif text-[#7B2948] tabular-nums">
                  ₹{currentPrice}
                </span>
                {product.salePrice && product.regularPrice > product.salePrice && (
                  <span className="text-base text-gray-400 line-through tabular-nums">
                    ₹{Math.round(product.regularPrice * (selectedWeight === '500g' ? 1.0 : selectedWeight === '1kg' ? 1.85 : selectedWeight === '1.5kg' ? 2.7 : 3.5))}
                  </span>
                )}
                <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                  Inclusive of all taxes
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#553C46] leading-relaxed">
              {product.description}
            </p>

            {/* Customization Controls */}
            <div className="space-y-4 pt-4 border-t border-[#F7E7EC]">
              
              {/* 1. Weight Selection */}
              <div>
                <label className="block text-xs font-bold text-[#34252B] uppercase tracking-wide mb-2">
                  1. Select Cake Size / Weight: <span className="text-[#7B2948]">{selectedWeight}</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {product.weightOptions.map((weight) => {
                    const priceForWeight = calculateProductPrice(product, weight);
                    return (
                      <button
                        key={weight}
                        type="button"
                        onClick={() => setSelectedWeight(weight)}
                        className={`p-2.5 rounded-xl text-center border transition-all cursor-pointer ${
                          selectedWeight === weight
                            ? 'border-[#7B2948] bg-[#F7E7EC] text-[#7B2948] font-bold shadow-2xs'
                            : 'border-[#E8D3DC] hover:border-[#7B2948] text-[#34252B]'
                        }`}
                      >
                        <p className="text-xs font-bold">{weight}</p>
                        <p className="text-[11px] text-[#553C46] tabular-nums">₹{priceForWeight}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Eggless vs Regular */}
              <div>
                <label className="block text-xs font-bold text-[#34252B] uppercase tracking-wide mb-2">
                  2. Dietary Option
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setIsEggless(true)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                      isEggless
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow-2xs'
                        : 'border-[#E8D3DC] text-gray-600 hover:border-gray-400'
                    }`}
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                    <span>100% Eggless (Vegetarian)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsEggless(false)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                      !isEggless
                        ? 'border-amber-700 bg-amber-50 text-amber-950 shadow-2xs'
                        : 'border-[#E8D3DC] text-gray-600 hover:border-gray-400'
                    }`}
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-700" />
                    <span>With Egg</span>
                  </button>
                </div>
              </div>

              {/* 3. Message on Cake */}
              <div>
                <label className="block text-xs font-bold text-[#34252B] uppercase tracking-wide mb-1.5">
                  3. Inscription Message on Cake (Optional)
                </label>
                <input
                  type="text"
                  maxLength={35}
                  placeholder="e.g., Happy 25th Birthday Sarah!"
                  value={cakeMessage}
                  onChange={(e) => setCakeMessage(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-[#FFFAF7] border border-[#E8D3DC] rounded-xl focus:outline-none focus:border-[#7B2948]"
                />
                <span className="text-[10px] text-gray-400 mt-1 block text-right">
                  {cakeMessage.length}/35 characters
                </span>
              </div>

              {/* 4. Delivery Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#34252B] uppercase tracking-wide mb-1.5">
                    Delivery Date
                  </label>
                  <input
                    type="date"
                    value={deliveryDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-[#FFFAF7] border border-[#E8D3DC] rounded-xl focus:outline-none focus:border-[#7B2948]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#34252B] uppercase tracking-wide mb-1.5">
                    Preferred Time Slot
                  </label>
                  <select
                    value={deliveryTimeSlot}
                    onChange={(e) => setDeliveryTimeSlot(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-[#FFFAF7] border border-[#E8D3DC] rounded-xl focus:outline-none focus:border-[#7B2948]"
                  >
                    <option value="Morning (9:00 AM - 12:00 PM)">Morning (9:00 AM - 12:00 PM)</option>
                    <option value="Afternoon (1:00 PM - 5:00 PM)">Afternoon (1:00 PM - 5:00 PM)</option>
                    <option value="Evening (6:00 PM - 9:00 PM)">Evening (6:00 PM - 9:00 PM)</option>
                    <option value="Midnight (11:00 PM - 12:00 AM)">Midnight (11:00 PM - 12:00 AM)</option>
                  </select>
                </div>
              </div>

              {/* Pincode Availability Checker */}
              <div className="p-3.5 bg-[#FFFAF7] rounded-xl border border-[#F7E7EC]">
                <form onSubmit={handleCheckPincode} className="flex gap-2">
                  <div className="relative flex-1">
                    <MapPin className="w-4 h-4 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="Check delivery at PIN Code (e.g. 560038)"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-[#E8D3DC] rounded-lg focus:outline-none focus:border-[#7B2948]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-[#34252B] hover:bg-[#7B2948] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    Check
                  </button>
                </form>

                {pincodeResult && (
                  <p className={`text-[11px] mt-2 flex items-center gap-1.5 ${
                    pincodeResult.serviceable ? 'text-emerald-700' : 'text-rose-600'
                  }`}>
                    {pincodeResult.serviceable ? <Truck className="w-3.5 h-3.5 shrink-0" /> : <ShieldAlert className="w-3.5 h-3.5 shrink-0" />}
                    <span>{pincodeResult.message}</span>
                  </p>
                )}
              </div>

              {/* Quantity Stepper & Final Calculated Line Total */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-[#34252B] uppercase">Quantity:</span>
                  <div className="flex items-center border border-[#E8D3DC] rounded-lg bg-[#FFFAF7]">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1 text-sm font-bold text-[#34252B] hover:text-[#7B2948] cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-xs font-bold tabular-nums">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1 text-sm font-bold text-[#34252B] hover:text-[#7B2948] cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-[#553C46] block">Total Amount:</span>
                  <span className="text-xl font-bold font-serif text-[#7B2948] tabular-nums">
                    ₹{currentPrice * quantity}
                  </span>
                </div>
              </div>

              {/* Purchase Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className={`flex-1 py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      addedNotice
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#7B2948] hover:bg-[#621F38] text-white shadow-md'
                    }`}
                  >
                    {addedNotice ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-3.5 rounded-xl border transition-colors cursor-pointer ${
                      isFavorited
                        ? 'border-[#7B2948] bg-[#F7E7EC] text-[#7B2948]'
                        : 'border-[#E8D3DC] hover:border-[#7B2948] text-gray-600'
                    }`}
                    title="Add to Wishlist"
                  >
                    <Heart className={`w-5 h-5 ${isFavorited ? 'fill-[#7B2948]' : ''}`} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full py-3.5 bg-[#D6A85A] hover:bg-[#c29648] text-[#34252B] font-bold text-xs uppercase tracking-wider rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Buy Now with 1-Click
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* Tabbed Info: Ingredients, Allergens, Reviews */}
        <div className="mt-14 bg-white p-6 sm:p-8 rounded-2xl border border-[#F7E7EC] shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-8 border-b border-[#F7E7EC]">
            
            {/* Ingredients */}
            <div>
              <h3 className="font-serif font-bold text-base text-[#34252B] mb-3">
                Handcrafted Ingredients
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#553C46]">
                {product.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D6A85A]" />
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Allergens */}
            <div>
              <h3 className="font-serif font-bold text-base text-[#34252B] mb-3">
                Allergen Advisory
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.allergens.map((allg, i) => (
                  <span key={i} className="text-xs bg-[#FFFAF7] border border-[#E8D3DC] text-[#7B2948] font-medium px-2.5 py-1 rounded-md">
                    {allg}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-[#553C46] mt-2">
                Our kitchen also handles tree nuts, dairy, and wheat. Contact our pastry chefs via WhatsApp for custom dietary or allergen-free requests.
              </p>
            </div>
          </div>

          {/* Customer Reviews Section */}
          <div className="pt-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#34252B]">
                  Customer Reviews ({productReviews.length})
                </h3>
                <p className="text-xs text-[#553C46]">
                  Read authentic feedback from celebrations made sweeter with Cake Paradise.
                </p>
              </div>

              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="px-4 py-2 bg-[#F7E7EC] text-[#7B2948] font-bold text-xs uppercase tracking-wide rounded-lg hover:bg-[#7B2948] hover:text-white transition-colors cursor-pointer self-start sm:self-auto"
              >
                {showReviewForm ? 'Cancel Review' : 'Write a Review'}
              </button>
            </div>

            {reviewSuccess && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Thank you! Your review has been added to this cake.</span>
              </div>
            )}

            {/* Review Submission Form */}
            {showReviewForm && (
              <form onSubmit={handleSubmitReview} className="mb-8 p-5 bg-[#FFFAF7] rounded-xl border border-[#E8D3DC] space-y-4">
                <h4 className="font-serif text-sm font-bold text-[#34252B]">
                  Share Your Celebration Experience
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#34252B] mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={reviewerName}
                      onChange={(e) => setReviewerName(e.target.value)}
                      placeholder="e.g. Meera Roy"
                      className="w-full text-xs px-3 py-2 bg-white border border-[#E8D3DC] rounded-lg focus:outline-none focus:border-[#7B2948]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#34252B] mb-1">Rating *</label>
                    <select
                      value={reviewRating}
                      onChange={(e) => setReviewRating(Number(e.target.value))}
                      className="w-full text-xs px-3 py-2 bg-white border border-[#E8D3DC] rounded-lg focus:outline-none focus:border-[#7B2948]"
                    >
                      <option value={5}>5 Stars - Exceptional</option>
                      <option value={4}>4 Stars - Very Good</option>
                      <option value={3}>3 Stars - Good</option>
                      <option value={2}>2 Stars - Fair</option>
                      <option value={1}>1 Star - Poor</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#34252B] mb-1">Review Headline</label>
                  <input
                    type="text"
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                    placeholder="e.g. Absolutely delicious and moist!"
                    className="w-full text-xs px-3 py-2 bg-white border border-[#E8D3DC] rounded-lg focus:outline-none focus:border-[#7B2948]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#34252B] mb-1">Detailed Review *</label>
                  <textarea
                    rows={3}
                    required
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Tell us about the flavor, freshness, presentation, and delivery timing..."
                    className="w-full text-xs px-3 py-2 bg-white border border-[#E8D3DC] rounded-lg focus:outline-none focus:border-[#7B2948]"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#7B2948] text-white text-xs font-bold uppercase rounded-lg hover:bg-[#621F38] cursor-pointer"
                >
                  Submit Review
                </button>
              </form>
            )}

            {/* Reviews List */}
            {productReviews.length === 0 ? (
              <p className="text-xs text-gray-500 italic py-4">
                Be the first to review this cake! Share how it sweetened your celebration.
              </p>
            ) : (
              <div className="space-y-4">
                {productReviews.map((rev) => (
                  <div key={rev.id} className="p-4 bg-[#FFFAF7] rounded-xl border border-[#F7E7EC]">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#34252B]">{rev.author}</span>
                        {rev.isVerified && (
                          <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-medium">
                            Verified Customer
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-gray-400">{rev.date}</span>
                    </div>

                    <div className="flex items-center gap-1 mb-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < rev.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>

                    <h5 className="font-serif text-xs font-bold text-[#34252B]">{rev.title}</h5>
                    <p className="text-xs text-[#553C46] mt-1 leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#F7E7EC]">
              <h2 className="font-serif text-2xl font-bold text-[#34252B]">
                You May Also Love
              </h2>
              <button
                onClick={() => navigateTo('shop')}
                className="text-xs uppercase font-bold text-[#7B2948] hover:underline cursor-pointer"
              >
                View Full Shop →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
