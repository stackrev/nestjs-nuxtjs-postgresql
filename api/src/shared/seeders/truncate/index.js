const { Pool } = require("pg");
let cleaner = require("../lib/cleaner");
const config = require("../../../../ormconfig");

const db = new Pool({
  user: config.username,
  host: config.host,
  database: config.database,
  password: config.password,
  port: config.port
});

let options = {
  type: "truncate",
  skipTables: []
};

cleaner(options, db);
