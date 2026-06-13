import { Product } from "./products";

// Interface for the MongoDB API Response structure
export interface ApiProduct {
  _id: string;
  productId: string;
  name: string;
  slug: string;
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
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  isFreeShipping: boolean;
  ratings: {
    average: number;
    count: number;
  };
  isActive: boolean;
  isFeatured: boolean;
  isNewArrival: boolean;
  variants: any[];
  reviews: any[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Parses the product description containing key-value pairs separated by fields.
 * Example description:
 * "Material: Wooden. Age Range: 3-6 years old. Origin: Hunan province. Features: 20 magnetic fish + 2 fishing rods, Packaging: Storage bucket."
 */
export const parseDescription = (desc: string): Record<string, string> => {
  const fields = [
    "Material", "Age Range", "Origin", "Features", "Packaging", 
    "Mechanism", "Types", "Type", "Size Range", "Size", 
    "Function", "Color Variant", "Color"
  ];
  
  const result: Record<string, string> = {};
  if (!desc) return result;
  
  // Find matches for "FieldName:" and extract text until the next "FieldName:"
  const regexPattern = new RegExp(`(${fields.join("|")}):`, "g");
  
  const matches: { field: string; index: number }[] = [];
  let match;
  while ((match = regexPattern.exec(desc)) !== null) {
    matches.push({
      field: match[1],
      index: match.index
    });
  }
  
  for (let i = 0; i < matches.length; i++) {
    const current = matches[i];
    const start = current.index + current.field.length + 1; // skip "Field:"
    const end = (i + 1 < matches.length) ? matches[i + 1].index : desc.length;
    
    let val = desc.substring(start, end).trim();
    // Remove trailing period or semicolon
    if (val.endsWith(".") || val.endsWith(";") || val.endsWith(",")) {
      val = val.substring(0, val.length - 1).trim();
    }
    result[current.field] = val;
  }
  
  return result;
};

/**
 * Maps API Product to frontend expected Product type.
 */
export const mapApiProductToProduct = (apiProduct: ApiProduct): Product => {
  const parsedDesc = parseDescription(apiProduct.description);

  // Map features contents & packaging
  const featuresObj: { contents?: string; packaging?: string; [key: string]: string | undefined } = {};
  if (parsedDesc["Features"]) featuresObj.contents = parsedDesc["Features"];
  if (parsedDesc["Packaging"]) featuresObj.packaging = parsedDesc["Packaging"];

  // Types array
  let typesArr: string[] | undefined = undefined;
  if (parsedDesc["Types"]) {
    typesArr = parsedDesc["Types"].split(",").map((t) => t.trim());
  }

  // Dimensions string format length*width*height or similar if dimensions are in api
  let dimStr: string | undefined = undefined;
  if (apiProduct.dimensions && (apiProduct.dimensions.length || apiProduct.dimensions.width || apiProduct.dimensions.height)) {
    dimStr = `${apiProduct.dimensions.length}*${apiProduct.dimensions.width}*${apiProduct.dimensions.height}cm`;
  }

  // Parse ID from KV-XXXXX
  const matchId = apiProduct.productId ? apiProduct.productId.match(/\d+/) : null;
  const numericId = matchId ? parseInt(matchId[0], 10) : Math.floor(Math.random() * 1000000);

  return {
    id: numericId,
    product_name: apiProduct.name,
    brand: apiProduct.brand === "Generic" ? null : apiProduct.brand,
    material: parsedDesc["Material"] || "Plastic",
    age_range: parsedDesc["Age Range"] || "3+ years",
    origin: parsedDesc["Origin"] || "Imported",
    price_bdt: apiProduct.price,
    product_image: apiProduct.thumbnail || (apiProduct.images && apiProduct.images[0]) || "",
    features: Object.keys(featuresObj).length > 0 ? featuresObj : undefined,
    dimensions: dimStr || parsedDesc["Dimensions"],
    mechanism: parsedDesc["Mechanism"],
    types: typesArr,
    type: parsedDesc["Type"],
    size_range: parsedDesc["Size Range"],
    size: parsedDesc["Size"],
    function: parsedDesc["Function"],
    color_variant: parsedDesc["Color Variant"],
    color: parsedDesc["Color"]
  };
};

/**
 * Fetches products from the API. If API fails, falls back to the provided fallback dataset.
 */
export const fetchProducts = async (fallbackData: Product[]): Promise<Product[]> => {
  const url = process.env.NEXT_PUBLIC_API_URL 
    ? `${process.env.NEXT_PUBLIC_API_URL}/products`
    : "http://165.101.214.108:5000/api/products";

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API returned status ${response.status}`);
    }

    const data = await response.json();
    if (data && data.success && Array.isArray(data.data)) {
      return data.data.map(mapApiProductToProduct);
    } else if (Array.isArray(data)) {
      return data.map(mapApiProductToProduct);
    }
    throw new Error("Invalid API response format");
  } catch (error) {
    console.error("Failed to fetch products from API, using fallback data:", error);
    return fallbackData;
  }
};