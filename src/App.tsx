import React, { useState } from 'react';
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

export default function App() {
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

  // Toast Helpers
  const addToast = (type: 'success' | 'info' | 'error', title: string, description?: string) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, type, title, description }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

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

  const handleSubmitRFQ = (data: RFQFormData) => {
    addToast(
      'success',
      'RFQ Submitted Successfully!',
      `Thank you ${data.fullName}. Binding direct mill quotation for "${data.companyName}" will be emailed to ${data.workEmail} within 60 minutes.`
    );
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
      `Order ${order.orderId} placed for ${order.companyName}. Proforma Tax Invoice generated.`
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
