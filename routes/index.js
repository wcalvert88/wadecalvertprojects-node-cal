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
    res.render('calendarPg', { title: 'Add Event', results: '' })
})
router.post('/api/add/addEvents', function(req, res) {
    console.log("/api/add/addEvents", req.body)
    var start = new Date(req.body.start);
    var end = new Date(req.body.end);
    cal.Events.insert('primary', {
        'start': {"dateTime": start},
        'end': {"dateTime": end},
        'location': req.body.location,
        'summary': req.body.summary,
        'status': req.body.status,
        'description': req.body.description,
        'colorId': req.body.colorId
    })
        .then(resp => {
            console.log('inserted event:');
            console.log(resp);
            res.json(resp);
        })
        .catch(err => {
            console.log('Error: insertEvent-/api/add/addEvents' + err.message);
        });
})

router.post('/calendarPg.ejs', function (req, res) {
    console.log("req.body.ename", req.query.summary);

    cal.Events.insert('primary',  {
        'start': req.query.start,
        'end': req.query.end,
        'location': req.query.location,
        'summary': req.query.summary,
        'status': req.query.status,
        'description': req.query.description,
        'colorId': req.query.colorId
    })
        .then(resp => {
            console.log('inserted event:');
            console.log(resp);
            console.log(resp.start.dateTime);
            res.render('calendarPg', { title: 'Something posted'})
        })
        .catch(err => {
            console.log('Error: insertEvent-Other' + err.message);
        });
})


// SEARCH EVENTS
router.get('/search', function (req, res, next) {
    res.render('searchEvents.ejs', { title: 'Search Events', results: '' });
});

router.get('/api/search/events/',function(req,res){
    console.log("/api/search/events", req.query)
    cal.Events.list('primary', {"q": req.query.q, "timeMin": req.query.timeMin, "timeMax": req.query.timeMax})
        .then(json => {
            //Success
            console.log('List of events on calendar within time-range:');
            console.log(json);
            res.json( { results: json })
            //res.json(json);
        }).catch(err => {
            //Error
            console.log('Error: listSingleEvents -' + err.message);
        });
})

router.get('/searchEvents.ejs', function (req, res) {
    console.log("req", req.query)
    console.log("req.query.sedate", req.query.sedate)
    console.log("req.query.edate", req.query.edate)
    console.log("req.query.stime", req.query.stime),
        console.log("req.query.etime", req.query.etime)
    console.log("req.query.ename", req.query.ename)
    cal.Events.list('primary', {"q": req.query.q, "timeMin": req.query.timeMin, "timeMax": req.query.timeMax}
    )
        .then(json => {
            //Success
            console.log('List of events on calendar within time-range:');
            console.log(json);
            res.render('searchEvents', { title: 'Something Searched', results: json })
            //res.json(json);
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



// CHECK EVENTS
// hello

router.get('/checkFree', function (req, res, next) {
    res.render('checkFree.ejs', { title: 'Check Availability', results: '' });
});

router.get('/api/check/events/',function(req,res){
    console.log("/api/check/events/")
    var response = {
        "timeMin": req.query.timeMin,
        "timeMax": req.query.timeMax,
        'timeZone': req.query.timeZone,
        "items": [{ "id": 'primary' }]
    };
    cal.FreeBusy.query('primary', response)
        .then(resp => {
            console.log('List of busy timings with events within defined time range: ');
            res.json( { results: resp })
            // res.end(JSON.stringify(resp));
        })
        .catch(err => {
            // res.render("checkFree", {title: "Check Availability", results: ''})
            console.log('Error: checkBusy -' + err.message);
        });
    
})
router.get('/checkFree.ejs', function (req, res) {
    console.log("Is this running")
    var response = {
        "timeMin": req.query.timeMin,
        "timeMax": req.query.timeMax,
        'timeZone': req.query.timeZone,
        "items": [{ "id": 'primary' }]
    };
    // if (response.timeMin != null) {
    cal.FreeBusy.query('primary', {
        "timeMin": req.query.timeMin,
        "timeMax": req.query.timeMax,
        'timeZone': req.query.timeZone,
        "items": [{ "id": 'primary' }]
    })
        .then(resp => {
            console.log('List of busy timings with events within defined time range: ');
            console.log("Successfull FreeBusy Call");
            res.render("checkFree", { title: "Check Availability", results: resp })
            // res.end(JSON.stringify(resp));
        })
        .catch(err => {
            console.log('Error: checkBusy -' + err.message);
        });
    // } else {
    //     res.render("checkFree.ejs", {title: "Nothing searched", results: ''})
    // }
    console.log("response", response)

})

//Uncomment this to get it to work unRESTfully
// router.get('/checkFree.ejs', function (req, res) {
//     console.log("Checking Availability")
//     cal.FreeBusy.query('primary', {
//         "timeMin": req.query.sedate + 'T' + req.query.stime + ':00-05:00',
//         "timeMax": req.query.edate + 'T' + req.query.etime + ':00-05:00',
//         'timeZone': (-(new Date().getTimezoneOffset() / 60)).toString().split("").join("0") + ':00',
//         "items": [{ "id": 'primary' }]
//     })
//         .then(resp => {
//             console.log('List of busy timings with events within defined time range: ');
//             console.log(resp);
//             res.render("checkFree", { title: "Check Availability", results: (resp ? resp : '') })
//         })
//         .catch(err => {
//             console.log('Error: checkBusy -' + err.message);
//         });

// })

module.exports = router;

