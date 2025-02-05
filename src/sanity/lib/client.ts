import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // ❌ No CDN for mutations
  token: process.env.NEXT_PUBLIC_SANITY_AUTH_TOKEN, // ✅ Secure token
});
