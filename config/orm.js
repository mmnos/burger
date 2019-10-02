const connection = require("../config/connection.js");

function printQuestionMarks(num) {
  let arr = [];

  for (let i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
};

function objToSql(ob) {
  let arr = [];

  for (let key in ob) {
    let value = ob[key];

    if (Object.hasOwnProperty.call(ob, key)) {

      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }

      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
};

let orm = {

  selectAll : function(tableInput, cb) {

    let queryString = `SELECT * FROM ${tableInput};`;

    connection.query(queryString, (err, result) => {

      if (err) { throw err; };

      cb(result);

    });

  },

  insertOne : function(table, cols, vals, cb) {

    let queryString = `INSERT INTO ${table} (${cols.toString()}) VALUES (${printQuestionMarks(vals.length)})`;

    console.log(queryString);

    connection.query(queryString, vals, (err, result) => {

      if (err) throw err;

      cb(result);

    });

  },

  updateOne : function(table, objColVals, condition, cb) {

    let queryString = `UPDATE ${table} SET ${objToSql(objColVals)} WHERE ${condition}`;

    console.log(queryString);

    connection.query(queryString, (err, result) => {

      if (err) throw err;

      cb(result);

    });

  }

};

module.exports = orm;