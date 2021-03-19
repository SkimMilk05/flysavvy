import React, { Component } from 'react';
import './flightTrip.css';
import {dateToStringDisplay} from './dateToString.js' //date to String function

class FlightTrip extends Component {

    constructor(props) {
        super(props);
        this.state = { //fields
            nonstop: this.props.nonstop,
            airline: this.props.airline,
            departDate: dateToStringDisplay(this.props.departDate),
            leavingFromName: this.props.leavingFrom.Name,
            arrivingToName: this.props.arrivingTo.Name,
            leavingFromAbb: this.props.leavingFrom.IataCode,
            arrivingToAbb: this.props.arrivingTo.IataCode
        }
    }

    render() {

        const {nonstop, airline, departDate, leavingFromName, arrivingToName, leavingFromAbb, arrivingToAbb} = this.state;

        return(
            <div className="container flight-trip p-0">
                <div className="card-body">
                <div className="row">
                    <div className="col">
                        {departDate}
                    </div>
                </div>
                <div className="row my-4">
                    <div className="d-flex col-4 m-0 p-0">
                        <div className="airport-info my-auto mx-auto">
                            <h3>{leavingFromAbb}</h3>
                            <p>{leavingFromName}</p>
                        </div>
                    </div>
                    <div className="col m-0 p-0">
                        <hr/>
                    </div>
                    <div className="d-flex col-4 m-0 p-0 my-auto mx-auto">
                        <div className="airport-info my-auto mx-auto">
                            <h3>{arrivingToAbb}</h3>
                            <p>{arrivingToName}</p>
                        </div>
                        
                    </div>
                </div>
                <div className="row">
                    <div className="col d-flex justify-content-between align-items-center">
                        {/* Airline */} <h6><i class="fas fa-paper-plane"></i> {airline}</h6>
                        {nonstop? <h6>Direct flight</h6> : <h6>Non direct</h6>}
                    </div>
                </div>
                </div>
            </div>
        );
        
    }
}

export default FlightTrip;