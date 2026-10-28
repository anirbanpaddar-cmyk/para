import React, { useState } from 'react';
import { 
  ShieldCheck, ArrowLeft, Check, AlertCircle, 
  CreditCard, Smartphone, Banknote, Calendar, Clock, MapPin 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CustomerAddress } from '../types';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    cartDiscount,
    cartDeliveryCharge,
    cartTax,
    cartTotal,
    appliedCoupon,
    currentUser,
    placeOrder,
    navigateTo,
    storeSettings,
    checkPincodeDelivery
  } = useShop();

  // If cart is empty, route back to shop
  if (cart.length === 0) {
    return (
      <div className="bg-[#FFFAF7] min-h-screen py-20 px-4 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl border border-[#F7E7EC] shadow-sm space-y-4">
          <h2 className="font-serif text-2xl font-bold text-[#34252B]">
            Your Cart is Empty
          </h2>
          <p className="text-xs text-[#553C46]">
            Please add your favorite cakes to the cart before proceeding to checkout.
          </p>
          <button
            onClick={() => navigateTo('shop')}
            className="px-6 py-3 bg-[#7B2948] text-white text-xs font-bold uppercase rounded-lg hover:bg-[#621F38] cursor-pointer"
          >
            Explore Cake Catalog
          </button>
        </div>
      </div>
    );
  }

  // Address form states
  const defaultAddr = currentUser?.addresses?.[0];
  const [fullName, setFullName] = useState(defaultAddr?.fullName || currentUser?.name || '');
  const [email, setEmail] = useState(defaultAddr?.email || currentUser?.email || '');
  const [phone, setPhone] = useState(defaultAddr?.phone || currentUser?.phone || '');
  const [addressLine1, setAddressLine1] = useState(defaultAddr?.addressLine1 || '');
  const [area, setArea] = useState(defaultAddr?.area || '');
  const [city, setCity] = useState(defaultAddr?.city || 'Bengaluru');
  const [state, setState] = useState(defaultAddr?.state || 'Karnataka');
  const [pincode, setPincode] = useState(defaultAddr?.pincode || '560038');

  // Delivery options
  const [deliveryDate, setDeliveryDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState('Evening (6:00 PM - 9:00 PM)');
  const [orderNotes, setOrderNotes] = useState('');

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi' | 'card'>('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pincode validation state
  const pincodeCheck = checkPincodeDelivery(pincode);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !addressLine1 || !pincode) {
      alert('Please complete all required delivery address fields.');
      return;
    }

    setIsSubmitting(true);

    const customerAddress: CustomerAddress = {
      fullName,
      email: email || 'guest@example.com',
      phone,
      addressLine1,
      area,
      city,
      state,
      pincode
    };

    setTimeout(() => {
      placeOrder({
        customer: customerAddress,
        deliveryDate,
        deliveryTimeSlot,
        orderNotes,
        paymentMethod
      });
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="bg-[#FFFAF7] min-h-screen py-10 sm:py-14 border-b border-[#F7E7EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center gap-2 text-xs text-[#553C46] mb-4">
          <button onClick={() => navigateTo('home')} className="hover:text-[#7B2948] cursor-pointer">Home</button>
          <span>/</span>
          <button onClick={() => navigateTo('shop')} className="hover:text-[#7B2948] cursor-pointer">Shop</button>
          <span>/</span>
          <span className="text-[#7B2948] font-semibold">WooCommerce Checkout</span>
        </div>

        <button
          onClick={() => navigateTo('shop')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7B2948] hover:text-[#621F38] mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Continue Shopping</span>
        </button>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#34252B] mb-2">
          Checkout & Celebration Details
        </h1>
        <p className="text-xs sm:text-sm text-[#553C46] mb-8">
          Fill in your recipient details and delivery slot. All cakes travel in temperature-controlled bakery transport.
        </p>

        {/* 2-Column Form & Order Summary */}
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Details (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Customer & Delivery Address */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#F7E7EC] shadow-sm space-y-4">
              <h2 className="font-serif text-lg font-bold text-[#34252B] pb-2 border-b border-[#F7E7EC] flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#7B2948]" />
                <span>Delivery & Recipient Address</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#34252B] uppercase mb-1">
                    Recipient Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Rajesh Kumar"
                    className="w-full text-xs px-3.5 py-2.5 bg-[#FFFAF7] border border-[#E8D3DC] rounded-xl focus:outline-none focus:border-[#7B2948]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#34252B] uppercase mb-1">
                    Mobile Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full text-xs px-3.5 py-2.5 bg-[#FFFAF7] border border-[#E8D3DC] rounded-xl focus:outline-none focus:border-[#7B2948]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#34252B] uppercase mb-1">
                  Email Address (For receipt & status updates)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. rajesh@example.com"
                  className="w-full text-xs px-3.5 py-2.5 bg-[#FFFAF7] border border-[#E8D3DC] rounded-xl focus:outline-none focus:border-[#7B2948]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#34252B] uppercase mb-1">
                  House / Flat / Apartment / Landmark *
                </label>
                <input
                  type="text"
                  required
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                  placeholder="e.g. Flat 302, Royal Palms, Behind Metro Station"
                  className="w-full text-xs px-3.5 py-2.5 bg-[#FFFAF7] border border-[#E8D3DC] rounded-xl focus:outline-none focus:border-[#7B2948]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#34252B] uppercase mb-1">
                    Area / Sector
                  </label>
                  <input
                    type="text"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="e.g. Park Street / Salt Lake"
                    className="w-full text-xs px-3 py-2 bg-[#FFFAF7] border border-[#E8D3DC] rounded-xl focus:outline-none focus:border-[#7B2948]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#34252B] uppercase mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Kolkata"
                    className="w-full text-xs px-3 py-2 bg-[#FFFAF7] border border-[#E8D3DC] rounded-xl focus:outline-none focus:border-[#7B2948]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#34252B] uppercase mb-1">
                    Kolkata PIN Code (6 Digits) *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="e.g. 700016"
                    className="w-full text-xs px-3 py-2 bg-[#FFFAF7] border border-[#E8D3DC] rounded-xl focus:outline-none focus:border-[#7B2948]"
                  />
                </div>
              </div>

              {pincodeCheck && (
                <div className={`p-2.5 rounded-lg text-xs flex items-center gap-2 ${
                  pincodeCheck.serviceable ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'
                }`}>
                  <Check className="w-4 h-4 shrink-0" />
                  <span>{pincodeCheck.message}</span>
                </div>
              )}
            </div>

            {/* 2. Delivery Scheduling */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#F7E7EC] shadow-sm space-y-4">
              <h2 className="font-serif text-lg font-bold text-[#34252B] pb-2 border-b border-[#F7E7EC] flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#7B2948]" />
                <span>Celebration Date & Time Slot</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#34252B] uppercase mb-1">
                    Delivery Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={deliveryDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-[#FFFAF7] border border-[#E8D3DC] rounded-xl focus:outline-none focus:border-[#7B2948]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#34252B] uppercase mb-1">
                    Time Window
                  </label>
                  <select
                    value={deliveryTimeSlot}
                    onChange={(e) => setDeliveryTimeSlot(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-[#FFFAF7] border border-[#E8D3DC] rounded-xl focus:outline-none focus:border-[#7B2948]"
                  >
                    <option value="Morning (9:00 AM - 12:00 PM)">Morning (9:00 AM - 12:00 PM)</option>
                    <option value="Afternoon (1:00 PM - 5:00 PM)">Afternoon (1:00 PM - 5:00 PM)</option>
                    <option value="Evening (6:00 PM - 9:00 PM)">Evening (6:00 PM - 9:00 PM)</option>
                    <option value="Midnight (11:00 PM - 12:00 AM)">Midnight (11:00 PM - 12:00 AM) - Special Surprise</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#34252B] uppercase mb-1">
                  Order Notes / Delivery Instructions (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Ring the bell twice, surprise party, please carry birthday candles & cake knife..."
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  className="w-full text-xs px-3.5 py-2 bg-[#FFFAF7] border border-[#E8D3DC] rounded-xl focus:outline-none focus:border-[#7B2948]"
                />
              </div>
            </div>

            {/* 3. Payment Method */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#F7E7EC] shadow-sm space-y-4">
              <h2 className="font-serif text-lg font-bold text-[#34252B] pb-2 border-b border-[#F7E7EC] flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#7B2948]" />
                <span>Payment Method</span>
              </h2>

              <div className="space-y-3">
                {/* Cash on delivery */}
                {storeSettings.codEnabled && (
                  <label className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                    paymentMethod === 'cod' ? 'border-[#7B2948] bg-[#F7E7EC]/40' : 'border-[#E8D3DC]'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="mt-1 accent-[#7B2948]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 font-bold text-xs text-[#34252B]">
                        <Banknote className="w-4 h-4 text-[#7B2948]" />
                        <span>Cash on Delivery (COD)</span>
                      </div>
                      <p className="text-[11px] text-[#553C46] mt-0.5">
                        Pay in cash or scan QR upon physical cake arrival. No extra fee.
                      </p>
                    </div>
                  </label>
                )}

                {/* UPI payment */}
                <label className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'upi' ? 'border-[#7B2948] bg-[#F7E7EC]/40' : 'border-[#E8D3DC]'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                    className="mt-1 accent-[#7B2948]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 font-bold text-xs text-[#34252B]">
                      <Smartphone className="w-4 h-4 text-[#7B2948]" />
                      <span>Instant UPI (GPay, PhonePe, Paytm)</span>
                      <span className="text-[10px] font-semibold bg-[#F7E7EC] text-[#7B2948] px-1.5 py-0.5 rounded">
                        Demo Mode
                      </span>
                    </div>
                    <p className="text-[11px] text-[#553C46] mt-0.5">
                      Store VPA: <span className="font-mono font-semibold">{storeSettings.upiId}</span>. Simulates instant payment confirmation.
                    </p>
                  </div>
                </label>

                {/* Online Cards / Netbanking */}
                <label className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'card' ? 'border-[#7B2948] bg-[#F7E7EC]/40' : 'border-[#E8D3DC]'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="mt-1 accent-[#7B2948]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 font-bold text-xs text-[#34252B]">
                      <CreditCard className="w-4 h-4 text-[#7B2948]" />
                      <span>Credit / Debit Card / Netbanking</span>
                      <span className="text-[10px] font-semibold bg-[#F7E7EC] text-[#7B2948] px-1.5 py-0.5 rounded">
                        Demo Sandbox
                      </span>
                    </div>
                    <p className="text-[11px] text-[#553C46] mt-0.5">
                      Secure payment simulation for test store environment.
                    </p>
                  </div>
                </label>
              </div>

              {/* Demo Mode Notice Banner required by prompt */}
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Store Sandbox Notice:</span> Online payments operate in safe Demo Mode. Your order will be placed, confirmed, and saved to your account order history without charging your real card.
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Order Summary & Placement (5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-2xl border border-[#F7E7EC] shadow-sm space-y-6 sticky top-28">
            <h3 className="font-serif text-lg font-bold text-[#34252B] pb-2 border-b border-[#F7E7EC]">
              Order Summary ({cart.reduce((s, i) => s + i.quantity, 0)} items)
            </h3>

            {/* Item list preview */}
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3 text-xs">
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-12 h-12 rounded-lg object-cover bg-[#F7E7EC] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-serif font-bold text-[#34252B] truncate">{item.productName}</h5>
                    <p className="text-[11px] text-[#553C46]">
                      {item.weight} · {item.isEggless ? 'Eggless' : 'Regular'} × {item.quantity}
                    </p>
                    {item.cakeMessage && (
                      <p className="text-[10px] text-[#7B2948] italic truncate">"{item.cakeMessage}"</p>
                    )}
                  </div>
                  <div className="text-right font-bold text-[#34252B] tabular-nums">
                    ₹{item.totalPrice}
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations breakdown */}
            <div className="pt-4 border-t border-[#F7E7EC] space-y-2 text-xs text-[#553C46]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#34252B] tabular-nums">₹{cartSubtotal}</span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Coupon Discount ({appliedCoupon?.code})</span>
                  <span className="font-semibold tabular-nums">-₹{cartDiscount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Express Bakery Delivery</span>
                <span className="font-semibold tabular-nums text-[#34252B]">
                  {cartDeliveryCharge === 0 ? <span className="text-emerald-700 font-bold">FREE</span> : `₹${cartDeliveryCharge}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Goods & Services Tax (5% GST)</span>
                <span className="font-semibold tabular-nums text-[#34252B]">₹{cartTax}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-[#34252B] pt-3 border-t border-[#F7E7EC]">
                <span className="font-serif">Total Payable</span>
                <span className="font-serif text-[#7B2948] tabular-nums">₹{cartTotal}</span>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-[#7B2948] hover:bg-[#621F38] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Confirming Order...</span>
              ) : (
                <span>Place Order & Sweeten Celebration (₹{cartTotal})</span>
              )}
            </button>

            <div className="flex items-center gap-2 text-[11px] text-gray-500 justify-center">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Safe & Contactless Fresh Delivery Guaranteed</span>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
