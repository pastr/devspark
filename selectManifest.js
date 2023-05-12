import fs from "fs";

const manifest = "./dist/manifest.json";
const manifestV2 = "./dist/manifestV2.json";
const manifestV3 = "./dist/manifestV3.json";
const selectedManifest = process.env.CHROMIUM ? manifestV3 : manifestV2;

// Read the contents of manifestV2
fs.readFile(selectedManifest, "utf8", (err, data) => {
  if (err) throw err;

  // Write the contents of selectedManifest to manifest
  fs.writeFile(manifest, data, "utf8", (err) => {
    if (err) throw err;

    // Delete manifestV2
    fs.unlink(manifestV2, (err) => {
      if (err) throw err;
    });
    // Delete manifestV3
    fs.unlink(manifestV3, (err) => {
      if (err) throw err;
    });
  });
});