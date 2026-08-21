const fs = require('fs');
const path = require('path');

const out = path.join(__dirname, 'dist');
const files = [
  'index.html',
  'about.html',
  'capabilities.html',
  'contact.html',
  'styles.css',
  'script.js',
  'favicon.svg'
];

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

for (const file of files) {
  fs.copyFileSync(path.join(__dirname, file), path.join(out, file));
}

console.log(`Built Konnen Electrical static site with ${files.length} files.`);
