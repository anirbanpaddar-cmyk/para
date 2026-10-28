/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { ShopView } from './components/ShopView';
import { CategoryGrid } from './components/CategoryGrid';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CustomCakeView } from './components/CustomCakeView';
import { CheckoutPage } from './components/CheckoutPage';
import { OrderConfirmationView } from './components/OrderConfirmationView';
import { OrderTrackingView } from './components/OrderTrackingView';
import { WishlistView } from './components/WishlistView';
import { AccountView } from './components/AccountView';
import { OffersView } from './components/OffersView';
import { AboutUsView } from './components/AboutUsView';
import { ContactUsView } from './components/ContactUsView';
import { AdminDashboard } from './components/AdminDashboard';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { MobileBottomNav } from './components/MobileBottomNav';
import { LuxuryCursor } from './components/LuxuryCursor';

const MainContent: React.FC = () => {
  const { currentView } = useShop();

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView />;
      case 'shop':
        return <ShopView />;
      case 'categories':
        return (
          <div className="py-6">
            <CategoryGrid />
          </div>
        );
      case 'product-detail':
        return <ProductDetailPage />;
      case 'custom-cake':
        return <CustomCakeView />;
      case 'checkout':
        return <CheckoutPage />;
      case 'order-confirmation':
        return <OrderConfirmationView />;
      case 'order-tracking':
        return <OrderTrackingView />;
      case 'wishlist':
        return <WishlistView />;
      case 'account':
        return <AccountView />;
      case 'offers':
        return <OffersView />;
      case 'about':
        return <AboutUsView />;
      case 'contact':
        return <ContactUsView />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FFFAF7] text-[#34252B] relative">
      <LuxuryCursor />
      <Header />
      <main className="flex-1 pb-16 sm:pb-0">
        {renderCurrentView()}
      </main>
      <Footer />
      <QuickViewModal />
      <CartDrawer />
      <WhatsAppFloatingButton />
      <MobileBottomNav />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainContent />
    </ShopProvider>
  );
}
