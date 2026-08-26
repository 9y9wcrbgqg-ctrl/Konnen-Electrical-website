const fs = require('fs');
const path = require('path');

const out = path.join(__dirname, 'dist');
const files = [
  'index.html',
  'services.html',
  'about.html',
  'contact.html',
  'privacy.html',
  '404.html',
  'styles.css',
  'brand-refresh.css',
  'brand-color.css',
  'script.js',
  'site-config.js',
  'favicon.svg',
  'robots.txt',
  'sitemap.xml'
];

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

for (const file of files) {
  fs.copyFileSync(path.join(__dirname, file), path.join(out, file));
}

console.log(`Built Konnen Electrical static site with ${files.length} files.`);
