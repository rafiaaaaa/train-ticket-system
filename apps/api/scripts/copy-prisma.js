import { cp } from "fs/promises";

async function main() {
  try {
    await cp("prisma", "dist/prisma", { recursive: true });
    console.log("Prisma folder copied to dist/");
  } catch (err) {
    console.error("Failed to copy prisma folder:", err);
    process.exit(1);
  }
}

main();
