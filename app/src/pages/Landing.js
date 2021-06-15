import React from 'react';
import axios from 'axios';
import config from '../config.json';

import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../components/globalStyle";
import { lightTheme, darkTheme } from "../components/Theme"
import ForecastElement from '../components/ForecastElement';
import Clock from '../components/_Clock';

class Landing extends React.Component {

    constructor(props) {
        console.log(typeof localStorage.getItem('darkmode'));
        super(props);
        this.state = {
            currentForecast: "Fetching...",
            weeklyForecast: "Fetching...",
            timezone: "Fetching...",
            unix: 'Fetching...',
            darkmode: localStorage.getItem('darkmode') === 'true' ? true : false,
            location: {
                lon: '',
                lat: ''
            }
        };
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position, error) => {
            let address;
            if (error) {
                address = `http://${config.address}:${config.port}/secure/forecast?city=london`;
            } else {
                address = `http://${config.address}:${config.port}/secure/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}`;
            }
            axios.post(address)
                .then(res => {
                    const { timezone, data: { dt, weather, main, name } } = res;
                    const mainForecast = <div style={{ 'display': 'inline-block', 'margin': '20px' }}>
                        <h1>{name}</h1>
                        <h2>{weather[0].main}</h2>
                        <h2>{weather[0].description}</h2>
                        <h2>{Math.floor(main.temp - 273.15)} °C</h2>
                    </div>;
                    this.setState({ currentForecast: mainForecast, timezone: timezone, unix: dt });
                })
                .catch(err => {
                    console.error(err);
                })
            axios.post(`http://${config.address}:${config.port}/secure/weekly?lon=${position.coords.longitude}&lat=${position.coords.latitude}`)
                .then(response => {
                    const { data: { daily } } = response;
                    const forecastTable = [];
                    daily.forEach(el => {
                        forecastTable.push(<ForecastElement
                            date={el.dt}
                            main={el.weather[0].main}
                            desc={el.weather[0].description}
                            timezone={this.state.timezone}
                        />);
                    })
                    this.setState({ weeklyForecast: forecastTable });
                })
                .catch(err => {
                    console.error(err);
                })
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
            this.setState();
        });
    }

    render() {
        console.log(this.state.timezone);
        return (
            <ThemeProvider theme={this.state.darkmode === false ? lightTheme : darkTheme}>
                <GlobalStyles />
                <div style={{ 'align': 'center' }}>
                    <div style={{ 'display': 'flex', 'align-items': 'center', 'justify-content': 'space-around' }}>
                        <Clock timezone={this.state.timezone} unix={this.state.unix} />
                        {this.state.currentForecast}
                    </div>
                    <div style={{ 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                        {this.state.weeklyForecast}
                    </div>
                </div>
            </ThemeProvider>
        );
    }
}

export default Landing;