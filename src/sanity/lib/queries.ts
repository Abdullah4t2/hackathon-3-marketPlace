import { createClient, groq } from "next-sanity";

// Sanity client configuration
export const sanityClient = createClient({
  projectId: "i22sh9w2", // Replace with your Sanity project ID
  dataset: "production", // Replace with your dataset name
  apiVersion: "2023-01-01", // Use your API version
  useCdn: false, // Set to true in production
});

// Query to fetch all products
export const fetchProductsQuery = groq`
  *[_type == "products"]{
    _id,
    title,
    price,
    priceWithoutDiscount,
    badge,
    "image": image.asset->url,
    "category": category->title,
    description,
    inventory,
    tags
  }
`;

// Query to fetch all categories
export const fetchCategoriesQuery = groq`
  *[_type == "categories"]{
    _id,
    title,
    "image": image.asset->url,
    description
  }
`;

// Query to fetch a single category and its associated products
export const fetchCategoryWithProductsQuery = groq`
  *[_type == "categories" && _id == $id][0] {
    _id,
    title,
    "image": image.asset->url,
    description,
    "products": *[_type == "products" && references(^._id)] {
      _id,
      title,
      price,
      "image": image.asset->url,
      description,
      inventory
    }
  }
`;

// Query to fetch a single product by its ID
export const fetchProductByIdQuery = groq`
  *[_type == "products" && _id == $id][0] {
    _id,
    title,
    price,
    priceWithoutDiscount,
    badge,
    "image": image.asset->url,
    "category": category->title,
    description,
    inventory,
    tags
  }
`;

// Function to fetch all products
export async function fetchProducts() {
  return sanityClient.fetch(fetchProductsQuery);
}

// Function to fetch all categories
export async function fetchCategories() {
  return sanityClient.fetch(fetchCategoriesQuery);
}

// Function to fetch a single category with its products
export async function fetchCategoryWithProducts(id: string) {
  return sanityClient.fetch(fetchCategoryWithProductsQuery, { id });
}

// Function to fetch a single product by its ID
export async function fetchProductById(id: string) {
  return sanityClient.fetch(fetchProductByIdQuery, { id });
}
