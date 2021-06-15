import { Component } from 'react';
import Moment from 'react-moment';

class ForecastElement extends Component {

    formatTime(unix) {
        console.log(unix);
        const date = new Date(unix);
        switch (date.getDay()) {
            case 0:
                return "Monday";
            case 1:
                return "Tuesday";
            case 2:
                return "Wednesday";
            case 3:
                return "Thursday";
            case 4:
                return "Friday";
            case 5:
                return "Saturday";
            case 6:
                return "Sunday";
            default:
                console.error('Wtf is wrong with your time bruv');
        }
    }

    render() {
        return (
            <div style={{ 'align': 'center' }}>
                <div style={{ 'display': 'inline-block', 'margin': '20px' }}>
                    <h1 style={{ 'color': '#ff8000' }}>
                        <Moment format='dddd' unix>{this.props.date}</Moment>
                    </h1>
                </div>
                <div style={{ 'display': 'inline-block', 'margin': '20px' }}>
                    <h1>
                        {this.props.main}
                    </h1>
                    <br />
                    <h2>
                        {this.props.desc}
                    </h2>
                </div>
            </div >
        );
    }
}

export default ForecastElement;