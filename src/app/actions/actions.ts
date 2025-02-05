import { Product } from "@/sanity/schemaTypes/types/profetch";

export const addToCart = (product: Product) => {
    // Retrieve the cart from localStorage or initialize it as an empty array
    const cart: Product[] = JSON.parse(localStorage.getItem("cart") || "[]");

    // Check if the product already exists in the cart
    const existingProductIndex = cart.findIndex((item) => item._id === product._id);

    if (existingProductIndex > -1) {
        // If the product exists, increase its inventory count
        cart[existingProductIndex].inventory += 1;
    } else {
        // If the product does not exist, add it to the cart with inventory = 1
        cart.push({ ...product, inventory: 1 });
    }

    // Update the cart in localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
};

export const addCategoryToCart = (products: Product[]) => {
    // Retrieve the cart from localStorage or initialize it as an empty array
    const cart: Product[] = JSON.parse(localStorage.getItem("cart") || "[]");

    products.forEach((product) => {
        // Check if the product already exists in the cart
        const existingProductIndex = cart.findIndex((item) => item._id === product._id);

        if (existingProductIndex > -1) {
            // If the product exists, increase its inventory count
            cart[existingProductIndex].inventory += 1;
        } else {
            // If the product does not exist, add it to the cart with inventory = 1
            cart.push({ ...product, inventory: 1 });
        }
    });

    // Update the cart in localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
};

export const removeFromCart = (productId: string) => {
    // Retrieve the cart from localStorage or initialize it as an empty array
    let cart: Product[] = JSON.parse(localStorage.getItem("cart") || "[]");

    // Remove the product with the matching productId
    cart = cart.filter((item) => item._id !== productId);

    // Update the cart in localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
};

export const updateCartQuantity = (productId: string, quantity: number) => {
    // Retrieve the cart from localStorage or initialize it as an empty array
    const cart: Product[] = JSON.parse(localStorage.getItem("cart") || "[]");

    // Find the index of the product to update
    const productIndex = cart.findIndex((item) => item._id === productId);

    if (productIndex > -1) {
        // Update the inventory count for the product
        cart[productIndex].inventory = quantity;

        // Update the cart in localStorage
        localStorage.setItem("cart", JSON.stringify(cart));
    }
};

export const getCartItems = (): Product[] => {
    // Retrieve the cart from localStorage or return an empty array
    return JSON.parse(localStorage.getItem("cart") || "[]");
};

