import * as serdev from "serdev";

serdev.listen({
  headers: {
    "Cross-Origin-Opener-Policy": "same-origin",
    "Cross-Origin-Embedder-Policy": "require-corp",
  },
  components: {
    tests: {
      dir: ".",
      build: "node scripts/build.js",
      watch: ["src", "tests"],
    },
  },
  routes: {
    "/tests/index.html": "tests/index.html",
    "/assets/*rest": (x) => `assets/${x.rest}`,
    "/*rest": ["tests", (x) => `out/${x.rest}`],
  },
});
