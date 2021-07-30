var express = require("express");
var api = require("./routes/api");

var app = express();

app.use("/api/v1.2", api);

app.get("/", (req, res) => {
  res.send("hello world!");
});

app.listen(5500);