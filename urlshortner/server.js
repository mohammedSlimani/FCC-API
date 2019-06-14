'use strict';
const express = require('express');
const cors = require('cors');
const Router = require('./routes');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

app.use('/api/shorturl',Router);

app.listen(port, function () {
  console.log('Node.js listening ...');
});