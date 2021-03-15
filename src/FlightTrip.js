import React, { Component } from 'react';
//import './flightTrip.css';
import {dateToString} from './dateToString.js' //dateToStringFunction

class FlightTrip extends Component {

    constructor(props) {
        super(props);
        this.state = { //fields
            outbound: true,
            nonStop: true,
            airline: '',
            departDate: '',
            leavingFrom: '',
            arrivingTo: '',
            price: 0.00,

            data: this.props.dataParentToChild
        }
    }

    render() {

        const data = this.state.data;
        console.log("My data:" + data);
        return(
            <div>
                {data}
            </div>
        );
        
    }
}

export default FlightTrip;