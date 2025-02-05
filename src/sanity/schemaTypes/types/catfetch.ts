export interface Category {
  _id: string;
  title: string;
  image: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
  description: string;
  products: Product[]; // Array of Product objects
}

export interface Product {
  inventory: number;
  _id: string;
  title: string;
  description: string;
  price: number;
  image: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
  category: Category | Category[]; // Category can be either a single object or an array
}
