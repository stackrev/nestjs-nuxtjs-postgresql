const { Pool } = require("pg");
const moment = require("moment");
const cleaner = require("./lib/cleaner");
const queries = require("./lib/queries");
const config = require("../../../ormconfig");

const db = new Pool({
  user: config.username,
  host: config.host,
  database: config.database,
  password: config.password,
  port: config.port
});

const options = {
  type: "truncate",
  skipTables: []
};

let bootstrap = async () => {
  await cleaner(options, db);
  await db.query(
    queries.users() +
      queries.roles() +
      queries.roleUser() +
      queries.permissions()
  );
  await rolePermissionQuery();
  console.log(`[${moment().format("hh:mm:ss:SSS")}] Sql seeder executed.`);
  console.log();
  console.log(
    `[${moment().format("hh:mm:ss:SSS")}] Script execution completed!`
  );
  process.exit();
};

let rolePermissionQuery = async () => {
  let ids = await db.query(`select id from permissions;`);
  await db.query(queries.permissionRole(ids.rows));
};

bootstrap();
