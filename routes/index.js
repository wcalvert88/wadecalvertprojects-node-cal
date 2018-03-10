var express = require('express');
var router = express.Router();
const CONFIG = require('../config/Settings/settings');
const CalendarAPI = require('node-google-calendar');
let cal = new CalendarAPI(CONFIG);

// Main Page Add Events
// This sets the main page path to Adding an event
router.get('/', function (req, res, next) {
    // This renders the calendarPg.ejs file to run on the main page.
    res.render('calendarPg.ejs', { title: 'Add Event' });
});

/*This sets the post method for the main page.
It receives the data from the ajax request in main.js.
It inserts the data into the node-google-calendar function
to insert events into your calendar*/
router.post('/', function (req, res) {
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
            res.render('calendarPg', { title: 'Something posted'})
        })
        .catch(err => {
            console.log('Error: insertEvent-Other' + err.message);
        });
})

// Not sure about this file I intend to come back later to comment this.
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

// SEARCH EVENTS
// This sets the /search route for the site and renders it
// with the searchEvents.ejs file
router.get('/search', function (req, res) {
    cal.Events.list('primary', {"q": req.query.q, "timeMin": req.query.timeMin, "timeMax": req.query.timeMax}
    )
        .then(json => {
            //Success
            console.log('List of events on calendar within time-range:');
            res.render('searchEvents', { title: 'Something Searched', results: json })
        }).catch(err => {
            //Error
            console.log('Error: listSingleEvents -' + err.message);
            res.render('searchEvents', {title: "Search Events", results: ''})
        });
})

// This deletes an event from the calendar
// This does not refresh the page but it does work
router.delete('/searchEvents.ejs', function (req, res) {
    console.log("Deleting", req.body.eventId);
    cal.Events.delete('primary', req.body.eventId, { sendNotifications: false })
        .then(results => {
            console.log('delete Event:' + JSON.stringify(results));
        }).catch(err => {
            console.log('Error deleteEvent:' + JSON.stringify(err.message));
        });
})

// This is the page with the JSON data in it.
// This lists all the search results as JSON data
router.get('/api/search/events/',function(req,res){
    cal.Events.list('primary', {"q": req.query.q, "timeMin": req.query.timeMin, "timeMax": req.query.timeMax})
        .then(json => {
            //Success
            console.log('List of events on calendar within time-range:');
            // This converts the data to JSON and sends it to the page.
            res.json({ results: json })
        }).catch(err => {
            //Error
            console.log('Error: listSingleEvents -' + err.message);
        });
})


// CHECK EVENTS
// Not sure why var response works in the api/check/events get but not this one.
// This checks your calendar within a specific time period and returns the times
// that you are busy in that time period.
router.get('/checkFree', function (req, res) {
    cal.FreeBusy.query('primary', {
        "timeMin": req.query.timeMin,
        "timeMax": req.query.timeMax,
        'timeZone': req.query.timeZone,
        "items": [{ "id": 'primary' }]
    })
        .then(resp => {
            console.log('List of busy timings with events within defined time range: ');
            console.log(resp);
            res.render("checkFree", { title: "Check Availability", results: resp })
        })
        .catch(err => {
            // If there is nothing in the params then you just loaded the page
            // Meaning results should be loaded with nothing.
            console.log('Error: checkBusy -' + err.message);
            res.render('checkFree.ejs', { title: 'Check Availability', results: '' });
        });
})

// Sends the json data to the api
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
            console.log("api check", resp);
            res.json( { results: resp })
        })
        .catch(err => {
            console.log('Error: checkBusy -' + err.message);
        });  
})

module.exports = router;

