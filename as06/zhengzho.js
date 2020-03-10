var express = require("express");
var mysql = require("./weight");
var app = express();
var hbs = require("express-handlebars").create({ defaultLayout: "main" });
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine("handlebars", hbs.engine)
app.set("view engine", "handlebars")
app.set("port", 3000);

app.get('/', function (req, res, next) {
    var context = {};
    mysql.pool.query("DROP TABLE IF EXISTS workouts", function (err) { //replace your connection pool with the your variable containing the connection pool
        var createString =
            "CREATE TABLE workouts(" +
            "id INT PRIMARY KEY AUTO_INCREMENT," +
            "name VARCHAR(255) NOT NULL," +
            "reps INT," +
            "weight INT," +
            "date DATE," +
            "lbs BOOLEAN)";
        mysql.pool.query(createString, function (err) {
            mysql.pool.query("SELECT * FROM workouts", function (err, rows, result) {
                if (err) {
                    next(err);
                    return;
                }
                context.results = JSON.stringify(rows);
                res.render("home", context);
            });
        });
    });
});

app.post('/', function (req, res, next) {
    var context = {};
    if (req.body["New Item"]) {
        // var unit = Number(req.body.unit); 
        // console.log(typeof(unit))       ;
        mysql.pool.query("INSERT INTO workouts (`name`, `reps`, `weight`, `date`, `lbs`) VALUES (?,?,?,?,?)", [req.body.name, req.body.reps,req.body.weight,req.body.date,req.body.unit], function (err, result) {
            if (err) {
                next(err);
                return;
            }
            // res.render("home", context);
            mysql.pool.query("SELECT * FROM workouts", function (err, rows, result) {
                if (err) {
                    next(err);
                    return;
                }
                context.results = JSON.stringify(rows);
                res.render("home", context);
            });
        });
    }
});

// app.get("/database", function (req, res, next) {
//     var context = {};
//     mysql.pool.query("SELECT * FROM workouts", function (err, rows, result) {
//         if (err) {
//             next(err);
//             return;
//         }
//         context.results = JSON.stringify(rows);
//         res.render("database", context);
//     });
// });

app.listen(app.get('port'), function () {
    console.log('Express started on  local:' + app.get('port') + '; press Ctrl-C to terminate.');
});

