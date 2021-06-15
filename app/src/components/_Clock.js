import React from 'react';
import Clock from 'react-live-clock';
import Moment from 'react-moment';

export default class _Clock extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      timezone: props.timezone === 'Fetching...' ? 'US/Pacific' : props.timezone
    }
    //moment.tz.add(this.state.timezone);
  }

  render() {
    console.log('============SUS==============');
    console.log(this.state);
    console.log('=============================');
    return (
      <div style={{ 'align': 'center' }}>
        <div style={{ 'display': 'inline-block', 'margin': '20px' }}>
          <h1>
            <Moment format='YYYY/MM/DD' unix>{this.props.unix}</Moment>
          </h1>
        </div>
        <div style={{ 'display': 'inline-block', 'margin': '20px' }}>
          <h1>
            <Clock format={'HH:mm:ss'} ticking={true} timezone={this.state.timezone} />
          </h1>
        </div>
      </div >
    )
  }
}