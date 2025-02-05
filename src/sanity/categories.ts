import { defineType } from "sanity";
import { defineField } from "sanity";

export const categorySchema = defineType({
  name: "categories",
  title: "Categories",
  type: "document",
  fields: [
    { name: "title", title: "Category Title", type: "string" },
    { name: "image", title: "Category Image", type: "image" },
    {
      name: "products",
      title: "Products",
      type: "array",
      of: [{ type: "reference", to: [{ type: "products" }] }],
    },
  ],
});
