import fs from "fs/promises";
import path from 'path';

const manifestV2 = "./manifests/manifestV2.json";
const manifestV3 = "./manifests/manifestV3.json";
const selectedManifest = process.env.CHROMIUM ? manifestV3 : manifestV2;
const newManifest = "./dist/manifest.json";

async function main() {
  try {
    await fs.rm('./dist', { recursive: true, force: true });

    const data = await fs.readFile(selectedManifest, 'utf8');

    const directory = path.dirname(newManifest);
    await fs.mkdir(directory, { recursive: true });

    await fs.writeFile(newManifest, data, 'utf8');
    console.log('Manifest created successfully');
  } catch (err) {
    console.error(err);
  }
}

main();
