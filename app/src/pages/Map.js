import React from 'react';
import axios from 'axios';
import config from '../config.json';

import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../components/globalStyle";
import { lightTheme, darkTheme } from "../components/Theme"

class Landing extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            darkmode: localStorage.getItem('darkmode') === 'true' ? true : false,
            imgPath: ''
        };
    }

    componentDidMount() {
        let address = `http://${config.address}:${config.port}/secure/map`;;
        axios.post(address)
            .then(res => {
                this.setState({ imgPath: res.data });
            })
            .catch(err => {
                console.error(err);
            })
    }

    render() {
        return (
            <ThemeProvider theme={this.state.darkmode === false ? lightTheme : darkTheme}>
                <GlobalStyles />
                <img src={this.state.imgPath} alt='uhhh....' style={{ 'height': '80vh', 'object-fit': 'contain' }}></img>
            </ThemeProvider>
        );
    }
}

export default Landing;