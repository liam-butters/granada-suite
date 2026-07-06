// Runs automatically on every Netlify build (see netlify.toml).
//
// - Scans /photos (files only, not subfolders) and writes data/photos.json,
//   which photos.html reads to build the gallery grid.
// - Scans /photos/hero and writes data/hero.json with the first image found
//   there, which index.html reads to show the landing-page photo.
//
// You never run this by hand -- just add, swap, or remove image files and
// push; Netlify does the rest.

const fs = require('fs');
const path = require('path');

const PHOTOS_DIR = path.join(__dirname, '..', 'photos');
const HERO_DIR = path.join(PHOTOS_DIR, 'hero');
const GALLERY_OUTPUT = path.join(__dirname, '..', 'data', 'photos.json');
const HERO_OUTPUT = path.join(__dirname, '..', 'data', 'hero.json');
const VALID_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);

function listImages(dir) {
    if (!fs.existsSync(dir)) return [];
    return fs
      .readdirSync(dir, { withFileTypes: true })
      .filter((entry) => entry.isFile())
      .filter((entry) => !entry.name.startsWith('.'))
      .filter((entry) => VALID_EXT.has(path.extname(entry.name).toLowerCase()))
      .map((entry) => entry.name)
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

function main() {
    fs.mkdirSync(path.dirname(GALLERY_OUTPUT), { recursive: true });

  // Main gallery -- only files directly in /photos, so the hero/ subfolder
  // (and its photo) never shows up twice on the photos page.
  const galleryFiles = listImages(PHOTOS_DIR);
    fs.writeFileSync(GALLERY_OUTPUT, JSON.stringify(galleryFiles, null, 2) + '\n');
    console.log(`Wrote ${galleryFiles.length} photo(s) to ${path.relative(process.cwd(), GALLERY_OUTPUT)}`);

  // Landing-page hero photo -- first image (alphabetically) in /photos/hero.
  // Drop a new one in and swap out the old to change it; no code to edit.
  const heroFiles = listImages(HERO_DIR);
    const hero = heroFiles[0] || null;
    fs.writeFileSync(HERO_OUTPUT, JSON.stringify({ file: hero }, null, 2) + '\n');
    console.log(hero
                    ? `Wrote hero photo "${hero}" to ${path.relative(process.cwd(), HERO_OUTPUT)}`
                    : `No hero photo found in /photos/hero -- ${path.relative(process.cwd(), HERO_OUTPUT)} set to null`);
}

main();
