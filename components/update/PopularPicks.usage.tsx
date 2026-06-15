"use client";

import React, { useState, useEffect } from "react";
import { Product } from "./Product";
import PopularPicks from "./Product";
import { useCart } from "@/context/CartContext";
import { useCartSidebar } from "@/context/CartSidebarContext";
import { fetchProducts } from "@/lib/api";

const products: Product[] = [
  {
    id: 1,
    product_name: "Fishing Toys for Infants and Children, Magnetic Suction, Montessori Educational",
    brand: "Child Jupiter",
    material: "Wooden",
    age_range: "3-6 years old",
    origin: "Hunan province",
    price_bdt: 550,
    product_image: "/Product/p1.jpg",
    features: { contents: "20 magnetic fish + 2 fishing rods", packaging: "Storage bucket" },
  },
  {
    id: 2,
    product_name: "Children's Inertia Car Toy Suit - Mini Drop-Resistant",
    brand: null,
    material: "Plastic",
    age_range: "4-6 years",
    origin: "Hunan province",
    price_bdt: 150,
    product_image: "/Product/p2.jpg",
    dimensions: "5.9*7.7*6.9cm",
    mechanism: "Inertia",
  },
  {
    id: 3,
    product_name: "Children's Mini Inertial Engineering Truck Suit",
    types: ["Excavator", "Cement truck", "Fire truck", "Sanitation truck"],
    material: "Plastic",
    age_range: "2-4 years",
    origin: "Hunan province",
    price_bdt: 100,
    product_image: "/Product/p3.webp",
    dimensions: "13*4.7*6cm",
  },
  {
    id: 4,
    product_name: "Cartoon Fall-Resistant Inertia Ice Cream Car",
    material: "Plastic",
    age_range: "3-5 years",
    origin: "Hunan province",
    price_bdt: 180,
    product_image: "/Product/p4.webp",
    dimensions: "12.5*5*6CM",
  },
  {
    id: 5,
    product_name: "Minions Plush Toy (Bob, Stuart, Kevin)",
    material: "PP Cotton",
    age_range: "7-14 years old",
    type: "Stuffed doll",
    price_bdt: 600,
    product_image: "/Product/p5.webp",
    size_range: "30cm - 65cm",
  },
  {
    id: 6,
    product_name: "Minions Early Education Story Machine",
    function: "Rechargeable, Early education/preschool stories",
    material: "PP Cotton",
    age_range: "7-14 years old",
    color_variant: "Full English 224 + Cat Blue",
    price_bdt: 550,
    product_image: "/Product/p6.webp",
    size_range: "30cm - 65cm",
  },
  {
    id: 7,
    product_name: "Tiktok Hot Pig Power Air Balloon Car",
    function: "Aerodynamic sliding/flying",
    material: "Plastic",
    age_range: "4-6 years old",
    price_bdt: 750,
    product_image: "/Product/p7.webp",
    size: "30cm - 65cm",
  },
  {
    id: 8,
    product_name: "Cartoon Sanrio Plush Handbag & Coin Purse (Cinnamoroll/Kuromi)",
    function: "Plush peripheral / Crossbody bag",
    material: "Polyester fiber",
    age_range: "4-6 years old",
    price_bdt: 250,
    product_image: "/Product/p8.webp",
    size: "30cm - 65cm",
  },
  {
    id: 9,
    product_name: "Small Airplane Press-and-Go Inertia Scooter",
    function: "Inertia movement",
    material: "Plastic",
    age_range: "4-6 years old",
    color: "Blue",
    price_bdt: 120,
    product_image: "/Product/p9.webp",
    size: "15cm",
  },
  {
    id: 10,
    product_name: "Children's Water Painting/Coloring Book - Dinosaur Theme",
    type: "Educational Watercolor Toy",
    material: "Paper/Plastic",
    age_range: "4-6 years old",
    price_bdt: 240,
    product_image: "/Product/p10.jpg",
    size: "15cm",
  },
];

export default function PopularPicksPage() {
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

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    openCart();
  };

  return (
    <main className=" bg-white">
      <PopularPicks products={fetchedProducts} onAddToCart={handleAddToCart} />
    </main>
  );
}


// "use client";

// import { Product } from "@/lib/products";
// import PopularPicks from "./Product";
// import { useState } from "react";
// import CheckoutPage from "./checkout-page";

 

// // Example usage in a Next.js page or parent component:

