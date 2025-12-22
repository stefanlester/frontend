const fs = require('fs');
const path = require('path');

function kebab(s) {
  return s
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9\-_.]/g, '')
    .replace(/-+/g, '-')
    .toLowerCase();
}

const publicDir = path.join(__dirname, '..', 'public');
const sourceDir = path.join(publicDir, 'new');
const destBase = path.join(publicDir, 'images', 'new');

if (!fs.existsSync(sourceDir)) {
  console.error('Source folder not found:', sourceDir);
  process.exit(1);
}

fs.readdirSync(sourceDir, { withFileTypes: true }).forEach((entry) => {
  if (!entry.isDirectory()) return;
  const sub = entry.name;
  const srcSub = path.join(sourceDir, sub);
  const destSub = path.join(destBase, kebab(sub));
  fs.mkdirSync(destSub, { recursive: true });

  fs.readdirSync(srcSub, { withFileTypes: true }).forEach((f) => {
    if (!f.isFile()) return;
    const oldName = f.name;
    const ext = path.extname(oldName);
    const base = path.basename(oldName, ext);
    const newName = `${kebab(base)}${ext.toLowerCase()}`;
    const srcFile = path.join(srcSub, oldName);
    const destFile = path.join(destSub, newName);
    if (fs.existsSync(destFile)) {
      console.log('Skipping existing:', destFile);
      return;
    }
    fs.copyFileSync(srcFile, destFile);
    console.log('Copied:', srcFile, '->', destFile);
  });
});

console.log('Normalization complete. Images copied to public/images/new/*');
