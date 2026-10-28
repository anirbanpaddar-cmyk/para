import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Category } from '../types';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const CategoryGrid: React.FC = () => {
  const { categories, navigateTo, setFilters } = useShop();
  useScrollReveal();

  const handleCategoryClick = (category: Category) => {
    setFilters(prev => ({
      ...prev,
      category: category.name
    }));
    navigateTo('shop');
  };

  return (
    <section className="py-14 sm:py-20 bg-white border-b border-[#F7E7EC] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading with Scroll Reveal */}
        <div className="reveal-init flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#F7E7EC]">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#7B2948] mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#D6A85A] animate-spin" style={{ animationDuration: '7s' }} />
              <span>Curated Collections</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#34252B]">
              Explore by Category
            </h2>
            <p className="text-sm text-[#553C46] mt-1 max-w-xl">
              From birthday showstoppers to romantic anniversary cakes, discover handcrafted delights for every milestone.
            </p>
          </div>

          <button
            onClick={() => navigateTo('shop')}
            className="mt-4 sm:mt-0 text-xs uppercase font-bold text-[#7B2948] hover:text-[#621F38] tracking-wider inline-flex items-center gap-1.5 group cursor-pointer hover:-translate-y-0.5 transition-transform"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
          </button>
        </div>

        {/* Categories Grid - Responsive 2 to 5 columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {categories.map((cat, idx) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat)}
              style={{ transitionDelay: `${Math.min((idx % 5) * 60, 300)}ms` }}
              className="reveal-init group relative bg-[#FFFAF7] rounded-2xl overflow-hidden border border-[#F7E7EC] shadow-2xs hover:shadow-xl hover:border-[#D6A85A]/60 hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col text-left will-change-transform"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#F7E7EC] relative">
                <img
                  src={cat.image || '/images/hero/cake-hero.png'}
                  alt={cat.name}
                  loading="lazy"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('cake-hero.png')) {
                      target.src = '/images/hero/cake-hero.png';
                    }
                  }}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                <span className="absolute bottom-2 left-2.5 text-[11px] font-semibold text-white/90">
                  {cat.count} Cakes
                </span>
              </div>

              <div className="p-3">
                <h3 className="font-serif font-bold text-sm text-[#34252B] group-hover:text-[#7B2948] transition-colors truncate">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-[#553C46] line-clamp-1 mt-0.5">
                  {cat.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
