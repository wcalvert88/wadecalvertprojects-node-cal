var express = require('express');
var router = express.Router();
const CONFIG = require('../config/Settings/settings');
const CalendarAPI = require('node-google-calendar');
let cal = new CalendarAPI(CONFIG);
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('calendarPg.ejs', { title: 'Add Event' });
});

router.get('/calendarPg.ejs', function (req, res) {
    res.render('calendarPg', { title: 'Add Event' })
})

router.post('/calendarPg.ejs', function (req, res) {
    console.log("req.body.ename", req.body.ename);
    res.render('calendarPg', { title: 'Something posted' })
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

router.get('/search', function (req, res, next) {
    res.render('searchEvents.ejs', { title: 'Search Events', results: '' });
});
// router.get('/searchEvents.ejs', function(req,res,next) {
//     res.render('searchEvents.ejs', {title: 'Search Events', results: ''})
// })
router.get('/searchEvents.ejs', function (req, res) {
    console.log("req", req.query)
    console.log("req.query.sedate", req.query.sedate)
    console.log("req.query.edate", req.query.edate)
    console.log("req.query.stime", req.query.stime),
        console.log("req.query.etime", req.query.etime)
    console.log("req.query.ename", req.query.ename)
    cal.Events.list('primary', {
        timeMin: req.query.sedate + 'T' + req.query.stime + ':00-05:00',
        timeMax: req.query.edate + 'T' + req.query.etime + ':00-05:00',
        q: req.query.ename ? req.query.ename : '',
        singleEvents: false
    })
        .then(json => {
            //Success
            console.log('List of events on calendar within time-range:');
            console.log(json);
            res.render('searchEvents', { title: 'Something Searched', results: json })
        }).catch(err => {
            //Error
            console.log('Error: listSingleEvents -' + err.message);
        });
})

router.post('/searchEvents.ejs', function (req, res) {
    console.log("req.body.ename", req.body.ename);
    res.render('calendarPg', { title: 'Something Searched' })

})

router.delete('/searchEvents.ejs', function (req, res) {
    console.log("Deleting", req.body.eventId);
    cal.Events.delete('primary', req.body.eventId, { sendNotifications: false })
        .then(results => {
            console.log('delete Event:' + JSON.stringify(results));
        }).catch(err => {
            console.log('Error deleteEvent:' + JSON.stringify(err.message));
        });
    res.render('calendarPg', { title: "Something Deleted" })
})

router.get('/checkFree', function (req, res, next) {
    res.render('checkFree.ejs', { title: 'Check Availability', results : '' });
});
// router.get('/checkFree.ejs', function(req,res,next) {
//     res.render('checkFree.ejs', {title: 'Check Availability', results: ''});
// })
router.get('/checkFree.ejs', function (req, res) {
    console.log("Checking Availability")
    cal.FreeBusy.query('primary', {
        "timeMin": req.query.sedate + 'T' + req.query.stime + ':00-05:00',
        "timeMax": req.query.edate + 'T' + req.query.etime + ':00-05:00',
        'timeZone': (-(new Date().getTimezoneOffset() / 60)).toString().split("").join("0") + ':00',
        "items": [{ "id": 'primary' }]
    })
        .then(resp => {
            console.log('List of busy timings with events within defined time range: ');
            console.log(resp);
            res.render("checkFree", { title: "Check Availability", results: (resp ? resp : '') })
        })
        .catch(err => {
            console.log('Error: checkBusy -' + err.message);
        });
    
})
module.exports = router;
