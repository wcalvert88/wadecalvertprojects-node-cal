const express = require('express')
const router = express.Router()
const app = require('../app')
console.log("Search controller started")
// let params2 = {
//     timeMin: '2016-05-20T06:00:00+08:00',
//     timeMax: '2018-05-25T22:00:00+08:00',
//     q: 'Coffeeshop',
//     singleEvents: false
//     // orderBy: 'startTime'
// }; 
// cal.Events.list('primary', params2)
//       .then(json => {
//         //Success
//         console.log('List of events on calendar within time-range:');
//         console.log(json);
//       }).catch(err => {
//         //Error
//         console.log('Error: listSingleEvents -' + err.message);
//       });
router.get('/search', function(req, res) {
    console.log("app", app)
    console.log("req.param", req.param)
    // cal.Events.list('primary', req.param)
    //   .then(json => {
    //     //Success
    //     console.log('List of events on calendar within time-range:');
    //     console.log(json);
    //   }).catch(err => {
    //     //Error
    //     console.log('Error: listSingleEvents -' + err.message);
    //   });
})

module.exports = router