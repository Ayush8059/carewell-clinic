const fs = require('fs');
['public/index.html', 'public/services.html', 'public/contact.html', 'public/style.css'].forEach(f => {
  if (!fs.existsSync(f)) { console.error('MISSING ' + f); process.exit(1); }
});
console.log('All tests passed');
