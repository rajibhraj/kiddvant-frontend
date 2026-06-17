"use client";

import React, { useState, useEffect } from "react";
import {
  Plus, Search, Edit3, Trash2, Eye, X, AlertTriangle,
  Package, Tag, DollarSign, Layers, Star, Truck, CheckCircle, XCircle,
} from "lucide-react";
import { getSafeImageUrl } from "@/lib/utils";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://192.168.50.130:5000/api";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Dimensions { length: number; width: number; height: number; }
interface Ratings    { average: number; count: number; }
interface Variant    { size: string; color: string; sku: string; stock: number; additionalPrice: number; }

interface Product {
  _id: string;
  productId: string;
  name: string;
  description: string;
  shortDescription: string;
  brand: string;
  category: string;
  subCategory: string;
  tags: string[];
  price: number;
  discountPrice: number | null;
  discountPercent: number;
  currency: string;
  sku: string;
  stock: number;
  lowStockThreshold: number;
  thumbnail: string;
  images: string[];
  weight: number;
  dimensions: Dimensions;
  isFreeShipping: boolean;
  ratings: Ratings;
  isActive: boolean;
  isFeatured: boolean;
  isNewArrival: boolean;
  variants: Variant[];
  createdAt: string;
  updatedAt: string;
}

type EditForm = Omit<Product, "_id" | "productId" | "ratings" | "variants" | "createdAt" | "updatedAt">;

// ─── Helpers ──────────────────────────────────────────────────────────────────

const emptyForm = (): EditForm => ({
  name: "", description: "", shortDescription: "", brand: "",
  category: "", subCategory: "", tags: [], price: 0,
  discountPrice: null, discountPercent: 0, currency: "USD",
  sku: "", stock: 0, lowStockThreshold: 5, thumbnail: "",
  images: [], weight: 0,
  dimensions: { length: 0, width: 0, height: 0 },
  isFreeShipping: false, isActive: true, isFeatured: false, isNewArrival: false,
});

const productToForm = (p: Product): EditForm => ({
  name: p.name, description: p.description, shortDescription: p.shortDescription,
  brand: p.brand, category: p.category, subCategory: p.subCategory,
  tags: p.tags, price: p.price, discountPrice: p.discountPrice,
  discountPercent: p.discountPercent, currency: p.currency, sku: p.sku,
  stock: p.stock, lowStockThreshold: p.lowStockThreshold, thumbnail: p.thumbnail,
  images: p.images, weight: p.weight, dimensions: p.dimensions,
  isFreeShipping: p.isFreeShipping, isActive: p.isActive,
  isFeatured: p.isFeatured, isNewArrival: p.isNewArrival,
});

// ─── Shared small components (module-level) ───────────────────────────────────

const inputCls = "border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full";

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-1 py-2 border-b border-slate-100 last:border-0">
      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide w-40 shrink-0">{label}</span>
      <span className="text-sm text-slate-800">{children}</span>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">{label}</label>
      {children}
    </div>
  );
}

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-100 p-4">
      <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
        <span className="text-indigo-500">{icon}</span>{title}
      </h3>
      {children}
    </div>
  );
}

function StockBadge({ stock, threshold }: { stock: number; threshold: number }) {
  if (stock === 0)
    return <span className="px-2 py-1 rounded-md text-xs font-semibold bg-red-100 text-red-700">Out of stock</span>;
  if (stock <= threshold)
    return <span className="px-2 py-1 rounded-md text-xs font-semibold bg-amber-100 text-amber-700">{stock} pcs ⚠</span>;
  return <span className="px-2 py-1 rounded-md text-xs font-semibold bg-green-100 text-green-700">{stock} pcs</span>;
}

function BoolBadge({ val, trueLabel = "Yes", falseLabel = "No" }: { val: boolean; trueLabel?: string; falseLabel?: string }) {
  return val
    ? <span className="inline-flex items-center gap-1 text-green-600"><CheckCircle size={14} />{trueLabel}</span>
    : <span className="inline-flex items-center gap-1 text-slate-400"><XCircle size={14} />{falseLabel}</span>;
}

// ─── Details Modal ────────────────────────────────────────────────────────────

