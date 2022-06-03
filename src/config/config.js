const { existsSync } = require('fs');
const { resolve } = require('path');

function getEnvPath(dest) {
  const env = process.env.NODE_ENV || 'development';
  const fallback = resolve(`${dest}/development.env`);
  const filename = env ? `${env}.env` : 'development.env';
  let filePath = resolve(`${dest}/${filename}`);

  if (!existsSync(filePath)) {
    filePath = fallback;
  }

  return filePath;
}

function setupConfig(dest) {
  return require('dotenv').config({ path: getEnvPath(dest) })?.parsed;
}

exports.setupConfig = setupConfig;

