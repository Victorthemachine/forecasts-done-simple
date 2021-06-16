import { Component } from 'react';
import styleSheet from './../styles/footer.css';

class Navbar extends Component {

    render() {
        return (
            <div class='mainDiv' style={styleSheet}>
                <div style={{ 'display': 'inline-block', 'margin': '20px' }}>
                    <p>Created by yours truly, David "Nya~san" Mitić</p>
                </div>
                <div style={{ 'display': 'inline-block', 'margin': '20px' }}>
                    <a href='https://github.com/Victorthemachine/forecasts-done-simple'>Repository</a>
                </div>
                <div style={{ 'display': 'inline-block', 'margin': '20px' }}>
                    <p>Powered by <a href='https://openweathermap.org/'>openweather</a></p>
                </div>
            </div>
        );
    }
}

export default Navbar;