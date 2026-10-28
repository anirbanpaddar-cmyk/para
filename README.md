# Cake Paradise — Premium Cake E-Commerce (Kolkata)

> **"Every Celebration Deserves a Beautiful Cake!"**

A complete, luxury, fully responsive cake e-commerce web application inspired by WooCommerce online stores, tailored specifically for **Kolkata, West Bengal, India**. Handcrafted with React 19, TypeScript, and Tailwind CSS.

---

## 📍 Business & Delivery Overview

- **Business Name**: Cake Paradise
- **Tagline**: Every Celebration Deserves a Beautiful Cake!
- **Head Atelier**: 18A, Park Mansions, Park Street, Kolkata, West Bengal 700016
- **Secondary Studio**: Sector V, Salt Lake, Kolkata, West Bengal 700091
- **Service Zone**: **Kolkata Serviceable PIN Codes (700001 – 700160)**
- **Supported Neighborhoods**: Park Street, Ballygunge, Gariahat, Alipore, New Alipore, Salt Lake (Sec I, II, III, V), New Town (Action Area 1, 2, 3), Shyambazar, Dum Dum, Behala, Jadavpur, Kasba, Tollygunge, Bhowanipore, and Central Kolkata.
- **Currency**: Indian Rupee (INR — ₹)
- **Delivery Types**: Same-Day Express (3-4 hours), Scheduled Date Booking, and Midnight Surprise Delivery (11:00 PM – 12:00 AM) in temperature-controlled bakery vans.

---

## 🎨 Color Palette & Design System

- **Primary**: `#7B2948` (Luxury Berry)
- **Secondary**: `#F7E7EC` (Soft Pink)
- **Accent**: `#D6A85A` (Warm Golden)
- **Background**: `#FFFAF7` (Warm Bakery Cream)
- **Text**: `#34252B` (Dark Cocoa Espresso)
- **Cards**: `#FFFFFF` (Crisp White)
- **Typography**: Playfair Display (Serif display & luxury headings) + Plus Jakarta Sans (Clean geometric body prose)

---

## 🎂 Key Functional Modules

1. **Sticky Header & Announcement Bar**
   - Live cart subtotal and real-time badge count
   - Quick search toggle with live filtering
   - Wishlist indicator
   - Customer account profile link
   - Store Administrator shortcut
   - Mobile slide-out drawer menu and sticky mobile bottom navigation

2. **20 Handcrafted Cake Categories**
   - Birthday Cakes, Chocolate Cakes, Black Forest, White Forest, Red Velvet, Butterscotch, Pineapple, Strawberry, Vanilla, Fruit Cakes, Cheesecakes, Designer Cakes, Photo Cakes, Wedding Cakes, Anniversary Cakes, Kids' Cartoon Cakes, Cupcakes, Brownies, Bento Cakes, Eggless Cakes.
   - Interactive category cards with direct catalog filtering.

3. **Shop Catalog with 30 Sample Products in INR (₹)**
   - Complete prices from *Vanilla Birthday Cake (₹449)* and *Premium Chocolate Truffle (₹599)* to *Designer Rose Cake (₹1,199)* and *Premium Wedding Showpiece (₹2,999)*.
   - Dynamic weight selector (500g, 1kg, 1.5kg, 2kg) updating line-item prices in real-time.
   - 100% Eggless pure vegetarian badge vs regular cake tag.
   - Multi-facet filters: Category, Price range slider, Flavor, Eggless toggle, Minimum star rating, and Sort options (Popularity, Latest, Price Asc/Desc, Rating).
   - **Quick View modal** for instant preview without navigating away.

4. **Product Detail View (PDP)**
   - High-resolution gallery and thumbnail switcher
   - Message on cake input with character counter (e.g., *"Happy 25th Birthday Sarah"*)
   - Delivery date picker and delivery time window selector (including Midnight surprise slot)
   - Kolkata PIN Code delivery serviceability validator
   - Customer reviews feed + review submission form
   - Related cakes recommendation carousel

5. **Custom Cake Design Studio**
   - Step-by-step custom cake builder (Shape, Serving Size, Gourmet Flavor, Palette Tone, Occasion, Theme)
   - Design reference photo upload with instant image preview
   - Live price estimator that recalculates automatically as options change
   - Consultation request submission saving records with unique reference number (#CC-...)

6. **WooCommerce-Inspired Shopping Cart & Checkout**
   - Slide-out cart drawer with quantity steppers and itemized option details
   - Real coupon validation (`WELCOME10`, `CAKE50`, `SWEET15`, `BIRTHDAY20`)
   - Free delivery calculation (Free on orders > ₹999) + 5% GST calculation
   - Full checkout page with Kolkata address validation (blocks non-Kolkata PINs)
   - Payment options: Cash on Delivery, UPI demo, Card demo with clear sandbox disclaimers

7. **Order Tracking & Lifecycle**
   - Real-time status lookup by Order ID (#CP-...)
   - 5-stage visual lifecycle: Pending → Confirmed → Baking & Decorating → Out for Delivery → Delivered
   - PIN code checker with Kolkata neighborhood detection

8. **Customer Account Portal**
   - Customer sign-in & registration
   - Saved order history with full receipts
   - Multiple saved delivery addresses
   - Persistent wishlist manager with one-click "Move to Cart"

9. **Store Administrator Dashboard**
   - Protected admin view
   - Overview metrics: Total sales, Total orders, Pending baking orders, Completed orders, Low-stock alerts
   - Product Catalog CRUD: Add new cakes, edit price, sale price, inventory stock, publish toggle, delete
   - Order Management: Status updater dropdowns for each customer order
   - Customer list viewer
   - Coupon creator with minimum spend and discount rules
   - Store settings editor (Delivery thresholds, fees, phone, email, address)

10. **WhatsApp Order Concierge**
    - Floating bottom-right WhatsApp button with pre-filled cake inquiry messages

---

## 🌐 Netlify Deployment Guide

The repository includes both `netlify.toml` and `public/_redirects` preconfigured for SPA routing.

### Method 1: Deploy with Netlify Git Integration (Recommended)
1. Push your code to your GitHub/GitLab repository.
2. Log in to [Netlify](https://app.netlify.com).
3. Click **Add new site** > **Import an existing project**.
4. Select your repository.
5. Netlify will automatically detect configuration from `netlify.toml`:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Click **Deploy Cake Paradise**.

### Method 2: Deploy with Netlify CLI
```bash
# 1. Install Netlify CLI
npm install -g netlify-cli

# 2. Build the project
npm run build

# 3. Deploy to Netlify
netlify deploy --prod --dir=dist
```

---

## 💻 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Compile and verify TypeScript
npm run build
```