function DetailsModal({ product, onClose }: { product: Product; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 sticky top-0 bg-white rounded-t-2xl z-10">
          <div>
            <p className="text-xs text-indigo-500 font-semibold">{product.productId}</p>
            <h2 className="text-lg font-bold text-slate-900">{product.name}</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"><X size={20} /></button>
        </div>

        <div className="p-5 space-y-4">
          {/* Thumbnail */}
          {(product.thumbnail || product.images[0]) && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={product.thumbnail || product.images[0]} alt={product.name}
              className="w-full h-48 object-cover rounded-xl border border-slate-100" />
          )}

          <Section icon={<Package size={16} />} title="Basic Info">
            <Row label="Brand">{product.brand || "—"}</Row>
            <Row label="Category">{product.category}{product.subCategory ? ` › ${product.subCategory}` : ""}</Row>
            <Row label="SKU">{product.sku || "—"}</Row>
            <Row label="Description">{product.description || "—"}</Row>
            <Row label="Short Desc">{product.shortDescription || "—"}</Row>
            <Row label="Tags">{product.tags.length ? product.tags.join(", ") : "—"}</Row>
          </Section>

          <Section icon={<DollarSign size={16} />} title="Pricing">
            <Row label="Price">{product.currency} {product.price}</Row>
            <Row label="Discount Price">{product.discountPrice != null ? `${product.currency} ${product.discountPrice}` : "—"}</Row>
            <Row label="Discount %">{product.discountPercent ? `${product.discountPercent}%` : "—"}</Row>
          </Section>

          <Section icon={<Layers size={16} />} title="Inventory">
            <Row label="Stock"><StockBadge stock={product.stock} threshold={product.lowStockThreshold} /></Row>
            <Row label="Low Stock Alert">{product.lowStockThreshold} pcs</Row>
          </Section>

          <Section icon={<Truck size={16} />} title="Shipping">
            <Row label="Weight">{product.weight ? `${product.weight}g` : "—"}</Row>
            <Row label="Dimensions">
              {product.dimensions.length || product.dimensions.width || product.dimensions.height
                ? `${product.dimensions.length} × ${product.dimensions.width} × ${product.dimensions.height} cm`
                : "—"}
            </Row>
            <Row label="Free Shipping"><BoolBadge val={product.isFreeShipping} /></Row>
          </Section>

          <Section icon={<Star size={16} />} title="Ratings">
            <Row label="Average">{product.ratings.average} / 5</Row>
            <Row label="Reviews">{product.ratings.count}</Row>
          </Section>

          <Section icon={<Tag size={16} />} title="Status">
            <Row label="Active"><BoolBadge val={product.isActive} trueLabel="Active" falseLabel="Inactive" /></Row>
            <Row label="Featured"><BoolBadge val={product.isFeatured} /></Row>
            <Row label="New Arrival"><BoolBadge val={product.isNewArrival} /></Row>
          </Section>

          <p className="text-xs text-slate-400 text-right">
            Created: {new Date(product.createdAt).toLocaleString()} &nbsp;|&nbsp;
            Updated: {new Date(product.updatedAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Edit Modal ───────────────────────────────────────────────────────────────

function EditModal({
  product, onClose, onSaved,
}: { product: Product | null; onClose: () => void; onSaved: (p: Product) => void }) {
  const isNew = product === null;
  const [form, setForm] = useState<EditForm>(product ? productToForm(product) : emptyForm());
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [tagInput, setTagInput] = useState("");
  const [imageInput, setImageInput] = useState("");

  const handleTagInputChange = (val: string) => {
    if (val.endsWith(",")) {
      const newTag = val.slice(0, -1).trim();
      if (newTag && !form.tags.includes(newTag)) {
        set("tags", [...form.tags, newTag]);
      }
      setTagInput("");
    } else {
      setTagInput(val);
    }
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (newTag && !form.tags.includes(newTag)) {
        set("tags", [...form.tags, newTag]);
      }
      setTagInput("");
    }
  };

  const removeTag = (indexToRemove: number) => {
    set("tags", form.tags.filter((_, idx) => idx !== indexToRemove));
  };

  const handleImageInputChange = (val: string) => {
    if (val.endsWith(",")) {
      const newImg = val.slice(0, -1).trim();
      if (newImg && !form.images.includes(newImg)) {
        set("images", [...form.images, newImg]);
      }
      setImageInput("");
    } else {
      setImageInput(val);
    }
  };

  const handleImageInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newImg = imageInput.trim();
      if (newImg && !form.images.includes(newImg)) {
        set("images", [...form.images, newImg]);
      }
      setImageInput("");
    }
  };

  const removeImage = (indexToRemove: number) => {
    set("images", form.images.filter((_, idx) => idx !== indexToRemove));
  };

  const set = (field: keyof EditForm, value: unknown) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const setDim = (axis: keyof Dimensions, value: number) =>
    setForm((prev) => ({ ...prev, dimensions: { ...prev.dimensions, [axis]: value } }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const url = isNew ? `${API_BASE}/products` : `${API_BASE}/products/${product!._id}`;
      const method = isNew ? "POST" : "PUT";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Failed to save");
      onSaved(json.data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-slate-100 sticky top-0 bg-white rounded-t-2xl z-10">
          <h2 className="text-lg font-bold text-slate-900">{isNew ? "Add Product" : "Edit Product"}</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
              <AlertTriangle size={16} />{error}
            </div>
          )}

          {/* Basic */}
          <div className="rounded-xl border border-slate-100 p-4 space-y-3">
            <h3 className="text-sm font-semibold text-slate-700">Basic Info</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Name *">
                <input required className={inputCls} value={form.name} onChange={(e) => set("name", e.target.value)} />
              </Field>
              <Field label="Brand">
                <input className={inputCls} value={form.brand} onChange={(e) => set("brand", e.target.value)} />
              </Field>
              <Field label="Category">
                <input className={inputCls} value={form.category} onChange={(e) => set("category", e.target.value)} />
              </Field>
              <Field label="Sub-Category">
                <input className={inputCls} value={form.subCategory} onChange={(e) => set("subCategory", e.target.value)} />
              </Field>
              <Field label="SKU">
                <input className={inputCls} value={form.sku} onChange={(e) => set("sku", e.target.value)} />
              </Field>
              <Field label="Tags (Press Enter or Comma to add)">
                <div className="flex flex-col gap-1.5">
                  <input 
                    className={inputCls}
                    placeholder="Type tag and press Enter or Comma"
                    value={tagInput}
                    onChange={(e) => handleTagInputChange(e.target.value)}
                    onKeyDown={handleTagInputKeyDown}
                  />
                  {form.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {form.tags.map((tag, idx) => (
                        <span key={idx} className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(idx)}
                            className="hover:bg-indigo-100 rounded-full p-0.5 transition-colors text-indigo-500 hover:text-indigo-800"
                          >
                            <X size={12} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Field>
            </div>
            <Field label="Description">
              <textarea rows={3} className={inputCls} value={form.description}
                onChange={(e) => set("description", e.target.value)} />
            </Field>
            <Field label="Short Description">
              <input className={inputCls} value={form.shortDescription}
                onChange={(e) => set("shortDescription", e.target.value)} />
            </Field>
          </div>

          {/* Pricing */}
          <div className="rounded-xl border border-slate-100 p-4 space-y-3">
            <h3 className="text-sm font-semibold text-slate-700">Pricing</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <Field label="Price *">
                <input required type="number" min={0} className={inputCls} value={form.price}
                  onChange={(e) => set("price", Number(e.target.value))} />
              </Field>
              <Field label="Discount Price">
                <input type="number" min={0} className={inputCls}
                  value={form.discountPrice ?? ""}
                  onChange={(e) => set("discountPrice", e.target.value === "" ? null : Number(e.target.value))} />
              </Field>
              <Field label="Discount %">
                <input type="number" min={0} max={100} className={inputCls} value={form.discountPercent}
                  onChange={(e) => set("discountPercent", Number(e.target.value))} />
              </Field>
              <Field label="Currency">
                <input className={inputCls} value={form.currency} onChange={(e) => set("currency", e.target.value)} />
              </Field>
            </div>
          </div>

          {/* Inventory */}
          <div className="rounded-xl border border-slate-100 p-4 space-y-3">
            <h3 className="text-sm font-semibold text-slate-700">Inventory</h3>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Stock">
                <input type="number" min={0} className={inputCls} value={form.stock}
                  onChange={(e) => set("stock", Number(e.target.value))} />
              </Field>
              <Field label="Low Stock Threshold">
                <input type="number" min={0} className={inputCls} value={form.lowStockThreshold}
                  onChange={(e) => set("lowStockThreshold", Number(e.target.value))} />
              </Field>
            </div>
          </div>

          {/* Media */}
          <div className="rounded-xl border border-slate-100 p-4 space-y-3">
            <h3 className="text-sm font-semibold text-slate-700">Media</h3>
            <Field label="Thumbnail URL">
              <input className={inputCls} value={form.thumbnail} onChange={(e) => set("thumbnail", e.target.value)} />
            </Field>
            <Field label="Image URLs (Press Enter or Comma to add)">
              <div className="flex flex-col gap-1.5">
                <input 
                  className={inputCls}
                  placeholder="Paste URL and press Enter or Comma"
                  value={imageInput}
                  onChange={(e) => handleImageInputChange(e.target.value)}
                  onKeyDown={handleImageInputKeyDown}
                />
                {form.images.length > 0 && (
                  <div className="space-y-1.5 mt-1 max-h-40 overflow-y-auto border border-slate-100 rounded-lg p-2 bg-slate-50/50">
                    {form.images.map((img, idx) => (
                      <div key={idx} className="flex items-center justify-between gap-3 bg-white border border-slate-200 rounded-lg p-1.5 pl-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-8 h-8 rounded bg-slate-50 border border-slate-100 overflow-hidden flex-shrink-0 flex items-center justify-center">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={getSafeImageUrl(img)} alt="" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = '/Product/p1.jpg'; }} />
                          </div>
                          <span className="text-xs text-slate-600 truncate font-mono select-all" title={img}>{img}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="p-1 hover:bg-red-50 rounded text-red-500 hover:text-red-700 flex-shrink-0 transition-colors"
                          title="Delete image"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Field>
          </div>

          {/* Shipping */}
          <div className="rounded-xl border border-slate-100 p-4 space-y-3">
            <h3 className="text-sm font-semibold text-slate-700">Shipping</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Field label="Weight (g)">
                <input type="number" min={0} className={inputCls} value={form.weight}
                  onChange={(e) => set("weight", Number(e.target.value))} />
              </Field>
              <Field label="Length (cm)">
                <input type="number" min={0} className={inputCls} value={form.dimensions.length}
                  onChange={(e) => setDim("length", Number(e.target.value))} />
              </Field>
              <Field label="Width (cm)">
                <input type="number" min={0} className={inputCls} value={form.dimensions.width}
                  onChange={(e) => setDim("width", Number(e.target.value))} />
              </Field>
              <Field label="Height (cm)">
                <input type="number" min={0} className={inputCls} value={form.dimensions.height}
                  onChange={(e) => setDim("height", Number(e.target.value))} />
              </Field>
            </div>
            <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
              <input type="checkbox" checked={form.isFreeShipping}
                onChange={(e) => set("isFreeShipping", e.target.checked)}
                className="w-4 h-4 accent-indigo-600" />
              Free Shipping
            </label>
          </div>

          {/* Status */}
          <div className="rounded-xl border border-slate-100 p-4 space-y-2">
            <h3 className="text-sm font-semibold text-slate-700">Status</h3>
            {(["isActive", "isFeatured", "isNewArrival"] as const).map((key) => (
              <label key={key} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                <input type="checkbox" checked={form[key] as boolean}
                  onChange={(e) => set(key, e.target.checked)}
                  className="w-4 h-4 accent-indigo-600" />
                {key === "isActive" ? "Active" : key === "isFeatured" ? "Featured" : "New Arrival"}
              </label>
            ))}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50">
              Cancel
            </button>
            <button type="submit" disabled={saving}
              className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium disabled:opacity-60">
              {saving ? "Saving…" : isNew ? "Create Product" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Delete Confirm Modal ─────────────────────────────────────────────────────

function DeleteModal({
  product, onClose, onDeleted,
}: { product: Product; onClose: () => void; onDeleted: (id: string) => void }) {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setDeleting(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/products/${product._id}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Failed to delete");
      onDeleted(product._id);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
            <AlertTriangle size={20} className="text-red-600" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Delete Product</h2>
        </div>
        <p className="text-sm text-slate-600 mb-2">
          Are you sure you want to delete <span className="font-semibold text-slate-900">{product.name}</span>?
        </p>
        <p className="text-xs text-slate-400 mb-5">This action cannot be undone.</p>
        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</div>
        )}
        <div className="flex justify-end gap-3">
          <button onClick={onClose}
            className="px-4 py-2 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50">
            Cancel
          </button>
          <button onClick={handleDelete} disabled={deleting}
            className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium disabled:opacity-60">
            {deleting ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ProductsPage() {
  const [products, setProducts]     = useState<Product[]>([]);
  const [loading, setLoading]       = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // undefined = modal closed, null = new product, Product = edit existing
  const [detailsProduct, setDetailsProduct] = useState<Product | null>(null);
  const [editProduct, setEditProduct]       = useState<Product | null | undefined>(undefined);
  const [deleteProduct, setDeleteProduct]   = useState<Product | null>(null);

  const [refetch, setRefetch] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setFetchError("");
    fetch(`${API_BASE}/products`)
      .then((res) => res.json().then((json: { data: Product[]; message?: string }) => ({ ok: res.ok, json })))
      .then(({ ok, json }) => {
        if (cancelled) return;
        if (!ok) throw new Error(json.message || "Failed to fetch");
        setProducts(json.data);
      })
      .catch((err: unknown) => {
        if (!cancelled) setFetchError(err instanceof Error ? err.message : "Unknown error");
      })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [refetch]);

  const fetchProducts = () => setRefetch((n) => n + 1);

  const handleSaved = (saved: Product) => {
    setProducts((prev) => {
      const idx = prev.findIndex((p) => p._id === saved._id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = saved;
        return next;
      }
      return [saved, ...prev];
    });
    setEditProduct(undefined);
  };

  const handleDeleted = (id: string) => {
    setProducts((prev) => prev.filter((p) => p._id !== id));
    setDeleteProduct(null);
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.productId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 space-y-4">
        {/* Top Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by name, category, brand, ID…"
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => setEditProduct(null)}
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <Plus size={18} /><span>Add Product</span>
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-16 text-slate-400 text-sm gap-2">
            <span className="animate-spin inline-block w-5 h-5 border-2 border-indigo-400 border-t-transparent rounded-full" />
            Loading products…
          </div>
        )}

        {/* Error */}
        {!loading && fetchError && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
            <AlertTriangle size={16} />{fetchError}
            <button onClick={fetchProducts} className="ml-auto underline text-xs">Retry</button>
          </div>
        )}

        {/* Table */}
        {!loading && !fetchError && (
          <div className="overflow-x-auto rounded-lg border border-slate-100">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-600 text-sm font-semibold border-b border-slate-100">
                  <th className="p-4" style={{fontFamily: "monospace"}}>ID</th>
                  <th className="p-4" style={{fontFamily: 'monospace'}}>Product Name</th>
                  <th className="p-4" style={{fontFamily: 'monospace'}}>Category</th>
                  <th className="p-4" style={{fontFamily: 'monospace'}}>Price</th>
                  <th className="p-4" style={{fontFamily: 'monospace'}}>Stock</th>
                  <th className="p-4" style={{fontFamily: 'monospace'}}>Status</th>
                  <th className="p-4 text-right" style={{fontFamily: 'monospace'}}>Actions</th>
                </tr>
              </thead>
              <tbody className="text-slate-700 text-sm divide-y divide-slate-50">
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-400 text-sm">No products found.</td>
                  </tr>
                )}
                {filtered.map((product) => (
                  <tr key={product._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 text-xs text-indigo-500 font-mono font-semibold" style={{fontFamily: 'monospace'}}>{product.productId}</td>
                    <td className="p-4 font-medium text-slate-900 max-w-[200px] truncate" style={{fontFamily: 'monospace'}}>{product.name}</td>
                    <td className="p-4 text-slate-500" style={{fontFamily: 'monospace'}}>{product.category}</td>
                    <td className="p-4" style={{fontFamily: 'monospace'}}>
                      <span className="font-semibold" style={{fontFamily: 'monospace'}}>{product.currency} {product.price}</span>
                      {product.discountPrice != null && (
                        <span className="ml-2 text-xs text-green-600" style={{fontFamily: 'monospace'}}>{product.currency} {product.discountPrice}</span>
                      )}
                    </td>
                    <td className="p-4" style={{fontFamily: 'monospace'}}>
                      <StockBadge stock={product.stock} threshold={product.lowStockThreshold} />
                    </td>
                    <td className="p-4" style={{fontFamily: 'monospace'}}>
                      <span className={`px-2 py-1 rounded-md text-xs font-semibold ${product.isActive ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                        {product.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="p-4 text-right" style={{fontFamily: 'monospace'}}>
                      <div className="inline-flex items-center gap-1">
                        <button title="View Details" onClick={() => setDetailsProduct(product)}
                          className="text-slate-500 hover:text-indigo-600 inline-flex p-1.5 rounded-md hover:bg-slate-100 transition-colors">
                          <Eye size={16} />
                        </button>
                        <button title="Edit" onClick={() => setEditProduct(product)}
                          className="text-indigo-600 hover:text-indigo-900 inline-flex p-1.5 rounded-md hover:bg-slate-100 transition-colors">
                          <Edit3 size={16} />
                        </button>
                        <button title="Delete" onClick={() => setDeleteProduct(product)}
                          className="text-red-500 hover:text-red-700 inline-flex p-1.5 rounded-md hover:bg-slate-100 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && !fetchError && (
          <p className="text-xs text-slate-400 text-right">
            Showing {filtered.length} of {products.length} products
          </p>
        )}
      </div>

      {/* Modals */}
      {detailsProduct && (
        <DetailsModal product={detailsProduct} onClose={() => setDetailsProduct(null)} />
      )}
      {editProduct !== undefined && (
        <EditModal product={editProduct} onClose={() => setEditProduct(undefined)} onSaved={handleSaved} />
      )}
      {deleteProduct && (
        <DeleteModal product={deleteProduct} onClose={() => setDeleteProduct(null)} onDeleted={handleDeleted} />
      )}
    </>
  );
}



// "use client";

// import React, { useState } from "react";
// import { Plus, Search, Edit3, Trash2 } from "lucide-react";

// interface Product {
//   id: string;
//   name: string;
//   category: string;
//   price: number;
//   stock: number;
// }

// export default function ProductsPage() {
//   const [searchTerm, setSearchTerm] = useState("");
  
//   // ডামি ডাটা
//   const products: Product[] = [
//     { id: "1", name: "Premium Wireless Headphones", category: "Electronics", price: 129, stock: 45 },
//     { id: "2", name: "Ergonomic Office Chair", category: "Furniture", price: 249, stock: 12 },
//     { id: "3", name: "Waterproof Smartwatch", category: "Electronics", price: 89, stock: 88 },
//     { id: "4", name: "Leather Travel Backpack", category: "Accessories", price: 145, stock: 23 },
//   ];

//   const filteredProducts = products.filter(product =>
//     product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     product.category.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 space-y-4">
//       {/* Top Controller */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div className="relative flex-1 max-w-md">
//           <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
//           <input
//             type="text"
//             placeholder="Search products..."
//             className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//         <button className="flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
//           <Plus size={18} />
//           <span>Add Product</span>
//         </button>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto rounded-lg border border-slate-100">
//         <table className="w-full text-left border-collapse">
//           <thead>
//             <tr className="bg-slate-50 text-slate-600 text-sm font-semibold border-b border-slate-100">
//               <th className="p-4">Product Name</th>
//               <th className="p-4">Category</th>
//               <th className="p-4">Price</th>
//               <th className="p-4">Stock</th>
//               <th className="p-4 text-right">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="text-slate-700 text-sm divide-y divide-slate-50">
//             {filteredProducts.map((product) => (
//               <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
//                 <td className="p-4 font-medium text-slate-900">{product.name}</td>
//                 <td className="p-4 text-slate-500">{product.category}</td>
//                 <td className="p-4">${product.price}</td>
//                 <td className="p-4">
//                   <span className={`px-2 py-1 rounded-md text-xs font-semibold ${product.stock < 15 ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
//                     {product.stock} pcs
//                   </span>
//                 </td>
//                 <td className="p-4 text-right space-x-2">
//                   <button onClick={() => alert(`Edit ${product.name}`)} className="text-indigo-600 hover:text-indigo-900 inline-flex p-1 rounded-md hover:bg-slate-100">
//                     <Edit3 size={16} />
//                   </button>
//                   <button className="text-red-600 hover:text-red-900 inline-flex p-1 rounded-md hover:bg-slate-100">
//                     <Trash2 size={16} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }