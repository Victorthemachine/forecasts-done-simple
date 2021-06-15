const mongoose = require("mongoose");

const { Schema } = mongoose;

const currentWeatherSchema = new Schema(
    {
        lon: Number,
        lat: Number,
        json: String
    }, { timestamps: true }
);

const CurrentWeather = mongoose.model("CurrentWeather", currentWeatherSchema);

module.exports = CurrentWeather;