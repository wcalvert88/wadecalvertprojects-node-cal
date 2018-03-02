//LIST OF CALENDAR FUNCTIONS

const CONFIG = require('./config/Settings/settings');
const CalendarAPI = require('node-google-calendar');
let cal = new CalendarAPI(CONFIG);

let params = {
    showHidden: true
  };
  
cal.CalendarList.list(params)
    .then(resp => {
      console.log(resp);
      console.log("victory");
    }).catch(err => {
      console.log(err.message);
    });

let params1 = {
        scope: {
            type: 'user',
            value: 'wcalvert88@gmail.com'
        },
        role: 'owner'
    };
     
cal.Acl.insert('primary', params1)
    .then(resp => {
      console.log(resp);
    }).catch(err => {
      console.log(err.message);
    });

    let params2 = {
        timeMin: '2016-05-20T06:00:00+08:00',
        timeMax: '2018-05-25T22:00:00+08:00',
        q: 'Coffeeshop',
        singleEvents: false
        // orderBy: 'startTime'
    }; 	//Optional query parameters referencing google APIs
     
    cal.Events.list('primary', params2)
      .then(json => {
        //Success
        console.log('List of events on calendar within time-range:');
        console.log(json);
      }).catch(err => {
        //Error
        console.log('Error: listSingleEvents -' + err.message);
      });

let params3 = {
        'start': { 'dateTime': '2017-05-20T07:00:00+08:00' },
        'end': { 'dateTime': '2017-05-20T08:00:00+08:00' },
        'location': 'Coffeeshop4',
        'summary': 'Breakfast',
        'status': 'confirmed',
        'description': '',
        'colorId': 1
    };
function addCEvents () {     
    cal.Events.insert('primary', params3)
      .then(resp => {
        console.log('inserted event:');
        console.log(resp);
      })
      .catch(err => {
        console.log('Error: insertEvent-' + err.message);
      });
}
addCEvents();
let params4 = {
    sendNotifications: true
};
function deleteCEvent() {
    //Find a way to get the id out of the calendar.
cal.Events.delete('primary', 'e2j01fro3keksllfhotcecvsgk', params4)
  .then(results => {
    console.log('delete Event:' + JSON.stringify(results));
  }).catch(err => {
        console.log('Error deleteEvent:' + JSON.stringify(err.message));
  });
}

//deleteCEvent();

let params5 = {
    "timeMin": '2017-05-19T08:00:00+08:00',
    "timeMax": '2017-05-20T09:00:00+08:00',
    "items": [{ "id": 'primary' }]
};
function cEventFreeBusy() {
cal.FreeBusy.query('primary', params5)
  .then(resp => {
  	console.log('List of busy timings with events within defined time range: ');
        console.log(resp);
  })
  .catch(err => {
    console.log('Error: checkBusy -' + err.message);
  });
}
cEventFreeBusy();

let params6 = {};
cal.Settings.list(params6)
  .then(resp => {
    console.log('List settings: ');
    console.log(resp);
  })
  .catch(err => {
    console.log('Error: listSettings -' + err.message);
  });
module.exports = cal;