var express = require('express');
var router = express.Router();

const apiConfig = require('./../apiConfig.json');
const axios = require('axios');
const { CurrentWeather, WeeklyWeather } = require('../lib/schematics');

router.post('/:option', function (req, res, next) {
    //should add token verification. Unnecessary right now though!
    let responded = false;
    switch (req.params.option) {
        case 'forecast':
            if (apiConfig) {
                //add call into db to check if it has a fresh record!
                //Currently it will call each time for testing purpose
                let city;
                let lat;
                let lon;
                if (req.query) {
                    if (req.query.city) {
                        city = req.query.city;
                    } else {
                        lat = req.query.lat;
                        lon = req.query.lon;
                    }
                }
                let URL;
                let rejects = {};
                let map = {};
                if (city) {
                    URL = `http://${apiConfig.openweather.address}/weather?q=${city}&appid=${apiConfig.openweather.apiKey}`;
                } else {
                    URL = `http://${apiConfig.openweather.address}/weather?lat=${lat}&lon=${lon}&appid=${apiConfig.openweather.apiKey}`;
                }
                if (lat && lon) {
                    console.log('Starting to iterate');
                    CurrentWeather.find({ lon: lon, lat: lat }, (err, weatherReports) => {
                        if (err) console.error(err);
                        if (weatherReports.length > 0) {
                            weatherReports.forEach((report) => {
                                if (new Date(report.createdAt).getTime() + 3600000 <= Date.now()) {
                                    rejects[report._id] = report;
                                } else {
                                    map[report._id] = report;
                                }
                            });
                        }
                    }).then(() => {
                        if (Object.keys(rejects).length > 0) {
                            console.log('Rejects!');
                            for (let i in rejects) {
                                CurrentWeather.findByIdAndRemove(i, (error, data) => {
                                    if (error) console.error(error);
                                })
                            }
                        }

                        if (Object.keys(map).length === 0) {
                            console.log('Is empty on the first route!');
                            axios.get(URL)
                                .then(response => {
                                    responded = true;
                                    CurrentWeather.create({ lon: lon, lat: lat, json: JSON.stringify(response.data) }, (error, data) => {
                                        if (error) console.error(error);
                                        console.log('Created a report Jawohl!');
                                    });
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
                                    if (responded === false) {
                                        responded = true;
                                        return res.send('Exception!');
                                    }
                                })
                        } else {
                            let firstKey = Object.keys(map)[0];
                            res.send(JSON.parse(map[firstKey].json));
                        }
                    })
                } else {
                    axios.get(URL)
                        .then(response => {
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
                            if (responded === false) {
                                responded = true;
                                return res.send('Exception!');
                            }
                        })
                }
            }
            break;
        case 'weekly':
            if (apiConfig) {
                //add call into db to check if it has a fresh record!
                //Currently it will call each time for testing purpose
                let lat;
                let lon;
                if (req.query) {
                    lat = req.query.lat;
                    lon = req.query.lon;
                }
                let URL;
                if (lat && lon) {
                    URL = `http://${apiConfig.openweather.address}/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${apiConfig.openweather.apiKey}`;
                } else {
                    return res.send('Invalid request. No location supplied!')
                }

                let rejects = {};
                let map = {};
                console.log('Starting to iterate');
                WeeklyWeather.find({ lon: lon, lat: lat }, (err, weatherReports) => {
                    if (err) console.error(err);
                    if (weatherReports.length > 0) {
                        weatherReports.forEach((report) => {
                            if (new Date(report.createdAt).getTime() + 3600000 <= Date.now()) {
                                rejects[report._id] = report;
                            } else {
                                map[report._id] = report;
                            }
                        });
                    }
                }).then(() => {
                    if (Object.keys(rejects).length > 0) {
                        console.log('Rejects!');
                        for (let i in rejects) {
                            WeeklyWeather.findByIdAndRemove(i, (error, data) => {
                                if (error) console.error(error);
                            })
                        }
                    }

                    if (Object.keys(map).length === 0) {
                        console.log('Is empty on the first route!');
                        axios.get(URL)
                            .then(response => {
                                responded = true;
                                WeeklyWeather.create({ lon: lon, lat: lat, json: JSON.stringify(response.data) }, (error, data) => {
                                    if (error) console.error(error);
                                    console.log('Created a report Jawohl!');
                                });
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
                                if (responded === false) {
                                    responded = true;
                                    return res.send('Exception!');
                                }
                            })
                    } else {
                        let firstKey = Object.keys(map)[0];
                        res.send(JSON.parse(map[firstKey].json));
                    }
                })
            }
            break;
        case 'map':
            if (apiConfig) {
                res.send(`https://tile.openweathermap.org/map/temp_new/0/0/0.png?appid=${apiConfig.openweather.apiKey}`)
            }
            break;
        default:
            res.send('Error, route doesn\'t exist!');
    }

});

module.exports = router;
