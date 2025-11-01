import { createClient, type SanityClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = "2024-01-01";

// Helper to check if Sanity is configured
export const isSanityConfigured = () => !!projectId;

/**
 * Publieke Sanity Client - ZONDER token
 * Gebruik dit voor client-side queries en publieke data
 */
export const publicClient: SanityClient = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true, // CDN voor publieke data (sneller)
      perspective: 'published', // Alleen gepubliceerde content
      // GEEN token - veilig voor client-side gebruik
    })
  : ({
      fetch: async () => {
        throw new Error("Sanity client is not configured. Please set NEXT_PUBLIC_SANITY_PROJECT_ID environment variable.");
      },
      config: () => ({ projectId: "", dataset: "" }),
    } as unknown as SanityClient);

/**
 * Server Sanity Client - MET token
 * Gebruik dit ALLEEN in server components, API routes, of getServerSideProps
 * NOOIT in client components!
 */
export const serverClient: SanityClient = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false, // Geen CDN voor server-side (real-time updates)
      token: process.env.SANITY_API_READ_TOKEN, // Token ALLEEN server-side
      perspective: 'published',
    })
  : ({
      fetch: async () => {
        throw new Error("Sanity client is not configured. Please set NEXT_PUBLIC_SANITY_PROJECT_ID environment variable.");
      },
      config: () => ({ projectId: "", dataset: "" }),
    } as unknown as SanityClient);

// Default export voor backwards compatibility (gebruikt publieke client)
export const client = publicClient;

// Log waarschuwing als projectId niet is ingesteld
if (!projectId && process.env.NODE_ENV !== 'production') {
  console.warn("⚠️  NEXT_PUBLIC_SANITY_PROJECT_ID is not set. Sanity client will not be available.");
}

