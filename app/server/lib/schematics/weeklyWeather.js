const mongoose = require("mongoose");

const { Schema } = mongoose;

const weeklyWeatherSchema = new Schema(
    {
        lon: Number,
        lat: Number,
        json: String
    }, { timestamps: true }
);

const WeeklyWeather = mongoose.model("WeeklyWeather", weeklyWeatherSchema);

module.exports = WeeklyWeather;