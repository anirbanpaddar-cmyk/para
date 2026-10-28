import React from 'react';
import { Heart, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const WishlistView: React.FC = () => {
  const { wishlist, products, toggleWishlist, moveToCartFromWishlist, navigateTo } = useShop();

  const savedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="bg-[#FFFAF7] min-h-screen py-10 sm:py-16 border-b border-[#F7E7EC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#553C46] mb-4">
          <button onClick={() => navigateTo('home')} className="hover:text-[#7B2948] cursor-pointer">Home</button>
          <span>/</span>
          <span className="text-[#7B2948] font-semibold">My Wishlist</span>
        </div>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl font-bold text-[#34252B]">
              My Saved Cakes ({savedProducts.length})
            </h1>
            <p className="text-xs sm:text-sm text-[#553C46] mt-0.5">
              Keep your favorite bakes handy for upcoming birthdays and gatherings.
            </p>
          </div>

          <button
            onClick={() => navigateTo('shop')}
            className="text-xs font-bold uppercase text-[#7B2948] hover:underline cursor-pointer"
          >
            Explore More Cakes →
          </button>
        </div>

        {savedProducts.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-[#F7E7EC] shadow-2xs space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#F7E7EC] text-[#7B2948] flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8 opacity-60" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#34252B]">
              Your Wishlist is Empty
            </h3>
            <p className="text-xs text-[#553C46]">
              Browse our handcrafted cakes and tap the heart icon on any card to save it for later.
            </p>
            <button
              onClick={() => navigateTo('shop')}
              className="px-6 py-3 bg-[#7B2948] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#621F38] cursor-pointer"
            >
              Start Exploring
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {savedProducts.map((product) => (
              <div 
                key={product.id}
                className="bg-white rounded-2xl border border-[#F7E7EC] overflow-hidden shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="aspect-[4/3] relative overflow-hidden bg-[#F7E7EC]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-2.5 right-2.5 p-1.5 bg-white/90 rounded-full text-rose-600 hover:bg-white shadow-xs transition-colors cursor-pointer"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#7B2948]">
                      {product.category}
                    </span>
                    <h3 className="font-serif font-bold text-sm text-[#34252B] line-clamp-1 mt-0.5">
                      {product.name}
                    </h3>
                    <p className="font-serif font-bold text-base text-[#7B2948] mt-1 tabular-nums">
                      ₹{product.salePrice || product.regularPrice}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#F7E7EC] space-y-2 mt-3">
                    <button
                      onClick={() => moveToCartFromWishlist(product.id)}
                      className="w-full py-2.5 bg-[#7B2948] hover:bg-[#621F38] text-white text-xs font-bold uppercase rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Cart</span>
                    </button>

                    <button
                      onClick={() => navigateTo('product-detail', product)}
                      className="w-full py-1 text-center text-xs font-semibold text-[#553C46] hover:text-[#7B2948] hover:underline cursor-pointer"
                    >
                      Customize Weight & Message
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
