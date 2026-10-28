import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, ArrowRight, Tag, Check, AlertCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    cartDiscount,
    cartDeliveryCharge,
    cartTax,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    navigateTo,
    storeSettings
  } = useShop();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponFeedback(res);
    if (res.success) {
      setCouponInput('');
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigateTo('checkout');
  };

  const amountNeededForFreeDelivery = Math.max(0, storeSettings.freeDeliveryThreshold - cartSubtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-[#F7E7EC]">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#F7E7EC] flex items-center justify-between bg-[#FFFAF7]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#7B2948]" />
              <h2 className="font-serif text-lg font-bold text-[#34252B]">
                Your Shopping Cart
              </h2>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#F7E7EC] text-[#7B2948]">
                {cart.reduce((sum, item) => sum + item.quantity, 0)} items
              </span>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-gray-500 hover:text-[#7B2948] rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free delivery tracker banner */}
          <div className="bg-[#F7E7EC]/60 px-4 py-2.5 border-b border-[#F7E7EC] text-xs">
            {amountNeededForFreeDelivery > 0 ? (
              <p className="text-[#553C46]">
                Add <span className="font-bold text-[#7B2948] tabular-nums">₹{amountNeededForFreeDelivery}</span> more for <span className="font-bold text-[#7B2948]">FREE Express Delivery</span>!
              </p>
            ) : (
              <p className="text-emerald-700 font-semibold flex items-center gap-1">
                <Check className="w-4 h-4" /> You unlocked FREE Express Delivery!
              </p>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#F7E7EC] text-[#7B2948] flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#34252B]">
                  Your cart is empty
                </h3>
                <p className="text-xs text-[#553C46] max-w-xs mx-auto">
                  Looks like you haven't added any sweet celebrations yet. Explore our handcrafted cakes catalog!
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo('shop');
                  }}
                  className="mt-3 px-5 py-2.5 bg-[#7B2948] hover:bg-[#621F38] text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-xs transition-colors cursor-pointer"
                >
                  Explore Cakes
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.id}
                  className="flex gap-3 pb-4 border-b border-[#F7E7EC] items-start"
                >
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-16 h-16 rounded-lg object-cover bg-[#F7E7EC] shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-serif text-sm font-bold text-[#34252B] truncate">
                        {item.productName}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Weight & Dietary */}
                    <div className="flex items-center gap-2 text-[11px] text-[#553C46] mt-0.5">
                      <span>{item.weight}</span>
                      <span>·</span>
                      <span>{item.isEggless ? '100% Eggless' : 'Regular'}</span>
                    </div>

                    {/* Message on Cake if any */}
                    {item.cakeMessage && (
                      <p className="text-[11px] text-[#7B2948] italic truncate mt-0.5">
                        "{item.cakeMessage}"
                      </p>
                    )}

                    {/* Quantity steppers & Line Total */}
                    <div className="flex items-center justify-between mt-2.5">
                      <div className="flex items-center border border-[#E8D3DC] rounded bg-[#FFFAF7]">
                        <button
                          onClick={() => updateCartQuantity(item.id, -1)}
                          className="px-2 py-0.5 text-xs font-bold text-[#34252B] hover:text-[#7B2948] cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-bold tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, 1)}
                          className="px-2 py-0.5 text-xs font-bold text-[#34252B] hover:text-[#7B2948] cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-bold font-serif text-[#7B2948] tabular-nums">
                          ₹{item.totalPrice}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#F7E7EC] bg-[#FFFAF7] space-y-3">
              
              {/* Coupon Code Input */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-lg text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                      <Tag className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{appliedCoupon.code} applied (-₹{cartDiscount})</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-rose-600 font-bold hover:underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Coupon code (e.g. WELCOME10)"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="w-full text-xs pl-8 pr-3 py-2 bg-white border border-[#E8D3DC] rounded-lg uppercase placeholder:normal-case focus:outline-none focus:border-[#7B2948]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3.5 py-2 bg-[#34252B] hover:bg-[#7B2948] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {couponFeedback && (
                  <p className={`text-[11px] mt-1.5 flex items-center gap-1 ${
                    couponFeedback.success ? 'text-emerald-700' : 'text-rose-600'
                  }`}>
                    {couponFeedback.success ? <Check className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                    {couponFeedback.message}
                  </p>
                )}
              </div>

              {/* Price Calculations Breakdown */}
              <div className="space-y-1.5 text-xs text-[#553C46] pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold tabular-nums text-[#34252B]">₹{cartSubtotal}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Coupon Discount</span>
                    <span className="font-semibold tabular-nums">-₹{cartDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery Charge</span>
                  <span className="font-semibold tabular-nums text-[#34252B]">
                    {cartDeliveryCharge === 0 ? (
                      <span className="text-emerald-700 font-bold">FREE</span>
                    ) : (
                      `₹${cartDeliveryCharge}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes (5% GST)</span>
                  <span className="font-semibold tabular-nums text-[#34252B]">₹{cartTax}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#34252B] pt-2 border-t border-[#F7E7EC]">
                  <span className="font-serif">Estimated Total</span>
                  <span className="font-serif text-[#7B2948] tabular-nums">₹{cartTotal}</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleCheckout}
                  className="w-full py-3.5 bg-[#7B2948] hover:bg-[#621F38] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-md hover:shadow-lg transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-between text-xs">
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="text-[#553C46] hover:text-[#7B2948] font-medium underline cursor-pointer"
                  >
                    Continue Shopping
                  </button>
                  <button
                    onClick={clearCart}
                    className="text-gray-400 hover:text-rose-600 text-[11px] cursor-pointer"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
