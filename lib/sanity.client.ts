import { createClient, type SanityClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

// Helper to check if Sanity is configured
export const isSanityConfigured = () => !!projectId;

// Only create client if projectId is available
let clientInstance: SanityClient | null = null;

if (projectId) {
  clientInstance = createClient({
    projectId,
    dataset,
    apiVersion: "2024-01-01",
    // Disable CDN for instant content updates from Sanity Studio
    // useCdn: true would cache content for better performance but slower updates
    useCdn: false,
    token: process.env.SANITY_API_READ_TOKEN,
  });
} else {
  console.warn("NEXT_PUBLIC_SANITY_PROJECT_ID is not set. Sanity client will not be available.");
}

// Export a dummy client that throws helpful errors if not configured
export const client = clientInstance || {
  fetch: async () => {
    throw new Error("Sanity client is not configured. Please set NEXT_PUBLIC_SANITY_PROJECT_ID environment variable.");
  },
  config: () => ({ projectId: "", dataset: "" }),
} as unknown as SanityClient;

