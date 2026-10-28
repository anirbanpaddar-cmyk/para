import React from 'react';
import { Check, Sparkles, Truck, Clock, ArrowRight, MapPin, Phone } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const OrderConfirmationView: React.FC = () => {
  const { lastPlacedOrder, orders, navigateTo } = useShop();
  const order = lastPlacedOrder || orders[0];

  if (!order) {
    return (
      <div className="bg-[#FFFAF7] min-h-screen py-20 px-4 text-center">
        <h2 className="font-serif text-2xl font-bold text-[#34252B]">No Recent Order Found</h2>
        <button
          onClick={() => navigateTo('shop')}
          className="mt-4 px-6 py-2.5 bg-[#7B2948] text-white text-xs font-bold uppercase rounded-lg"
        >
          Browse Shop
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#FFFAF7] min-h-screen py-12 sm:py-16 border-b border-[#F7E7EC]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Celebration Banner */}
        <div className="bg-white p-8 sm:p-10 rounded-2xl border border-[#F7E7EC] shadow-md text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#F7E7EC] text-[#7B2948] flex items-center justify-center mx-auto shadow-2xs">
            <Check className="w-8 h-8 text-[#7B2948]" />
          </div>

          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-[#7B2948] bg-[#F7E7EC] px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-[#D6A85A]" />
              <span>Celebration Order Confirmed!</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#34252B] pt-2">
              Thank You for Celebrating with Us!
            </h1>
            <p className="text-sm text-[#553C46] max-w-lg mx-auto">
              We have received your cake order. Our pastry chefs are preparing fresh ingredients to bake your order on your requested date.
            </p>
          </div>

          {/* Key Reference Badges */}
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <div className="bg-[#FFFAF7] border border-[#E8D3DC] px-4 py-2 rounded-xl text-left">
              <span className="text-[10px] text-gray-500 uppercase font-bold block">Order Number</span>
              <span className="text-sm font-bold font-mono text-[#7B2948]">{order.orderNumber}</span>
            </div>
            <div className="bg-[#FFFAF7] border border-[#E8D3DC] px-4 py-2 rounded-xl text-left">
              <span className="text-[10px] text-gray-500 uppercase font-bold block">Delivery Date</span>
              <span className="text-sm font-bold text-[#34252B]">{order.deliveryDate}</span>
            </div>
            <div className="bg-[#FFFAF7] border border-[#E8D3DC] px-4 py-2 rounded-xl text-left">
              <span className="text-[10px] text-gray-500 uppercase font-bold block">Time Slot</span>
              <span className="text-sm font-bold text-[#34252B]">{order.deliveryTimeSlot}</span>
            </div>
          </div>
        </div>

        {/* Order Status Timeline */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#F7E7EC] shadow-xs space-y-6">
          <h3 className="font-serif text-lg font-bold text-[#34252B]">
            Bakery Order Lifecycle
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              { label: 'Order Placed', active: true, desc: 'Received & verified' },
              { label: 'Confirmed', active: true, desc: 'Baker assigned' },
              { label: 'Baking Fresh', active: order.status === 'Preparing' || order.status === 'Out for Delivery' || order.status === 'Delivered', desc: 'Oven & decorating' },
              { label: 'Out for Delivery', active: order.status === 'Out for Delivery' || order.status === 'Delivered', desc: 'Cold courier on way' },
              { label: 'Delivered', active: order.status === 'Delivered', desc: 'Celebration enjoyed' }
            ].map((step, idx) => (
              <div 
                key={idx}
                className={`p-3 rounded-xl border text-center transition-all ${
                  step.active 
                    ? 'border-[#7B2948] bg-[#F7E7EC]/50 text-[#7B2948]' 
                    : 'border-gray-200 bg-gray-50 text-gray-400'
                }`}
              >
                <div className={`w-6 h-6 rounded-full mx-auto mb-1.5 flex items-center justify-center text-xs font-bold ${
                  step.active ? 'bg-[#7B2948] text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {idx + 1}
                </div>
                <p className="text-xs font-bold text-[#34252B]">{step.label}</p>
                <p className="text-[10px] text-gray-500 mt-0.5">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Receipt & Delivery Details Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Recipient Details */}
          <div className="bg-white p-6 rounded-2xl border border-[#F7E7EC] shadow-xs space-y-4">
            <h4 className="font-serif text-base font-bold text-[#34252B] flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#7B2948]" />
              <span>Delivery Recipient</span>
            </h4>
            <div className="text-xs text-[#553C46] space-y-1.5 leading-relaxed">
              <p className="font-bold text-sm text-[#34252B]">{order.customer.fullName}</p>
              <p>{order.customer.addressLine1}</p>
              {order.customer.area && <p>{order.customer.area}</p>}
              <p>{order.customer.city}, {order.customer.state} — {order.customer.pincode}</p>
              <p className="flex items-center gap-1.5 pt-1 text-[#34252B] font-medium">
                <Phone className="w-3.5 h-3.5 text-[#7B2948]" />
                <span>{order.customer.phone}</span>
              </p>
              {order.orderNotes && (
                <div className="mt-3 p-2.5 bg-[#FFFAF7] rounded-lg border border-[#E8D3DC]">
                  <span className="font-bold text-[#7B2948]">Notes: </span>
                  <span>{order.orderNotes}</span>
                </div>
              )}
            </div>
          </div>

          {/* Financial Breakdown */}
          <div className="bg-white p-6 rounded-2xl border border-[#F7E7EC] shadow-xs space-y-4">
            <h4 className="font-serif text-base font-bold text-[#34252B]">
              Payment Summary ({order.paymentMethod.toUpperCase()})
            </h4>

            <div className="space-y-2 text-xs text-[#553C46]">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between py-1 border-b border-[#F7E7EC]">
                  <div className="max-w-[200px] truncate">
                    <span className="font-semibold text-[#34252B]">{item.productName}</span>
                    <span className="text-[11px] text-gray-500 block">{item.weight} × {item.quantity}</span>
                  </div>
                  <span className="font-bold tabular-nums text-[#34252B]">₹{item.totalPrice}</span>
                </div>
              ))}

              <div className="flex justify-between pt-1">
                <span>Subtotal</span>
                <span className="tabular-nums">₹{order.subtotal}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Discount ({order.couponCode})</span>
                  <span className="tabular-nums">-₹{order.discount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Express Bakery Delivery</span>
                <span className="tabular-nums font-semibold">
                  {order.deliveryCharge === 0 ? 'FREE' : `₹${order.deliveryCharge}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>GST (5%)</span>
                <span className="tabular-nums">₹{order.tax}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#F7E7EC] text-base font-bold text-[#34252B]">
                <span className="font-serif">Total</span>
                <span className="font-serif text-[#7B2948] tabular-nums">₹{order.total}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => navigateTo('order-tracking')}
            className="w-full sm:w-auto px-8 py-3 bg-[#7B2948] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#621F38] transition-colors cursor-pointer shadow-xs"
          >
            Live Order Tracking
          </button>
          <button
            onClick={() => navigateTo('shop')}
            className="w-full sm:w-auto px-8 py-3 bg-white border border-[#E8D3DC] text-[#34252B] text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#F7E7EC] transition-colors cursor-pointer"
          >
            Order More Treats
          </button>
        </div>

      </div>
    </div>
  );
};
