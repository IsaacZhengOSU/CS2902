var mysql = require("mysql");
var pool = mysql.createPool({
    connectionLimit : 10,
    host            :"classmysql.engr.oregonstate.edu",
    user            : "cs290_zhengzho",
    password        : "8471",
    database        : "cs290_zhengzho"
});

module.exports.pool = pool;