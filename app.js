const express = require('express');
const app = express();
const routes = require('./routes')
const path = require('path')
const searchCont = require('./controllers/search')
const addCont = require('./controllers/add')
const bodyParser = require('body-parser')
const index = require('./routes/index')

// Connect all our routes to our application
var port = process.env.PORT || 3000;


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);


app.listen(port)
module.exports = app;