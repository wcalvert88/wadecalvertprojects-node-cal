const CONFIG = require('../config/Settings/settings');
const CalendarAPI = require('node-google-calendar');
let cal = new CalendarAPI(CONFIG);

module.exports = function(app) {
    // let params3 = {
    //     'start': { 'dateTime': '2018-03-01T16:00:00-05:00' },
    //     'end': { 'dateTime': '2018-03-01T17:00:00-05:00' },
    //     'location': 'Coffeeshop4',
    //     'summary': 'Breakfast',
    //     'status': 'confirmed',
    //     'description': '',
    //     'colorId': 1
    // };
    app.get(function (req, res) {
        console.log("req.params", req.params)
    cal.Events.insert('primary', params3)
      .then(resp => {
        console.log('inserted event:');
        console.log(resp);
      })
      .catch(err => {
        console.log('Error: insertEvent-' + err.message);
      });
    })
}