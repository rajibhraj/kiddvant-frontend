"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { placeOrder } from "@/lib/api";

// ── Types ─────────────────────────────────────────────────────────────
interface OrderData {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  notes: string;
}

type SidebarView = "cart" | "checkout" | "success";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

// ── Icons ─────────────────────────────────────────────────────────────
const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const PlusIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const MinusIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);
const ArrowLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
  </svg>
);
const CheckCircleIcon = () => (
  <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);
const BagIcon = () => (
  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);
const ArrowRightIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

// ── Main Cart Sidebar ─────────────────────────────────────────────────
export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartCount } = useCart();
  const [view, setView] = useState<SidebarView>("cart");
  const [isPlacing, setIsPlacing] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "bkash">("cod");
  const [formData, setFormData] = useState<OrderData>({
    fullName: "", phone: "", email: "", address: "", city: "", postalCode: "", notes: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof OrderData, string>>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const subtotal = getCartTotal();
  const shipping = subtotal >= 2000 ? 0 : 120;
  const total = subtotal + shipping;

  // Lock body scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Reset view after closing on success
  useEffect(() => {
    if (!isOpen && view === "success") {
      const t = setTimeout(() => {
        setView("cart");
        setFormData({ fullName: "", phone: "", email: "", address: "", city: "", postalCode: "", notes: "" });
        setErrors({});
        setSubmitError(null);
      }, 400);
      return () => clearTimeout(t);
    }
  }, [isOpen, view]);

  const validate = () => {
    const e: Partial<Record<keyof OrderData, string>> = {};
    if (!formData.fullName.trim()) e.fullName = "Full name is required";
    if (!formData.phone.trim()) e.phone = "Phone number is required";
    if (!formData.address.trim()) e.address = "Address is required";
    if (!formData.city.trim()) e.city = "City is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!validate()) return;
    setIsPlacing(true);
    setSubmitError(null);
    try {
      const orderData = {
        customerInfo: {
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email || undefined,
        },
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode || undefined,
        },
        items: cart.map((item) => ({
          _id: item._id,
          productId: item.productId,
          product_name: item.product_name,
          price_bdt: item.price_bdt,
          quantity: item.quantity,
          product_image: item.product_image,
        })),
        paymentMethod: paymentMethod,
        shippingCost: shipping,
        subtotal: subtotal,
        total: total,
        notes: formData.notes || undefined,
      };

      const result = await placeOrder(orderData);
      if (result.success && result.data) {
        setOrderId(result.data.orderId);
        clearCart();
        setView("success");
      } else {
        throw new Error(result.message || "Failed to place order");
      }
    } catch (err: any) {
      console.error("Error placing order:", err);
      setSubmitError(err.message || "Something went wrong while placing the order. Please try again.");
    } finally {
      setIsPlacing(false);
    }
  };

  const inputCls = (field: keyof OrderData) =>
    `w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-400 transition-all ${
      errors[field] ? "border-red-300 bg-red-50" : "border-gray-200 bg-white"
    }`;

  const update = (field: keyof OrderData, val: string) => {
    setFormData((p) => ({ ...p, [field]: val }));
    setErrors((p) => ({ ...p, [field]: undefined }));
  };

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* ── Drawer Panel ── */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full sm:max-w-[420px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
          {view === "checkout" ? (
            <button
              onClick={() => setView("cart")}
              className="flex items-center gap-1.5 text-gray-600 hover:text-pink-500 transition-colors text-sm font-medium"
            >
              <ArrowLeftIcon /> Back to Cart
            </button>
          ) : view === "success" ? (
            <h2 className="text-base font-bold text-gray-900">Order Confirmed 🎉</h2>
          ) : (
            <div>
              <h2 className="text-base font-bold text-gray-900">Shopping Cart</h2>
              <p className="text-xs text-gray-400 mt-0.5">
                {getCartCount()} item{getCartCount() !== 1 ? "s" : ""}
              </p>
            </div>
          )}
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-pink-50 hover:text-pink-500 text-gray-500 transition-colors"
          >
            <XIcon />
          </button>
        </div>

        {/* ── Scrollable Content ── */}
        <div className="flex-1 overflow-y-auto">

          {/* ═══════════ CART VIEW ═══════════ */}
          {view === "cart" && (
            <>
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full px-8 py-16 text-center">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-100">
                    <BagIcon />
                  </div>
                  <h3 className="font-semibold text-gray-700 mb-1">Your cart is empty</h3>
                  <p className="text-sm text-gray-400 mb-6 max-w-[220px]">
                    Discover amazing toys and add them to your cart!
                  </p>
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 bg-pink-500 text-white rounded-full text-sm font-medium hover:bg-pink-600 transition-colors shadow-md hover:shadow-pink-200 hover:shadow-lg"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="px-4 py-2">
                  {/* Cart items */}
                  {cart.map((item) => {
                    const itemTotal = item.price_bdt * item.quantity;
                    return (
                      <div key={item.id} className="flex gap-3 py-4 border-b border-gray-50 last:border-b-0">
                        {/* Image */}
                        <div className="relative w-[72px] h-[72px] flex-shrink-0 bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                       {item.product_image &&  <Image
                            src={item.product_image}
                            alt={item.product_name}
                            fill
                            className="object-contain p-1.5"
                          />}
                        </div>
                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-1">
                            <h4 className="text-xs font-semibold text-gray-800 line-clamp-2 leading-snug flex-1">
                              {item.product_name}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0 p-1 -mr-1"
                              aria-label="Remove"
                            >
                              <TrashIcon />
                            </button>
                          </div>
                          <div className="flex items-center justify-between mt-2.5">
                            {/* Qty stepper */}
                            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                              <button
                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                disabled={item.quantity <= 1}
                                className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-40"
                              >
                                <MinusIcon />
                              </button>
                              <span className="w-8 h-7 flex items-center justify-center text-xs font-bold text-gray-800 border-x border-gray-200">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
                              >
                                <PlusIcon />
                              </button>
                            </div>
                            {/* Price */}
                            <div className="text-right">
                              <p className="text-sm font-bold text-pink-600">৳{itemTotal.toLocaleString()}</p>
                              {item.quantity > 1 && (
                                <p className="text-[10px] text-gray-400">৳{item.price_bdt} each</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Free shipping progress */}
                  {subtotal < 2000 && (
                    <div className="mt-3 mb-1 bg-pink-50 rounded-xl p-3 border border-pink-100">
                      <div className="flex justify-between text-[11px] text-gray-500 mb-1.5">
                        <span>৳{(2000 - subtotal).toLocaleString()} more for free shipping!</span>
                        <span className="font-medium">{Math.round((subtotal / 2000) * 100)}%</span>
                      </div>
                      <div className="h-1.5 bg-pink-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-pink-400 to-pink-500 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min((subtotal / 2000) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {/* ═══════════ CHECKOUT VIEW ═══════════ */}
          {view === "checkout" && (
            <div className="px-5 py-4 space-y-4">
              {submitError && (
                <div className="bg-red-50 text-red-600 text-xs rounded-xl p-3 border border-red-200">
                  ⚠️ {submitError}
                </div>
              )}

              {/* Step 1: Contact Info */}
              <div className="bg-gray-50/80 rounded-2xl p-4 space-y-3 border border-gray-100">
                <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wide flex items-center gap-2">
                  <span className="w-5 h-5 bg-pink-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold">1</span>
                  Contact Information
                </h3>
                <div>
                  <label className="block text-[11px] font-medium text-gray-500 mb-1 uppercase tracking-wide">Full Name *</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => update("fullName", e.target.value)}
                    placeholder="Your full name"
                    className={inputCls("fullName")}
                  />
                  {errors.fullName && <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-medium text-gray-500 mb-1 uppercase tracking-wide">Phone *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="01XXXXXXXXX"
                      className={inputCls("phone")}
                    />
                    {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-gray-500 mb-1 uppercase tracking-wide">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="Optional"
                      className={inputCls("email")}
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Delivery Address */}
              <div className="bg-gray-50/80 rounded-2xl p-4 space-y-3 border border-gray-100">
                <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wide flex items-center gap-2">
                  <span className="w-5 h-5 bg-pink-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold">2</span>
                  Delivery Address
                </h3>
                <div>
                  <label className="block text-[11px] font-medium text-gray-500 mb-1 uppercase tracking-wide">Street Address *</label>
                  <textarea
                    rows={2}
                    value={formData.address}
                    onChange={(e) => update("address", e.target.value)}
                    placeholder="House No., Road, Area..."
                    className={`${inputCls("address")} resize-none`}
                  />
                  {errors.address && <p className="text-[11px] text-red-500 mt-1">{errors.address}</p>}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-medium text-gray-500 mb-1 uppercase tracking-wide">City *</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => update("city", e.target.value)}
                      placeholder="e.g. Dhaka"
                      className={inputCls("city")}
                    />
                    {errors.city && <p className="text-[11px] text-red-500 mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-gray-500 mb-1 uppercase tracking-wide">Post Code</label>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => update("postalCode", e.target.value)}
                      placeholder="e.g. 1200"
                      className={inputCls("postalCode")}
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Payment Method */}
              <div className="bg-gray-50/80 rounded-2xl p-4 space-y-3 border border-gray-100">
                <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wide flex items-center gap-2">
                  <span className="w-5 h-5 bg-pink-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold">3</span>
                  Payment Method
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: "cod" as const, label: "Cash on Delivery", emoji: "💵", desc: "Pay at your door" },
                    { value: "bkash" as const, label: "bKash", emoji: "📱", desc: "Mobile payment" },
                  ].map((m) => (
                    <label
                      key={m.value}
                      className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                        paymentMethod === m.value
                          ? "border-pink-400 bg-pink-50 shadow-sm"
                          : "border-gray-200 hover:border-pink-200 hover:bg-pink-50/30"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={m.value}
                        checked={paymentMethod === m.value}
                        onChange={() => setPaymentMethod(m.value)}
                        className="sr-only"
                      />
                      <span className="text-2xl">{m.emoji}</span>
                      <span className="text-xs font-bold text-gray-700">{m.label}</span>
                      <span className="text-[10px] text-gray-400 text-center">{m.desc}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-[11px] font-medium text-gray-500 mb-1.5 uppercase tracking-wide">Order Notes</label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => update("notes", e.target.value)}
                  placeholder="Any special delivery instructions..."
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 resize-none bg-white transition-all"
                />
              </div>

              {/* Mini Order Summary */}
              <div className="bg-gradient-to-br from-pink-50 to-purple-50/30 rounded-2xl p-4 border border-pink-100">
                <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-3">Order Summary</h4>
                <div className="space-y-1.5">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-xs text-gray-600">
                      <span className="line-clamp-1 flex-1 mr-2">{item.product_name} × {item.quantity}</span>
                      <span className="flex-shrink-0 font-semibold">৳{(item.price_bdt * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="border-t border-pink-200 pt-2 mt-2 space-y-1">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Shipping</span>
                      <span>
                        {shipping === 0 ? (
                          <span className="text-emerald-600 font-semibold">Free!</span>
                        ) : `৳${shipping}`}
                      </span>
                    </div>
                    <div className="flex justify-between font-bold text-gray-900">
                      <span>Total</span>
                      <span className="text-pink-600 text-sm">৳{total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ═══════════ SUCCESS VIEW ═══════════ */}
          {view === "success" && (
            <div className="flex flex-col items-center justify-center h-full px-6 py-12 text-center">
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-5 border border-emerald-100">
                <CheckCircleIcon />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Order Placed!</h3>
              <p className="text-sm text-gray-500 mb-1.5">Thank you for shopping with kiddvant!</p>
              <p className="text-xs font-mono text-gray-400 mb-7 bg-gray-50 px-3 py-1.5 rounded-lg">
                {orderId}
              </p>
              <div className="bg-gray-50 rounded-2xl p-4 w-full text-left mb-6 border border-gray-100">
                <p className="text-xs font-bold text-gray-700 mb-3 uppercase tracking-wide">What happens next?</p>
                <ul className="space-y-2.5">
                  {[
                    "You'll receive an SMS confirmation shortly",
                    "Order will be packed & shipped within 24–48 hrs",
                    "Pay the delivery person when your order arrives",
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-gray-500">
                      <span className="w-4 h-4 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => { setView("cart"); onClose(); }}
                className="w-full py-3 bg-pink-500 text-white rounded-full font-semibold text-sm hover:bg-pink-600 transition-colors shadow-md"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>

        {/* ── Sticky Footer ── */}
        {view === "cart" && cart.length > 0 && (
          <div className="px-5 py-4 border-t border-gray-100 bg-white flex-shrink-0 space-y-3">
            {/* Totals */}
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-800">৳{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Shipping</span>
                <span className="font-semibold text-gray-800">
                  {shipping === 0 ? (
                    <span className="text-emerald-500">Free!</span>
                  ) : `৳${shipping}`}
                </span>
              </div>
              <div className="flex justify-between font-bold text-gray-900 text-[15px] border-t border-gray-100 pt-2">
                <span>Total</span>
                <span className="text-pink-600">৳{total.toLocaleString()}</span>
              </div>
            </div>
            {/* CTA Buttons */}
            <button
              onClick={() => setView("checkout")}
              className="w-full py-3.5 bg-pink-500 text-white rounded-full font-semibold text-sm hover:bg-pink-600 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-pink-200 flex items-center justify-center gap-2"
            >
              Proceed to Checkout <ArrowRightIcon />
            </button>
            <button
              onClick={onClose}
              className="w-full py-2 text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}

        {view === "checkout" && (
          <div className="px-5 py-4 border-t border-gray-100 bg-white flex-shrink-0">
            <button
              onClick={handlePlaceOrder}
              disabled={isPlacing}
              className="w-full py-3.5 bg-pink-500 text-white rounded-full font-bold text-sm hover:bg-pink-600 transition-all duration-300 shadow-md disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {isPlacing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Placing Order...
                </>
              ) : (
                <>Place Order — ৳{total.toLocaleString()}</>
              )}
            </button>
            <p className="text-center text-[11px] text-gray-400 mt-2">
              🔒 Secured & encrypted checkout
            </p>
          </div>
        )}
      </div>
    </>
  );
}
