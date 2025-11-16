import { Pinecone } from "@pinecone-database/pinecone";
import { promises as fs } from "fs"; // Used for reading the file
import "dotenv/config"; // Loads environment variables

// --- 1. CONFIGURE API KEYS AND URLS ---
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const EMBED_URL = `https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key=${GEMINI_API_KEY}`;

if (!GEMINI_API_KEY || !process.env.PINECONE_API_KEY) {
  throw new Error("API keys for Gemini or Pinecone are not set in .env file.");
}

// --- 2. EMBEDDING FUNCTION ---
// (This is the same function from our API route)
async function getEmbedding(text: string) {
  const response = await fetch(EMBED_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "models/text-embedding-004",
      content: { parts: [{ text }] },
    }),
  });
  if (!response.ok) {
    throw new Error(`Failed to get embedding. Status: ${response.status}`);
  }
  const data = await response.json();
  return data.embedding.values as number[];
}

// --- 3. MAIN SEEDING LOGIC ---
// --- 3. MAIN SEEDING LOGIC (Corrected Version) ---
async function main() {
    console.log("🌱 Starting the seeding process...");
  
    // Connect to Pinecone
    const pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!,
    });
  
    const indexName = "portfolio-ai-memory"; // Your index name
    
    // Try to access the index directly - if it doesn't exist, create it
    let index;
    try {
      index = pinecone.index(indexName);
      // Test if index is accessible
      await index.describeIndexStats();
      console.log(`✅ Index '${indexName}' exists and is accessible.`);
    } catch (error) {
      console.log(`📝 Creating index '${indexName}'...`);
      await pinecone.createIndex({
        name: indexName,
        spec: {
          serverless: {
            cloud: 'aws',
            region: 'us-east-1'
          }
        },
        dimension: 768, // Gemini text-embedding-004 dimension
        metric: 'cosine'
      });
      console.log(`✅ Index '${indexName}' created successfully.`);
      
      // Wait a bit for index to be ready
      console.log("⏳ Waiting for index to be ready...");
      await new Promise(resolve => setTimeout(resolve, 10000));
      
      index = pinecone.index(indexName);
    }
    
    // Clear existing vectors from the index to start fresh
    console.log(`🗑️ Clearing existing data from the '${indexName}' index...`);
    try {
      await index.deleteAll();
      console.log("✅ Index cleared.");
    } catch (error) {
      console.log("ℹ️ Index is empty or couldn't be cleared, continuing...");
    }
  
    // Read the knowledge base file
    console.log("📖 Reading knowledge.json...");
    const knowledgeFile = await fs.readFile("knowledge.json", "utf-8");
    const chunks: { content: string }[] = JSON.parse(knowledgeFile);
    console.log(`🧠 Found ${chunks.length} knowledge chunks.`);
  
    // Loop through each chunk, create an embedding, and upload it
    // CORRECTED LOOP: changed i <= to i <
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      console.log(`⚡ Processing chunk ${i + 1} of ${chunks.length}...`);
  
      const embedding = await getEmbedding(chunk.content);
  
      await index.upsert([
        {
          id: `knowledge-${i}`, // Create a unique ID for each chunk
          values: embedding,
          metadata: {
            text: chunk.content, // Store the original text in metadata
          },
        },
      ]);
    }
    
    // MOVED SUCCESS MESSAGE: Now appears once at the very end
    console.log(
      "\n🎉 Seeding complete! Your AI is now pre-loaded with your professional knowledge."
    );
  }
// Run the main function and handle any errors
main().catch((error) => {
  console.error("🔴 An error occurred during seeding:", error);
});
