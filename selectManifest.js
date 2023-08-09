import fs from "fs";

const manifestV2 = "./manifests/manifestV2.json";
const manifestV3 = "./manifests/manifestV3.json";
const selectedManifest = process.env.CHROMIUM ? manifestV3 : manifestV2;
const newManifest = "./dist/manifest.json";

// Read the contents of selectedManifest
fs.readFile(selectedManifest, "utf8", (err, data) => {
  if (err) throw err;

  // Write the contents of selectedManifest to manifest.json
  fs.writeFile(newManifest, data, "utf8", (err) => {
    if (err) throw err;
  });
});
