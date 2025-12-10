import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { CartProvider } from '@/context/CartContext';
import CartDrawer from '@/components/cart/CartDrawer';

const Home = React.lazy(() => import('@/pages/Home'));
const Shop = React.lazy(() => import('@/pages/Shop'));
const DollyBuilder = React.lazy(() => import('@/pages/DollyBuilder'));
const Concierge = React.lazy(() => import('@/pages/Concierge'));
const ProductDetail = React.lazy(() => import('@/pages/ProductDetail'));
const Cart = React.lazy(() => import('@/pages/Cart'));
const CheckoutSuccess = React.lazy(() => import('@/pages/CheckoutSuccess'));
const WeirdClinic = React.lazy(() => import('@/pages/WeirdClinic'));
const Swap = React.lazy(() => import('@/pages/Swap'));

// Placeholders for now
const ValidRoute = ({ title }) => (
  <div className="container mx-auto px-4 py-20 text-center">
    <h1 className="text-3xl font-bold mb-4">{title}</h1>
    <p className="text-gray-400">Coming Soon</p>
  </div>
);

function App() {
  return (
    <CartProvider>
      <Router>
        <Suspense fallback={<div className="min-h-screen bg-obsidian flex items-center justify-center text-white">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="shop" element={<Shop />} />
              <Route path="product/:slug" element={<ProductDetail />} />
              <Route path="cart" element={<Cart />} />
              <Route path="checkout/success" element={<CheckoutSuccess />} />

              <Route path="dolly-builder" element={<DollyBuilder />} />
              <Route path="weird-engine" element={<ValidRoute title="Weird Engine (D$T)" />} />
              <Route path="m-concierge" element={<Concierge />} />
              <Route path="weird-clinic" element={<WeirdClinic />} />
              <Route path="swap" element={<Swap />} />
              <Route path="about" element={<ValidRoute title="About Us" />} />
              <Route path="contact" element={<ValidRoute title="Contact" />} />

              <Route path="*" element={<ValidRoute title="404 Not Found" />} />
            </Route>
          </Routes>
          <CartDrawer />
        </Suspense>
      </Router>
    </CartProvider>
  );
}

export default App;

