import * as path from "path";
import * as fs from "fs/promises";
import { run } from "runish";

const OUT_DIR = path.resolve("./out");
const RELEASE_DIR = path.join(OUT_DIR, "release");
const { LIVE } = process.env;

async function main() {
  for (const filePath of ["package.json", "README.md", "API.md", "LICENSE"]) {
    await fs.cp(filePath, path.join(RELEASE_DIR, path.basename(filePath)));
  }

  const otp = process.argv.find((x) => x.startsWith("--otp="));
  await run(
    "npm",
    ["publish", "--access=public", ...(LIVE ? [otp] : ["--dry-run"])],
    { cwd: RELEASE_DIR },
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
