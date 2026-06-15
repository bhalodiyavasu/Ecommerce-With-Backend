import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from '@/components/common/Header/Header';
import Footer from '@/components/common/Footer/Footer';
import Home from '@/pages/Home/Home';
import Collections from '@/pages/Collections/Collections';
import Cart from '@/pages/Cart/Cart';
import Checkout from '@/pages/Checkout/Checkout';
import PaymentSuccess from '@/pages/PaymentSuccess/PaymentSuccess';
import Login from '@/pages/Login/Login';
import Profile from '@/pages/Profile/Profile';
import Admin from '@/pages/Admin/Admin';
import NotFound from '@/pages/NotFound/NotFound';

function ScrollToHashElement() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [hash, pathname]);

  return null;
}

function AppLayout({ children }) {
  const location = useLocation();
  const isMinimal = location.pathname === '/checkout' || location.pathname === '/payment-success' || location.pathname === '/login' || location.pathname === '/admin';

  return (
    <div className="app-wrapper">
      {!isMinimal && <Header />}
      <main>{children}</main>
      {!isMinimal && <Footer />}
    </div>
  );
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToHashElement />
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

