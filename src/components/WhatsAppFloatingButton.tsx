import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

export const WhatsAppFloatingButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const handleSend = () => {
    const text = encodeURIComponent(
      customMsg.trim() || "Hello Cake Paradise Kolkata! I would like to order a fresh celebration cake."
    );
    window.open(`https://wa.me/919830045678?text=${text}`, '_blank');
    setIsOpen(false);
    setCustomMsg('');
  };

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-5 z-40">
      {/* Chat Popup Box */}
      {isOpen && (
        <div className="mb-3 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-[#F7E7EC] p-4 text-left animate-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between pb-2.5 border-b border-[#F7E7EC]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-xs text-[#34252B]">Cake Paradise Atelier</h4>
                <span className="text-[10px] text-emerald-600 font-medium">● Online to help</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-3 text-xs text-[#553C46] leading-relaxed">
            Need urgent same-day delivery, custom photo design advice, or midnight booking confirmation? Chat directly with our pastry concierge!
          </div>

          <div className="space-y-2">
            <textarea
              rows={2}
              placeholder="Type your cake query or flavour request..."
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              className="w-full text-xs p-2.5 bg-[#FFFAF7] border border-[#E8D3DC] rounded-xl focus:outline-none focus:border-emerald-600"
            />
            <button
              onClick={handleSend}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Start WhatsApp Chat</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-13 h-13 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl hover:scale-105 transition-all flex items-center justify-center cursor-pointer group"
        aria-label="Chat on WhatsApp"
        title="WhatsApp Cake Order Concierge"
      >
        <MessageSquare className="w-6 h-6 group-hover:rotate-6 transition-transform" />
      </button>
    </div>
  );
};
