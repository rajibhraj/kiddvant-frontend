"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ShoppingCart, Heart, Grid, List, Search, SlidersHorizontal } from "lucide-react";
import { products } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { useCartSidebar } from "@/context/CartSidebarContext";
import ProductModal from "@/components/ProductModal";
import { Product } from "@/lib/products";
import { fetchProducts } from "@/lib/api";
import { getSafeImageUrl } from "@/lib/utils";

export default function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);
  const { addToCart } = useCart();
  const { openCart } = useCartSidebar();

  const [fetchedProducts, setFetchedProducts] = useState<Product[]>(products);

  useEffect(() => {
    let active = true;
    fetchProducts(products).then((data) => {
      if (active) {
        setFetchedProducts(data);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const categories = ["all", "wooden", "plastic", "stuffed", "educational"];

  const filteredProducts = fetchedProducts
    .filter((product) => {
      const matchesSearch = product.product_name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" ||
        product.material.toLowerCase().includes(selectedCategory) ||
        (product.type && product.type.toLowerCase().includes(selectedCategory));
      const matchesPrice = product.price_bdt >= priceRange[0] && product.price_bdt <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price_bdt - b.price_bdt;
      if (sortBy === "price-high") return b.price_bdt - a.price_bdt;
      if (sortBy === "name") return a.product_name.localeCompare(b.product_name);
      return 0;
    });

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    openCart();
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#F6339A] to-[#FFD383] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Our Products</h1>
          <p className="text-xl md:text-2xl opacity-90">Discover amazing toys for every age</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filters Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 z-10">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 bg-[#F6339A] text-white rounded-xl hover:bg-blue-700 transition"
            >
              <SlidersHorizontal size={20} />
              Filters
            </button>

            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-3 rounded-xl transition ${
                  viewMode === "grid" ? "bg-[#F6339A] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-3 rounded-xl transition ${
                  viewMode === "list" ? "bg-[#F6339A] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <List size={20} />
              </button>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition"
            >
              <option value="default">Sort by</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                        selectedCategory === category
                          ? "bg-[#F6339A] text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price Range: ৳{priceRange[0]} - ৳{priceRange[1]}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#F6339A]"
                />
              </div>

              {/* Results Count */}
              <div className="flex items-end">
                <p className="text-gray-600">
                  Showing <span className="font-bold text-[#F6339A]">{filteredProducts.length}</span> products
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your filters or search query</p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group transform hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                  {product.product_image &&  <Image
                    src={getSafeImageUrl(product.product_image)}
                    alt={product.product_name}
                    fill
                    className="object-contain p-6 group-hover:scale-110 transition-transform duration-500"
                  />}
                 
                  
                  {/* Quick Actions */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => handleViewDetails(product)}
                      className="p-3 bg-white rounded-full shadow-lg hover:bg-blue-50 transition"
                    >
                      <Heart size={18} className="text-gray-600 hover:text-red-500" />
                    </button>
                  </div>

                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-[#F6339A] to-purple-600 text-white text-xs font-bold rounded-full">
                      NEW
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-[#F6339A] transition">
                    {product.product_name}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                      {product.material}
                    </span>
                    <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
                      {product.age_range}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold bg-gradient-to-r from-[#F6339A] to-purple-600 bg-clip-text text-transparent">
                      ৳{product.price_bdt}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewDetails(product)}
                      className="flex-1 border-2 border-[#F6339A] text-[#F6339A] py-2.5 rounded-xl font-semibold hover:bg-blue-50 transition"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 bg-gradient-to-r from-[#FFE0EF] to-[#FFD383] text-black py-2.5 rounded-xl font-semibold hover:opacity-90 transition flex items-center justify-center gap-2"
                    >
                      <ShoppingCart size={18} />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="relative w-full md:w-64 h-64 bg-gradient-to-br from-gray-50 to-gray-100">
                 {product.product_image &&    <Image
                      src={getSafeImageUrl(product.product_image)}
                      alt={product.product_name}
                      fill
                      className="object-contain p-6"
                    />} 
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-xl text-gray-800 mb-2 group-hover:text-[#F6339A] transition">
                          {product.product_name}
                        </h3>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="text-xs px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                            {product.material}
                          </span>
                          <span className="text-xs px-3 py-1 bg-purple-100 text-purple-800 rounded-full">
                            {product.age_range}
                          </span>
                          {product.origin && (
                            <span className="text-xs px-3 py-1 bg-green-100 text-green-800 rounded-full">
                              {product.origin}
                            </span>
                          )}
                        </div>

                        <p className="text-gray-600 text-sm mb-4">
                          {product.function || product.type || "High-quality toy for children"}
                        </p>
                      </div>

                      <div className="flex flex-col items-start md:items-end gap-4">
                        <span className="text-3xl font-bold bg-gradient-to-r from-[#F6339A] to-purple-600 bg-clip-text text-transparent">
                          ৳{product.price_bdt}
                        </span>
                        
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleViewDetails(product)}
                            className="px-6 py-2.5 border-2 border-[#F6339A] text-[#F6339A] rounded-xl font-semibold hover:bg-blue-50 transition"
                          >
                            View Details
                          </button>
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="px-6 py-2.5 bg-gradient-to-r from-[#F6339A] to-purple-600 text-white rounded-xl font-semibold hover:opacity-90 transition flex items-center gap-2"
                          >
                            <ShoppingCart size={18} />
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}


// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { ShoppingCart, Heart, Grid, List, Search, SlidersHorizontal } from "lucide-react";
// import { products } from "@/lib/products";
// import { useCart } from "@/context/CartContext";
// import { useCartSidebar } from "@/context/CartSidebarContext";
// import ProductModal from "@/components/ProductModal";
// import { Product } from "@/lib/products";

// export default function ProductsPage() {
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
//   const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [sortBy, setSortBy] = useState("default");
//   const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
//   const [showFilters, setShowFilters] = useState(false);
//   const { addToCart } = useCart();
//   const { openCart } = useCartSidebar();

//   const categories = ["all", "wooden", "plastic", "stuffed", "educational"];

//   const filteredProducts = products
//     .filter((product) => {
//       const matchesSearch = product.product_name.toLowerCase().includes(searchQuery.toLowerCase());
//       const matchesCategory =
//         selectedCategory === "all" ||
//         product.material.toLowerCase().includes(selectedCategory) ||
//         (product.type && product.type.toLowerCase().includes(selectedCategory));
//       const matchesPrice = product.price_bdt >= priceRange[0] && product.price_bdt <= priceRange[1];
//       return matchesSearch && matchesCategory && matchesPrice;
//     })
//     .sort((a, b) => {
//       if (sortBy === "price-low") return a.price_bdt - b.price_bdt;
//       if (sortBy === "price-high") return b.price_bdt - a.price_bdt;
//       if (sortBy === "name") return a.product_name.localeCompare(b.product_name);
//       return 0;
//     });

//   const handleAddToCart = (product: Product) => {
//     addToCart(product);
//     openCart();
//   };

//   const handleViewDetails = (product: Product) => {
//     setSelectedProduct(product);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
//       {/* Hero Section */}
//       <div className="relative bg-gradient-to-r from-[#F6339A] to-[#FFD383] text-white py-16 px-4">
//         <div className="max-w-7xl mx-auto">
//           <h1 className="text-4xl md:text-6xl font-bold mb-4">Our Products</h1>
//           <p className="text-xl md:text-2xl opacity-90">Discover amazing toys for every age</p>
//         </div>
//         <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
//       </div>

//       <div className="max-w-7xl mx-auto px-4 py-8">
//         {/* Search and Filters Bar */}
//         <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 sticky top-4 z-10">
//           <div className="flex flex-col lg:flex-row gap-4 items-center">
//             {/* Search */}
//             <div className="relative flex-1 w-full">
//               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition"
//               />
//             </div>

//             {/* Filter Toggle */}
//             <button
//               onClick={() => setShowFilters(!showFilters)}
//               className="flex items-center gap-2 px-6 py-3 bg-[#F6339A] text-white rounded-xl hover:bg-blue-700 transition"
//             >
//               <SlidersHorizontal size={20} />
//               Filters
//             </button>

//             {/* View Mode Toggle */}
//             <div className="flex gap-2">
//               <button
//                 onClick={() => setViewMode("grid")}
//                 className={`p-3 rounded-xl transition ${
//                   viewMode === "grid" ? "bg-[#F6339A] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//                 }`}
//               >
//                 <Grid size={20} />
//               </button>
//               <button
//                 onClick={() => setViewMode("list")}
//                 className={`p-3 rounded-xl transition ${
//                   viewMode === "list" ? "bg-[#F6339A] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//                 }`}
//               >
//                 <List size={20} />
//               </button>
//             </div>

//             {/* Sort */}
//             <select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition"
//             >
//               <option value="default">Sort by</option>
//               <option value="price-low">Price: Low to High</option>
//               <option value="price-high">Price: High to Low</option>
//               <option value="name">Name: A to Z</option>
//             </select>
//           </div>

//           {/* Expandable Filters */}
//           {showFilters && (
//             <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-6">
//               {/* Category Filter */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
//                 <div className="flex flex-wrap gap-2">
//                   {categories.map((category) => (
//                     <button
//                       key={category}
//                       onClick={() => setSelectedCategory(category)}
//                       className={`px-4 py-2 rounded-full text-sm font-medium transition ${
//                         selectedCategory === category
//                           ? "bg-[#F6339A] text-white"
//                           : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                       }`}
//                     >
//                       {category.charAt(0).toUpperCase() + category.slice(1)}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Price Range */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Price Range: ৳{priceRange[0]} - ৳{priceRange[1]}
//                 </label>
//                 <input
//                   type="range"
//                   min="0"
//                   max="1000"
//                   value={priceRange[1]}
//                   onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
//                   className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#F6339A]"
//                 />
//               </div>

//               {/* Results Count */}
//               <div className="flex items-end">
//                 <p className="text-gray-600">
//                   Showing <span className="font-bold text-[#F6339A]">{filteredProducts.length}</span> products
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Products Grid */}
//         {filteredProducts.length === 0 ? (
//           <div className="text-center py-16">
//             <div className="text-6xl mb-4">🔍</div>
//             <h3 className="text-2xl font-bold text-gray-800 mb-2">No products found</h3>
//             <p className="text-gray-600">Try adjusting your filters or search query</p>
//           </div>
//         ) : viewMode === "grid" ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {filteredProducts.map((product) => (
//               <div
//                 key={product.id}
//                 className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group transform hover:-translate-y-2"
//               >
//                 {/* Image */}
//                 <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
//                   <Image
//                     src={product.product_image}
//                     alt={product.product_name}
//                     fill
//                     className="object-contain p-6 group-hover:scale-110 transition-transform duration-500"
//                   />
                  
//                   {/* Quick Actions */}
//                   <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                     <button
//                       onClick={() => handleViewDetails(product)}
//                       className="p-3 bg-white rounded-full shadow-lg hover:bg-blue-50 transition"
//                     >
//                       <Heart size={18} className="text-gray-600 hover:text-red-500" />
//                     </button>
//                   </div>

//                   {/* Badge */}
//                   <div className="absolute top-4 left-4">
//                     <span className="px-3 py-1 bg-gradient-to-r from-[#F6339A] to-purple-600 text-white text-xs font-bold rounded-full">
//                       NEW
//                     </span>
//                   </div>
//                 </div>

//                 {/* Content */}
//                 <div className="p-5">
//                   <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-[#F6339A] transition">
//                     {product.product_name}
//                   </h3>
                  
//                   <div className="flex items-center gap-2 mb-3">
//                     <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
//                       {product.material}
//                     </span>
//                     <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
//                       {product.age_range}
//                     </span>
//                   </div>

//                   <div className="flex items-center justify-between mb-4">
//                     <span className="text-2xl font-bold bg-gradient-to-r from-[#F6339A] to-purple-600 bg-clip-text text-transparent">
//                       ৳{product.price_bdt}
//                     </span>
//                   </div>

//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => handleViewDetails(product)}
//                       className="flex-1 border-2 border-[#F6339A] text-[#F6339A] py-2.5 rounded-xl font-semibold hover:bg-blue-50 transition"
//                     >
//                       View Details
//                     </button>
//                     <button
//                       onClick={() => handleAddToCart(product)}
//                       className="flex-1 bg-gradient-to-r from-[#FFE0EF] to-[#FFD383] text-black py-2.5 rounded-xl font-semibold hover:opacity-90 transition flex items-center justify-center gap-2"
//                     >
//                       <ShoppingCart size={18} />
//                       Add
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {filteredProducts.map((product) => (
//               <div
//                 key={product.id}
//                 className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
//               >
//                 <div className="flex flex-col md:flex-row">
//                   {/* Image */}
//                   <div className="relative w-full md:w-64 h-64 bg-gradient-to-br from-gray-50 to-gray-100">
//                     <Image
//                       src={product.product_image}
//                       alt={product.product_name}
//                       fill
//                       className="object-contain p-6"
//                     />
//                   </div>

//                   {/* Content */}
//                   <div className="flex-1 p-6">
//                     <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
//                       <div className="flex-1">
//                         <h3 className="font-bold text-xl text-gray-800 mb-2 group-hover:text-[#F6339A] transition">
//                           {product.product_name}
//                         </h3>
                        
//                         <div className="flex flex-wrap gap-2 mb-4">
//                           <span className="text-xs px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
//                             {product.material}
//                           </span>
//                           <span className="text-xs px-3 py-1 bg-purple-100 text-purple-800 rounded-full">
//                             {product.age_range}
//                           </span>
//                           {product.origin && (
//                             <span className="text-xs px-3 py-1 bg-green-100 text-green-800 rounded-full">
//                               {product.origin}
//                             </span>
//                           )}
//                         </div>

//                         <p className="text-gray-600 text-sm mb-4">
//                           {product.function || product.type || "High-quality toy for children"}
//                         </p>
//                       </div>

//                       <div className="flex flex-col items-start md:items-end gap-4">
//                         <span className="text-3xl font-bold bg-gradient-to-r from-[#F6339A] to-purple-600 bg-clip-text text-transparent">
//                           ৳{product.price_bdt}
//                         </span>
                        
//                         <div className="flex gap-2">
//                           <button
//                             onClick={() => handleViewDetails(product)}
//                             className="px-6 py-2.5 border-2 border-[#F6339A] text-[#F6339A] rounded-xl font-semibold hover:bg-blue-50 transition"
//                           >
//                             View Details
//                           </button>
//                           <button
//                             onClick={() => handleAddToCart(product)}
//                             className="px-6 py-2.5 bg-gradient-to-r from-[#F6339A] to-purple-600 text-white rounded-xl font-semibold hover:opacity-90 transition flex items-center gap-2"
//                           >
//                             <ShoppingCart size={18} />
//                             Add to Cart
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Product Modal */}
//       {selectedProduct && (
//         <ProductModal
//           product={selectedProduct}
//           onClose={() => setSelectedProduct(null)}
//         />
//       )}
//     </div>
//   );
// }
