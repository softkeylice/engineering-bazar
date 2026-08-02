import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import {
  X,
  User,
  Truck,
  Phone,
  MessageCircle,
  CheckCircle2,
  ArrowRight,
  Info,
  Copy,
  Check
} from 'lucide-react';
import { CartItem } from '../../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
}

const CONTACT_PHONE = '7888066672';

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems
}) => {
  const [step, setStep] = useState<'checkout' | 'contact'>('checkout');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    shippingAddress: '',
    city: '',
    state: '',
    pincode: '',
    shippingMethod: 'standard' as 'standard' | 'express' | 'pickup'
  });

  const [copiedPhone, setCopiedPhone] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const orderItems = cartItems
      .map(
        (item) =>
          `${item.product.name}
Quantity: ${item.quantity}
Unit Price: ₹${item.product.pricePerUnit}
Total: ₹${item.product.pricePerUnit * item.quantity}`
      )
      .join('\n\n');

    await emailjs.send(
      'service_pe8k1ij',
      'template_opsud8t',
      {
        full_name: formData.fullName,
        work_email: formData.email,
        phone: formData.phone,

        company_name: 'Individual Customer',

        shipping_address: formData.shippingAddress,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,

        shipping_method: formData.shippingMethod,

        order_items: orderItems,

        subtotal: `₹${subtotal.toLocaleString('en-IN')}`,
        gst: `₹${gstAmount.toLocaleString('en-IN')}`,
        shipping: shippingFee === 0
          ? 'FREE'
          : `₹${shippingFee.toLocaleString('en-IN')}`,

        grand_total: `₹${grandTotal.toLocaleString('en-IN')}`,

        customer_notes: 'No additional notes.'
      },
      {
        publicKey: 'IlECv3MwxhjcvBpSf',
      }
    );

    setStep('contact');

  } catch (error) {
    console.error(error);
    alert('Unable to send order. Please try again.');
  }
};
  const handleCopyPhone = () => {
    navigator.clipboard.writeText(CONTACT_PHONE);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleClose = () => {
    setStep('checkout');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 my-8">

        {/* Top Header */}
        <div className="bg-[#1A2A6C] text-white p-5 sm:p-6 flex items-center justify-between border-b border-[#2E4BC7]/30">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#14205C] border border-[#2E4BC7]/40">
              <Phone className="w-6 h-6 text-[#F4B93E]" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white">
                {step === 'checkout' ? 'Checkout' : "We Can't Accept Online Payments"}
              </h2>
              <p className="text-xs text-slate-300">
                {step === 'checkout'
                  ? "Share your details and we'll contact you to complete payment."
                  : 'Contact us to complete your order.'}
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'checkout' ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-8 max-h-[80vh] overflow-y-auto">

            {/* Notice Banner */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-start gap-3">
              <Info className="w-5 h-5 text-[#2E4BC7] shrink-0 mt-0.5" />
              <div className="text-xs text-slate-700 leading-relaxed">
                <strong className="text-[#1A2A6C] font-bold block mb-0.5">
                  Payments Aren't Processed Online Yet
                </strong>
                Fill in your details below, and we'll reach out to you directly to arrange payment and delivery.
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

              {/* Left Column: Customer + Address */}
              <div className="lg:col-span-7 space-y-6">

                {/* Customer Details */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A2A6C] flex items-center gap-1.5 pb-2 border-b border-slate-200">
                    <User className="w-4 h-4 text-[#F4B93E]" />
                    <span>Your Details</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="sm:col-span-2">
                      <label className="block text-slate-700 font-semibold mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full bg-[#F5F6F8] border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-[#1A2A6C]"
                        placeholder="e.g. Ramesh Verma"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#F5F6F8] border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-[#1A2A6C]"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#F5F6F8] border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-[#1A2A6C]"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A2A6C] flex items-center gap-1.5 pb-2 border-b border-slate-200">
                    <Truck className="w-4 h-4 text-[#F4B93E]" />
                    <span>Delivery Address</span>
                  </h3>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Address (House / Street / Area) *</label>
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

                {/* Delivery Speed */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1A2A6C]">
                    Delivery Speed
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
                      <span className="font-bold block">Standard Delivery</span>
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
                      <span className="font-bold block">Express Delivery</span>
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
                          className="accent-emerald-700"
                        />
                        <span className="font-extrabold text-emerald-700">FREE</span>
                      </div>
                      <span className="font-bold block">Self Pickup</span>
                      <span className="text-[10px] text-slate-500">Collect from nearest yard</span>
                    </label>
                  </div>
                </div>

              </div>

              {/* Right Column: Order Summary */}
              <div className="lg:col-span-5 bg-[#F5F6F8] p-5 rounded-3xl border border-slate-200 flex flex-col justify-between space-y-6">

                <div>
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#1A2A6C] pb-3 border-b border-slate-200">
                    Order Summary
                  </h3>

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

                  <div className="pt-3 border-t border-slate-200 space-y-2 text-xs text-slate-700">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold text-slate-900">₹{subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes (GST)</span>
                      <span className="font-semibold text-slate-900">₹{gstAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery</span>
                      <span className="font-semibold text-emerald-700">
                        {shippingFee === 0 ? 'FREE' : `₹${shippingFee.toLocaleString('en-IN')}`}
                      </span>
                    </div>
                    <div className="pt-3 border-t border-slate-300 flex items-baseline justify-between text-sm">
                      <span className="font-extrabold text-[#1A2A6C]">Total</span>
                      <span className="text-xl font-black text-[#1A2A6C]">
                        ₹{grandTotal.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-[#1A2A6C] hover:bg-[#14205C] text-[#F4B93E] text-xs font-black transition-all shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

              </div>

            </div>

          </form>
        ) : (
          /* Step 2: Contact-for-Payment Screen */
          <div className="p-6 sm:p-8 space-y-6">

            <div className="flex flex-col items-center text-center py-4">
              <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-4">
                <X className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">We Can't Accept Online Payments</h3>
              <p className="text-sm text-slate-500 mt-2 max-w-sm">
                Contact us for help completing your order — we'll confirm availability and arrange payment directly.
              </p>
            </div>

            {/* Contact Box */}
            <div className="bg-[#F5F6F8] border border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#1A2A6C] text-[#F4B93E] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Call or WhatsApp</span>
                  <span className="text-lg font-mono font-extrabold text-[#1A2A6C]">{CONTACT_PHONE}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={`tel:${CONTACT_PHONE}`}
                  className="px-4 py-2.5 rounded-full bg-[#1A2A6C] hover:bg-[#14205C] text-[#F4B93E] text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call</span>
                </a>
                <a
                  href={`https://wa.me/91${CONTACT_PHONE}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
                <button
                  onClick={handleCopyPhone}
                  className="p-2.5 rounded-full border border-slate-300 hover:bg-white text-slate-500 hover:text-[#1A2A6C] transition-colors"
                  title="Copy number"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Recap of what they entered, for their own reference */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2 text-[#1A2A6C] font-bold text-[11px] uppercase tracking-wide mb-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Mention these details when you contact us</span>
              </div>
              <p><strong>Name:</strong> {formData.fullName || '—'}</p>
              <p><strong>Phone:</strong> {formData.phone || '—'}</p>
              <p><strong>Delivery to:</strong> {formData.city || '—'}, {formData.state || '—'} - {formData.pincode || '—'}</p>
              <p><strong>Order Total:</strong> ₹{grandTotal.toLocaleString('en-IN')} ({cartItems.length} item{cartItems.length !== 1 ? 's' : ''})</p>
            </div>

            <button
              onClick={handleClose}
              className="w-full py-3 rounded-full border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors"
            >
              Continue Browsing
            </button>

          </div>
        )}

      </div>
    </div>
  );
};