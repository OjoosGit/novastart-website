import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "default",
  title: "Novastart Website",

  projectId: "o83md0uy",
  dataset: "production",

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
});

