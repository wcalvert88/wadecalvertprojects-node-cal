const express = require('express');
const app = express();
const path = require('path')
const bodyParser = require('body-parser')
const index = require('./routes/index')

// Choose port to use
var port = process.env.PORT || 3000;

//Sets the common folder for everything to do with the views
app.set('views', path.join(__dirname, 'views'));

// view engine setup as ejs
app.set('view engine', 'ejs');

// Use middleware that can analyze the json files
app.use(bodyParser.json());

// Not sure if it is needed but makes it so that form data is encoded as an object that is called by req.body
app.use(bodyParser.urlencoded({ extended: false }));

// This sets the path for all static files like CSS/ JS files
// pretty much all front end stuff. So it says it will be in the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Connect all our routes to our application
// '/' is the root route for the 'index' router to use so can affect the whole app
app.use('/', index);

// Listen for connections on the port
app.listen(port)
module.exports = app;