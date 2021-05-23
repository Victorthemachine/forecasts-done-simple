var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    //Option to add status handler: updating, downtime, maintanence etc.
    res.send({ status: 'working' });
});

module.exports = router;
