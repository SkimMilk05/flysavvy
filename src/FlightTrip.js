import React, { Component } from 'react';
//import './flightTrip.css';
import {dateToStringDisplay} from './dateToString.js' //date to String function

class FlightTrip extends Component {

    constructor(props) {
        super(props);
        this.state = { //fields
            nonstop: this.props.nonstop,
            airline: this.props.airline,
            departDate: dateToStringDisplay(this.props.departDate),
            leavingFrom: this.props.leavingFrom,
            arrivingTo: this.props.arrivingTo,

        }
    }

    render() {

        const {nonstop, airline, departDate, leavingFrom, arrivingTo} = this.state;
        return(
            <div>
                {nonstop && "Direct flight"}
                {!nonstop && "Non direct"}
                depart: {departDate}
                airline: {airline}
                leaving From: {leavingFrom}
                arrivingTo: {arrivingTo}

            </div>
        );
        
    }
}

export default FlightTrip;