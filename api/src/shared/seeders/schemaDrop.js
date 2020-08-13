const { Pool } = require("pg");
const moment = require("moment");
const config = require("../../../ormconfig");

const db = new Pool({
  user: config.username,
  host: config.host,
  database: config.database,
  password: config.password,
  port: config.port
});

let bootstrap = async () => {
  await db.query(`DROP SCHEMA IF EXISTS public CASCADE;`);
  await db.query(`CREATE SCHEMA IF NOT EXISTS public`);

  console.log(`[${moment().format("hh:mm:ss:SSS")}] Public Schema freshed!`);
  process.exit();
};

bootstrap();
