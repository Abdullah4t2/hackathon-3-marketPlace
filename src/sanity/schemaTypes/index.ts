import { type SchemaTypeDefinition } from "sanity";
import { categorySchema } from "../categories";
import { productSchema } from "../products";
import order from "./order";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productSchema, categorySchema ,orderschema],
};
