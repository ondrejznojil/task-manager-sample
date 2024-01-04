const dotenv = require('dotenv').config().parsed;

let config = {
  username: dotenv.MARIADB_USER,
  password: dotenv.MARIADB_PASSWORD,
  database: dotenv.MARIADB_DATABASE,
  host: dotenv.MARIADB_HOST,
  port: dotenv.MARIADB_PORT,
  dialect: 'mariadb',
};

module.exports = {
  development: config,
  test: config,
  production: config,
};
