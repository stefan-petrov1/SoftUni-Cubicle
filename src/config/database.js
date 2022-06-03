const mongoose = require('mongoose');

async function initializeDb(uri) {
  const db = await mongoose.connect(uri);
  console.log('Successfully connected to DB');

  return db;
}

module.exports = initializeDb;