// const products: Product[] = [
//   {
//     id: 1,
//     product_name: "Fishing Toys for Infants and Children, Magnetic Suction, Montessori Educational",
//     brand: "Child Jupiter",
//     material: "Wooden",
//     age_range: "3-6 years old",
//     origin: "Hunan province",
//     price_bdt: 550,
//     product_image: "/Product/p1.jpg",
//     features: {
//       contents: "20 magnetic fish + 2 fishing rods",
//       packaging: "Storage bucket"
//     }
//   },
//   {
//     id: 2,
//     product_name: "Children's Inertia Car Toy Suit - Mini Drop-Resistant",
//     brand: null,
//     material: "Plastic",
//     age_range: "4-6 years",
//     origin: "Hunan province",
//     price_bdt: 150,
//     product_image: "/Product/p2.jpg",
//     dimensions: "5.9*7.7*6.9cm",
//     mechanism: "Inertia"
//   },
//   {
//     id: 3,
//     product_name: "Children's Mini Inertial Engineering Truck Suit",
//     types: ["Excavator", "Cement truck", "Fire truck", "Sanitation truck"],
//     material: "Plastic",
//     age_range: "2-4 years",
//     origin: "Hunan province",
//     price_bdt: 100,
//     product_image: "/Product/p3.webp",
//     dimensions: "13*4.7*6cm"
//   },
//   {
//     id: 4,
//     product_name: "Cartoon Fall-Resistant Inertia Ice Cream Car",
//     material: "Plastic",
//     age_range: "3-5 years",
//     origin: "Hunan province",
//     price_bdt: 180,
//     product_image: "/Product/p4.webp",
//     dimensions: "12.5*5*6CM"
//   },
//   {
//     id: 5,
//     product_name: "Minions Plush Toy (Bob, Stuart, Kevin)",
//     material: "PP Cotton",
//     age_range: "7-14 years old",
//     type: "Stuffed doll",
//     price_bdt: 600,
//     product_image: "/Product/p5.webp",
//     size_range: "30cm - 65cm"
//   },
//   {
//     id: 6,
//     product_name: "Minions Early Education Story Machine",
//     function: "Rechargeable, Early education/preschool stories",
//     material: "PP Cotton",
//     age_range: "7-14 years old",
//     color_variant: "Full English 224 + Cat Blue",
//     price_bdt: 550,
//     product_image: "/Product/p6.webp",
//     size_range: "30cm - 65cm"
//   },
//   {
//     id: 7,
//     product_name: "Tiktok Hot Pig Power Air Balloon Car",
//     function: "Aerodynamic sliding/flying",
//     material: "Plastic",
//     age_range: "4-6 years old",
//     price_bdt: 750,
//     product_image: "/Product/p7.webp",
//     size: "30cm - 65cm"
//   },
//   {
//     id: 8,
//     product_name: "Cartoon Sanrio Plush Handbag & Coin Purse (Cinnamoroll/Kuromi)",
//     function: "Plush peripheral / Crossbody bag",
//     material: "Polyester fiber",
//     age_range: "4-6 years old",
//     price_bdt: 250,
//     product_image: "/Product/p8.webp",
//     size: "30cm - 65cm"
//   },
//   {
//     id: 9,
//     product_name: "Small Airplane Press-and-Go Inertia Scooter",
//     function: "Inertia movement",
//     material: "Plastic",
//     age_range: "4-6 years old",
//     color: "Blue",
//     price_bdt: 120,
//     product_image: "/Product/p9.webp",
//     size: "15cm"
//   },
//   {
//     id: 10,
//     product_name: "Children's Water Painting/Coloring Book - Dinosaur Theme",
//     type: "Educational Watercolor Toy",
//     material: "Paper/Plastic",
//     age_range: "4-6 years old",
//     price_bdt: 240,
//     product_image: "/Product/p10.jpg",
//     size: "15cm"
//   }
// ];

// export default function PopularPicksPage() {
//       const [cartItems, setCartItems] = useState([]);

//   const handleAddToCart = ( ) => {
//     // // This logic is also inside CheckoutPage, or you can lift state up
//     // setCartItems(prev => {
//     //   const existing = prev.find(item => item.id === product.id);
//     //   if (existing) {
//     //     return prev.map(item => 
//     //       item.id === product.id ? { ...item    , quantity: item.quantity + 1 } : item
//     //     );
//     //   }
//     //   return [...prev, { ...product, quantity: 1 }];
//     // });
//   };


//   return (
//     <main className="min-h-screen bg-white">
//       <PopularPicks products={products} onAddToCart={handleAddToCart} />
//       <CheckoutPage initialCartItems={cartItems} />
//     </main>
//   );
// }