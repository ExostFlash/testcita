const fs = require('fs');
const path = require('path');

const distRoot = path.join(process.cwd(), 'dist', 'citapote');
const browserRoot = path.join(distRoot, 'browser');
const outputRoot = fs.existsSync(browserRoot) ? browserRoot : distRoot;
const indexPath = path.join(outputRoot, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error('[prerender] index.html not found at', indexPath);
  process.exit(1);
}

const routes = [
  '',
  'home',
  'don',
  'contact',
  'mentions-legales',
  'politique-confidentialite',
  'gestion-des-cookies',
  'cgu'
];

const indexHtml = fs.readFileSync(indexPath, 'utf8');

// GitHub Pages SPA fallback
fs.writeFileSync(path.join(outputRoot, '404.html'), indexHtml);

routes
  .filter((route) => route.length > 0)
  .forEach((route) => {
    const routeDir = path.join(outputRoot, route);
    fs.mkdirSync(routeDir, { recursive: true });
    fs.writeFileSync(path.join(routeDir, 'index.html'), indexHtml);
  });

console.log(`[prerender] Generated ${routes.length - 1} route HTML files and 404.html fallback.`);
