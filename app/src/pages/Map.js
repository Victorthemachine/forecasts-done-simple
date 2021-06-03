import React from 'react';
import axios from 'axios';
import config from '../config.json';

class Landing extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            motd: "Hewwo I luv you <3"
        };
    }

    componentDidMount() {
    }

    render() {
        return <h1>{this.state.motd}</h1>;
    }
}

export default Landing;