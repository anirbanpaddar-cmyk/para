import React, { useState } from 'react';
import { 
  ShoppingBag, Heart, User, Search, Menu, X, 
  Sparkles, ShieldCheck, ChevronRight 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ViewType } from '../types';

export const Header: React.FC = () => {
  const { 
    currentView, 
    navigateTo, 
    cart, 
    wishlist, 
    cartSubtotal, 
    setIsCartOpen,
    searchQuery,
    setSearchQuery,
    currentUser
  } = useShop();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const navLinks: { label: string; view: ViewType }[] = [
    { label: 'Home', view: 'home' },
    { label: 'Shop', view: 'shop' },
    { label: 'Categories', view: 'categories' },
    { label: 'Custom Cakes', view: 'custom-cake' },
    { label: 'Offers', view: 'offers' },
    { label: 'About Us', view: 'about' },
    { label: 'Contact', view: 'contact' },
  ];

  const handleNav = (view: ViewType) => {
    navigateTo(view);
    setIsMobileMenuOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateTo('shop');
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#F7E7EC] shadow-xs">
      {/* Top Announcement Bar */}
      <div className="bg-[#7B2948] text-[#F7E7EC] text-xs py-2 px-4 text-center tracking-wide font-medium flex items-center justify-center gap-2">
        <span className="hidden sm:inline">🎂</span>
        <span>Freshly Baked in Kolkata | Express Delivery Across PINs 700001 - 700160 | Order Online</span>
        <button 
          onClick={() => handleNav('offers')}
          className="underline ml-2 hover:text-[#D6A85A] transition-colors cursor-pointer"
        >
          View Offers
        </button>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4 lg:gap-8">
          
          {/* Mobile menu trigger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#34252B] hover:text-[#7B2948] rounded-md transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Zone 1: Brand Wordmark */}
          {/* Zone 1: Brand Wordmark & Original Logo */}
          <div className="flex items-center shrink-0">
            <button 
              onClick={() => handleNav('home')} 
              className="group text-left cursor-pointer flex items-center gap-3"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden bg-white shadow-md group-hover:scale-105 transition-all duration-300 border-2 border-[#D6A85A] flex items-center justify-center shrink-0 p-1 ring-2 ring-[#D6A85A]/20">
                <img
                  src="/images/logo/cake-paradise-logo.png"
                  alt="Cake Paradise Original Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#7B2948] group-hover:text-[#621F38] transition-colors leading-none">
                  Cake Paradise
                </span>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#D6A85A] font-bold mt-1 hidden sm:block">
                  Every Celebration Deserves a Beautiful Cake!
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-[#34252B]">
            {navLinks.map((link) => {
              const isActive = currentView === link.view;
              return (
                <button
                  key={link.label}
                  onClick={() => handleNav(link.view)}
                  className={`transition-colors whitespace-nowrap cursor-pointer py-1 relative ${
                    isActive 
                      ? 'text-[#7B2948] font-bold' 
                      : 'hover:text-[#7B2948] text-[#553C46]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7B2948] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Interactive Affordances (Search, Wishlist, Account, Cart) */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Search Toggle */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-[#553C46] hover:text-[#7B2948] hover:bg-[#F7E7EC]/50 rounded-full transition-colors cursor-pointer relative"
              aria-label="Search cakes"
              title="Search catalog"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Icon */}
            <button
              onClick={() => handleNav('wishlist')}
              className="p-2 text-[#553C46] hover:text-[#7B2948] hover:bg-[#F7E7EC]/50 rounded-full transition-colors cursor-pointer relative"
              aria-label="Wishlist"
              title="My Wishlist"
            >
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'text-[#7B2948] fill-[#7B2948]/20' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#7B2948] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* My Account */}
            <button
              onClick={() => handleNav('account')}
              className="p-2 text-[#553C46] hover:text-[#7B2948] hover:bg-[#F7E7EC]/50 rounded-full transition-colors cursor-pointer relative hidden sm:flex items-center gap-1.5"
              aria-label="My Account"
              title="Account & Orders"
            >
              <User className="w-5 h-5" />
              {currentUser && (
                <span className="text-xs font-semibold max-w-[80px] truncate text-[#7B2948]">
                  {currentUser.name.split(' ')[0]}
                </span>
              )}
            </button>

            {/* Admin Portal Shortcut */}
            <button
              onClick={() => handleNav('admin')}
              className="hidden xl:inline-flex items-center text-xs font-semibold px-2.5 py-1 text-[#7B2948] bg-[#F7E7EC] hover:bg-[#7B2948] hover:text-white rounded-md transition-colors cursor-pointer"
              title="Store Admin Dashboard"
            >
              <ShieldCheck className="w-3.5 h-3.5 mr-1" />
              Admin
            </button>

            {/* Live Shopping Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 px-3 py-2 bg-[#7B2948] hover:bg-[#621F38] text-white rounded-lg shadow-xs transition-colors cursor-pointer group"
              aria-label="Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-[#D6A85A] text-[#34252B] text-[10px] font-extrabold rounded-full flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-[10px] uppercase font-bold text-[#F7E7EC]/80 leading-none">
                  Cart
                </span>
                <span className="text-xs font-bold tabular-nums leading-tight">
                  ₹{cartSubtotal}
                </span>
              </div>
            </button>
          </div>

        </div>

        {/* Collapsible Search Input Bar */}
        {isSearchOpen && (
          <div className="pb-4 pt-1 border-t border-[#F7E7EC] animate-in fade-in duration-200">
            <form onSubmit={handleSearchSubmit} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by cake flavor, type (e.g. Red Velvet, Cheesecake, Truffle)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-[#FFFAF7] border border-[#E8D3DC] rounded-lg text-sm focus:outline-none focus:border-[#7B2948] focus:ring-1 focus:ring-[#7B2948]"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-[#7B2948] text-white text-sm font-semibold rounded-lg hover:bg-[#621F38] transition-colors cursor-pointer whitespace-nowrap"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setIsSearchOpen(false);
                }}
                className="px-3 py-2 text-xs text-gray-500 hover:text-gray-800"
              >
                Cancel
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[#F7E7EC] bg-white px-4 py-5 shadow-lg space-y-4 animate-in slide-in-from-top duration-200">
          {/* Mobile Drawer Logo Header */}
          <div className="flex items-center gap-3 pb-3 border-b border-[#F7E7EC]">
            <div className="w-14 h-14 rounded-full overflow-hidden bg-white shadow-sm border-2 border-[#D6A85A] p-0.5 shrink-0 flex items-center justify-center">
              <img
                src="/images/logo/cake-paradise-logo.png"
                alt="Cake Paradise Original Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <p className="font-serif font-bold text-lg text-[#7B2948] leading-tight">Cake Paradise</p>
              <p className="text-[11px] text-[#D6A85A] font-semibold italic mt-0.5">Every Celebration Deserves a Beautiful Cake!</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link.view)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-sm font-medium ${
                  currentView === link.view
                    ? 'bg-[#F7E7EC] text-[#7B2948] font-bold'
                    : 'text-[#34252B] hover:bg-[#FFFAF7]'
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-[#7B2948]/50" />
              </button>
            ))}
            <button
              onClick={() => handleNav('account')}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-sm font-medium text-[#34252B] hover:bg-[#FFFAF7]"
            >
              <span>My Account & Orders</span>
              <ChevronRight className="w-4 h-4 text-[#7B2948]/50" />
            </button>
            <button
              onClick={() => handleNav('order-tracking')}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-sm font-medium text-[#34252B] hover:bg-[#FFFAF7]"
            >
              <span>Track My Order</span>
              <ChevronRight className="w-4 h-4 text-[#7B2948]/50" />
            </button>
            <button
              onClick={() => handleNav('admin')}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-sm font-medium text-[#7B2948] bg-[#F7E7EC]"
            >
              <span>Store Admin Dashboard</span>
              <ShieldCheck className="w-4 h-4 text-[#7B2948]" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
