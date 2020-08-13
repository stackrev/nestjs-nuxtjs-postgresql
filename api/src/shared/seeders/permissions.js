const { Pool } = require("pg");
const moment = require("moment");
const queries = require("./lib/queries");
const config = require("../../../ormconfig");

const db = new Pool({
  user: config.username,
  host: config.host,
  database: config.database,
  password: config.password,
  port: config.port
});

let bootstrap = async () => {
  await db.query(
    `TRUNCATE permission_role, permissions RESTART IDENTITY CASCADE;`
  );
  await db.query(queries.permissions());
  let ids = await db.query(`select id from permissions;`);
  await db.query(queries.permissionRole(ids.rows));
  console.log(
    `[${moment().format("hh:mm:ss:SSS")}] Permissions to Role sync is done.`
  );
  process.exit();
};

bootstrap();
