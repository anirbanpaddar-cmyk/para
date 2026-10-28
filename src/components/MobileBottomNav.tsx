import React from 'react';
import { Home, Store, Heart, ShoppingBag, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const MobileBottomNav: React.FC = () => {
  const { currentView, navigateTo, cart, wishlist, setIsCartOpen } = useShop();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#F7E7EC] px-2 py-1.5 shadow-lg flex items-center justify-around">
      <button
        onClick={() => navigateTo('home')}
        className={`flex flex-col items-center justify-center p-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
          currentView === 'home' ? 'text-[#7B2948]' : 'text-gray-500'
        }`}
      >
        <Home className="w-5 h-5" />
        <span className="text-[10px] mt-0.5">Home</span>
      </button>

      <button
        onClick={() => navigateTo('shop')}
        className={`flex flex-col items-center justify-center p-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
          currentView === 'shop' ? 'text-[#7B2948]' : 'text-gray-500'
        }`}
      >
        <Store className="w-5 h-5" />
        <span className="text-[10px] mt-0.5">Shop</span>
      </button>

      <button
        onClick={() => navigateTo('custom-cake')}
        className={`flex flex-col items-center justify-center p-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
          currentView === 'custom-cake' ? 'text-[#7B2948]' : 'text-gray-500'
        }`}
      >
        <Sparkles className="w-5 h-5 text-[#D6A85A]" />
        <span className="text-[10px] mt-0.5">Custom</span>
      </button>

      <button
        onClick={() => navigateTo('wishlist')}
        className={`relative flex flex-col items-center justify-center p-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
          currentView === 'wishlist' ? 'text-[#7B2948]' : 'text-gray-500'
        }`}
      >
        <Heart className="w-5 h-5" />
        {wishlist.length > 0 && (
          <span className="absolute top-1 right-2 w-3.5 h-3.5 bg-[#7B2948] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
            {wishlist.length}
          </span>
        )}
        <span className="text-[10px] mt-0.5">Wishlist</span>
      </button>

      <button
        onClick={() => setIsCartOpen(true)}
        className="relative flex flex-col items-center justify-center p-1.5 rounded-lg text-xs font-semibold cursor-pointer text-[#7B2948]"
      >
        <ShoppingBag className="w-5 h-5" />
        {cartCount > 0 && (
          <span className="absolute top-1 right-2 w-3.5 h-3.5 bg-[#D6A85A] text-[#34252B] text-[9px] font-extrabold rounded-full flex items-center justify-center">
            {cartCount}
          </span>
        )}
        <span className="text-[10px] mt-0.5">Cart</span>
      </button>
    </div>
  );
};
