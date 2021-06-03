var express = require('express');
var router = express.Router();

const apiConfig = require('./../apiConfig.json');
const axios = require('axios');

router.post('/:option', function (req, res, next) {
    //should add token verification. Unnecessary right now though!
    let responded = false;
    switch (req.params.option) {
        case 'forecast':
            if (apiConfig) {
                //add call into db to check if it has a fresh record!
                //Currently it will call each time for testing purpose
                let city = 'prague';
                if (req.query) {
                    if (req.query.city) {
                        city = req.query.city;
                    } else {
                        //TODO add longitude and lattitude extraction
                    }
                }
                const URL = `http://${apiConfig.openweather.address}?q=${city}&appid=${apiConfig.openweather.apiKey}`;
                axios.get(URL)
                    .then(response => {
                        console.log(response.data);
                        responded = true;
                        return res.send(response.data);
                    })
                    .catch(err => {
                        console.error(err);
                        if (responded === false) {
                            responded = true;
                            return res.send('Error!');
                        }
                    })
                    .then(handle => {
                        //TODO: handle other error codes
                        console.log(handle);
                        if (responded === false) {
                            responded = true;
                            return res.send('Exception!');
                        }
                    })
            }
            break;
        case 'map':
            if (apiConfig) {

            }
    }

});

module.exports = router;
