var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var ottoman = require('ottoman');
var couchbase = require('couchbase');
var config = require('./config.json');
var app = express();

var cluster = new couchbase.Cluster(config.couchbase.server);
ottoman.bucket = cluster.openBucket(config.couchbase.bucket, config.couchbase.password);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

var routes = require('./routes/routes.js')(app);

var server = app.listen(3000, function(){
  console.log('Servidor rodando na porta %s...', server.address().port);
});