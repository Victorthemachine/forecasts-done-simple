import React from 'react';
import Switch from 'react-switch';
import { ThemeProvider } from "styled-components";

import { GlobalStyles } from "../components/globalStyle";
import { lightTheme, darkTheme } from "../components/Theme"
import settingsCSS from '../styles/settings.css';

class Landing extends React.Component {

    //rework darkmode var to redux
    constructor(props) {
        super(props);
        this.state = {
            darkmode: true
        };
        this.slideButtonHandler = this.slideButtonHandler.bind(this);
    }

    componentDidMount() {
    }

    slideButtonHandler(checked, event, id) {
        this.setState({ darkmode: checked });
    }

    render() {
        return (
            <ThemeProvider theme={this.state.darkmode === false ? lightTheme : darkTheme}>
                <GlobalStyles />
                <div style={settingsCSS}>
                    <h1>Settings</h1>
                    <table>
                        <tr>
                            <td>
                                <label>Darkmode: </label>
                            </td>
                            <td>
                                <Switch onChange={this.slideButtonHandler} checked={this.state.darkmode} />
                            </td>
                        </tr>
                    </table>
                </div>
            </ThemeProvider>
        );
    }
}

export default Landing;