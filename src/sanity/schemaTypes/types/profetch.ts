import { createClient, groq } from "next-sanity";

// Sanity client configuration
const sanityClient = createClient({
  projectId: "i22sh9w2", // Replace with your Sanity project ID
  dataset: "production", // Replace with your dataset name
  apiVersion: "2023-01-01", // Use your API version
  useCdn: false, // Set to true in production
});

// Query to fetch all products (product details, including image URL)
export const fetchProductsQuery = groq`
  *[_type == "products"]{
    _id,
    title,
    price,
    priceWithoutDiscount,
    badge,
    "image": image.asset->url,  // Fetch image URL for the product
    "category": category[]->{
      _id,
      title
    },
    description,
    inventory,
    tags
  }
`;

// Query to fetch all categories (category details, including image asset)
export const fetchCategoriesQuery = groq`
  *[_type == "categories"]{
    _id,
    title,
    "image": image.asset->url  // Fetch only the URL of the category image
  }
`;

// Query to fetch a single category by its ID, along with the products in that category
export const fetchCategoryByIdQuery = groq`
  *[_type == "categories" && _id == $id][0] {
    _id,
    title,
    "image": image.asset->url,  // Fetch the URL of the category image
    "products": *[_type == "products" && references(^._id)] {
      _id,
      title,
      price,
      priceWithoutDiscount,
      badge,
      "image": image.asset->url,  // Fetch image URL for the product
      description,
      inventory,
      tags
    }
  }
`;

// Function to fetch all data using the combined query (both products and categories)
export async function fetchAllData() {
  return sanityClient.fetch(fetchProductsQuery);
}

// Function to fetch only products
export async function fetchProducts() {
  return sanityClient.fetch(fetchProductsQuery);
}

// Function to fetch only categories
export async function fetchCategories() {
  return sanityClient.fetch(fetchCategoriesQuery);
}

// Function to fetch a category by its ID, along with the products in that category
export async function fetchCategoryById(id: string) {
  return sanityClient.fetch(fetchCategoryByIdQuery, { id });
}

// Interfaces for TypeScript
export interface Category {
  _id: string;
  title: string;
  image: string; // Now stores only the image URL
}

export interface Product {
  discountedPrice: number;
  name: string;
  quantity: number;
  product: any;
  sku: any;
  _id: string;
  title: string;
  price: number;
  priceWithoutDiscount?: number;
  badge?: string;
  image: string; // Now directly stores the image URL
  description: string;
  inventory: number;
  tags: string[];
  category: { _id: string; title: string }[]; // Updated to an array of categories
}
