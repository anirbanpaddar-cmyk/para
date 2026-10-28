import React from 'react';
import { Heart, Sparkles, Award, Clock, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const AboutUsView: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <div className="bg-[#FFFAF7] min-h-screen py-12 sm:py-16 border-b border-[#F7E7EC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-full overflow-hidden bg-white shadow-xl border-2 border-[#D6A85A] p-2 flex items-center justify-center transition-transform hover:scale-105">
            <img
              src="/images/logo/cake-paradise-logo.png"
              alt="Cake Paradise Official Logo Emblem"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#7B2948] bg-[#F7E7EC] px-3.5 py-1.5 rounded-full border border-[#E8D3DC]">
            <Sparkles className="w-3.5 h-3.5 text-[#D6A85A]" />
            <span>The Cake Paradise Story</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#34252B] leading-tight">
            Every Celebration Deserves a Beautiful Cake!
          </h1>
          <p className="text-sm sm:text-base text-[#553C46] leading-relaxed">
            Founded with an enduring passion for authentic European pâtisserie and heartwarming Bengali and Indian celebrations, Cake Paradise brings together time-honored artisanal baking techniques and the finest Belgian cocoa right here in Kolkata, West Bengal.
          </p>
        </div>

        {/* Story Split Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="relative rounded-2xl overflow-hidden border-4 border-white shadow-xl aspect-[4/3]">
            <img
              src="/images/hero/cake-hero.png"
              alt="Pastry Chef decorating cake in studio"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-5 text-sm text-[#553C46] leading-relaxed">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#34252B]">
              Handcrafted in Small Batches, Never Mass-Produced
            </h2>
            <p>
              We believe a celebration cake shouldn't sit on a grocery shelf for days. Every sponge at Cake Paradise is mixed, baked, soaked, and frosted fresh on the day of delivery.
            </p>
            <p>
              From velvety 70% Belgian chocolate truffle to airy French vanilla bean chantilly and delicate saffron rasmalai infusions, our recipes are perfected by Le Cordon Bleu-trained pastry artisans.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#F7E7EC]">
              <div className="p-3 bg-white rounded-xl border border-[#F7E7EC]">
                <h4 className="font-serif font-bold text-xl text-[#7B2948]">100%</h4>
                <p className="text-xs text-gray-500">Pure Butter & Fresh Cream</p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#F7E7EC]">
                <h4 className="font-serif font-bold text-xl text-[#7B2948]">25,000+</h4>
                <p className="text-xs text-gray-500">Celebrations Sweetened</p>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          <div className="bg-white p-6 rounded-2xl border border-[#F7E7EC] shadow-2xs space-y-2.5">
            <div className="w-10 h-10 rounded-full bg-[#F7E7EC] text-[#7B2948] flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#34252B]">Freshly Baked</h3>
            <p className="text-xs text-[#553C46] leading-relaxed">
              Every single order is baked from scratch in temperature-controlled ateliers specifically for your celebration time slot.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#F7E7EC] shadow-2xs space-y-2.5">
            <div className="w-10 h-10 rounded-full bg-[#F7E7EC] text-[#D6A85A] flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#34252B]">Finest Ingredients</h3>
            <p className="text-xs text-[#553C46] leading-relaxed">
              We never use hydrogenated fats or premixes. Only pure dairy butter, Callebaut Belgian chocolate, and real bourbon vanilla.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#F7E7EC] shadow-2xs space-y-2.5">
            <div className="w-10 h-10 rounded-full bg-[#F7E7EC] text-[#7B2948] flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#34252B]">100% Eggless Mastery</h3>
            <p className="text-xs text-[#553C46] leading-relaxed">
              Our signature eggless sponge recipes achieve world-class lightness and moisture without compromising pure vegetarian ethics.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#F7E7EC] shadow-2xs space-y-2.5">
            <div className="w-10 h-10 rounded-full bg-[#F7E7EC] text-[#D6A85A] flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#34252B]">Custom Artistry</h3>
            <p className="text-xs text-[#553C46] leading-relaxed">
              Multi-tiered wedding showpieces, bespoke fondant characters, 24k gold leaf details, and edible photo prints.
            </p>
          </div>
        </div>

        {/* CTA Strip */}
        <div className="bg-white p-8 rounded-2xl border border-[#F7E7EC] text-center space-y-4">
          <h3 className="font-serif text-2xl font-bold text-[#34252B]">
            Ready to Plan Your Next Sweet Gathering?
          </h3>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigateTo('shop')}
              className="px-6 py-3 bg-[#7B2948] text-white text-xs font-bold uppercase rounded-xl hover:bg-[#621F38] cursor-pointer"
            >
              Order Online Now
            </button>
            <button
              onClick={() => navigateTo('custom-cake')}
              className="px-6 py-3 bg-[#FFFAF7] border border-[#7B2948] text-[#7B2948] text-xs font-bold uppercase rounded-xl hover:bg-[#F7E7EC] cursor-pointer"
            >
              Request Custom Design
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
