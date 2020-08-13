"use strict";
const moment = require("moment");

const _getAllTables = `SELECT TABLE_NAME FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE';`;

const _getAllSequences = `SELECT sequence_name FROM information_schema.sequences WHERE sequence_schema = \'public\';`;

function _addSequnces(table) {
  return `${table}_id_seq`;
}

function validOptions(options) {
  // default to truncate option
  if (!options.type) options.type = "truncate";

  if (!options.skipTables) options.skipTables = [];

  // determine what sequences to skip according to skipped tables
  options.skipSequences = options.skipTables.map(_addSequnces);

  return true;
}

function removeSkipped(list, key, skipped) {
  return list.reduce(function(res, el) {
    if (!skipped.includes(el[key])) res.push(el[key]);
    return res;
  }, []);
}

async function getAllTables(db) {
  return await db.query(_getAllTables);
}

async function getAllSequences(db) {
  return await db.query(_getAllSequences);
}

async function truncateTables(db, truncateMultiple) {
  const q = `TRUNCATE ${truncateMultiple} RESTART IDENTITY CASCADE;`;

  const result = await db.query(q);
  console.log(
    `[${moment().format("hh:mm:ss:SSS")}] truncating all table is done.`
  );
  return result;
}

async function deleteFromTable(db, table) {
  const result = await db.query(`DELETE FROM "${table}";`);
  console.log(
    `[${moment().format("hh:mm:ss:SSS")}] deleting all table is done.`
  );
  return result;
}

async function restartSequence(db, sequence) {
  return await db.query(`ALTER SEQUENCE "${sequence}" RESTART WITH 1;`);
}

module.exports = {
  getAllTables: getAllTables,
  getAllSequences: getAllSequences,
  validOptions: validOptions,
  removeSkipped: removeSkipped,
  deleteFromTable: deleteFromTable,
  restartSequence: restartSequence,
  truncateTables: truncateTables
};
