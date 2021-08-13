var sqlite = require("sqlite3").verbose();
var db = new sqlite.Database("./elements.db", (err) => {
    if(err) {
        console.log(err);
        return;
    }
    console.log("Database connected successfully!");
});
var express = require('express');
var router = express.Router();

router.use((req, res, next) => {
    res.set("x-powered-by", "hold's corp");
    next();
});


router.get("/", (req, res) => {
    res.set("content-type", "text/html");
    res.send("api home page!");
});

router.get("/all", (req, res) => {
    let sql = "select * from elements_properties";

    db.all(sql, (err, rows) => {
        if(err) {
            res.send("error occured on our side!");
            return;
        }

        res.send(rows);
    });
});

router.get("/:property/:value", (req, res) => {
    let sql = `select * from elements_properties where ${req.params.property} like "${req.params.value}"`;

    res.set("content-type", "application/json");

    db.all(sql, (err, rows) => {
        if(err) {
            res.send("error occured on our side: " + err);
            return;
        }
        if(rows != null){
            res.send(rows);
        }
        else {
            res.send("no such element found!");
        }
    });
});

module.exports = router;