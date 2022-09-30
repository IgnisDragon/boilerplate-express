let express = require('express');
let bodyParser = require('body-parser');
let app = express();

require('dotenv').config();

console.log("Hello World");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(function(req, res, next) {

    console.log(req.method, req.path, "-", req.ip);

    next();
})

app.get("/:word/echo", function(req, res) {

    let {word} = req.params;

    res.json({echo : word});
})

app.use("/public", express.static(__dirname + "/public"));

app.get("/", function(req, res) {

    //res.send('Hello Express');

    filePath = __dirname + "/views/index.html";

    res.sendFile(filePath);
})

app.get("/json", function(req, res) {

    let response = "Hello json";

    if (process.env.MESSAGE_STYLE == "uppercase") {

        response = response.toUpperCase();
    }
    res.json({"message" : response});
})

app.get("/now", function(req, res, next) {

    req.time = new Date().toString();
    next();
}, function(req, res) {

    res.json({"time" : req.time});
})

app.get("/name", function(req, res) {

    let first = req.query.first;
    let last = req.query.last;

    res.json({"name" : `${first} ${last}`});
})

app.post("/name", function(req, res) {

    let first = req.body.first;
    let last = req.body.last;
    console.log(first, last);

    res.json({"name" : `${first} ${last}`});
})










 module.exports = app;
