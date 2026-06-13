export interface Product {
  id: number;
  product_name: string;
  brand?: string | null;
  material: string;
  age_range: string;
  origin?: string;
  price_bdt: number;
  product_image: string;
  features?: {
    contents?: string;
    packaging?: string;
  };
  dimensions?: string;
  mechanism?: string;
  types?: string[];
  type?: string;
  function?: string;
  color_variant?: string;
  color?: string;
  size_range?: string;
  size?: string;
}

export const products: Product[] = [
  {
    id: 1,
    product_name: "Fishing Toys for Infants and Children, Magnetic Suction, Montessori Educational",
    brand: "Child Jupiter",
    material: "Wooden",
    age_range: "3-6 years old",
    origin: "Hunan province",
    price_bdt: 550,
    product_image: "/Product/p1.jpg",
    features: {
      contents: "20 magnetic fish + 2 fishing rods",
      packaging: "Storage bucket"
    }
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
    mechanism: "Inertia"
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
    dimensions: "13*4.7*6cm"
  },
  {
    id: 4,
    product_name: "Cartoon Fall-Resistant Inertia Ice Cream Car",
    material: "Plastic",
    age_range: "3-5 years",
    origin: "Hunan province",
    price_bdt: 180,
    product_image: "/Product/p4.webp",
    dimensions: "12.5*5*6CM"
  },
  {
    id: 5,
    product_name: "Minions Plush Toy (Bob, Stuart, Kevin)",
    material: "PP Cotton",
    age_range: "7-14 years old",
    type: "Stuffed doll",
    price_bdt: 600,
    product_image: "/Product/p5.webp",
    size_range: "30cm - 65cm"
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
    size_range: "30cm - 65cm"
  },
  {
    id: 7,
    product_name: "Tiktok Hot Pig Power Air Balloon Car",
    function: "Aerodynamic sliding/flying",
    material: "Plastic",
    age_range: "4-6 years old",
    price_bdt: 750,
    product_image: "/Product/p7.webp",
    size: "30cm - 65cm"
  },
  {
    id: 8,
    product_name: "Cartoon Sanrio Plush Handbag & Coin Purse (Cinnamoroll/Kuromi)",
    function: "Plush peripheral / Crossbody bag",
    material: "Polyester fiber",
    age_range: "4-6 years old",
    price_bdt: 250,
    product_image: "/Product/p8.webp",
    size: "30cm - 65cm"
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
    size: "15cm"
  },
  {
    id: 10,
    product_name: "Children's Water Painting/Coloring Book - Dinosaur Theme",
    type: "Educational Watercolor Toy",
    material: "Paper/Plastic",
    age_range: "4-6 years old",
    price_bdt: 240,
    product_image: "/Product/p10.jpg",
    size: "15cm"
  }
];
