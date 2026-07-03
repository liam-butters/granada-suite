// Runs automatically on every Netlify build (see netlify.toml).
// Scans the /photos folder and writes data/photos.json, which photos.html
// reads to build the gallery. You never run this by hand — just add or
// remove image files in /photos and push; Netlify does the rest.

const fs = require('fs');
const path = require('path');

const PHOTOS_DIR = path.join(__dirname, '..', 'photos');
const OUTPUT_FILE = path.join(__dirname, '..', 'data', 'photos.json');
const VALID_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);

function main() {
  if (!fs.existsSync(PHOTOS_DIR)) {
    console.warn('No /photos directory found — writing empty manifest.');
    fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
    fs.writeFileSync(OUTPUT_FILE, '[]\n');
    return;
  }

  const files = fs
    .readdirSync(PHOTOS_DIR)
    .filter((name) => !name.startsWith('.'))
    .filter((name) => VALID_EXT.has(path.extname(name).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(files, null, 2) + '\n');

  console.log(`Wrote ${files.length} photo(s) to ${path.relative(process.cwd(), OUTPUT_FILE)}`);
}

main();
