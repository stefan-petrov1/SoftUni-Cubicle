const { setupConfig } = require('./config/config');
const config = setupConfig(`${__dirname}/config/envs`);

const app = require('express')();
const initializeDb = require('./config/database');

require('./config/express')(app);
require('./config/routes')(app);

async function main() {
  await initializeDb(config.DB_URI);
  app.listen(config.PORT);

  return `Listening on port ${config.PORT}...`;
}

main()
  .then(console.log)
  .catch(console.error);
