var express = require('express');
var router = express.Router();
const CONFIG = require('../config/Settings/settings');
const CalendarAPI = require('node-google-calendar');
let cal = new CalendarAPI(CONFIG);
/* GET home page. */
router.get('/search', function(req, res, next) {
  res.render('searchEvents.ejs', { title: 'Search Events' });
});

router.get('/searchEvents.ejs', function(req,res) {
    res.render('searchEvents', {title: 'Search Events'})
})

router.post('/searchEvents.ejs', function(req,res) {
    console.log("req.body.ename",req.body.ename);
    res.render('calendarPg', {title: 'Something Searched'})
    
})

module.exports = router;