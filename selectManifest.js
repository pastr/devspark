import fs from "fs/promises";
import path from 'path';

const manifestV2 = "./manifests/manifestV2.json";
const manifestV3 = "./manifests/manifestV3.json";
const packageJSONPath = "./package.json";  // Assuming package.json is in root directory of your project
const selectedManifest = process.env.CHROMIUM ? manifestV3 : manifestV2;
const newManifest = "./dist/manifest.json";

async function main() {
  try {
    // Read version from package.json
    const packageJSON = JSON.parse(await fs.readFile(packageJSONPath, 'utf8'));
    const version = packageJSON.version;

    // Read selected manifest
    const manifestData = JSON.parse(await fs.readFile(selectedManifest, 'utf8'));

    // Update version in the manifest
    manifestData.version = version;

    // Write updated manifest
    await fs.rm('./dist', { recursive: true, force: true });

    const directory = path.dirname(newManifest);
    await fs.mkdir(directory, { recursive: true });

    await fs.writeFile(newManifest, JSON.stringify(manifestData, null, 4), 'utf8');  // Formatted with 4 spaces indentation
    console.log('Manifest created successfully with version:', version);
  } catch (err) {
    console.error(err);
  }
}

main();
