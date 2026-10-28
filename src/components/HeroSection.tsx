import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Heart, Award, ArrowRight, Star, ShoppingBag, Eye, Layers } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const HeroSection: React.FC = () => {
  const { navigateTo } = useShop();
  const heroRef = useRef<HTMLElement>(null);

  // Entrance animation trigger
  const [isLoaded, setIsLoaded] = useState(false);

  // View mode: 'interactive' (3D floating cake) or 'poster' (full cinematic image from user)
  const [viewMode, setViewMode] = useState<'interactive' | 'poster'>('interactive');

  // Mouse parallax coordinates (-1 to 1)
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Trigger smooth entrance animation on mount
    const timer = setTimeout(() => setIsLoaded(true), 80);
    return () => clearTimeout(timer);
  }, []);

  // Smooth mouse move handler for 3D parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  return (
    <section 
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden bg-gradient-to-b from-[#F7E7EC]/60 via-[#FFFAF7] to-[#FFFAF7] border-b border-[#F7E7EC] py-10 lg:py-16 select-none"
      style={{ perspective: '1200px' }}
    >
      {/* Ambient background soft light orbs */}
      <div 
        className="absolute top-10 left-1/4 w-96 h-96 rounded-full bg-[#F7E7EC]/70 blur-3xl pointer-events-none transition-transform duration-700 ease-out"
        style={{ transform: `translate3d(${mouseOffset.x * -20}px, ${mouseOffset.y * -20}px, 0)` }}
      />
      <div 
        className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-[#D6A85A]/15 blur-3xl pointer-events-none transition-transform duration-700 ease-out"
        style={{ transform: `translate3d(${mouseOffset.x * 25}px, ${mouseOffset.y * 25}px, 0)` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* View Mode Toggle: Interactive 3D vs Full Cinematic Poster */}
        <div className="flex justify-center lg:justify-end mb-4">
          <div className="inline-flex items-center gap-1 bg-white/90 backdrop-blur-md p-1 rounded-full border border-[#E8D3DC] shadow-xs text-xs">
            <button
              type="button"
              onClick={() => setViewMode('interactive')}
              className={`px-3 py-1 rounded-full font-bold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'interactive'
                  ? 'bg-[#7B2948] text-white shadow-xs'
                  : 'text-[#553C46] hover:text-[#7B2948]'
              }`}
            >
              <Sparkles className="w-3 h-3 text-[#D6A85A]" />
              <span>3D Interactive Cake</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('poster')}
              className={`px-3 py-1 rounded-full font-bold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'poster'
                  ? 'bg-[#7B2948] text-white shadow-xs'
                  : 'text-[#553C46] hover:text-[#7B2948]'
              }`}
            >
              <Layers className="w-3 h-3 text-[#D6A85A]" />
              <span>Full Cinematic Scene</span>
            </button>
          </div>
        </div>

        {/* FULL CINEMATIC POSTER VIEW */}
        {viewMode === 'poster' ? (
          <div className="reveal-init revealed relative rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-white aspect-[16/9] max-w-5xl mx-auto group">
            <img
              src="/assets/aistudio/image_c01701fe.png"
              alt="Cake Paradise - Make Every Celebration Sweeter"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.src.includes('cake-hero.png')) {
                  target.src = '/images/hero/cake-hero.png';
                }
              }}
            />
            {/* Clickable Quick Action Overlay */}
            <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-auto flex flex-wrap gap-3">
              <button
                onClick={() => navigateTo('shop')}
                className="px-6 py-3 bg-[#7B2948] hover:bg-[#621F38] text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer flex items-center gap-2 text-xs uppercase tracking-wider hover:-translate-y-0.5"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Shop All Cakes Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigateTo('custom-cake')}
                className="px-6 py-3 bg-white/95 backdrop-blur-md hover:bg-white text-[#7B2948] border border-[#7B2948] font-bold rounded-full shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer text-xs uppercase tracking-wider hover:-translate-y-0.5"
              >
                <span>Customize Your Cake</span>
              </button>
            </div>
          </div>
        ) : (
          /* 3D INTERACTIVE HERO GRID WITH USER CAKE AS VISUAL */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Editorial Headline & Staggered Primary CTAs matching the image */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              
              {/* Tag Badge */}
              <div 
                className={`inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#7B2948] bg-[#F7E7EC] px-4 py-1.5 rounded-full shadow-2xs border border-[#E8D3DC] transition-all duration-700 ease-out ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <span>FRESHLY BAKED</span>
                <span className="text-[#D6A85A] text-sm">♥</span>
                <span>PREMIUM INGREDIENTS</span>
                <span className="text-[#D6A85A] text-sm">♥</span>
                <span>MADE WITH LOVE</span>
              </div>

              {/* Main Headline */}
              <h1 
                className={`font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#7B2948] leading-[1.08] transition-all duration-700 delay-100 ease-out ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                <span className="block text-[#7B2948]">Make Every</span>
                <span className="block font-serif italic text-[#C49342] text-5xl sm:text-6xl lg:text-7xl my-1 font-normal drop-shadow-xs">
                  Celebration <span className="text-3xl sm:text-4xl text-[#C49342]">♡</span>
                </span>
                <span className="block text-[#7B2948]">Sweeter</span>
              </h1>

              {/* Subtitle */}
              <p 
                className={`text-base sm:text-lg text-[#553C46] max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal transition-all duration-700 delay-200 ease-out ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                Discover delicious cakes handcrafted with love for birthdays, anniversaries, weddings and every special moment in Kolkata.
              </p>

              {/* CTAs with interactive hover animations */}
              <div 
                className={`flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2 transition-all duration-700 delay-300 ease-out ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                <button
                  onClick={() => navigateTo('shop')}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#7B2948] hover:bg-[#621F38] text-white font-bold rounded-full shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2.5 group text-sm tracking-wider uppercase"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Shop All Cakes</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                </button>

                <button
                  onClick={() => navigateTo('custom-cake')}
                  className="w-full sm:w-auto px-8 py-3.5 bg-white border-2 border-[#7B2948] text-[#7B2948] hover:bg-[#F7E7EC] font-bold rounded-full shadow-2xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 text-sm tracking-wider uppercase"
                >
                  <span className="text-base">🎂</span>
                  <span>Customize Your Cake</span>
                </button>
              </div>

              {/* Three Trust Badges matching image */}
              <div 
                className={`pt-6 border-t border-[#F7E7EC] grid grid-cols-3 gap-2 sm:gap-4 max-w-lg mx-auto lg:mx-0 transition-all duration-700 delay-400 ease-out ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full border border-[#D6A85A] bg-white flex items-center justify-center shrink-0 shadow-2xs">
                    <span className="text-sm">🍃</span>
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-[#34252B] leading-tight">Freshly Baked</p>
                    <p className="text-[10px] text-[#553C46]">Baked on order date</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full border border-[#D6A85A] bg-white flex items-center justify-center shrink-0 shadow-2xs">
                    <Award className="w-4 h-4 text-[#D6A85A]" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-[#34252B] leading-tight">Premium Ingredients</p>
                    <p className="text-[10px] text-[#553C46]">Finest Belgian cocoa</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full border border-[#D6A85A] bg-white flex items-center justify-center shrink-0 shadow-2xs">
                    <Heart className="w-4 h-4 text-[#7B2948] fill-[#7B2948]/20" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-[#34252B] leading-tight">Made with Love</p>
                    <p className="text-[10px] text-[#553C46]">Artisan pâtissiers</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: 3D Floating Cake Display using the User's Image */}
            <div className="lg:col-span-6 relative flex items-center justify-center py-4">
              
              {/* The 3D Parallax & Floating Container */}
              <div 
                className={`relative w-full max-w-lg transition-all duration-1000 ease-out ${
                  isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90 translate-y-8'
                }`}
                style={{
                  transform: `rotateY(${mouseOffset.x * 9}deg) rotateX(${-mouseOffset.y * 9}deg) translate3d(${mouseOffset.x * 12}px, ${mouseOffset.y * 12}px, 0)`,
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)'
                }}
              >
                
                {/* 1. SOFT ROTATING GOLDEN LIGHT RING BEHIND THE CAKE */}
                <div 
                  className="absolute inset-0 -m-6 sm:-m-10 flex items-center justify-center pointer-events-none -z-10"
                  style={{
                    transform: `translate3d(${mouseOffset.x * -8}px, ${mouseOffset.y * -8}px, -40px)`
                  }}
                >
                  {/* Glowing radial halo */}
                  <div className="w-[320px] h-[320px] sm:w-[460px] sm:h-[460px] rounded-full bg-gradient-to-tr from-[#D6A85A]/30 via-[#F7E7EC]/40 to-transparent blur-2xl animate-pulse-gold" />
                  
                  {/* Outer rotating dashed antique gold ring */}
                  <div className="absolute w-[290px] h-[290px] sm:w-[420px] sm:h-[420px] rounded-full border-2 border-dashed border-[#D6A85A]/50 animate-rotate-slow" />
                  
                  {/* Inner counter-rotating thin golden halo */}
                  <div className="absolute w-[250px] h-[250px] sm:w-[360px] sm:h-[360px] rounded-full border border-[#D6A85A]/35 animate-rotate-reverse-slow" />
                </div>

                {/* 2. ELEGANT FLOATING LUXURY ACCENTS & GOLDEN SPARKLES */}
                <div 
                  className="absolute -top-3 -left-3 sm:-top-5 sm:-left-5 z-20 pointer-events-none animate-float-p1"
                  style={{ transform: `translate3d(${mouseOffset.x * 20}px, ${mouseOffset.y * 20}px, 40px)` }}
                >
                  <div className="px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md shadow-xl border border-[#D6A85A]/50 flex items-center gap-1.5 text-xs font-bold text-[#7B2948]">
                    <Sparkles className="w-3.5 h-3.5 text-[#D6A85A]" />
                    <span>100% Belgian Cocoa</span>
                  </div>
                </div>

                <div 
                  className="absolute -top-4 -right-2 sm:-top-6 sm:right-3 z-20 pointer-events-none animate-float-p2"
                  style={{ transform: `translate3d(${mouseOffset.x * 26}px, ${mouseOffset.y * 26}px, 45px)` }}
                >
                  <div className="px-3.5 py-1.5 rounded-full bg-[#7B2948]/95 backdrop-blur-md text-white shadow-xl border border-[#D6A85A]/60 flex items-center gap-1.5 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-[#D6A85A] text-[#D6A85A]" />
                    <span>Signature Masterpiece</span>
                  </div>
                </div>

                <div 
                  className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:right-2 z-20 pointer-events-none animate-float-p3"
                  style={{ transform: `translate3d(${mouseOffset.x * 16}px, ${mouseOffset.y * 16}px, 35px)` }}
                >
                  <div className="px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#34252B] shadow-lg border border-[#D6A85A]/40 flex items-center gap-1.5 text-xs font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Fresh Kolkata Delivery</span>
                  </div>
                </div>

                {/* Golden Sparkles */}
                <div className="absolute top-1/4 -left-6 pointer-events-none animate-sparkle">
                  <Sparkles className="w-6 h-6 text-[#D6A85A] drop-shadow-[0_0_8px_rgba(214,168,90,0.8)]" />
                </div>
                <div className="absolute bottom-1/3 -right-6 pointer-events-none animate-sparkle" style={{ animationDelay: '1.2s' }}>
                  <Sparkles className="w-5 h-5 text-amber-300 drop-shadow-[0_0_8px_rgba(214,168,90,0.8)]" />
                </div>

                {/* 3. MAIN 3D FLOATING CAKE IMAGE - CLEAN HIGH-RES ARTISAN CAKE */}
                <div 
                  className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[1/1] sm:aspect-[1.08/1] bg-gradient-to-b from-[#FFF5F7] via-white to-[#F7E7EC] animate-float-cake group cursor-pointer"
                  onClick={() => navigateTo('shop')}
                  style={{
                    transformStyle: 'preserve-3d',
                    boxShadow: '0 25px 60px -15px rgba(123, 41, 72, 0.3), 0 0 40px rgba(214, 168, 90, 0.25)'
                  }}
                >
                  <img
                    src="/images/hero/hero-cake-clean.png"
                    alt="Artisan Belgian chocolate Ferrero Rocher celebration cake with fresh berries and chocolate drip"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.includes('cake-hero.png')) {
                        target.src = '/images/hero/cake-hero.png';
                      }
                    }}
                  />
                  
                  {/* Subtle soft gradient overlay at the base for contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                  {/* Top-Right Pill Badge */}
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-[#2A160C]/90 to-[#5C2E14]/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-amber-100 border border-amber-300/40 shadow-md flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>Ferrero Rocher & Berry</span>
                  </div>

                  {/* Refined Bottom Glassmorphic Card (unobtrusive, preserving full cake view) */}
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/80 shadow-xl flex items-center justify-between gap-3 transition-all group-hover:bg-white">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#7B2948]">
                        <Star className="w-3.5 h-3.5 fill-[#D6A85A] text-[#D6A85A]" />
                        <span>5.0 (135 reviews)</span>
                        <span className="text-[#D6A85A]">✦</span>
                        <span className="text-[10px] uppercase tracking-wider text-[#553C46]">Bestseller</span>
                      </div>
                      <h4 className="font-serif text-sm sm:text-base font-bold text-[#34252B] truncate">
                        Chocolate Berry Celebration Cake
                      </h4>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <span className="text-[11px] text-gray-400 line-through block leading-tight">₹1,499</span>
                        <span className="text-sm sm:text-base font-bold text-[#7B2948] leading-tight">₹1,299</span>
                      </div>
                      <button 
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateTo('shop');
                        }}
                        className="px-3.5 py-2 bg-[#7B2948] hover:bg-[#621F38] text-white text-xs font-bold rounded-full inline-flex items-center gap-1.5 shadow-sm group-hover:scale-105 transition-all cursor-pointer"
                      >
                        <span>Order</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>

                {/* 3D Cake Shadow Reflection Base */}
                <div 
                  className="w-4/5 h-6 mx-auto mt-3 rounded-[100%] bg-[#34252B]/15 blur-md pointer-events-none transition-transform duration-500"
                  style={{
                    transform: `scale(${1 - mouseOffset.y * 0.08})`
                  }}
                />

              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
