import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

import { build } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isWatchMode = process.argv.includes("--watch");
const isDevelopmentMode = process.argv.includes("--mode") && process.argv[process.argv.indexOf("--mode") + 1] === "development";
const isMinify = process.argv.includes("--minify") && process.argv[process.argv.indexOf("--minify") + 1] === "false";
const isSourcemap = process.argv.includes("--sourcemap");

async function buildProject(input) {
  await build({
    build: {
      minify: !isMinify,
      sourcemap: isSourcemap,
      outDir: resolve(__dirname, "../../dist"),
      rollupOptions: {
        input,
        output: {
          entryFileNames: (chunkInfo) => `content.${chunkInfo.name}.js`,
          format: "iife"
        }
      },
      watch: isWatchMode ? { include: "src/**" } : undefined,
      mode: isDevelopmentMode ? "development" : "production"
    }
  });
}

// Browsers don't support es modules yet. So we need to use iife format.
// and since multiple entry and output for iife are not possible, we need to build each parts separately.
(async () => {
  await buildProject({ jira: resolve(__dirname, "./src/jira/jira.ts") });
  await buildProject({ github: resolve(__dirname, "./src/github/github.ts") });
  await buildProject({ allHosts: resolve(__dirname, "./src/all-hosts/allHosts.ts") });
})();
