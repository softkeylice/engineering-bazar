import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Building2,
  Truck,
  CreditCard,
  FileCheck2,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Download,
  Printer,
  Copy,
  Info,
  QrCode,
  Landmark,
  Building,
  Check
} from 'lucide-react';
import { CartItem, OrderDetails } from '../../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onOrderSuccess: (order: OrderDetails) => void;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onOrderSuccess,
  onClearCart
}) => {
  const [step, setStep] = useState<'checkout' | 'confirmation'>('checkout');

  // Form Fields
  const [formData, setFormData] = useState({
    companyName: 'Larsen & Toubro Ltd.',
    gstin: '27AABCL1234F1ZM',
    contactName: 'Ramesh Verma',
    email: 'ramesh.verma@ltengineering.com',
    phone: '+91 98201 44521',
    shippingAddress: 'Plot No. 42, Heavy Industrial Estate, MIDC Area',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400093',
    shippingMethod: 'standard' as 'standard' | 'express' | 'pickup',
    paymentMethod: 'card' as 'card' | 'netbanking' | 'upi' | 'po',
    poNumber: 'PO-2026-8891'
  });

  const [createdOrder, setCreatedOrder] = useState<OrderDetails | null>(null);
  const [copiedOrderId, setCopiedOrderId] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.pricePerUnit * item.quantity,
    0
  );
  const gstAmount = Math.round(subtotal * 0.18);
  const shippingFee =
    formData.shippingMethod === 'express'
      ? 2800
      : formData.shippingMethod === 'pickup' || subtotal > 50000
      ? 0
      : 1200;
  const grandTotal = subtotal + gstAmount + shippingFee;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const orderId = `EB-ORD-${Date.now().toString().slice(-6)}`;
    const newOrder: OrderDetails = {
      orderId,
      orderDate: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }),
      items: [...cartItems],
      companyName: formData.companyName,
      gstin: formData.gstin,
      contactName: formData.contactName,
      email: formData.email,
      phone: formData.phone,
      shippingAddress: formData.shippingAddress,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      shippingMethod: formData.shippingMethod,
      paymentMethod: formData.paymentMethod,
      subtotal,
      gstAmount,
      shippingFee,
      grandTotal,
      status: 'Confirmed'
    };

    setCreatedOrder(newOrder);
    onOrderSuccess(newOrder);
    onClearCart();
    setStep('confirmation');
  };

  const handleCopyOrderId = () => {
    if (createdOrder) {
      navigator.clipboard.writeText(createdOrder.orderId);
      setCopiedOrderId(true);
      setTimeout(() => setCopiedOrderId(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 my-8">
        
        {/* Top Header */}
        <div className="bg-[#1A2A6C] text-white p-5 sm:p-6 flex items-center justify-between border-b border-[#2E4BC7]/30">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#14205C] border border-[#2E4BC7]/40">
              <Building2 className="w-6 h-6 text-[#F4B93E]" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white">
                {step === 'checkout' ? 'Industrial   Order Checkout' : 'Order Confirmed & Proforma Generated'}
              </h2>
              <p className="text-xs text-slate-300">
                {step === 'checkout'
                  ? 'Verify company GST details, delivery address, and proceed to payment.'
                  : 'Official tax invoice & MTC trace dossier allocated for dispatch.'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'checkout' ? (
          <form onSubmit={handleSubmitOrder} className="p-6 space-y-8 max-h-[80vh] overflow-y-auto">
            
            {/* Notice Banner regarding Payment Gateway */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-start gap-3">
              <Info className="w-5 h-5 text-[#2E4BC7] shrink-0 mt-0.5" />
              <div className="text-xs text-slate-700 leading-relaxed">
                <strong className="text-[#1A2A6C] font-bold block mb-0.5">
                  ⚡ Payment Gateway Integration Status: Active Test Mode
                </strong>
                All GST tax calculations (18% GST), company billing inputs, dispatch scheduling, and inventory reservations are live. Select your preferred payment method below to finalize your order.
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Billing, Address, Shipping, Payment */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* 1. Company & GST Details */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A2A6C] flex items-center gap-1.5 pb-2 border-b border-slate-200">
                    <Building className="w-4 h-4 text-[#F4B93E]" />
                    <span>Company & Billing Information</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Company Registered Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.companyName}
                        onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                        className="w-full bg-[#F5F6F8] border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-[#1A2A6C]"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Company GSTIN (18% Tax Credit) *</label>
                      <input
                        type="text"
                        required
                        value={formData.gstin}
                        onChange={e => setFormData({ ...formData, gstin: e.target.value })}
                        className="w-full bg-[#F5F6F8] border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 font-mono focus:outline-none focus:border-[#1A2A6C]"
                        placeholder="27AABCU9603R1ZM"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Procurement Officer Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.contactName}
                        onChange={e => setFormData({ ...formData, contactName: e.target.value })}
                        className="w-full bg-[#F5F6F8] border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-[#1A2A6C]"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Work Email (Tax Invoice) *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#F5F6F8] border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-[#1A2A6C]"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Delivery Address */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A2A6C] flex items-center gap-1.5 pb-2 border-b border-slate-200">
                    <Truck className="w-4 h-4 text-[#F4B93E]" />
                    <span>Site / Yard Delivery Address</span>
                  </h3>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Factory / Backyard Plot Address *</label>
                      <input
                        type="text"
                        required
                        value={formData.shippingAddress}
                        onChange={e => setFormData({ ...formData, shippingAddress: e.target.value })}
                        className="w-full bg-[#F5F6F8] border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-[#1A2A6C]"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">City *</label>
                        <input
                          type="text"
                          required
                          value={formData.city}
                          onChange={e => setFormData({ ...formData, city: e.target.value })}
                          className="w-full bg-[#F5F6F8] border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-[#1A2A6C]"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">State *</label>
                        <input
                          type="text"
                          required
                          value={formData.state}
                          onChange={e => setFormData({ ...formData, state: e.target.value })}
                          className="w-full bg-[#F5F6F8] border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-[#1A2A6C]"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">Pincode *</label>
                        <input
                          type="text"
                          required
                          value={formData.pincode}
                          onChange={e => setFormData({ ...formData, pincode: e.target.value })}
                          className="w-full bg-[#F5F6F8] border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-[#1A2A6C]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Logistics Method */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1A2A6C]">
                    Logistics & Freight Speed
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <label className={`p-3 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                      formData.shippingMethod === 'standard'
                        ? 'border-[#1A2A6C] bg-blue-50/50 text-[#1A2A6C]'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}>
                      <div className="flex items-center justify-between mb-1">
                        <input
                          type="radio"
                          name="shippingMethod"
                          checked={formData.shippingMethod === 'standard'}
                          onChange={() => setFormData({ ...formData, shippingMethod: 'standard' })}
                          className="accent-[#1A2A6C]"
                        />
                        <span className="font-extrabold text-[#1A2A6C]">
                          {subtotal > 50000 ? 'FREE' : '₹1,200'}
                        </span>
                      </div>
                      <span className="font-bold block">Standard Road Freight</span>
                      <span className="text-[10px] text-slate-500">3–5 Business Days</span>
                    </label>

                    <label className={`p-3 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                      formData.shippingMethod === 'express'
                        ? 'border-[#1A2A6C] bg-blue-50/50 text-[#1A2A6C]'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}>
                      <div className="flex items-center justify-between mb-1">
                        <input
                          type="radio"
                          name="shippingMethod"
                          checked={formData.shippingMethod === 'express'}
                          onChange={() => setFormData({ ...formData, shippingMethod: 'express' })}
                          className="accent-[#1A2A6C]"
                        />
                        <span className="font-extrabold text-[#1A2A6C]">₹2,800</span>
                      </div>
                      <span className="font-bold block">Express Hydraulic Truck</span>
                      <span className="text-[10px] text-slate-500">24–48 Hours Priority</span>
                    </label>

                    <label className={`p-3 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                      formData.shippingMethod === 'pickup'
                        ? 'border-[#1A2A6C] bg-blue-50/50 text-[#1A2A6C]'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}>
                      <div className="flex items-center justify-between mb-1">
                        <input
                          type="radio"
                          name="shippingMethod"
                          checked={formData.shippingMethod === 'pickup'}
                          onChange={() => setFormData({ ...formData, shippingMethod: 'pickup' })}
                          className="accent-[#1A2A6C]"
                        />
                        <span className="font-extrabold text-emerald-700">FREE</span>
                      </div>
                      <span className="font-bold block">Self Backyard Pickup</span>
                      <span className="text-[10px] text-slate-500">Collect from nearest yard</span>
                    </label>
                  </div>
                </div>

                {/* 4. Payment Gateway Selection */}
                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A2A6C] flex items-center justify-between pb-2 border-b border-slate-200">
                    <span className="flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-[#F4B93E]" />
                      <span>Select Payment Gateway Option</span>
                    </span>
                    <span className="text-[10px] text-[#1A2A6C] font-semibold bg-blue-100 px-2 py-0.5 rounded-full">
                      Ready for API Key
                    </span>
                  </h3>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <label className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                      formData.paymentMethod === 'card'
                        ? 'border-[#1A2A6C] bg-blue-50/60 text-[#1A2A6C] shadow-xs'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={formData.paymentMethod === 'card'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                        className="accent-[#1A2A6C]"
                      />
                      <div>
                        <div className="font-bold flex items-center gap-1">
                          <CreditCard className="w-3.5 h-3.5 text-[#1A2A6C]" />
                          <span>Credit / Debit Card</span>
                        </div>
                        <span className="text-[10px] text-slate-500 block">Visa, Mastercard, RuPay</span>
                      </div>
                    </label>

                    <label className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                      formData.paymentMethod === 'netbanking'
                        ? 'border-[#1A2A6C] bg-blue-50/60 text-[#1A2A6C] shadow-xs'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={formData.paymentMethod === 'netbanking'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'netbanking' })}
                        className="accent-[#1A2A6C]"
                      />
                      <div>
                        <div className="font-bold flex items-center gap-1">
                          <Landmark className="w-3.5 h-3.5 text-[#1A2A6C]" />
                          <span>Corporate RTGS / NEFT</span>
                        </div>
                        <span className="text-[10px] text-slate-500 block">Direct Bank Transfer</span>
                      </div>
                    </label>

                    <label className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                      formData.paymentMethod === 'upi'
                        ? 'border-[#1A2A6C] bg-blue-50/60 text-[#1A2A6C] shadow-xs'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={formData.paymentMethod === 'upi'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'upi' })}
                        className="accent-[#1A2A6C]"
                      />
                      <div>
                        <div className="font-bold flex items-center gap-1">
                          <QrCode className="w-3.5 h-3.5 text-[#1A2A6C]" />
                          <span>UPI / Instant QR</span>
                        </div>
                        <span className="text-[10px] text-slate-500 block">Razorpay / PhonePe</span>
                      </div>
                    </label>

                    <label className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                      formData.paymentMethod === 'po'
                        ? 'border-[#1A2A6C] bg-blue-50/60 text-[#1A2A6C] shadow-xs'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={formData.paymentMethod === 'po'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'po' })}
                        className="accent-[#1A2A6C]"
                      />
                      <div>
                        <div className="font-bold flex items-center gap-1">
                          <FileCheck2 className="w-3.5 h-3.5 text-[#1A2A6C]" />
                          <span>Purchase Order (30D)</span>
                        </div>
                        <span className="text-[10px] text-slate-500 block">Approved Credit Line</span>
                      </div>
                    </label>
                  </div>

                  {formData.paymentMethod === 'po' && (
                    <div className="mt-2 bg-[#F5F6F8] p-3 rounded-xl border border-slate-200 text-xs">
                      <label className="block font-semibold text-slate-700 mb-1">Company PO Reference Number</label>
                      <input
                        type="text"
                        value={formData.poNumber}
                        onChange={e => setFormData({ ...formData, poNumber: e.target.value })}
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-slate-900 font-mono"
                      />
                    </div>
                  )}
                </div>

              </div>

              {/* Right Column: Order Summary Box */}
              <div className="lg:col-span-5 bg-[#F5F6F8] p-5 rounded-3xl border border-slate-200 flex flex-col justify-between space-y-6">
                
                <div>
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#1A2A6C] pb-3 border-b border-slate-200 flex items-center justify-between">
                    <span>Tax Invoice Summary</span>
                    <span className="text-[11px] font-bold text-[#F4B93E] bg-[#1A2A6C] px-2 py-0.5 rounded-full">
                      18% GST Applicable
                    </span>
                  </h3>

                  {/* Cart Items List */}
                  <div className="my-4 space-y-3 max-h-56 overflow-y-auto pr-1">
                    {cartItems.map(({ product, quantity }) => (
                      <div key={product.id} className="flex items-center justify-between text-xs gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0 bg-white" />
                          <div className="min-w-0">
                            <p className="font-bold text-[#1A2A6C] truncate">{product.name}</p>
                            <p className="text-[10px] text-slate-500">
                              Qty: {quantity} {product.unit} × ₹{product.pricePerUnit.toLocaleString('en-IN')}
                            </p>
                          </div>
                        </div>
                        <span className="font-extrabold text-slate-800 shrink-0">
                          ₹{(product.pricePerUnit * quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Calculations */}
                  <div className="pt-3 border-t border-slate-200 space-y-2 text-xs text-slate-700">
                    <div className="flex justify-between">
                      <span>Items Subtotal</span>
                      <span className="font-semibold text-slate-900">₹{subtotal.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>GST (CGST 9% + SGST 9%)</span>
                      <span className="font-semibold text-slate-900">₹{gstAmount.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Freight & Yard Dispatch</span>
                      <span className="font-semibold text-emerald-700">
                        {shippingFee === 0 ? 'FREE' : `₹${shippingFee.toLocaleString('en-IN')}`}
                      </span>
                    </div>

                    <div className="pt-3 border-t border-slate-300 flex items-baseline justify-between text-sm">
                      <span className="font-extrabold text-[#1A2A6C]">Amount Payable</span>
                      <span className="text-xl font-black text-[#1A2A6C]">
                        ₹{grandTotal.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Trust Highlights */}
                <div className="bg-white p-3.5 rounded-2xl border border-slate-200 space-y-2 text-[11px] text-slate-600">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#1A2A6C] shrink-0" />
                    <span>Includes <strong>EN 10204 3.1 MTC Batch Dossier</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Input Tax Credit (ITC) GST Invoice</span>
                  </div>
                </div>

                {/* Order Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-[#1A2A6C] hover:bg-[#14205C] text-[#F4B93E] text-xs font-black transition-all shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Place Order & Generate Tax Invoice</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

              </div>

            </div>

          </form>
        ) : (
          /* Step 2: Confirmation / Tax Invoice Screen */
          <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
            
            {/* Success Header Box */}
            <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-center sm:text-left">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-emerald-950">
                    Order Placed Successfully!
                  </h3>
                  <p className="text-xs text-emerald-800 mt-0.5">
                    Proforma Tax Invoice & MTC Batch dossier generated for company <strong>{createdOrder?.companyName}</strong>.
                  </p>
                </div>
              </div>

              <div className="bg-white px-4 py-2.5 rounded-2xl border border-emerald-200 text-center shrink-0">
                <span className="text-[10px] text-slate-500 font-bold block uppercase">Order Reference</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-mono font-extrabold text-[#1A2A6C]">{createdOrder?.orderId}</span>
                  <button
                    onClick={handleCopyOrderId}
                    className="p-1 text-slate-400 hover:text-[#1A2A6C]"
                    title="Copy Order ID"
                  >
                    {copiedOrderId ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Proforma Invoice Document Card */}
            <div className="bg-white border border-slate-300 rounded-3xl p-6 shadow-sm space-y-6 text-xs">
              
              {/* Document Header */}
              <div className="flex flex-col sm:flex-row justify-between pb-4 border-b border-slate-200 gap-4">
                <div>
                  <div className="text-base font-extrabold text-[#1A2A6C]">ENGINEERING BAZAR PRIVATE LIMITED</div>
                  <div className="text-[#1E2340] text-[11px]">Tax Invoice / Proforma Dispatch Note</div>
                  <div className="text-slate-500 text-[10px] mt-1">GSTIN: 27AABCE9876K1ZP • ISO 9001:2015 Certified Yard</div>
                </div>
                <div className="sm:text-right">
                  <div className="text-slate-500 text-[11px]">Invoice Date: <strong>{createdOrder?.orderDate}</strong></div>
                  <div className="text-slate-500 text-[11px]">Status: <span className="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">CONFIRMED DISPATCH</span></div>
                </div>
              </div>

              {/* Buyer & Consignee */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#F5F6F8] p-4 rounded-2xl border border-slate-200">
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Billed To (Buyer):</span>
                  <p className="font-extrabold text-[#1A2A6C] text-sm">{createdOrder?.companyName}</p>
                  <p className="text-slate-700">GSTIN: <strong className="font-mono">{createdOrder?.gstin}</strong></p>
                  <p className="text-slate-600 mt-1">Attn: {createdOrder?.contactName} ({createdOrder?.email})</p>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Consignee Site Address:</span>
                  <p className="text-slate-800 font-medium">{createdOrder?.shippingAddress}</p>
                  <p className="text-slate-800 font-medium">{createdOrder?.city}, {createdOrder?.state} - {createdOrder?.pincode}</p>
                  <p className="text-slate-600 mt-1">Contact Phone: {createdOrder?.phone}</p>
                </div>
              </div>

              {/* Itemized Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#1A2A6C] text-white text-[11px]">
                      <th className="p-2.5 rounded-l-xl">Item Description</th>
                      <th className="p-2.5">Category / Grade</th>
                      <th className="p-2.5 text-center">Qty</th>
                      <th className="p-2.5 text-right">Unit Rate</th>
                      <th className="p-2.5 text-right rounded-r-xl">Total (Excl. Tax)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {createdOrder?.items.map(({ product, quantity }) => (
                      <tr key={product.id}>
                        <td className="p-2.5 font-bold text-[#1A2A6C]">{product.name}</td>
                        <td className="p-2.5 text-slate-600">{product.specifications.grade || product.category}</td>
                        <td className="p-2.5 text-center font-semibold">{quantity} {product.unit}</td>
                        <td className="p-2.5 text-right font-mono">₹{product.pricePerUnit.toLocaleString('en-IN')}</td>
                        <td className="p-2.5 text-right font-bold text-slate-900">
                          ₹{(product.pricePerUnit * quantity).toLocaleString('en-IN')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Total Summary */}
              <div className="flex flex-col sm:flex-row justify-between items-start pt-3 border-t border-slate-200 gap-4">
                <div className="text-[11px] text-slate-500 max-w-xs space-y-1">
                  <p>• Mill Test Certificate (EN 10204 3.1) batch dossier attached digitally.</p>
                  <p>• Dispatch tracking SMS sent to {createdOrder?.phone}.</p>
                </div>

                <div className="w-full sm:w-64 space-y-1.5 text-xs text-slate-700 bg-[#F5F6F8] p-3 rounded-2xl border border-slate-200">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-semibold">₹{createdOrder?.subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>18% GST (CGST+SGST):</span>
                    <span className="font-semibold">₹{createdOrder?.gstAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Freight Charges:</span>
                    <span className="font-semibold text-emerald-700">
                      {createdOrder?.shippingFee === 0 ? 'FREE' : `₹${createdOrder?.shippingFee.toLocaleString('en-IN')}`}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-slate-300 flex justify-between font-extrabold text-[#1A2A6C] text-sm">
                    <span>Grand Total:</span>
                    <span>₹{createdOrder?.grandTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4 text-[#1A2A6C]" />
                <span>Print Proforma Invoice</span>
              </button>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#1A2A6C] hover:bg-[#14205C] text-[#F4B93E] text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Continue Browsing Catalog</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
