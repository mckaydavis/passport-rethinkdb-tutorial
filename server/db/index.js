/*jshint node:true */
'use strict';

var r = require('rethinkdb');
var config = require('config').get('rethinkdb');
var db = {
  table: 'users',
  index: 'login'
}


function onErr(err) {
  console.error("Reql Error: "+JSON.stringify(err, 0, 2));
  process.exit(1);
}


function doLog(rez) {
  console.log("Reql result: "+JSON.stringify(rez, 0, 2));
}


function getOrCreateTable() {
  return r
    .db(config.db)
    .tableList()
    .contains(db.table)
    .branch(r.do(() => ({ "tables_created": 0 })),
            r.tableCreate(db.table))
    .run(r.conn)
    .then(doLog)
}


function getOrCreateIndex() {
  var table = r
        .db(config.db)
        .table(db.table)

  return table
    .indexList()
    .contains(db.index)
    .branch(r.do(() => ({ "created": 0 })),
            table.indexCreate(db.index))
    .run(r.conn)
    .then(doLog)
}


function getOrCreateDB() {
  return r
    .dbList()
    .contains(config.db)
    .branch(r.do(() => ({ "dbs_created": 0 })),
            r.dbCreate(config.db))
    .run(r.conn)
    .then(doLog)

}


r
  .connect(config)
  .then((conn) => r.conn = conn)
  .then(getOrCreateDB)
  .then(getOrCreateTable)
  .then(getOrCreateIndex)
  .catch(onErr)


module.exports = r;
