import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Maps from './pages/Map';
import Settings from './pages/Settings';

import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { Provider } from 'react-redux';
import store from './redux/store';

if (localStorage.getItem('darkmode') !== 'true' && localStorage.getItem('darkmode') !== 'false') {
  localStorage.setItem('darkmode', true);
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Navbar components={
          {
            "Home": "/",
            "Maps": "/maps",
            "Settings": "/settings",
          }
        } />
        <Switch>
          <Route exact path='/'>
            <Landing />
          </Route>
          <Route path='/maps'>
            <Maps />
          </Route>
          <Route path='/settings'>
            <Settings />
          </Route>
        </Switch>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
