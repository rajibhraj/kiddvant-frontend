"use client";

import React, { useState } from "react";
import Image from "next/image";

// ─── Types ─────────────────────────────────────────────────────────
export interface Product {
  id: number;
  product_name: string;
  brand?: string | null;
  material?: string;
  age_range?: string;
  origin?: string;
  price_bdt: number;
  product_image: string;
  features?: Record<string, string>;
  dimensions?: string;
  mechanism?: string;
  types?: string[];
  type?: string;
  size_range?: string;
  size?: string;
  function?: string;
  color_variant?: string;
  color?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

// ─── Icons ─────────────────────────────────────────────────────────
const TrashIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const MinusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const ShoppingBagIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 12 15 16 10" />
  </svg>
);

const TruckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13" />
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

// ─── Empty Cart State ──────────────────────────────────────────────
const EmptyCart = ({ onContinueShopping }: { onContinueShopping: () => void }) => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <div className="w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center mb-6">
      <ShoppingBagIcon />
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">Your cart is empty</h3>
    <p className="text-gray-500 mb-8 max-w-sm">
      Looks like you haven&apos;t added anything to your cart yet. Explore our popular picks and find something you love!
    </p>
    <button
      onClick={onContinueShopping}
      className="px-8 py-3 bg-pink-500 text-white rounded-full font-medium hover:bg-pink-600 transition-colors shadow-md hover:shadow-lg"
    >
      Continue Shopping
    </button>
  </div>
);

// ─── Cart Item Row ─────────────────────────────────────────────────
interface CartItemRowProps {
  item: CartItem;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

const CartItemRow = ({ item, onUpdateQuantity, onRemove }: CartItemRowProps) => {
  const itemTotal = item.price_bdt * item.quantity;

  return (
    <div className="flex gap-4 py-6 border-b border-gray-100 last:border-b-0">
      {/* Product Image */}
      <div className="relative w-24 h-24 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
      {item.product_image && <Image
          src={item.product_image}
          alt={item.product_name}
          fill
          className="object-contain p-2"
        />}  
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-1">
              {item.product_name}
            </h3>
            {item.brand && (
              <p className="text-xs text-gray-500 mb-1">Brand: {item.brand}</p>
            )}
            {item.color && (
              <p className="text-xs text-gray-500 mb-2">Color: {item.color}</p>
            )}
          </div>
          <button
            onClick={() => onRemove(item.id)}
            className="text-gray-400 hover:text-red-500 transition-colors p-1 flex-shrink-0"
            aria-label="Remove item"
          >
            <TrashIcon />
          </button>
        </div>

        <div className="flex items-center justify-between mt-3">
          {/* Quantity Controls */}
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
              disabled={item.quantity <= 1}
            >
              <MinusIcon />
            </button>
            <span className="w-10 h-8 flex items-center justify-center text-sm font-medium text-gray-800 border-x border-gray-200">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <PlusIcon />
            </button>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="text-base font-bold text-pink-600">৳{itemTotal.toLocaleString()}</p>
            <p className="text-xs text-gray-400">৳{item.price_bdt} each</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Order Summary ─────────────────────────────────────────────────
interface OrderSummaryProps {
  items: CartItem[];
  shippingCost: number;
  onCheckout: () => void;
  isCheckingOut: boolean;
}

const OrderSummary = ({ items, shippingCost, onCheckout, isCheckingOut }: OrderSummaryProps) => {
  const subtotal = items.reduce((sum, item) => sum + item.price_bdt * item.quantity, 0);
  const total = subtotal + shippingCost;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-gray-50 rounded-2xl p-6 sticky top-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h3>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal ({itemCount} items)</span>
          <span className="font-medium text-gray-800">৳{subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium text-gray-800">
            {shippingCost === 0 ? (
              <span className="text-emerald-600">Free</span>
            ) : (
              `৳${shippingCost.toLocaleString()}`
            )}
          </span>
        </div>
        {subtotal >= 2000 && shippingCost > 0 && (
          <p className="text-xs text-emerald-600 bg-emerald-50 px-3 py-2 rounded-lg">
            Add ৳{(2000 - subtotal).toLocaleString()} more for free shipping!
          </p>
        )}
        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between">
            <span className="text-base font-bold text-gray-800">Total</span>
            <span className="text-xl font-bold text-pink-600">৳{total.toLocaleString()}</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">Including VAT where applicable</p>
        </div>
      </div>

      <button
        onClick={onCheckout}
        disabled={isCheckingOut || items.length === 0}
        className="w-full py-3.5 bg-pink-500 text-white rounded-full font-semibold text-sm hover:bg-pink-600 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isCheckingOut ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Processing...
          </>
        ) : (
          <>
            Proceed to Checkout
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </>
        )}
      </button>

      {/* Trust Badges */}
      <div className="mt-6 space-y-2">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <ShieldCheckIcon />
          <span>Secure checkout with SSL encryption</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <TruckIcon />
          <span>Free delivery on orders over ৳2,000</span>
        </div>
      </div>
    </div>
  );
};

// ─── Checkout Form ─────────────────────────────────────────────────
interface CheckoutFormProps {
  cartItems: CartItem[];
  onBackToCart: () => void;
  onPlaceOrder: (orderData: OrderData) => void;
  isPlacingOrder: boolean;
}

export interface OrderData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  paymentMethod: "cod" | "card" | "bkash";
  notes?: string;
}

