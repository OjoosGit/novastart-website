import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

const isDevelopment = process.env.NODE_ENV === 'development';

export default defineConfig({
  name: "default",
  title: "Novastart Website",

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || "o83md0uy",
  dataset: process.env.SANITY_STUDIO_DATASET || "production",

  plugins: [
    deskTool(),
    // Vision tool (GraphQL playground) alleen in development
    ...(isDevelopment ? [visionTool()] : []),
  ],

  schema: {
    types: schemaTypes,
  },
});

