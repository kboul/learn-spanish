import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  try {
    // Delete all existing words (optional)
    await prisma.word.deleteMany({});

    // Get the absolute path to words.json
    const filePath = path.join(__dirname, "words.json");

    // Read and parse JSON file
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    // Check if data is an array
    if (!Array.isArray(data.words)) {
      throw new Error("❌ Invalid JSON format: Expected an array.");
    }

    // Ensure every entry has the required fields
    const words = (data as any).words.map((word: any, index: number) => {
      if (!word.spanish || !word.english || !word.greek) {
        console.error(`❌ Missing required fields in entry ${index}:`, word);
        throw new Error(`Entry at index ${index} is missing required fields.`);
      }

      return {
        ...word,
        learned: word.learned ?? false // Ensure 'learned' is present
      };
    });

    console.log("✅ Processed words:", words);

    // Insert into the database
    await prisma.word.createMany({
      data: words,
      skipDuplicates: true
    });

    console.log("✅ Words successfully inserted!");
  } catch (error) {
    console.error("❌ Error inserting words:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the function
main();
