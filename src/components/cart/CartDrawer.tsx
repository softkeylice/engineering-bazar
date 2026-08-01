import React from 'react';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Truck,
  FileText,
  AlertCircle
} from 'lucide-react';
import { CartItem } from '../../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onProceedToCheckout: () => void;
  onOpenRFQ?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
  onOpenRFQ
}) => {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.pricePerUnit * item.quantity,
    0
  );
  const gstRate = 0.18; // 18% Industrial GST
  const gstAmount = Math.round(subtotal * gstRate);
  const shippingFee = subtotal > 50000 || cartItems.length === 0 ? 0 : 1200;
  const grandTotal = subtotal + gstAmount + shippingFee;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between">
        
        {/* Header */}
        <div className="p-5 bg-[#1A2A6C] text-white flex items-center justify-between border-b border-[#2E4BC7]/30 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#14205C] border border-[#2E4BC7]/40">
              <ShoppingBag className="w-5 h-5 text-[#F4B93E]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Industrial Order Cart</span>
                <span className="text-[11px] bg-[#F4B93E] text-[#1A2A6C] font-extrabold px-2 py-0.5 rounded-full">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)} items
                </span>
              </h2>
              <p className="text-[11px] text-slate-300">Mill Direct Dispatch & GST Invoice Ready</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
            aria-label="Close Cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F5F6F8] flex items-center justify-center border border-slate-200">
                <ShoppingBag className="w-8 h-8 text-slate-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#1A2A6C]">Your Cart is Empty</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">
                  Browse our certified catalog of raw steel pipes, aluminum plates, bearings, and CNC components to build your order.
                </p>
              </div>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-[#1A2A6C] text-[#F4B93E] text-xs font-bold hover:bg-[#14205C] transition-all shadow-md"
              >
                Explore Product Catalog
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
                <span>Items in Order</span>
                <button
                  onClick={onClearCart}
                  className="text-red-600 hover:text-red-700 font-semibold flex items-center gap-1 hover:underline"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear Cart</span>
                </button>
              </div>

              {cartItems.map(({ product, quantity }) => {
                const itemTotal = product.pricePerUnit * quantity;
                return (
                  <div
                    key={product.id}
                    className="p-4 rounded-2xl bg-[#F5F6F8] border border-slate-200/80 hover:border-[#2E4BC7]/40 transition-all flex gap-3 relative group"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 rounded-xl object-cover border border-slate-200 shrink-0 bg-white"
                    />

                    <div className="flex-1 flex flex-col justify-between text-xs">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-bold text-[#1A2A6C] leading-snug line-clamp-1 pr-6">
                            {product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(product.id)}
                            className="absolute top-3 right-3 text-slate-400 hover:text-red-600 p-1 rounded-full transition-colors"
                            title="Remove item"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                          Grade: <strong className="text-slate-700">{product.specifications.grade || product.category}</strong> • MOQ: {product.moq}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-200/60">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-1 bg-white rounded-full border border-slate-300 p-0.5">
                          <button
                            onClick={() => onUpdateQuantity(product.id, -1)}
                            className="w-6 h-6 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-extrabold text-[#1A2A6C]">
                            {quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(product.id, 1)}
                            className="w-6 h-6 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price Breakdown */}
                        <div className="text-right">
                          <div className="text-xs font-black text-[#1A2A6C]">
                            ₹{itemTotal.toLocaleString('en-IN')}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            ₹{product.pricePerUnit.toLocaleString('en-IN')}/{product.unit}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>

        {/* Footer Summary & Checkout Action */}
        {cartItems.length > 0 && (
          <div className="p-5 bg-white border-t border-slate-200 shadow-lg space-y-3 shrink-0">
            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex items-center justify-between">
                <span>Subtotal ({cartItems.reduce((acc, i) => acc + i.quantity, 0)} units)</span>
                <span className="font-bold text-slate-800">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <span>18% Industrial GST</span>
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded">Tax Invoice</span>
                </span>
                <span className="font-semibold text-slate-700">₹{gstAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Logistics & Freight</span>
                <span className="font-semibold text-emerald-700">
                  {shippingFee === 0 ? 'FREE Freight' : `₹${shippingFee.toLocaleString('en-IN')}`}
                </span>
              </div>

              {subtotal < 50000 && (
                <div className="text-[10px] text-[#1A2A6C] bg-blue-50 p-2 rounded-xl flex items-center gap-1.5 border border-blue-100">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 text-[#2E4BC7]" />
                  <span>Add ₹{(50000 - subtotal).toLocaleString('en-IN')} more to unlock FREE pan-India freight.</span>
                </div>
              )}

              <div className="pt-2 border-t border-slate-200 flex items-baseline justify-between text-sm">
                <span className="font-extrabold text-[#1A2A6C]">Grand Total (Incl. GST)</span>
                <span className="text-lg font-black text-[#1A2A6C]">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Micro Trust Banner */}
            <div className="flex items-center justify-between text-[10px] text-slate-500 bg-[#F5F6F8] p-2 rounded-xl border border-slate-200">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1A2A6C]" />
                100% Mill Batch MTC Dossier Included
              </span>
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-[#1A2A6C]" />
                24-48h Yard Dispatch
              </span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 rounded-full bg-[#1A2A6C] hover:bg-[#14205C] text-[#F4B93E] text-xs font-extrabold transition-all shadow-md flex items-center justify-center gap-2 group"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
