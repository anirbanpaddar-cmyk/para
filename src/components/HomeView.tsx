import React, { useState } from 'react';
import { 
  Sparkles, ArrowRight, Star, Heart, Clock, 
  ShieldCheck, Award, ChevronDown, Check, Gift, Truck 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { HeroSection } from './HeroSection';
import { CategoryGrid } from './CategoryGrid';
import { ProductCard } from './ProductCard';
import { useScrollReveal } from '../hooks/useScrollReveal';
import bengaliWomanCakeImg from '../assets/images/bengali_woman_sleeveless_1793198779990.jpg';

export const HomeView: React.FC = () => {
  const { products, reviews, navigateTo } = useShop();
  useScrollReveal();

  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  // Products subsets
  const bestsellers = products.filter(p => p.isBestseller).slice(0, 6);
  const specialOccasionCakes = products.filter(p => 
    ['Wedding Cakes', 'Anniversary Cakes', 'Designer Cakes', "Kids' Cartoon Cakes"].includes(p.category)
  ).slice(0, 4);
  const newArrivals = products.filter(p => p.isNew).slice(0, 4);

  const faqs = [
    {
      q: 'How far in advance should I order my celebration cake?',
      a: 'For standard catalog cakes, same-day express delivery is available within 3-4 hours if ordered before 6 PM. For multi-tier custom cakes and designer fondant cakes, we recommend ordering 48 to 72 hours in advance.'
    },
    {
      q: 'Are your eggless cakes 100% vegetarian?',
      a: 'Yes, absolutely! We maintain separate baking stations and utensils for our 100% eggless cakes. We use pure vegetable emulsifiers and dairy cream with no compromise on moistness and sponge softness.'
    },
    {
      q: 'Do you offer midnight surprise delivery?',
      a: 'Yes! We specialize in midnight delivery between 11:00 PM and 12:00 AM. Select the "Midnight" delivery time slot during checkout, and our refrigerated van will deliver prompt celebration magic.'
    },
    {
      q: 'Can I customize the flavor, cream color, or message?',
      a: 'Yes! Every cake includes a complimentary message on the cake (up to 35 characters). For bespoke flavor combinations, tier sizes, and personalized photo prints, visit our "Custom Cakes" page.'
    },
    {
      q: 'How are cakes transported to ensure they remain intact?',
      a: 'All cakes are chilled, secured in rigid high-grade cake boxes with non-slip bases, and delivered in temperature-controlled vans driven by trained confectionery couriers.'
    }
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubmitted(true);
    setTimeout(() => {
      setNewsletterSubmitted(false);
      setNewsletterEmail('');
    }, 4000);
  };

  return (
    <div className="space-y-0 bg-[#FFFAF7]">
      
      {/* 3. Hero Banner */}
      <HeroSection />

      {/* 4. Shop by Category (20 Categories) */}
      <CategoryGrid />

      {/* 5. Bestselling Cakes Section (Targeted Animated Section) */}
      <section className="relative py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle decorative animated background orbs */}
        <div className="absolute top-1/4 -left-12 w-64 h-64 rounded-full bg-[#F7E7EC]/40 blur-3xl pointer-events-none animate-float-gentle" />
        <div className="absolute bottom-10 -right-12 w-72 h-72 rounded-full bg-[#D6A85A]/10 blur-3xl pointer-events-none animate-float-gentle" style={{ animationDelay: '2s' }} />

        <div className="reveal-init relative flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#F7E7EC]">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#7B2948] bg-[#F7E7EC] px-3 py-1 rounded-full mb-2 shadow-2xs group cursor-default transition-all duration-300 hover:shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#D6A85A] animate-spin" style={{ animationDuration: '6s' }} />
              <span className="tracking-wide">Customer Favorites · Fresh Kolkata Bakes</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#34252B] tracking-tight">
              Bestselling Celebration Cakes
            </h2>
            <p className="text-sm text-[#553C46] mt-1.5 max-w-xl">
              Our most celebrated Belgian chocolate truffles, red velvets, and cheesecakes handcrafted fresh for your Kolkata gatherings.
            </p>
          </div>

          <button
            onClick={() => navigateTo('shop')}
            className="mt-4 sm:mt-0 text-xs uppercase font-bold text-[#7B2948] hover:text-[#621F38] tracking-wider inline-flex items-center gap-2 group cursor-pointer px-4 py-2 rounded-xl bg-white/80 hover:bg-[#F7E7EC] border border-[#E8D3DC] hover:border-[#7B2948] transition-all duration-200 shadow-2xs hover:-translate-y-0.5"
          >
            <span>Browse Full Catalog</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
          </button>
        </div>

        {/* Animated staggered products grid with smooth lift and shadow expansion */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bestsellers.map((product, idx) => (
            <div
              key={product.id}
              className="reveal-init"
              style={{ transitionDelay: `${idx * 90}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* 6. Special Occasion Showpieces */}
      <section className="py-14 sm:py-20 bg-white border-y border-[#F7E7EC] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal-init flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#F7E7EC]">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#7B2948] mb-1">
                <Gift className="w-3.5 h-3.5 text-[#D6A85A]" />
                <span>Memorable Milestones</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#34252B]">
                Special Occasion Centerpieces
              </h2>
              <p className="text-sm text-[#553C46] mt-1">
                Luxury multi-tiered wedding cakes, romantic heart-shaped anniversaries, and bespoke party creations.
              </p>
            </div>

            <button
              onClick={() => navigateTo('shop')}
              className="mt-4 sm:mt-0 text-xs uppercase font-bold text-[#7B2948] hover:text-[#621F38] tracking-wider inline-flex items-center gap-1.5 group cursor-pointer hover:-translate-y-0.5 transition-transform"
            >
              <span>Explore Party Cakes</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {specialOccasionCakes.map((product, idx) => (
              <div 
                key={product.id} 
                className="reveal-init"
                style={{ transitionDelay: `${idx * 90}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Today's Offers Banner */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="reveal-init relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#7B2948] via-[#651D37] to-[#4F1328] text-white p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left max-w-xl">
            <span className="text-xs uppercase font-bold tracking-widest text-[#D6A85A] bg-black/20 px-3 py-1 rounded-full border border-amber-300/20">
              Today's Celebration Offer
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold leading-tight">
              Get Flat 10% OFF on Your First Handcrafted Cake
            </h3>
            <p className="text-xs sm:text-sm text-[#F7E7EC]/90 leading-relaxed">
              Use code <strong className="text-[#D6A85A] font-mono tracking-wider">WELCOME10</strong> at checkout on orders above ₹499. Includes free greeting card & birthday candles.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => navigateTo('offers')}
              className="px-6 py-3.5 bg-[#D6A85A] hover:bg-[#c29648] text-[#34252B] font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-200 cursor-pointer shadow-md hover:-translate-y-0.5"
            >
              View All 4 Coupons
            </button>
            <button
              onClick={() => navigateTo('shop')}
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
            >
              Shop All Cakes
            </button>
          </div>

          {/* Decorative rotating ambient ring */}
          <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full border-4 border-dashed border-white/10 animate-rotate-slow pointer-events-none" />
        </div>
      </section>

      {/* 8. Custom Cake Banner (Layered 3D Presentation) */}
      <section className="py-14 sm:py-20 bg-white border-y border-[#F7E7EC] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal-init grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FFFAF7] p-8 sm:p-12 rounded-3xl border border-[#F7E7EC] shadow-sm">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#7B2948] bg-[#F7E7EC] px-3 py-1 rounded-full border border-[#E8D3DC]">
                Custom Pâtisserie Atelier
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#34252B]">
                Have a Unique Cake Idea in Mind?
              </h2>
              <p className="text-sm text-[#553C46] leading-relaxed">
                Whether it's an elaborate 3-tier wedding cake with edible blossoms, a character cartoon cake for your child, or a personalized photo celebration, our master pâtissiers craft custom cakes tailored to your dreams.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#34252B]">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Upload Any Reference Photo</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#34252B]">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Real-Time Price Estimator</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#34252B]">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Direct Chef Consultation</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => navigateTo('custom-cake')}
                  className="px-8 py-3.5 bg-[#7B2948] hover:bg-[#621F38] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-200 cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-0.5 inline-flex items-center gap-2"
                >
                  <span>Build Your Custom Cake</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 relative group">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-[#F7E7EC] relative transition-transform duration-500 group-hover:scale-[1.02]">
                <img
                  src={bengaliWomanCakeImg || '/images/bengali-woman-sleeveless.jpg'}
                  alt="Bengali woman in elegant sleeveless blouse and silk saree with handcrafted custom celebration cake"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('bengali-woman-sleeveless.jpg')) {
                      target.src = '/images/bengali-woman-sleeveless.jpg';
                    }
                  }}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3.5 left-4 right-4 text-white pointer-events-none flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold drop-shadow-sm">Master Chef Ananya Sengupta</p>
                    <p className="text-[11px] text-[#F7E7EC]/90 drop-shadow-sm">Kolkata Custom Celebration Atelier</p>
                  </div>
                  <span className="text-[10px] bg-[#D6A85A] text-[#34252B] font-bold px-2 py-0.5 rounded-full shadow-xs">
                    ★ 4.98 Rated
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. New Arrivals with Scroll Reveal */}
      <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="reveal-init flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#F7E7EC]">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#7B2948] mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#D6A85A] animate-spin" style={{ animationDuration: '7s' }} />
              <span>Fresh from the Oven</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#34252B]">
              New Seasonal Arrivals
            </h2>
            <p className="text-sm text-[#553C46] mt-1">
              Fresh recipes introduced this season: Korean bento cakes, Alphonso mango mousses, and artisan cheesecakes.
            </p>
          </div>

          <button
            onClick={() => navigateTo('shop')}
            className="mt-4 sm:mt-0 text-xs uppercase font-bold text-[#7B2948] hover:text-[#621F38] tracking-wider inline-flex items-center gap-1.5 group cursor-pointer hover:-translate-y-0.5 transition-transform"
          >
            <span>View All New Treats</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product, idx) => (
            <div 
              key={product.id}
              className="reveal-init"
              style={{ transitionDelay: `${idx * 80}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* 10. Customer Reviews Section with Scroll Reveal */}
      <section className="py-14 sm:py-20 bg-white border-y border-[#F7E7EC] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal-init text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#7B2948] bg-[#F7E7EC] px-3.5 py-1 rounded-full border border-[#E8D3DC]">
              Real Celebration Stories
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#34252B]">
              Loved by Over 25,000 Celebrants
            </h2>
            <p className="text-xs sm:text-sm text-[#553C46]">
              Verified customer feedback from birthdays, anniversaries, and family milestones across Kolkata.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.slice(0, 3).map((rev, idx) => (
              <div 
                key={rev.id} 
                style={{ transitionDelay: `${idx * 120}ms` }}
                className="reveal-init bg-[#FFFAF7] p-6 rounded-2xl border border-[#F7E7EC] shadow-2xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                      ))}
                    </div>
                    <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded">
                      Verified Purchase
                    </span>
                  </div>

                  <h4 className="font-serif font-bold text-base text-[#34252B]">
                    "{rev.title}"
                  </h4>
                  <p className="text-xs text-[#553C46] mt-2 leading-relaxed">
                    {rev.comment}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E8D3DC] mt-4 flex items-center justify-between text-xs">
                  <span className="font-bold text-[#34252B]">{rev.author}</span>
                  <span className="text-gray-400 text-[11px]">{rev.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Why Choose Us (Features) */}
      <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#7B2948] bg-[#F7E7EC] px-3.5 py-1 rounded-full">
            Our Quality Pledge
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#34252B]">
            Why Choose Cake Paradise?
          </h2>
          <p className="text-xs sm:text-sm text-[#553C46]">
            Every recipe is thoughtfully crafted for unforgettable taste, aesthetic beauty, and seamless delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#F7E7EC] shadow-2xs space-y-3 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-[#F7E7EC] text-[#7B2948] flex items-center justify-center mx-auto sm:mx-0">
              <Clock className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-bold text-base text-[#34252B]">Baking on Order Day</h4>
            <p className="text-xs text-[#553C46] leading-relaxed">
              Never frozen. Your cake goes into the oven on the morning of your chosen delivery date.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#F7E7EC] shadow-2xs space-y-3 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-[#F7E7EC] text-[#D6A85A] flex items-center justify-center mx-auto sm:mx-0">
              <Truck className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-bold text-base text-[#34252B]">Chilled Temperature Vans</h4>
            <p className="text-xs text-[#553C46] leading-relaxed">
              Delivered intact in temperature-controlled bakery chiller vehicles to prevent cream melting.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#F7E7EC] shadow-2xs space-y-3 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-[#F7E7EC] text-[#7B2948] flex items-center justify-center mx-auto sm:mx-0">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-bold text-base text-[#34252B]">Belgian Cocoa & Butter</h4>
            <p className="text-xs text-[#553C46] leading-relaxed">
              We exclusively use 100% pure butter and Callebaut chocolate. Zero palm oil or cheap compounds.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#F7E7EC] shadow-2xs space-y-3 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-[#F7E7EC] text-[#D6A85A] flex items-center justify-center mx-auto sm:mx-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-bold text-base text-[#34252B]">100% On-Time Guarantee</h4>
            <p className="text-xs text-[#553C46] leading-relaxed">
              Selected your slot? We deliver exactly in that window, including special midnight surprises.
            </p>
          </div>
        </div>
      </section>

      {/* 12. Newsletter Subscription */}
      <section className="py-12 bg-white border-t border-[#F7E7EC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#F7E7EC] text-[#7B2948] flex items-center justify-center mx-auto">
            <Gift className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#34252B]">
            Get 15% OFF Your Next Celebration Cake
          </h3>
          <p className="text-xs sm:text-sm text-[#553C46] max-w-lg mx-auto">
            Subscribe to our newsletter for exclusive seasonal coupons, pastry chef masterclasses, and festival discounts.
          </p>

          {newsletterSubmitted ? (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl inline-flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Thank you! Your 15% promo code SWEET15 has been sent to your email.</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="flex-1 text-xs px-4 py-3 bg-[#FFFAF7] border border-[#E8D3DC] rounded-xl focus:outline-none focus:border-[#7B2948]"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#7B2948] hover:bg-[#621F38] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer shrink-0"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      {/* 13. Frequently Asked Questions */}
      <section className="py-14 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#7B2948] bg-[#F7E7EC] px-3.5 py-1 rounded-full">
            Help & Answers
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#34252B]">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-[#553C46]">
            Everything you need to know about our fresh baking, delivery time slots, and customization.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-[#F7E7EC] overflow-hidden shadow-2xs"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 text-left font-serif font-bold text-sm sm:text-base text-[#34252B] flex items-center justify-between gap-4 cursor-pointer hover:text-[#7B2948] transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-[#7B2948] transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="px-4 pb-4 pt-1 text-xs text-[#553C46] leading-relaxed border-t border-[#F7E7EC]/60">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
