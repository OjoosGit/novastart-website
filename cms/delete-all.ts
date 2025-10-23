/**
 * Script om ALLE content uit Sanity te verwijderen
 * 
 * WAARSCHUWING: Dit kan niet ongedaan gemaakt worden!
 * 
 * Run: npx tsx cms/delete-all.ts
 */

import { createClient } from "@sanity/client";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

async function deleteAll() {
  console.log("🗑️  Alle content wordt verwijderd...");
  console.log("⚠️  Dit kan niet ongedaan gemaakt worden!\n");

  try {
    // Haal alleen content document IDs op (geen systeem documenten)
    const query = `*[!(_id in path("_.**"))]._id`;
    const ids = await client.fetch(query);
    
    console.log(`📊 Gevonden: ${ids.length} documenten\n`);

    if (ids.length === 0) {
      console.log("✅ Database is al leeg!");
      return;
    }

    // Verwijder documenten in batches
    let deleted = 0;
    for (const id of ids) {
      try {
        await client.delete(id);
        deleted++;
        console.log(`✓ Verwijderd: ${id}`);
      } catch (error: any) {
        if (error.statusCode === 403 || error.statusCode === 404) {
          console.log(`⚠️  Overgeslagen: ${id} (geen toegang of niet gevonden)`);
        } else {
          console.error(`❌ Fout bij ${id}:`, error.message);
        }
      }
    }

    console.log(`\n🎉 Klaar! ${deleted} documenten verwijderd.`);
  } catch (error) {
    console.error("❌ Fout bij verwijderen:", error);
    process.exit(1);
  }
}

deleteAll();

