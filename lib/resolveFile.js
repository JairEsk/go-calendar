const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');

const resolveFile = (filename) => {
  if (fs.existsSync(filename)) return filename;
  const local = path.join(projectRoot, filename);
  if (fs.existsSync(local)) return local;
  return filename;
};

module.exports = { resolveFile };
