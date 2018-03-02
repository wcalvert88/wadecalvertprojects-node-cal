const express = require('express')
const router = express.Router()
const app = require('../app')
console.log("Search controller started")

router.get('/search', function(req, res) {
    console.log("app", app)
    console.log("req.param", req.param)
})

module.exports = router