import React, { useState, useMemo } from 'react';
import { 
  Sparkles, Upload, Check, Calendar, Clock, 
  HelpCircle, ArrowRight, ShieldCheck, Heart 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CustomCakeRequest } from '../types';

export const CustomCakeView: React.FC = () => {
  const { submitCustomRequest, navigateTo, currentUser } = useShop();

  // Form states
  const [customerName, setCustomerName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [shape, setShape] = useState('Round Classic');
  const [size, setSize] = useState('1.5 kg (Serves 12-15)');
  const [flavor, setFlavor] = useState('Belgian Chocolate Truffle');
  const [isEggless, setIsEggless] = useState(true);
  const [creamColor, setCreamColor] = useState('Ivory & Gold Accents');
  const [theme, setTheme] = useState('Floral & Gold Leaf');
  const [occasion, setOccasion] = useState('Birthday Celebration');
  const [cakeMessage, setCakeMessage] = useState('');
  const [deliveryDate, setDeliveryDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2); // Custom cakes require 48h advance
    return d.toISOString().split('T')[0];
  });
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState('Evening (6:00 PM - 9:00 PM)');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [referenceImageUrl, setReferenceImageUrl] = useState<string>('/images/products/designer-cake.png');
  const [submittedRequest, setSubmittedRequest] = useState<CustomCakeRequest | null>(null);

  // Live estimated price calculation formula
  const estimatedPrice = useMemo(() => {
    let base = 800;

    // Weight additions
    if (size.includes('0.5 kg')) base = 650;
    else if (size.includes('1 kg')) base = 1100;
    else if (size.includes('1.5 kg')) base = 1650;
    else if (size.includes('2 kg')) base = 2100;
    else if (size.includes('3 kg')) base = 3200;
    else if (size.includes('5 kg')) base = 5400;

    // Shape factor
    if (shape.includes('2-Tier') || shape.includes('3-Tier')) base += 800;
    if (shape.includes('Number') || shape.includes('Heart')) base += 250;

    // Flavor premium
    if (flavor.includes('Truffle') || flavor.includes('Ferrero') || flavor.includes('Cheesecake')) base += 300;
    if (flavor.includes('Rasmalai')) base += 250;

    // Eggless premium (negligible or standard)
    if (isEggless) base += 50;

    return base;
  }, [size, shape, flavor, isEggless]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setReferenceImageUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone) return;

    const req = submitCustomRequest({
      customerName,
      phone,
      email: email || 'guest@example.com',
      shape,
      size,
      flavor,
      isEggless,
      creamColor,
      theme,
      occasion,
      cakeMessage,
      deliveryDate,
      deliveryTimeSlot,
      specialInstructions,
      referenceImageUrl,
      estimatedPrice
    });

    setSubmittedRequest(req);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submittedRequest) {
    return (
      <div className="bg-[#FFFAF7] min-h-screen py-16 px-4">
        <div className="max-w-2xl mx-auto bg-white p-8 sm:p-10 rounded-2xl border border-[#F7E7EC] shadow-lg text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <Check className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest text-[#7B2948]">
              Request Received & Logged
            </span>
            <h1 className="font-serif text-3xl font-bold text-[#34252B]">
              Custom Cake Consultation Booked!
            </h1>
            <p className="text-sm text-[#553C46]">
              Your bespoke cake request has been submitted to our head pastry chef studio. We will contact you within 2 hours to confirm final frosting textures and delivery logistics.
            </p>
          </div>

          <div className="bg-[#FFFAF7] p-4 rounded-xl border border-[#E8D3DC] text-left text-xs space-y-2 max-w-md mx-auto">
            <div className="flex justify-between py-1 border-b border-[#F7E7EC]">
              <span className="text-gray-500">Reference Number:</span>
              <span className="font-bold font-mono text-[#7B2948]">{submittedRequest.referenceNumber}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#F7E7EC]">
              <span className="text-gray-500">Occasion & Theme:</span>
              <span className="font-semibold text-[#34252B]">{submittedRequest.occasion} · {submittedRequest.theme}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#F7E7EC]">
              <span className="text-gray-500">Size & Shape:</span>
              <span className="font-semibold text-[#34252B]">{submittedRequest.size} ({submittedRequest.shape})</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#F7E7EC]">
              <span className="text-gray-500">Delivery Date:</span>
              <span className="font-semibold text-[#34252B]">{submittedRequest.deliveryDate} ({submittedRequest.deliveryTimeSlot})</span>
            </div>
            <div className="flex justify-between py-1 text-sm font-bold text-[#7B2948]">
              <span>Estimated Quote:</span>
              <span className="font-serif tabular-nums">₹{submittedRequest.estimatedPrice}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              onClick={() => navigateTo('shop')}
              className="px-6 py-3 bg-[#7B2948] text-white text-xs font-bold uppercase rounded-xl hover:bg-[#621F38] cursor-pointer"
            >
              Browse Ready Cakes
            </button>
            <button
              onClick={() => setSubmittedRequest(null)}
              className="px-6 py-3 bg-[#FFFAF7] border border-[#E8D3DC] text-[#34252B] text-xs font-bold uppercase rounded-xl hover:bg-[#F7E7EC] cursor-pointer"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFFAF7] min-h-screen py-10 sm:py-16 border-b border-[#F7E7EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#7B2948] bg-[#F7E7EC] px-3.5 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-[#D6A85A]" />
            <span>Artisan Pâtisserie Studio</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#34252B]">
            Design Your Custom Celebration Cake
          </h1>
          <p className="text-sm sm:text-base text-[#553C46]">
            Bring your dream cake to life. Select tier shapes, gourmet fillings, frosting palette, and upload reference sketches or photos for our master pâtissiers.
          </p>
        </div>

        {/* Builder Form & Live Estimate Card Layout */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Form: Options (8 cols) */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-2xl border border-[#F7E7EC] shadow-sm space-y-8">
            
            {/* Step 1: Occasion & Theme */}
            <div>
              <h2 className="font-serif text-lg font-bold text-[#34252B] mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#7B2948] text-white text-xs font-bold flex items-center justify-center">1</span>
                <span>Occasion & Theme</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#34252B] uppercase mb-1.5">
                    Celebration Occasion *
                  </label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-[#FFFAF7] border border-[#E8D3DC] rounded-xl focus:outline-none focus:border-[#7B2948]"
                  >
                    <option value="Birthday Celebration">Birthday Celebration</option>
                    <option value="Wedding Reception">Wedding Reception</option>
                    <option value="Anniversary Milestone">Anniversary Milestone</option>
                    <option value="Baby Shower / Gender Reveal">Baby Shower / Gender Reveal</option>
                    <option value="Kids Themed Birthday">Kids Themed Birthday</option>
                    <option value="Corporate Event / Launch">Corporate Event / Launch</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#34252B] uppercase mb-1.5">
                    Design Theme
                  </label>
                  <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-[#FFFAF7] border border-[#E8D3DC] rounded-xl focus:outline-none focus:border-[#7B2948]"
                  >
                    <option value="Floral & Gold Leaf">Floral & 24k Gold Leaf</option>
                    <option value="Minimalist Korean Bento">Minimalist Korean Pastel</option>
                    <option value="Geometric Modern Luxury">Geometric Modern Architecture</option>
                    <option value="Fondant Figurine / Whimsical">Handmade Fondant Figurines</option>
                    <option value="Rustic Naked Buttercream">Rustic Naked Botanical</option>
                    <option value="Glossy Mirror Glaze">High-Gloss Mirror Glaze</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 2: Shape & Size */}
            <div className="pt-6 border-t border-[#F7E7EC]">
              <h2 className="font-serif text-lg font-bold text-[#34252B] mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#7B2948] text-white text-xs font-bold flex items-center justify-center">2</span>
                <span>Shape & Weight / Serving Size</span>
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#34252B] uppercase mb-2">
                    Cake Architecture / Shape
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {[
                      'Round Classic',
                      'Romantic Heart',
                      'Square Architectural',
                      '2-Tier Grand',
                      '3-Tier Royal',
                      'Number / Alphabet Monogram'
                    ].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setShape(s)}
                        className={`p-3 rounded-xl text-left border text-xs font-semibold transition-all cursor-pointer ${
                          shape === s
                            ? 'border-[#7B2948] bg-[#F7E7EC] text-[#7B2948] shadow-2xs'
                            : 'border-[#E8D3DC] hover:border-gray-400 text-[#34252B]'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#34252B] uppercase mb-2">
                    Serving Size & Approximate Weight
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {[
                      '0.5 kg (Serves 4-6)',
                      '1 kg (Serves 8-10)',
                      '1.5 kg (Serves 12-15)',
                      '2 kg (Serves 18-20)',
                      '3 kg (Serves 28-32)',
                      '5 kg+ (Serves 45+)'
                    ].map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setSize(sz)}
                        className={`p-3 rounded-xl text-left border text-xs font-semibold transition-all cursor-pointer ${
                          size === sz
                            ? 'border-[#7B2948] bg-[#F7E7EC] text-[#7B2948] shadow-2xs'
                            : 'border-[#E8D3DC] hover:border-gray-400 text-[#34252B]'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Flavors & Dietary */}
            <div className="pt-6 border-t border-[#F7E7EC]">
              <h2 className="font-serif text-lg font-bold text-[#34252B] mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#7B2948] text-white text-xs font-bold flex items-center justify-center">3</span>
                <span>Flavor & Dietary Preference</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#34252B] uppercase mb-1.5">
                    Gourmet Sponge & Filling Flavor
                  </label>
                  <select
                    value={flavor}
                    onChange={(e) => setFlavor(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-[#FFFAF7] border border-[#E8D3DC] rounded-xl focus:outline-none focus:border-[#7B2948]"
                  >
                    <option value="Belgian Chocolate Truffle">Belgian Chocolate Truffle</option>
                    <option value="Red Velvet & Cream Cheese">Red Velvet & Cream Cheese</option>
                    <option value="Fresh Madagascar Vanilla & Berries">Fresh Madagascar Vanilla & Berries</option>
                    <option value="Ferrero Hazelnut Crunch">Ferrero Hazelnut Crunch</option>
                    <option value="Saffron Rasmalai Fusion">Saffron Rasmalai Fusion</option>
                    <option value="Wild Blueberry Cheesecake">Wild Blueberry Cheesecake</option>
                    <option value="Alphonso Mango Mousse">Alphonso Mango Mousse</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#34252B] uppercase mb-1.5">
                    Frosting / Palette Tone
                  </label>
                  <select
                    value={creamColor}
                    onChange={(e) => setCreamColor(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-[#FFFAF7] border border-[#E8D3DC] rounded-xl focus:outline-none focus:border-[#7B2948]"
                  >
                    <option value="Ivory & Gold Accents">Ivory Cream & 24k Gold Accents</option>
                    <option value="Soft Dusty Rose & Blush">Soft Dusty Rose & Blush</option>
                    <option value="Midnight Navy & Golden Dust">Midnight Navy & Golden Dust</option>
                    <option value="Sage Green & White Florals">Sage Green & White Florals</option>
                    <option value="Chocolate Ganache Glossy Drip">Dark Chocolate Ganache Glossy Drip</option>
                    <option value="Lavender & Lilac Dream">Lavender & Lilac Dream</option>
                  </select>
                </div>
              </div>

              {/* Eggless toggle */}
              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsEggless(true)}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                    isEggless
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow-2xs'
                      : 'border-[#E8D3DC] text-gray-600'
                  }`}
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                  <span>100% Pure Vegetarian / Eggless</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsEggless(false)}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                    !isEggless
                      ? 'border-amber-700 bg-amber-50 text-amber-950 shadow-2xs'
                      : 'border-[#E8D3DC] text-gray-600'
                  }`}
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-700" />
                  <span>Contains Egg</span>
                </button>
              </div>
            </div>

            {/* Step 4: Reference Image & Inscription */}
            <div className="pt-6 border-t border-[#F7E7EC]">
              <h2 className="font-serif text-lg font-bold text-[#34252B] mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#7B2948] text-white text-xs font-bold flex items-center justify-center">4</span>
                <span>Design Reference & Personal Message</span>
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#34252B] uppercase mb-1.5">
                    Upload Design Reference Photo or Sketch (Optional)
                  </label>
                  <div className="flex flex-col sm:flex-row items-center gap-4 p-4 border-2 border-dashed border-[#E8D3DC] rounded-xl bg-[#FFFAF7]">
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-white border border-[#E8D3DC] shrink-0">
                      <img
                        src={referenceImageUrl}
                        alt="Reference Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <label className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#7B2948] text-[#7B2948] hover:bg-[#F7E7EC] text-xs font-bold rounded-lg cursor-pointer transition-colors shadow-2xs">
                        <Upload className="w-4 h-4" />
                        <span>Choose Photo File</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                      <p className="text-[11px] text-[#553C46] mt-1.5">
                        Upload an Instagram photo, Pinterest moodboard, or theme invitation. JPG, PNG up to 10MB.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#34252B] uppercase mb-1">
                    Cake Inscription Message
                  </label>
                  <input
                    type="text"
                    maxLength={40}
                    placeholder="e.g., Happy 1st Birthday Myra / Forever & Always"
                    value={cakeMessage}
                    onChange={(e) => setCakeMessage(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-[#FFFAF7] border border-[#E8D3DC] rounded-xl focus:outline-none focus:border-[#7B2948]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#34252B] uppercase mb-1">
                    Special Chef Instructions & Delivery Notes
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Less sugar, pastel pink macaron toppers, deliver cold in chiller box..."
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-[#FFFAF7] border border-[#E8D3DC] rounded-xl focus:outline-none focus:border-[#7B2948]"
                  />
                </div>
              </div>
            </div>

            {/* Step 5: Contact & Delivery Scheduling */}
            <div className="pt-6 border-t border-[#F7E7EC]">
              <h2 className="font-serif text-lg font-bold text-[#34252B] mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#7B2948] text-white text-xs font-bold flex items-center justify-center">5</span>
                <span>Contact & Delivery Schedule</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#34252B] uppercase mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Aditi Rao"
                    className="w-full text-xs px-3 py-2 bg-[#FFFAF7] border border-[#E8D3DC] rounded-xl focus:outline-none focus:border-[#7B2948]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#34252B] uppercase mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full text-xs px-3 py-2 bg-[#FFFAF7] border border-[#E8D3DC] rounded-xl focus:outline-none focus:border-[#7B2948]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#34252B] uppercase mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. aditi@example.com"
                    className="w-full text-xs px-3 py-2 bg-[#FFFAF7] border border-[#E8D3DC] rounded-xl focus:outline-none focus:border-[#7B2948]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                <div>
                  <label className="block text-xs font-bold text-[#34252B] uppercase mb-1">Delivery Date *</label>
                  <input
                    type="date"
                    required
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-[#FFFAF7] border border-[#E8D3DC] rounded-xl focus:outline-none focus:border-[#7B2948]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#34252B] uppercase mb-1">Preferred Time Slot</label>
                  <select
                    value={deliveryTimeSlot}
                    onChange={(e) => setDeliveryTimeSlot(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-[#FFFAF7] border border-[#E8D3DC] rounded-xl focus:outline-none focus:border-[#7B2948]"
                  >
                    <option value="Morning (9:00 AM - 12:00 PM)">Morning (9:00 AM - 12:00 PM)</option>
                    <option value="Afternoon (1:00 PM - 5:00 PM)">Afternoon (1:00 PM - 5:00 PM)</option>
                    <option value="Evening (6:00 PM - 9:00 PM)">Evening (6:00 PM - 9:00 PM)</option>
                    <option value="Midnight (11:00 PM - 12:00 AM)">Midnight (11:00 PM - 12:00 AM)</option>
                  </select>
                </div>
              </div>
            </div>

          </div>

          {/* Right Summary: Live Price Calculator & Submit (4 cols) */}
          <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-[#F7E7EC] shadow-sm space-y-6 sticky top-28">
            <h3 className="font-serif text-lg font-bold text-[#34252B] pb-3 border-b border-[#F7E7EC]">
              Custom Order Summary
            </h3>

            {/* Selected Reference Preview */}
            <div className="aspect-[16/10] rounded-xl overflow-hidden bg-[#FFFAF7] border border-[#E8D3DC]">
              <img
                src={referenceImageUrl}
                alt="Custom Cake Blueprint"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-2 text-xs text-[#553C46]">
              <div className="flex justify-between py-1 border-b border-[#F7E7EC]">
                <span>Occasion:</span>
                <span className="font-semibold text-[#34252B]">{occasion}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#F7E7EC]">
                <span>Shape:</span>
                <span className="font-semibold text-[#34252B]">{shape}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#F7E7EC]">
                <span>Size:</span>
                <span className="font-semibold text-[#34252B]">{size}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#F7E7EC]">
                <span>Flavor:</span>
                <span className="font-semibold text-[#34252B] truncate max-w-[150px]">{flavor}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#F7E7EC]">
                <span>Dietary:</span>
                <span className="font-semibold text-emerald-700">{isEggless ? '100% Eggless' : 'With Egg'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#F7E7EC]">
                <span>Color Tone:</span>
                <span className="font-semibold text-[#34252B] truncate max-w-[150px]">{creamColor}</span>
              </div>
              {cakeMessage && (
                <div className="flex justify-between py-1 border-b border-[#F7E7EC]">
                  <span>Message:</span>
                  <span className="font-serif italic text-[#7B2948] truncate max-w-[150px]">"{cakeMessage}"</span>
                </div>
              )}
            </div>

            {/* Calculated Estimated Price */}
            <div className="bg-[#FFFAF7] p-4 rounded-xl border border-[#E8D3DC] space-y-1">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">
                Estimated Price (Inc. GST)
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold font-serif text-[#7B2948] tabular-nums">
                  ₹{estimatedPrice}
                </span>
                <span className="text-xs text-gray-400">approximate</span>
              </div>
              <p className="text-[10px] text-gray-500">
                Final price confirmed after chef review of intricate fondant or gold leaf details.
              </p>
            </div>

            {/* Submit Request Button */}
            <button
              type="submit"
              className="w-full py-4 bg-[#7B2948] hover:bg-[#621F38] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Request Custom Cake</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 text-[11px] text-gray-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>No immediate payment required. Pay upon chef consultation.</span>
            </div>
            <div className="text-[11px] text-[#7B2948] bg-[#F7E7EC] p-2.5 rounded-lg font-medium text-center">
              📍 Delivering exclusively across Kolkata & Greater Kolkata (PINs 700001 – 700160)
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
