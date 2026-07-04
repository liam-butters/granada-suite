# /photos

Drop image files directly in this folder (.jpg, .jpeg, .png, .webp, .gif). Every push to GitHub triggers a Netlify build, which runs scripts/generate-photos.js to rebuild data/photos.json -- the photos page reads that file, so new images just appear automatically. No other step needed.

Tips:
- Keep filenames simple (no spaces/apostrophes) -- e.g. deck-sunset.jpg.
- Photos are sorted by filename, so prefix with numbers if you want a specific order: 01-exterior.jpg, 02-kitchen.jpg, etc.
- Large camera-original files will slow the page down -- resize to roughly 1600px on the long edge before adding them.
