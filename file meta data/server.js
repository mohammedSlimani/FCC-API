'use strict';

var express = require('express');
var cors = require('cors');
var multer = require('multer')
var upload = multer({ dest: 'upload/' })
// require and use "multer"...

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
    console.log("file", req.file);
    const { originalname, size } = req.file;
    res.status(200).send({ name: originalname, size });
})

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.listen(process.env.PORT || 3000, function () {
    console.log('Node.js listening ...');
});
