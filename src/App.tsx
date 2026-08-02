import { AuthModal } from './components/auth/AuthModel';
import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';

import { ProtectedRoute } from './components/ProtectedRoute';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/home/HomePage';
import { ShopPage } from './components/shop/ShopPage';
import { ProductDetailPage } from './components/shop/ProductDetailPage';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SearchModal } from './components/SearchModal';
import { RFQModal } from './components/RFQModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/cart/CheckoutModal';
import { ToastContainer, ToastMessage } from './components/Toast';
import { Product, RFQFormData, CartItem, OrderDetails } from './types';
import { PRODUCTS } from './data/mockData';
import { AuthProvider, useAuth } from './context/AuthContext';
import { db } from './lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

function AppContent() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [rfqModalOpen, setRfqModalOpen] = useState(false);
  const [rfqPrefillCategory, setRfqPrefillCategory] = useState<string>('Steel & Pipes');
  const [rfqPrefillProductName, setRfqPrefillProductName] = useState<string | undefined>(undefined);
  const [comparedProducts, setComparedProducts] = useState<Product[]>([]);

  // Cart & Checkout State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  // Toast Helpers
  const addToast = (type: 'success' | 'info' | 'error', title: string, description?: string) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, type, title, description }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };



 const { user, loading: authLoading } = useAuth();
const cartLoadedRef = useRef(false);

// Load this customer's cart on login, clear it on logout
useEffect(() => {
  if (authLoading) return;
  let cancelled = false;
  cartLoadedRef.current = false;

  if (!user) {
    setCartItems([]);
    cartLoadedRef.current = true;
    return;
  }

  (async () => {
    try {
      const snap = await getDoc(doc(db, 'carts', user.uid));
      if (cancelled) return;
      setCartItems(snap.exists() ? (snap.data().items || []) : []);
    } finally {
      if (!cancelled) cartLoadedRef.current = true;
    }
  })();

  return () => { cancelled = true; };
}, [user, authLoading]);

// Save cart to Firestore — only once the initial load has finished
useEffect(() => {
  if (!user || !cartLoadedRef.current) return;
  setDoc(doc(db, 'carts', user.uid), { items: cartItems }).catch(console.error);
}, [cartItems, user]);

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // RFQ Modal triggers
  const handleOpenRFQ = (prefilledValue?: string) => {
    if (prefilledValue) {
      const matchedProd = PRODUCTS.find(
        (p) => p.name.toLowerCase() === prefilledValue.toLowerCase()
      );
      if (matchedProd) {
        setRfqPrefillCategory(matchedProd.category);
        setRfqPrefillProductName(matchedProd.name);
      } else if (prefilledValue.startsWith('Service:')) {
        setRfqPrefillCategory('Machining & Tools');
        setRfqPrefillProductName(prefilledValue);
      } else {
        setRfqPrefillCategory('Steel & Pipes');
        setRfqPrefillProductName(prefilledValue);
      }
    } else {
      setRfqPrefillCategory('Steel & Pipes');
      setRfqPrefillProductName(undefined);
    }
    setRfqModalOpen(true);
  };
