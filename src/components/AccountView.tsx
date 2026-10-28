import React, { useState } from 'react';
import { 
  User, Package, MapPin, Heart, LogOut, 
  Settings, KeyRound, Plus, Check, Clock, ChevronRight 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CustomerAddress } from '../types';

export const AccountView: React.FC = () => {
  const { 
    currentUser, 
    login, 
    logout, 
    orders, 
    wishlist, 
    products, 
    navigateTo, 
    saveUserAddress 
  } = useShop();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'profile' | 'wishlist'>('orders');

  // Auth form states
  const [isRegistering, setIsRegistering] = useState(false);
  const [authEmail, setAuthEmail] = useState('');
  const [authName, setAuthName] = useState('');
  const [authPhone, setAuthPhone] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [forgotPasswordMsg, setForgotPasswordMsg] = useState(false);

  // Address add form
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddrLine1, setNewAddrLine1] = useState('');
  const [newArea, setNewArea] = useState('');
  const [newCity, setNewCity] = useState('Kolkata');
  const [newState, setNewState] = useState('West Bengal');
  const [newPin, setNewPin] = useState('700016');

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail) return;
    login(authEmail, authName || 'Valued Guest', authPhone || '+91 98765 00000');
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddrLine1 || !newPin || !currentUser) return;
    const newAddress: CustomerAddress = {
      fullName: currentUser.name,
      email: currentUser.email,
      phone: currentUser.phone,
      addressLine1: newAddrLine1,
      area: newArea,
      city: newCity,
      state: newState,
      pincode: newPin
    };
    saveUserAddress(newAddress);
    setShowAddressForm(false);
    setNewAddrLine1('');
    setNewArea('');
  };

  // If not logged in, show elegant login & registration cards
  if (!currentUser) {
    return (
      <div className="bg-[#FFFAF7] min-h-screen py-14 sm:py-20 border-b border-[#F7E7EC]">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white p-8 rounded-2xl border border-[#F7E7EC] shadow-md space-y-6">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-full bg-[#F7E7EC] text-[#7B2948] flex items-center justify-center mx-auto">
                <User className="w-6 h-6" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#34252B]">
                {isRegistering ? 'Create Customer Account' : 'Welcome to Cake Paradise'}
              </h2>
              <p className="text-xs text-[#553C46]">
                {isRegistering
                  ? 'Join our sweet rewards club and track orders seamlessly'
                  : 'Log in to view past celebration orders & saved addresses'}
              </p>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {isRegistering && (
                <div>
                  <label className="block text-xs font-bold text-[#34252B] uppercase mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={authName}
                    onChange={(e) => setAuthName(e.target.value)}
                    placeholder="e.g. Priya Sharma"
                    className="w-full text-xs px-3.5 py-2.5 bg-[#FFFAF7] border border-[#E8D3DC] rounded-xl focus:outline-none focus:border-[#7B2948]"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-[#34252B] uppercase mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  placeholder="e.g. priya@example.com"
                  className="w-full text-xs px-3.5 py-2.5 bg-[#FFFAF7] border border-[#E8D3DC] rounded-xl focus:outline-none focus:border-[#7B2948]"
                />
              </div>

              {isRegistering && (
                <div>
                  <label className="block text-xs font-bold text-[#34252B] uppercase mb-1">Mobile Phone *</label>
                  <input
                    type="tel"
                    required
                    value={authPhone}
                    onChange={(e) => setAuthPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full text-xs px-3.5 py-2.5 bg-[#FFFAF7] border border-[#E8D3DC] rounded-xl focus:outline-none focus:border-[#7B2948]"
                  />
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-[#34252B] uppercase">Password *</label>
                  {!isRegistering && (
                    <button
                      type="button"
                      onClick={() => setForgotPasswordMsg(true)}
                      className="text-[11px] text-[#7B2948] hover:underline cursor-pointer"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <input
                  type="password"
                  required
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-xs px-3.5 py-2.5 bg-[#FFFAF7] border border-[#E8D3DC] rounded-xl focus:outline-none focus:border-[#7B2948]"
                />
              </div>

              {forgotPasswordMsg && (
                <div className="p-2.5 bg-[#F7E7EC] text-[#7B2948] rounded-lg text-xs">
                  Password reset link has been dispatched to your email address (simulated demo).
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-[#7B2948] hover:bg-[#621F38] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer shadow-xs"
              >
                {isRegistering ? 'Register Account' : 'Sign In'}
              </button>
            </form>

            {/* Quick Demo Sign-in Helper */}
            <div className="pt-2 text-center border-t border-[#F7E7EC]">
              <button
                type="button"
                onClick={() => login('guest.customer@example.com', 'Ananya Deshmukh', '+91 98450 99881')}
                className="text-xs text-[#7B2948] font-bold hover:underline cursor-pointer"
              >
                Instant 1-Click Demo Customer Login →
              </button>
            </div>

            <div className="text-center text-xs text-[#553C46]">
              {isRegistering ? (
                <p>
                  Already registered?{' '}
                  <button
                    onClick={() => setIsRegistering(false)}
                    className="text-[#7B2948] font-bold underline cursor-pointer"
                  >
                    Log In Here
                  </button>
                </p>
              ) : (
                <p>
                  New customer?{' '}
                  <button
                    onClick={() => setIsRegistering(true)}
                    className="text-[#7B2948] font-bold underline cursor-pointer"
                  >
                    Create Account
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Logged-in Customer Portal
  return (
    <div className="bg-[#FFFAF7] min-h-screen py-10 sm:py-16 border-b border-[#F7E7EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Welcome Profile Bar */}
        <div className="bg-white p-6 rounded-2xl border border-[#F7E7EC] shadow-2xs mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#7B2948] text-white font-serif text-xl font-bold flex items-center justify-center shadow-xs">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold text-[#34252B]">
                Hello, {currentUser.name}!
              </h1>
              <p className="text-xs text-[#553C46]">
                {currentUser.email} · {currentUser.phone}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('shop')}
              className="px-4 py-2 bg-[#F7E7EC] text-[#7B2948] text-xs font-bold uppercase rounded-xl hover:bg-[#7B2948] hover:text-white transition-colors cursor-pointer"
            >
              Order New Cake
            </button>
            <button
              onClick={logout}
              className="p-2 text-gray-500 hover:text-rose-600 transition-colors cursor-pointer"
              title="Log out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Account Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Navigation Sidebar */}
          <div className="bg-white p-4 rounded-2xl border border-[#F7E7EC] shadow-2xs h-fit space-y-1">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-[#7B2948] text-white'
                  : 'text-[#34252B] hover:bg-[#FFFAF7]'
              }`}
            >
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                <span>My Cake Orders</span>
              </div>
              <span className="text-[10px] tabular-nums font-mono opacity-80">({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'addresses'
                  ? 'bg-[#7B2948] text-white'
                  : 'text-[#34252B] hover:bg-[#FFFAF7]'
              }`}
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Saved Addresses</span>
              </div>
              <span className="text-[10px] tabular-nums font-mono opacity-80">({currentUser.addresses.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('wishlist')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'wishlist'
                  ? 'bg-[#7B2948] text-white'
                  : 'text-[#34252B] hover:bg-[#FFFAF7]'
              }`}
            >
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                <span>Saved Wishlist</span>
              </div>
              <span className="text-[10px] tabular-nums font-mono opacity-80">({wishlist.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-[#7B2948] text-white'
                  : 'text-[#34252B] hover:bg-[#FFFAF7]'
              }`}
            >
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                <span>Profile Settings</span>
              </div>
            </button>
          </div>

          {/* Main Tab Content */}
          <div className="lg:col-span-3">
            
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-bold text-[#34252B] mb-2">
                  Order History & Real-Time Tracking
                </h3>

                {orders.length === 0 ? (
                  <div className="bg-white p-8 rounded-2xl border border-[#F7E7EC] text-center space-y-3">
                    <p className="text-xs text-gray-500">You haven't placed any orders yet.</p>
                    <button
                      onClick={() => navigateTo('shop')}
                      className="px-5 py-2 bg-[#7B2948] text-white text-xs font-bold uppercase rounded-lg"
                    >
                      Browse Cakes
                    </button>
                  </div>
                ) : (
                  orders.map((order) => (
                    <div 
                      key={order.id}
                      className="bg-white p-6 rounded-2xl border border-[#F7E7EC] shadow-2xs space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#F7E7EC]">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-serif font-bold text-base text-[#34252B]">
                              Order #{order.orderNumber}
                            </span>
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#F7E7EC] text-[#7B2948]">
                              {order.status}
                            </span>
                          </div>
                          <span className="text-[11px] text-gray-400">
                            Placed on {new Date(order.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="text-right">
                          <span className="text-xs text-gray-400 block">Total</span>
                          <span className="font-serif font-bold text-lg text-[#7B2948] tabular-nums">
                            ₹{order.total}
                          </span>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="space-y-2">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center justify-between text-xs py-1">
                            <div className="flex items-center gap-2.5">
                              <img src={item.image} alt={item.productName} className="w-10 h-10 rounded object-cover" />
                              <div>
                                <span className="font-bold text-[#34252B]">{item.productName}</span>
                                <span className="text-[11px] text-gray-500 block">
                                  {item.weight} · {item.isEggless ? 'Eggless' : 'Regular'} × {item.quantity}
                                </span>
                              </div>
                            </div>
                            <span className="font-bold text-[#34252B] tabular-nums">₹{item.totalPrice}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-[#F7E7EC] text-xs">
                        <span className="text-gray-500">
                          Delivery on <strong className="text-[#34252B]">{order.deliveryDate}</strong> ({order.deliveryTimeSlot})
                        </span>
                        <button
                          onClick={() => navigateTo('order-tracking')}
                          className="text-xs font-bold text-[#7B2948] hover:underline cursor-pointer flex items-center gap-1"
                        >
                          <span>Track Live</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-serif text-xl font-bold text-[#34252B]">
                    Saved Delivery Addresses
                  </h3>
                  <button
                    onClick={() => setShowAddressForm(!showAddressForm)}
                    className="px-3.5 py-1.5 bg-[#7B2948] text-white text-xs font-bold uppercase rounded-lg flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Address</span>
                  </button>
                </div>

                {showAddressForm && (
                  <form onSubmit={handleAddAddress} className="bg-white p-5 rounded-2xl border border-[#E8D3DC] space-y-3">
                    <h4 className="font-bold text-xs uppercase text-[#34252B]">New Address Details</h4>
                    <div>
                      <label className="block text-[11px] font-bold text-[#34252B] mb-1">House/Apartment/Street *</label>
                      <input
                        type="text"
                        required
                        value={newAddrLine1}
                        onChange={(e) => setNewAddrLine1(e.target.value)}
                        placeholder="e.g. 501 Blossom Towers"
                        className="w-full text-xs px-3 py-2 bg-[#FFFAF7] border border-[#E8D3DC] rounded-lg"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-[#34252B] mb-1">Area/Sector</label>
                        <input
                          type="text"
                          value={newArea}
                          onChange={(e) => setNewArea(e.target.value)}
                          placeholder="e.g. Koramangala"
                          className="w-full text-xs px-3 py-2 bg-[#FFFAF7] border border-[#E8D3DC] rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-[#34252B] mb-1">PIN Code *</label>
                        <input
                          type="text"
                          required
                          maxLength={6}
                          value={newPin}
                          onChange={(e) => setNewPin(e.target.value)}
                          placeholder="e.g. 560034"
                          className="w-full text-xs px-3 py-2 bg-[#FFFAF7] border border-[#E8D3DC] rounded-lg"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#7B2948] text-white text-xs font-bold uppercase rounded-lg"
                    >
                      Save Address
                    </button>
                  </form>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentUser.addresses.map((addr, idx) => (
                    <div key={idx} className="bg-white p-5 rounded-2xl border border-[#F7E7EC] shadow-2xs space-y-2 text-xs text-[#553C46]">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-[#34252B]">{addr.fullName}</span>
                        {idx === 0 && (
                          <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded">
                            Default
                          </span>
                        )}
                      </div>
                      <p>{addr.addressLine1}</p>
                      {addr.area && <p>{addr.area}</p>}
                      <p>{addr.city}, {addr.state} — {addr.pincode}</p>
                      <p className="font-semibold text-[#34252B] pt-1">Phone: {addr.phone}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-bold text-[#34252B] mb-2">
                  My Saved Wishlist ({wishlist.length})
                </h3>

                {wishlist.length === 0 ? (
                  <div className="bg-white p-8 rounded-2xl border border-[#F7E7EC] text-center space-y-2">
                    <p className="text-xs text-gray-500">Your wishlist is empty.</p>
                    <button
                      onClick={() => navigateTo('shop')}
                      className="px-5 py-2 bg-[#7B2948] text-white text-xs font-bold uppercase rounded-lg"
                    >
                      Explore Cakes
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {wishlist.map((id) => {
                      const prod = products.find(p => p.id === id);
                      if (!prod) return null;
                      return (
                        <div key={prod.id} className="bg-white p-4 rounded-xl border border-[#F7E7EC] shadow-2xs flex gap-3 items-center">
                          <img src={prod.image} alt={prod.name} className="w-16 h-16 rounded-lg object-cover" />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-serif font-bold text-sm text-[#34252B] truncate">{prod.name}</h4>
                            <p className="font-serif font-bold text-sm text-[#7B2948] mt-0.5">₹{prod.salePrice || prod.regularPrice}</p>
                            <button
                              onClick={() => navigateTo('product-detail', prod)}
                              className="text-[11px] text-[#7B2948] font-bold underline mt-1 cursor-pointer block"
                            >
                              Configure & Order →
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white p-6 rounded-2xl border border-[#F7E7EC] shadow-2xs space-y-4 max-w-lg">
                <h3 className="font-serif text-xl font-bold text-[#34252B]">
                  Profile Details
                </h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-[#34252B] mb-1">Full Name</label>
                    <input
                      type="text"
                      disabled
                      value={currentUser.name}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#34252B] mb-1">Email Address</label>
                    <input
                      type="email"
                      disabled
                      value={currentUser.email}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#34252B] mb-1">Phone Number</label>
                    <input
                      type="tel"
                      disabled
                      value={currentUser.phone}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700"
                    />
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
