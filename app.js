const express = require('express');
const app = express();
const routes = require('./routes')
const path = require('path')
const searchCont = require('./controllers/search')
const addCont = require('./controllers/add')
const bodyParser = require('body-parser')
const index = require('./routes/index')
const searchEv = require('./routes/search');
// Connect all our routes to our application
var port = process.env.PORT || 3000;


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
// app.use('/search', searchEv);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   console.log(err.message);
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('./calendarPg', {title: "Error Occured"});
// });

app.listen(port)
module.exports = app;

// app.use('/', routes)
// app.use('/search', searchCont)
// app.use(express.static(path.join(__dirname,'public')))

// app.use(express.static(path.join(__dirname, 'views')))
// app.use(bodyParser.urlencoded({extended: false}))
// app.get('/calendarPg.ejs', function(req,res){
//     res.render('calendarPg.ejs', {title: "Add Event"})
// })
// app.get('/', function(req,res) {
//     res.render('calendarPg.ejs', {title: "Add Event"})
// //     res.sendFile('../controllers/mainAdd')
// })


// app.post('/', function(req,res) {
//     res.render("File Sent to Calendar");
// })
// app.get('/search', function (req, res) {
//     res.render('searchEvents.ejs', {title : 'Search Events'})
// })

// app.get('/checkFree', function (req, res) {
//     res.render('checkFree.ejs', {title: 'Check Available'})
// })

// app.get('/delete', function (req, res) {
//     res.render('deletePg.ejs', {title: 'Delete Event'})
// })

// addCont(app)
// // searchCont(app)
// // Turn on that server!
// app.listen(port, () => { console.log('App listening on port 3000')})

// module.exports = app;