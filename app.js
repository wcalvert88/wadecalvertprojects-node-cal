const express = require('express');
const app = express();
const path = require('path');
const cal = require('./calendar');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
var port = process.env.PORT || 3000;

app.listen(port);


module.exports = app;
