import React, { useState } from 'react';
import { 
  Phone, Mail, MapPin, Clock, MessageSquare, 
  Send, Check, Instagram, Facebook, Twitter, Sparkles 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ContactUsView: React.FC = () => {
  const { storeSettings } = useShop();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Celebration Cake Enquiry');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 4000);
  };

  const handleWhatsAppEnquiry = () => {
    const text = encodeURIComponent("Hello Cake Paradise! I would like to enquire about ordering a fresh celebration cake.");
    window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
  };

  return (
    <div className="bg-[#FFFAF7] min-h-screen py-10 sm:py-16 border-b border-[#F7E7EC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#7B2948] bg-[#F7E7EC] px-3.5 py-1 rounded-full">
            We're Here For You
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#34252B]">
            Get in Touch with Cake Paradise
          </h1>
          <p className="text-xs sm:text-sm text-[#553C46]">
            Have a question about a bespoke design, corporate catering, or custom wedding consultation? Our team is always thrilled to assist.
          </p>
        </div>

        {/* 2-Column: Contact Details (Left) & Form (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Store Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#F7E7EC] shadow-2xs space-y-5">
              <h3 className="font-serif font-bold text-xl text-[#34252B] pb-3 border-b border-[#F7E7EC]">
                Bakery Atelier Info
              </h3>

              <div className="space-y-4 text-xs text-[#553C46]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#F7E7EC] text-[#7B2948] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-[#34252B] block text-sm">Store Address</strong>
                    <p className="leading-relaxed mt-0.5">{storeSettings.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#F7E7EC] text-[#7B2948] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-[#34252B] block text-sm">Phone Helpline</strong>
                    <p className="mt-0.5">{storeSettings.phone}</p>
                    <p className="text-[11px] text-gray-400">Available 8:00 AM - 11:30 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#F7E7EC] text-[#7B2948] flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-[#34252B] block text-sm">Email</strong>
                    <p className="mt-0.5">{storeSettings.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#F7E7EC] text-[#7B2948] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-[#34252B] block text-sm">Baking & Delivery Hours</strong>
                    <p className="mt-0.5">Monday – Sunday: 8:00 AM – 11:59 PM</p>
                    <p className="text-[11px] text-emerald-700 font-semibold">Midnight delivery slots open daily</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp Direct Action */}
              <div className="pt-4 border-t border-[#F7E7EC]">
                <button
                  type="button"
                  onClick={handleWhatsAppEnquiry}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp (+91 98300 45678)</span>
                </button>
              </div>
            </div>

            {/* Map Preview Container */}
            <div className="bg-white p-4 rounded-2xl border border-[#F7E7EC] shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-[#34252B]">
                <span>Kolkata Atelier Location</span>
                <span className="text-gray-400 font-normal">Park Street & Salt Lake</span>
              </div>
              <div className="aspect-[16/9] rounded-xl bg-[#F7E7EC] relative overflow-hidden flex items-center justify-center text-center p-4 border border-[#E8D3DC]">
                <div className="space-y-1">
                  <div className="w-8 h-8 rounded-full bg-[#7B2948] text-white flex items-center justify-center mx-auto shadow-xs">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <p className="font-serif font-bold text-xs text-[#34252B]">Cake Paradise Master Atelier</p>
                  <p className="text-[10px] text-gray-500">18A, Park Mansions, Park Street, Kolkata 700016</p>
                  <p className="text-[10px] text-emerald-700 font-semibold">Delivery across Kolkata (PINs 700001 - 700160)</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Message Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#F7E7EC] shadow-2xs space-y-6">
            <h3 className="font-serif font-bold text-xl text-[#34252B] pb-3 border-b border-[#F7E7EC]">
              Send Us a Message
            </h3>

            {sent && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2.5">
                <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Thank you! Your enquiry has been received. Our concierge will reply within 30 minutes.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#34252B] uppercase mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rohini Sen"
                    className="w-full text-xs px-3.5 py-2.5 bg-[#FFFAF7] border border-[#E8D3DC] rounded-xl focus:outline-none focus:border-[#7B2948]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#34252B] uppercase mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. rohini@example.com"
                    className="w-full text-xs px-3.5 py-2.5 bg-[#FFFAF7] border border-[#E8D3DC] rounded-xl focus:outline-none focus:border-[#7B2948]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#34252B] uppercase mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full text-xs px-3.5 py-2.5 bg-[#FFFAF7] border border-[#E8D3DC] rounded-xl focus:outline-none focus:border-[#7B2948]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#34252B] uppercase mb-1">
                    Subject
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-[#FFFAF7] border border-[#E8D3DC] rounded-xl focus:outline-none focus:border-[#7B2948]"
                  >
                    <option value="Celebration Cake Enquiry">Celebration Cake Enquiry</option>
                    <option value="Custom Wedding Cake Consultation">Custom Wedding Cake Consultation</option>
                    <option value="Bulk Corporate Gifting">Bulk Corporate Gifting</option>
                    <option value="Delivery Status Assistance">Delivery Status Assistance</option>
                    <option value="Feedback / Compliment">Feedback / Compliment</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#34252B] uppercase mb-1">
                  Your Message *
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share details regarding cake size, event date, dietary preferences, or specific decorative themes..."
                  className="w-full text-xs px-3.5 py-2.5 bg-[#FFFAF7] border border-[#E8D3DC] rounded-xl focus:outline-none focus:border-[#7B2948]"
                />
              </div>

              <button
                type="submit"
                className="px-8 py-3.5 bg-[#7B2948] hover:bg-[#621F38] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>

            {/* Social links */}
            <div className="pt-6 border-t border-[#F7E7EC] flex items-center justify-between text-xs text-[#553C46]">
              <span>Follow our daily cake bakes & stories:</span>
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-full bg-[#F7E7EC] text-[#7B2948] hover:bg-[#7B2948] hover:text-white transition-colors cursor-pointer">
                  <Instagram className="w-4 h-4" />
                </span>
                <span className="p-2 rounded-full bg-[#F7E7EC] text-[#7B2948] hover:bg-[#7B2948] hover:text-white transition-colors cursor-pointer">
                  <Facebook className="w-4 h-4" />
                </span>
                <span className="p-2 rounded-full bg-[#F7E7EC] text-[#7B2948] hover:bg-[#7B2948] hover:text-white transition-colors cursor-pointer">
                  <Twitter className="w-4 h-4" />
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
