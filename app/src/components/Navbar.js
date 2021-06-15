import { withRouter } from 'react-router-dom';
import { Component } from 'react';
import styleSheet from './../styles/navbar.css';

class Navbar extends Component {
    constructor(props) {
        super(props);
        const nameArray = [];
        const routeArray = [];
        for (let i in props.components) {
            nameArray.push(i);
            routeArray.push(props.components[i]);
        }

        const navbarButtons = nameArray.map((el, index) => {
            let className = index === 0 ? 'first' : index === nameArray.length - 1 ? 'last' : 'between';
            return <button onClick={() => { this.props.history.push(routeArray[index]) }} class={className}>{el}</button>;
        });
        this.state = {
            index: 0,
            names: nameArray,
            routes: routeArray,
            navbarButtons: navbarButtons,
        }
    }
    render() {
        return (
            <div class={'navbar'} style={styleSheet}>
                {this.state.navbarButtons}
            </div>
        );
    }
}

export default withRouter(Navbar);