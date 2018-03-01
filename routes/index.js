var express = require('express');
var router = express.Router();
const CONFIG = require('../config/Settings/settings');
const CalendarAPI = require('node-google-calendar');
let cal = new CalendarAPI(CONFIG);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('calendarPg.ejs', { title: 'Add Event' });
});

router.get('/calendarPg.ejs', function(req,res) {
    res.render('calendarPg', {title: 'I dont know what Im doing anymore'})
})

router.post('/calendarPg.ejs', function(req,res) {
    console.log("req.body.ename",req.body.ename);
    res.render('calendarPg', {title: 'Something posted'})
    cal.Events.insert('primary', {
        'start': { 'dateTime': req.body.sedate + 'T' + req.body.stime + ':00-05:00' },
        'end': { 'dateTime': req.body.edate + 'T' + req.body.etime + ':00-05:00' },
        'location': req.body.eplace,
        'summary': req.body.ename,
        'status': 'confirmed',
        'description': req.body.edesc,
        'colorId': 1
    })
      .then(resp => {
        console.log('inserted event:');
        console.log(resp);
      })
      .catch(err => {
        console.log('Error: insertEvent-' + err.message);
      });
})

module.exports = router;

