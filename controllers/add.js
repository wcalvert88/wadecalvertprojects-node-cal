const CONFIG = require('../config/Settings/settings');
const CalendarAPI = require('node-google-calendar');
let cal = new CalendarAPI(CONFIG);

module.exports = function(app) {
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