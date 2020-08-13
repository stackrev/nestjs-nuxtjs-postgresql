"use strict";
const lib = require("./lib");
const moment = require("moment");

async function cleaner(options, db) {
  return await Promise.resolve()
    .then(() => {
      lib.validOptions(options);
    })
    .then(async () => {
      let result;
      switch (options.type) {
        case "delete":
          result = await _delete(options, db);
          break;
        case "truncate":
          result = await _truncate(options, db);
          break;
        default:
          result = Promise.reject(
            new Error(`Unrecognized type: ${options.type}`)
          );
      }
      return result;
    });
}

async function _delete(options, db) {
  return lib
    .getAllTables(db)
    .then(async tables => {
      const tablesToDelete = lib.removeSkipped(
        tables.rows,
        "table_name",
        options.skipTables
      );

      const bDelete = lib.deleteFromTable.bind(null, db);

      return Promise.all(tablesToDelete.map(bDelete));
    })
    .then(async () => {
      return await lib.getAllSequences(db);
    })
    .then(function(sequences) {
      // remove skipped tables from options
      const sequencesToRestart = lib.removeSkipped(
        sequences.rows,
        "sequence_name",
        options.skipSequences
      );

      const bRestart = lib.restartSequence.bind(null, db);

      return Promise.all(sequencesToRestart.map(bRestart));
    });
}

async function _truncate(options, db) {
  return await lib.getAllTables(db).then(async tables => {
    // remove skipped tables from options
    const toDelete = lib.removeSkipped(
      tables.rows,
      "table_name",
      options.skipTables
    );

    // put all tables together so we can truncate all at once
    let truncateMultiple = toDelete.reduce(function(result, table) {
      return `${result}"${table}", `;
    }, "");
    truncateMultiple = truncateMultiple.slice(0, -2);

    return await lib.truncateTables(db, truncateMultiple);
  });
}

module.exports = cleaner;
