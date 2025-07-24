import * as path from "path";
import * as fs from "fs/promises";
import esbuild from "esbuild";
import { run } from "runish";

const OUT_DIR = path.resolve("./out");
const RELEASE_DIR = path.join(OUT_DIR, "release");
const TSC = path.resolve("node_modules/typescript/bin/tsc");
const { RELEASE } = process.env;

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  if (RELEASE) {
    await fs.rm(RELEASE_DIR, { force: true, recursive: true });
    await fs.mkdir(RELEASE_DIR, { recursive: true });
  }

  await run(TSC, ["--noEmit"]);

  await fs.cp(
    "node_modules/magick-web/magick.js",
    path.join(OUT_DIR, "magick.wasm.js"),
  );

  const targetDir = RELEASE ? RELEASE_DIR : OUT_DIR;
  const workerBuild = await esbuild.build({
    entryPoints: ["src/worker.worker.ts"],
    outdir: OUT_DIR,
    bundle: true,
    write: false,
    format: "esm",
    target: "es2020",
    loader: { ".wasm": "file", ".wasm.js": "file" },
    minify: !!RELEASE,
    legalComments: "none",
  });
  for (const file of workerBuild.outputFiles) {
    const outDir = file.path.endsWith("worker.worker.js") ? OUT_DIR : targetDir;
    await fs.writeFile(
      path.join(outDir, path.basename(file.path)),
      file.contents,
    );
  }

  await esbuild.build({
    entryPoints: ["src/index.ts"].concat(RELEASE ? [] : ["tests/index.ts"]),
    outdir: targetDir,
    bundle: true,
    write: true,
    format: "esm",
    target: "es2020",
    minify: !!RELEASE,
    legalComments: "none",
    loader: { ".worker.js": "file" },
  });

  if (process.env.HANDLE) {
    await fs.cp("assets", RELEASE_DIR, { recursive: true });
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
