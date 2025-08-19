import { readPreviousData } from "./csvReader.js";

// Test the CSV reader
console.log("Testing CSV reader...");
const data = readPreviousData();
console.log(`Loaded ${data.length} members from CSV`);

if (data.length > 0) {
  console.log("Sample member:", data[0]);
}
