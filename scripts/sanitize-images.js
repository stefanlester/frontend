const fs = require('fs');
const path = require('path');

function sanitizeName(name) {
  // Lowercase, replace multiple dots with single dot for extension preserving
  const ext = path.extname(name).toLowerCase();
  const base = path.basename(name, ext);
  // Replace sequences of dots or non-alphanum (except dash/underscore) with single dash
  let cleaned = base.replace(/[^a-zA-Z0-9]+/g, '-');
  // remove leading/trailing dashes
  cleaned = cleaned.replace(/^-+|-+$/g, '');
  return `${cleaned}${ext}`;
}

const imagesDir = path.join(__dirname, '..', 'public', 'images', 'new');
if (!fs.existsSync(imagesDir)) {
  console.error('images dir not found:', imagesDir);
  process.exit(1);
}

fs.readdirSync(imagesDir, { withFileTypes: true }).forEach((d) => {
  if (!d.isDirectory()) return;
  const subdir = path.join(imagesDir, d.name);
  fs.readdirSync(subdir, { withFileTypes: true }).forEach((f) => {
    if (!f.isFile()) return;
    const oldPath = path.join(subdir, f.name);
    const newName = sanitizeName(f.name);
    const newPath = path.join(subdir, newName);
    if (oldPath === newPath) return;
    if (fs.existsSync(newPath)) {
      console.log('Skipping rename, target exists:', newPath);
      return;
    }
    fs.renameSync(oldPath, newPath);
    console.log('Renamed:', oldPath, '->', newPath);
  });
});

console.log('Sanitization complete.');
