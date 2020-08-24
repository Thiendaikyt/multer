const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
const upload = multer({ storage: storage });
const app = express();

// create application/json parser
app.use(bodyParser.json());

// create application/x-www-form-urlencoded parser
//app.use(bodyParser.urlencoded({ extended: false }));

app.post('/*', upload.any(), (req, res) => {
    console.log(req.method + ' ' + req.url);
    console.log(req.file);
    res.send(req.body);
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
