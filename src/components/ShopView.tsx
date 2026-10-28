import React, { useState, useMemo } from 'react';
import { 
  Filter, X, SlidersHorizontal, ArrowUpDown, 
  RotateCcw, Search, Sparkles 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';

export const ShopView: React.FC = () => {
  const { 
    products, 
    categories, 
    filters, 
    setFilters, 
    resetFilters, 
    searchQuery, 
    setSearchQuery 
  } = useShop();

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // Extract unique flavors from products list
  const flavorsList = useMemo(() => {
    const set = new Set<string>();
    products.forEach(p => set.add(p.flavor));
    return ['All', ...Array.from(set)];
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Must be published
      if (!product.isPublished) return false;

      // Search Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesFlavor = product.flavor.toLowerCase().includes(q);
        const matchesCat = product.category.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesFlavor && !matchesCat) {
          return false;
        }
      }

      // Category filter
      if (filters.category !== 'All' && product.category !== filters.category) {
        return false;
      }

      // Price filter (based on 500g base price)
      const basePrice = product.salePrice || product.regularPrice;
      if (basePrice < filters.minPrice || basePrice > filters.maxPrice) {
        return false;
      }

      // Flavor filter
      if (filters.flavor !== 'All' && product.flavor !== filters.flavor) {
        return false;
      }

      // Eggless filter
      if (filters.egglessOnly && !product.isEggless) {
        return false;
      }

      // Rating filter
      if (filters.minRating > 0 && product.rating < filters.minRating) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      const priceA = a.salePrice || a.regularPrice;
      const priceB = b.salePrice || b.regularPrice;

      switch (filters.sortBy) {
        case 'price-asc':
          return priceA - priceB;
        case 'price-desc':
          return priceB - priceA;
        case 'rating':
          return b.rating - a.rating;
        case 'latest':
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        case 'popularity':
        default:
          return b.reviewsCount - a.reviewsCount;
      }
    });
  }, [products, searchQuery, filters]);

  const displayedProducts = filteredProducts.slice(0, itemsPerPage);

  const activeFiltersCount = 
    (filters.category !== 'All' ? 1 : 0) +
    (filters.flavor !== 'All' ? 1 : 0) +
    (filters.egglessOnly ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.minPrice > 0 || filters.maxPrice < 4000 ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  const FilterPanelContent = () => (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <h4 className="font-serif font-bold text-sm text-[#34252B] mb-2.5 flex items-center justify-between">
          <span>Categories</span>
          {filters.category !== 'All' && (
            <button
              onClick={() => setFilters(f => ({ ...f, category: 'All' }))}
              className="text-[11px] text-[#7B2948] hover:underline"
            >
              Reset
            </button>
          )}
        </h4>
        <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
          <button
            onClick={() => setFilters(f => ({ ...f, category: 'All' }))}
            className={`w-full text-left text-xs py-1.5 px-2 rounded-md transition-colors cursor-pointer flex items-center justify-between ${
              filters.category === 'All'
                ? 'bg-[#F7E7EC] text-[#7B2948] font-bold'
                : 'text-[#553C46] hover:bg-[#FFFAF7]'
            }`}
          >
            <span>All Categories</span>
            <span className="text-[10px] text-gray-400">{products.length}</span>
          </button>
          {categories.map((cat) => {
            const count = products.filter(p => p.category === cat.name).length;
            return (
              <button
                key={cat.id}
                onClick={() => setFilters(f => ({ ...f, category: cat.name }))}
                className={`w-full text-left text-xs py-1.5 px-2 rounded-md transition-colors cursor-pointer flex items-center justify-between ${
                  filters.category === cat.name
                    ? 'bg-[#F7E7EC] text-[#7B2948] font-bold'
                    : 'text-[#553C46] hover:bg-[#FFFAF7]'
                }`}
              >
                <span className="truncate">{cat.name}</span>
                <span className="text-[10px] text-gray-400">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dietary Option: Eggless toggle */}
      <div className="pt-4 border-t border-[#F7E7EC]">
        <h4 className="font-serif font-bold text-sm text-[#34252B] mb-2.5">
          Dietary Preference
        </h4>
        <label className="flex items-center gap-2 cursor-pointer text-xs text-[#34252B]">
          <input
            type="checkbox"
            checked={filters.egglessOnly}
            onChange={(e) => setFilters(f => ({ ...f, egglessOnly: e.target.checked }))}
            className="w-4 h-4 rounded text-[#7B2948] focus:ring-[#7B2948] accent-[#7B2948]"
          />
          <span className="font-medium">100% Pure Vegetarian / Eggless Only</span>
        </label>
      </div>

      {/* Price Range */}
      <div className="pt-4 border-t border-[#F7E7EC]">
        <h4 className="font-serif font-bold text-sm text-[#34252B] mb-2 flex items-center justify-between">
          <span>Price Range</span>
          <span className="text-xs font-semibold text-[#7B2948] tabular-nums">
            ₹{filters.minPrice} - ₹{filters.maxPrice}
          </span>
        </h4>
        <input
          type="range"
          min="200"
          max="4000"
          step="100"
          value={filters.maxPrice}
          onChange={(e) => setFilters(f => ({ ...f, maxPrice: Number(e.target.value) }))}
          className="w-full accent-[#7B2948] cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-gray-400 mt-1">
          <span>₹200</span>
          <span>Max ₹4,000</span>
        </div>
      </div>

      {/* Flavor Filter */}
      <div className="pt-4 border-t border-[#F7E7EC]">
        <h4 className="font-serif font-bold text-sm text-[#34252B] mb-2">
          Flavor
        </h4>
        <select
          value={filters.flavor}
          onChange={(e) => setFilters(f => ({ ...f, flavor: e.target.value }))}
          className="w-full text-xs px-3 py-2 bg-white border border-[#E8D3DC] rounded-lg text-[#34252B] focus:outline-none focus:border-[#7B2948]"
        >
          {flavorsList.map((flv) => (
            <option key={flv} value={flv}>{flv}</option>
          ))}
        </select>
      </div>

      {/* Customer Rating Filter */}
      <div className="pt-4 border-t border-[#F7E7EC]">
        <h4 className="font-serif font-bold text-sm text-[#34252B] mb-2">
          Minimum Rating
        </h4>
        <div className="flex gap-1.5">
          {[0, 4.5, 4.8, 5.0].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setFilters(f => ({ ...f, minRating: star }))}
              className={`flex-1 py-1 px-1.5 text-xs rounded transition-all cursor-pointer ${
                filters.minRating === star
                  ? 'bg-[#7B2948] text-white font-bold'
                  : 'bg-white border border-[#E8D3DC] text-gray-600 hover:border-[#7B2948]'
              }`}
            >
              {star === 0 ? 'All' : `${star}★`}
            </button>
          ))}
        </div>
      </div>

      {/* Reset all button */}
      {activeFiltersCount > 0 && (
        <button
          onClick={resetFilters}
          className="w-full py-2 bg-[#FFFAF7] border border-[#E8D3DC] hover:border-[#7B2948] text-[#7B2948] text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Clear All Filters</span>
        </button>
      )}
    </div>
  );

  return (
    <div className="bg-[#FFFAF7] min-h-screen py-8 sm:py-12 border-b border-[#F7E7EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title & Breadcrumb */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-[#553C46] mb-1">
            <span>Home</span>
            <span>/</span>
            <span className="text-[#7B2948] font-semibold">Cakes Collection</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#34252B]">
            Handcrafted Cake Collection
          </h1>
          <p className="text-sm text-[#553C46] mt-1 max-w-2xl">
            Explore {products.length}+ artisanal cakes, signature cheesecakes, bento cakes, and celebratory confections. Baked fresh to order with pure butter and premium ingredients.
          </p>
        </div>

        {/* Control Bar: Search, Result Count, Sort, and Mobile Filter Toggle */}
        <div className="bg-white p-4 rounded-xl border border-[#F7E7EC] shadow-2xs mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Search bar inside catalog */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter by cake name, flavor, or occasion..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-xs bg-[#FFFAF7] border border-[#E8D3DC] rounded-lg focus:outline-none focus:border-[#7B2948]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden px-3 py-2 bg-[#F7E7EC] text-[#7B2948] font-bold text-xs rounded-lg flex items-center gap-1.5 cursor-pointer"
            >
              <Filter className="w-4 h-4" />
              <span>Filters {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ''}</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 whitespace-nowrap hidden sm:inline">Sort by:</span>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters(f => ({ ...f, sortBy: e.target.value as any }))}
                className="text-xs px-3 py-2 bg-[#FFFAF7] border border-[#E8D3DC] rounded-lg text-[#34252B] focus:outline-none focus:border-[#7B2948] font-medium cursor-pointer"
              >
                <option value="popularity">Popularity (Most Reviewed)</option>
                <option value="latest">Latest Arrivals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Customer Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Content Layout: Sidebar + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Left Sidebar Filters */}
          <aside className="hidden lg:block lg:col-span-1 bg-white p-5 rounded-xl border border-[#F7E7EC] shadow-2xs h-fit sticky top-28">
            <div className="flex items-center justify-between pb-3 border-b border-[#F7E7EC] mb-5">
              <div className="flex items-center gap-2 font-serif font-bold text-base text-[#34252B]">
                <SlidersHorizontal className="w-4 h-4 text-[#7B2948]" />
                <span>Filter Catalog</span>
              </div>
              {activeFiltersCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="text-xs font-semibold text-[#7B2948] hover:underline cursor-pointer"
                >
                  Clear all
                </button>
              )}
            </div>
            <FilterPanelContent />
          </aside>

          {/* Right Product Grid Area */}
          <main className="lg:col-span-3">
            {/* Active filter pills */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-gray-500 font-medium">
                Showing <strong className="text-[#34252B]">{filteredProducts.length}</strong> cakes
              </span>

              {activeFiltersCount > 0 && (
                <div className="flex flex-wrap gap-1.5 items-center">
                  {filters.category !== 'All' && (
                    <span className="text-[11px] bg-[#F7E7EC] text-[#7B2948] font-semibold px-2 py-0.5 rounded flex items-center gap-1">
                      {filters.category}
                      <button onClick={() => setFilters(f => ({ ...f, category: 'All' }))}><X className="w-3 h-3" /></button>
                    </span>
                  )}
                  {filters.egglessOnly && (
                    <span className="text-[11px] bg-emerald-50 text-emerald-800 font-semibold px-2 py-0.5 rounded flex items-center gap-1">
                      Eggless Only
                      <button onClick={() => setFilters(f => ({ ...f, egglessOnly: false }))}><X className="w-3 h-3" /></button>
                    </span>
                  )}
                  {filters.flavor !== 'All' && (
                    <span className="text-[11px] bg-[#F7E7EC] text-[#7B2948] font-semibold px-2 py-0.5 rounded flex items-center gap-1">
                      {filters.flavor}
                      <button onClick={() => setFilters(f => ({ ...f, flavor: 'All' }))}><X className="w-3 h-3" /></button>
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center border border-[#F7E7EC] space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#F7E7EC] text-[#7B2948] flex items-center justify-center mx-auto">
                  <Sparkles className="w-8 h-8 opacity-60" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#34252B]">
                  No cakes matched your criteria
                </h3>
                <p className="text-xs text-[#553C46] max-w-md mx-auto">
                  Try adjusting your price range, flavor or category filters, or search for another favorite cake.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-2 px-5 py-2.5 bg-[#7B2948] text-white text-xs font-bold uppercase rounded-lg hover:bg-[#621F38] cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {displayedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Load More Button */}
                {displayedProducts.length < filteredProducts.length && (
                  <div className="mt-10 text-center">
                    <button
                      onClick={() => setItemsPerPage(prev => prev + 12)}
                      className="px-8 py-3 bg-white border border-[#7B2948] text-[#7B2948] hover:bg-[#F7E7EC] font-bold text-xs uppercase tracking-wider rounded-lg shadow-xs transition-colors cursor-pointer"
                    >
                      Load More Cakes ({filteredProducts.length - displayedProducts.length} remaining)
                    </button>
                  </div>
                )}
              </>
            )}

          </main>
        </div>

      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-xs bg-white h-full p-6 overflow-y-auto shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#F7E7EC] mb-4">
                <h3 className="font-serif text-lg font-bold text-[#34252B]">Filters</h3>
                <button 
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 text-gray-500 hover:text-[#7B2948]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <FilterPanelContent />
            </div>

            <div className="pt-4 border-t border-[#F7E7EC] mt-6">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3 bg-[#7B2948] text-white text-xs font-bold uppercase rounded-lg shadow-xs"
              >
                Apply Filters ({filteredProducts.length} results)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
