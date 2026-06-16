import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from '@/components/common/Header/Header';
import Footer from '@/components/common/Footer/Footer';
import Home from '@/pages/Home/Home';
import Collections from '@/pages/Collections/Collections';
import Cart from '@/pages/Cart/Cart';
import Checkout from '@/pages/Checkout/Checkout';
import PaymentSuccess from '@/pages/PaymentSuccess/PaymentSuccess';
import Auth from '@/pages/Auth/Auth';
import Profile from '@/pages/Profile/Profile';
import Admin from '@/pages/Admin/Admin';
import NotFound from '@/pages/NotFound/NotFound';
import Loader from '@/components/common/Loader/Loader';

// Wrapper for routes that require authentication
function ProtectedRoute({ children }) {
  const session = localStorage.getItem('userToken');
  if (!session) {
    return <Navigate to="/auth" replace />;
  }
  return children;
}

// Wrapper for routes that should ONLY be accessible when logged out (e.g. Auth page)
function PublicOnlyRoute({ children }) {
  const session = localStorage.getItem('userToken');
  if (session) {
    return <Navigate to="/" replace />;
  }
  return children;
}

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
  const isMinimal = location.pathname === '/checkout' || location.pathname === '/payment-success' || location.pathname === '/auth' || location.pathname === '/admin';

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
          {/* Public-only route (Auth) */}
          <Route 
            path="/auth" 
            element={
              <PublicOnlyRoute>
                <Auth />
              </PublicOnlyRoute>
            } 
          />

          {/* Protected routes */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/collections" 
            element={
              <ProtectedRoute>
                <Collections />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/cart" 
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/checkout" 
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/payment-success" 
            element={
              <ProtectedRoute>
                <PaymentSuccess />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="*" 
            element={
              <ProtectedRoute>
                <NotFound />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