const CheckoutForm = ({ cartItems, onBackToCart, onPlaceOrder, isPlacingOrder }: CheckoutFormProps) => {
  const [formData, setFormData] = useState<OrderData>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "cod",
    notes: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof OrderData, string>>>({});

  const subtotal = cartItems.reduce((sum, item) => sum + item.price_bdt * item.quantity, 0);
  const shippingCost = subtotal >= 2000 ? 0 : 120;
  const total = subtotal + shippingCost;

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof OrderData, string>> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.address.trim()) newErrors.address = "Delivery address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onPlaceOrder(formData);
    }
  };

  const inputClass = (field: keyof OrderData) =>
    `w-full px-4 py-3 rounded-xl border ${
      errors[field] ? "border-red-300 bg-red-50" : "border-gray-200 bg-white"
    } text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300 transition-all`;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={onBackToCart}
          className="flex items-center gap-2 text-gray-600 hover:text-pink-500 transition-colors text-sm font-medium"
        >
          <ArrowLeftIcon />
          Back to Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                Contact Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => {
                      setFormData({ ...formData, fullName: e.target.value });
                      if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                    }}
                    className={inputClass("fullName")}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={inputClass("email")}
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      if (errors.phone) setErrors({ ...errors, phone: undefined });
                    }}
                    className={inputClass("phone")}
                    placeholder="01XXXXXXXXX"
                  />
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                Delivery Address
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Street Address *</label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => {
                      setFormData({ ...formData, address: e.target.value });
                      if (errors.address) setErrors({ ...errors, address: undefined });
                    }}
                    className={`${inputClass("address")} resize-none`}
                    rows={2}
                    placeholder="House / Building, Road, Area"
                  />
                  {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">City *</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => {
                        setFormData({ ...formData, city: e.target.value });
                        if (errors.city) setErrors({ ...errors, city: undefined });
                      }}
                      className={inputClass("city")}
                      placeholder="e.g. Dhaka"
                    />
                    {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Postal Code</label>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className={inputClass("postalCode")}
                      placeholder="e.g. 1200"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                Payment Method
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { value: "cod" as const, label: "Cash on Delivery", desc: "Pay when you receive" },
                  { value: "bkash" as const, label: "bKash", desc: "Mobile banking" },
                  { value: "card" as const, label: "Card Payment", desc: "Credit / Debit card" },
                ].map((method) => (
                  <label
                    key={method.value}
                    className={`relative flex flex-col p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      formData.paymentMethod === method.value
                        ? "border-pink-500 bg-pink-50"
                        : "border-gray-200 hover:border-pink-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.value}
                      checked={formData.paymentMethod === method.value}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as OrderData["paymentMethod"] })}
                      className="sr-only"
                    />
                    <span className="font-semibold text-sm text-gray-800">{method.label}</span>
                    <span className="text-xs text-gray-500 mt-0.5">{method.desc}</span>
                    {formData.paymentMethod === method.value && (
                      <div className="absolute top-2 right-2 w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center">
                        <CheckIcon />
                      </div>
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Order Notes */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Additional Notes</h3>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className={inputClass("notes") + " resize-none"}
                rows={3}
                placeholder="Any special instructions for delivery..."
              />
            </div>

            {/* Mobile Submit Button */}
            <div className="lg:hidden">
              <button
                type="submit"
                disabled={isPlacingOrder}
                className="w-full py-4 bg-pink-500 text-white rounded-full font-semibold text-sm hover:bg-pink-600 transition-all shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isPlacingOrder ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Placing Order...
                  </>
                ) : (
                  <>Place Order — ৳{total.toLocaleString()}</>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-2xl p-6 sticky top-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h3>

            {/* Items List */}
            <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="relative w-12 h-12 flex-shrink-0 bg-white rounded-lg overflow-hidden">
                  {item.product_image && <Image
                      src={item.product_image}
                      alt={item.product_name}
                      fill
                      className="object-contain p-1"
                    />}  
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-800 line-clamp-1">{item.product_name}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-xs font-semibold text-gray-800 flex-shrink-0">
                    ৳{(item.price_bdt * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium text-gray-800">৳{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium text-gray-800">
                  {shippingCost === 0 ? <span className="text-emerald-600">Free</span> : `৳${shippingCost.toLocaleString()}`}
                </span>
              </div>
              <div className="border-t border-gray-200 pt-2 flex justify-between">
                <span className="font-bold text-gray-800">Total</span>
                <span className="text-lg font-bold text-pink-600">৳{total.toLocaleString()}</span>
              </div>
            </div>

            {/* Desktop Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isPlacingOrder}
              className="hidden lg:flex w-full mt-6 py-3.5 bg-pink-500 text-white rounded-full font-semibold text-sm hover:bg-pink-600 transition-all shadow-md hover:shadow-lg disabled:opacity-50 items-center justify-center gap-2"
            >
              {isPlacingOrder ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Placing Order...
                </>
              ) : (
                <>Place Order</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Order Success Page ──────────────────────────────────────────────
const OrderSuccess = ({ orderId, onContinueShopping }: { orderId: string; onContinueShopping: () => void }) => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="text-center max-w-md mx-auto px-4">
      <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h2>
      <p className="text-gray-500 mb-2">Thank you for your purchase.</p>
      <p className="text-sm text-gray-400 mb-8">Order ID: <span className="font-mono font-medium text-gray-600">{orderId}</span></p>

      <div className="bg-gray-50 rounded-xl p-4 mb-8 text-left">
        <p className="text-sm text-gray-600 mb-2">What happens next?</p>
        <ul className="text-xs text-gray-500 space-y-1.5">
          <li className="flex items-start gap-2">
            <span className="w-4 h-4 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold mt-0.5">1</span>
            We&apos;ll send you an order confirmation via SMS/email
          </li>
          <li className="flex items-start gap-2">
            <span className="w-4 h-4 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold mt-0.5">2</span>
            Your order will be processed and shipped within 24-48 hours
          </li>
          <li className="flex items-start gap-2">
            <span className="w-4 h-4 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold mt-0.5">3</span>
            You can track your delivery status in your account
          </li>
        </ul>
      </div>

      <button
        onClick={onContinueShopping}
        className="px-8 py-3 bg-pink-500 text-white rounded-full font-medium hover:bg-pink-600 transition-colors shadow-md"
      >
        Continue Shopping
      </button>
    </div>
  </div>
);

// ─── Main Checkout Page Component ──────────────────────────────────
type PageView = "cart" | "checkout" | "success";

interface CheckoutPageProps {
  initialCartItems?: CartItem[];
}

export default function CheckoutPage({ initialCartItems = [] }: CheckoutPageProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [view, setView] = useState<PageView>("cart");
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastOrderId, setLastOrderId] = useState("");

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price_bdt * item.quantity, 0);
  const shippingCost = subtotal >= 2000 ? 0 : 120;

  // Cart actions
  const updateQuantity = (id: number, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Checkout flow
  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    setView("checkout");
  };

  const handlePlaceOrder = async (orderData: OrderData) => {
    setIsProcessing(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate order ID
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    setLastOrderId(orderId);

    // Clear cart
    setCartItems([]);
    setIsProcessing(false);
    setView("success");
  };

  const handleContinueShopping = () => {
    setView("cart");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-800">
              {view === "cart" && "Shopping Cart"}
              {view === "checkout" && "Checkout"}
              {view === "success" && "Order Confirmation"}
            </h1>

            {/* Progress Steps */}
            {view !== "success" && (
              <div className="hidden sm:flex items-center gap-2">
                <div className={`flex items-center gap-1.5 text-sm font-medium ${view === "cart" ? "text-pink-600" : "text-gray-400"}`}>
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${view === "cart" ? "bg-pink-100" : "bg-gray-100"}`}>
                    {view === "cart" ? "1" : <CheckIcon />}
                  </span>
                  Cart
                </div>
                <div className="w-8 h-px bg-gray-200" />
                <div className={`flex items-center gap-1.5 text-sm font-medium ${view === "checkout" ? "text-pink-600" : "text-gray-400"}`}>
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${view === "checkout" ? "bg-pink-100" : "bg-gray-100"}`}>
                    2
                  </span>
                  Checkout
                </div>
              </div>
            )}

            {/* Cart Badge */}
            {view !== "success" && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                <span className="font-medium">
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === "cart" && (
          <>
            {cartItems.length === 0 ? (
              <EmptyCart onContinueShopping={handleContinueShopping} />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                      <h2 className="font-semibold text-gray-800">
                        {cartItems.reduce((sum, item) => sum + item.quantity, 0)} Items in Cart
                      </h2>
                      <button
                        onClick={() => setCartItems([])}
                        className="text-xs text-red-500 hover:text-red-600 font-medium transition-colors"
                      >
                        Clear All
                      </button>
                    </div>
                    <div className="px-6">
                      {cartItems.map((item) => (
                        <CartItemRow
                          key={item.id}
                          item={item}
                          onUpdateQuantity={updateQuantity}
                          onRemove={removeItem}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <OrderSummary
                    items={cartItems}
                    shippingCost={shippingCost}
                    onCheckout={handleCheckout}
                    isCheckingOut={false}
                  />
                </div>
              </div>
            )}
          </>
        )}

        {view === "checkout" && (
          <CheckoutForm
            cartItems={cartItems}
            onBackToCart={() => setView("cart")}
            onPlaceOrder={handlePlaceOrder}
            isPlacingOrder={isProcessing}
          />
        )}

        {view === "success" && (
          <OrderSuccess
            orderId={lastOrderId}
            onContinueShopping={handleContinueShopping}
          />
        )}
      </main>
    </div>
  );
}