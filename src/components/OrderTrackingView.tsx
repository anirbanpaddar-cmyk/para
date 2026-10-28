import React, { useState } from 'react';
import { Search, MapPin, Truck, Check, Clock, AlertCircle, Package } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Order } from '../types';

export const OrderTrackingView: React.FC = () => {
  const { orders, getOrderByNumber, checkPincodeDelivery, navigateTo } = useShop();

  const [searchOrderNumber, setSearchOrderNumber] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(orders[0] || null);
  const [searchError, setSearchError] = useState('');

  // Pincode checker state
  const [pincode, setPincode] = useState('');
  const [pincodeResult, setPincodeResult] = useState<{ serviceable: boolean; estimatedHours: string; message: string } | null>(null);

  const handleSearchOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError('');
    if (!searchOrderNumber.trim()) return;

    const found = getOrderByNumber(searchOrderNumber);
    if (found) {
      setSearchedOrder(found);
    } else {
      setSearchError(`Order number "${searchOrderNumber}" not found. Please verify the code on your SMS or receipt.`);
    }
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode.trim()) return;
    const res = checkPincodeDelivery(pincode);
    setPincodeResult(res);
  };

  return (
    <div className="bg-[#FFFAF7] min-h-screen py-10 sm:py-16 border-b border-[#F7E7EC]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Title */}
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#7B2948] bg-[#F7E7EC] px-3.5 py-1 rounded-full">
            Real-Time Logistics
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#34252B]">
            Track Your Celebration Cake
          </h1>
          <p className="text-xs sm:text-sm text-[#553C46] max-w-lg mx-auto">
            Check the status of your freshly baked cake from oven preparation to doorstep delivery.
          </p>
        </div>

        {/* 2 Search Boxes: 1. Order ID Lookup, 2. Pincode Availability Checker */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Order ID Lookup */}
          <div className="bg-white p-6 rounded-2xl border border-[#F7E7EC] shadow-sm space-y-3">
            <h3 className="font-serif font-bold text-base text-[#34252B] flex items-center gap-2">
              <Package className="w-5 h-5 text-[#7B2948]" />
              <span>Track Existing Order</span>
            </h3>
            <form onSubmit={handleSearchOrder} className="flex gap-2">
              <input
                type="text"
                placeholder="Enter Order ID (e.g. CP-94812)"
                value={searchOrderNumber}
                onChange={(e) => setSearchOrderNumber(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 bg-[#FFFAF7] border border-[#E8D3DC] rounded-xl focus:outline-none focus:border-[#7B2948]"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-[#7B2948] hover:bg-[#621F38] text-white text-xs font-bold uppercase rounded-xl transition-colors cursor-pointer shrink-0"
              >
                Track
              </button>
            </form>
            {searchError && (
              <p className="text-xs text-rose-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{searchError}</span>
              </p>
            )}
          </div>

          {/* Delivery Availability by PIN code */}
          <div className="bg-white p-6 rounded-2xl border border-[#F7E7EC] shadow-sm space-y-3">
            <h3 className="font-serif font-bold text-base text-[#34252B] flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#7B2948]" />
              <span>PIN Code Serviceability</span>
            </h3>
            <form onSubmit={handleCheckPincode} className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                placeholder="Enter 6-digit PIN (e.g. 560038)"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 bg-[#FFFAF7] border border-[#E8D3DC] rounded-xl focus:outline-none focus:border-[#7B2948]"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-[#34252B] hover:bg-[#7B2948] text-white text-xs font-bold uppercase rounded-xl transition-colors cursor-pointer shrink-0"
              >
                Check
              </button>
            </form>
            {pincodeResult && (
              <p className={`text-xs flex items-center gap-1.5 ${
                pincodeResult.serviceable ? 'text-emerald-700' : 'text-rose-600'
              }`}>
                {pincodeResult.serviceable ? <Check className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                <span>{pincodeResult.message}</span>
              </p>
            )}
          </div>

        </div>

        {/* Selected / Searched Order Progress Display */}
        {searchedOrder && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#F7E7EC] shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#F7E7EC]">
              <div>
                <span className="text-xs uppercase font-bold text-[#7B2948]">Active Order</span>
                <h3 className="font-serif text-2xl font-bold text-[#34252B]">
                  Order #{searchedOrder.orderNumber}
                </h3>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs text-gray-500 block">Current Status:</span>
                <span className="text-sm font-bold text-[#7B2948] bg-[#F7E7EC] px-3 py-1 rounded-full inline-block mt-0.5">
                  {searchedOrder.status}
                </span>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="relative py-4">
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                {[
                  { title: 'Pending', step: 1, done: true, desc: 'Payment verified' },
                  { title: 'Confirmed', step: 2, done: searchedOrder.status !== 'Pending' && searchedOrder.status !== 'Cancelled', desc: 'Sent to pastry chefs' },
                  { title: 'Preparing', step: 3, done: ['Preparing', 'Out for Delivery', 'Delivered'].includes(searchedOrder.status), desc: 'Baking & cooling' },
                  { title: 'Out for Delivery', step: 4, done: ['Out for Delivery', 'Delivered'].includes(searchedOrder.status), desc: 'In chiller van' },
                  { title: 'Delivered', step: 5, done: searchedOrder.status === 'Delivered', desc: 'Doorstep handoff' }
                ].map((s) => (
                  <div
                    key={s.step}
                    className={`p-3.5 rounded-xl border text-center transition-all ${
                      s.done
                        ? 'border-[#7B2948] bg-[#F7E7EC]/40 text-[#7B2948]'
                        : 'border-gray-200 bg-gray-50 text-gray-400'
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-full mx-auto mb-1.5 flex items-center justify-center text-xs font-bold ${
                      s.done ? 'bg-[#7B2948] text-white shadow-2xs' : 'bg-gray-200 text-gray-500'
                    }`}>
                      {s.done ? <Check className="w-4 h-4" /> : s.step}
                    </div>
                    <p className="text-xs font-bold text-[#34252B]">{s.title}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#F7E7EC] text-xs text-[#553C46]">
              <div className="space-y-1.5">
                <p><strong className="text-[#34252B]">Delivery Date:</strong> {searchedOrder.deliveryDate}</p>
                <p><strong className="text-[#34252B]">Delivery Slot:</strong> {searchedOrder.deliveryTimeSlot}</p>
                <p><strong className="text-[#34252B]">Payment:</strong> {searchedOrder.paymentMethod.toUpperCase()} ({searchedOrder.paymentStatus})</p>
              </div>
              <div className="space-y-1.5">
                <p><strong className="text-[#34252B]">Recipient:</strong> {searchedOrder.customer.fullName}</p>
                <p><strong className="text-[#34252B]">Destination:</strong> {searchedOrder.customer.addressLine1}, {searchedOrder.customer.city} ({searchedOrder.customer.pincode})</p>
                <p><strong className="text-[#34252B]">Order Total:</strong> ₹{searchedOrder.total}</p>
              </div>
            </div>

            {/* Ordered Items Preview */}
            <div className="pt-4 border-t border-[#F7E7EC] space-y-2">
              <h4 className="font-bold text-xs text-[#34252B] uppercase">Cakes in this delivery:</h4>
              <div className="space-y-2">
                {searchedOrder.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-xs p-2 bg-[#FFFAF7] rounded-lg border border-[#E8D3DC]">
                    <div className="flex items-center gap-2.5">
                      <img src={item.image} alt={item.productName} className="w-10 h-10 rounded object-cover" />
                      <div>
                        <span className="font-bold text-[#34252B]">{item.productName}</span>
                        <span className="text-[11px] text-gray-500 block">{item.weight} · {item.isEggless ? 'Eggless' : 'Regular'} (Qty: {item.quantity})</span>
                      </div>
                    </div>
                    <span className="font-serif font-bold text-[#7B2948]">₹{item.totalPrice}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