const handleSubmitRFQ = async (data: RFQFormData) => {
  try {
    await emailjs.send(
      'service_pe8k1ij',
      'template_4t7ddek',
      {
        full_name: data.fullName,
        work_email: data.workEmail,
        phone: data.phone || 'Not provided',
        company_name: data.companyName,
        product_category: data.productCategory,
        quantity: data.estimatedQuantity || 'Not specified',
        specifications: data.specifications || 'None provided',
      },
      {
        publicKey: 'IlECv3MwxhjcvBpSf',
      }
    );

    addToast(
      'success',
      'RFQ Submitted Successfully!',
      `Thank you ${data.fullName}. Your quotation request has been emailed successfully.`
    );
  } catch (err) {
    console.error(err);

    addToast(
      'error',
      'Email Failed',
      'Unable to send RFQ. Please try again.'
    );
  }
};

  const handleSubscribeNewsletter = (email: string) => {
    addToast(
      'success',
      'Newsletter Subscribed',
      `Subscribed ${email} to weekly   metal price indices and mill dispatch schedules.`
    );
  };

  const handleDownloadSpec = (productName: string) => {
    addToast(
      'info',
      'Spec Sheet Download Started',
      `Downloading technical specification sheet & sample EN 10204 3.1 MTC trace dossier for "${productName}".`
    );
  };

  // Cart Management Actions
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });

    addToast(
      'success',
      'Added to Order Cart',
      `Added "${product.name}" to your cart. Click the cart icon in the top header to review line items and proceed to checkout.`
    );
    setCartDrawerOpen(true);
  };

  const handleBuyNow = (product: Product) => {
    if (!user) { setAuthModalOpen(true); return; }
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (!existing) {
        return [...prev, { product, quantity: 1 }];
      }
      return prev;
    });
    setCheckoutModalOpen(true);
  };

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    addToast('info', 'Item Removed', 'Removed product from cart.');
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOrderSuccess = (order: OrderDetails) => {
  addToast(
    'success',
    'Order Confirmed!',
    `Order ${order.orderId} placed for ${order.fullName}. Pay ₹${order.grandTotal.toLocaleString('en-IN')} on delivery.`
  );
};

  const handleToggleCompare = (product: Product) => {
    if (comparedProducts.some((c) => c.id === product.id)) {
      setComparedProducts((prev) => prev.filter((c) => c.id !== product.id));
      addToast('info', 'Removed from Comparison', `Removed "${product.name}" from compare list.`);
    } else {
      if (comparedProducts.length >= 4) {
        addToast('error', 'Comparison Limit Reached', 'You can compare up to 4 products at a time.');
        return;
      }
      setComparedProducts((prev) => [...prev, product]);
      addToast('success', 'Added to Comparison', `Added "${product.name}" to compare list.`);
    }
  };

  const handleSelectProductFromSearch = (productName: string) => {
    const prod = PRODUCTS.find((p) => p.name.toLowerCase() === productName.toLowerCase());
    if (prod) {
      setSelectedProduct(prod);
    } else {
      handleOpenRFQ(productName);
    }
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#F7F8FA] font-sans antialiased text-slate-800 flex flex-col justify-between selection:bg-[#1E3A8A] selection:text-white">
        
        {/* Sticky Global Header */}
       <Header
  onOpenRFQ={handleOpenRFQ}
  onOpenSearchModal={() => setSearchModalOpen(true)}
  cartCount={totalCartCount}
  onOpenCart={() => setCartDrawerOpen(true)}
  onOpenAuthModal={() => setAuthModalOpen(true)}
/>

        {/* Main Route Content */}
        <div className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <HomeRouteWrapper
                  onSelectProduct={(prod) => setSelectedProduct(prod)}
                  onOpenRFQ={handleOpenRFQ}
                  onSubmitRFQ={handleSubmitRFQ}
                  onDownloadSpec={handleDownloadSpec}
                />
              }
            />
            <Route
              path="/shop"
              element={
                <ShopPage
                  onSelectProduct={(prod) => setSelectedProduct(prod)}
                  onOpenRFQ={handleOpenRFQ}
                  onAddToCart={handleAddToCart}
                  onBuyNow={handleBuyNow}
                  onToggleCompare={handleToggleCompare}
                  comparedProducts={comparedProducts}
                />
              }
            />
            <Route
              path="/product/:id"
              element={
                <ProductDetailPage
                  onAddToCart={handleAddToCart}
                  onBuyNow={handleBuyNow}
                  onOpenRFQ={handleOpenRFQ}
                  onDownloadSpec={handleDownloadSpec}
                />
              }
            />
          </Routes>
        </div>

        {/* Global Footer */}
        <Footer onSubscribeNewsletter={handleSubscribeNewsletter} />

        {/* Modals & Overlay Containers */}
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onRequestQuote={handleOpenRFQ}
          onDownloadSpec={handleDownloadSpec}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
        />

        <CartDrawer
        
          isOpen={cartDrawerOpen}
          onClose={() => setCartDrawerOpen(false)}
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateCartQuantity}
          onRemoveItem={handleRemoveCartItem}
          onClearCart={handleClearCart}
          onProceedToCheckout={() => {
            if (!user) { setAuthModalOpen(true); return; }
            setCartDrawerOpen(false);
            setCheckoutModalOpen(true);
          }}
        />

        <CheckoutModal
          isOpen={checkoutModalOpen}
          onClose={() => setCheckoutModalOpen(false)}
          cartItems={cartItems}
          onOrderSuccess={handleOrderSuccess}
          onClearCart={handleClearCart}
        />
        <AuthModal
            isOpen={authModalOpen}
            onClose={() => setAuthModalOpen(false)}
            onAuthSuccess={(name) => addToast('success', 'Welcome!', `Signed in as ${name}`)}
          />
        <SearchModal
          isOpen={searchModalOpen}
          onClose={() => setSearchModalOpen(false)}
          onSelectProduct={handleSelectProductFromSearch}
        />

        <RFQModal
          isOpen={rfqModalOpen}
          onClose={() => setRfqModalOpen(false)}
          prefilledCategory={rfqPrefillCategory}
          prefilledProductName={rfqPrefillProductName}
          onSubmitSuccess={handleSubmitRFQ}
        />

        <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />

      </div>
    </BrowserRouter>
  );
}

// Inner helper component for Home Route to handle navigation to /shop
function HomeRouteWrapper(props: {
  onSelectProduct: (product: Product) => void;
  onOpenRFQ: (prefilledCategory?: string) => void;
  onSubmitRFQ: (data: RFQFormData) => void;
  onDownloadSpec: (productName: string) => void;
}) {
  const navigate = useNavigate();

  return (
    <HomePage
      onSelectProduct={props.onSelectProduct}
      onOpenRFQ={props.onOpenRFQ}
      onSubmitRFQ={props.onSubmitRFQ}
      onDownloadSpec={props.onDownloadSpec}
      onExploreCatalog={() => navigate('/shop')}
    />
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
