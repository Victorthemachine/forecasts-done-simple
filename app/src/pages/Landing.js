import React from 'react';
import axios from 'axios';
import config from '../config.json';

class Landing extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: "Fetching..."
        };
    }

    componentDidMount() {
        axios.post(`http://${config.address}:${config.port}/secure/forecast?city=london`)
            .then(res => {
                console.log('===============================');
                console.log(res);
                console.log('===============================');
                const { data: { weather, name } } = res;
                this.setState({ data: `${name}: ${weather[0].main}` });
            })
            .catch(err => {
                console.error(err);
            })
    }

    render() {
        return <h1>{this.state.data}</h1>;
    }
}

export default Landing;