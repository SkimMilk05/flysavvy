import React, { Component } from 'react';
import './flightCard.css';
import FlightTrip from './FlightTrip'

class FlightCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            round_trip: true,
            best_price: false,
            flight_trips: 'Hello me'
        };
    }

    render() {
        
        const data = this.state.flight_trips;

        return (
            <div className="flight-card">
                <div className="card w-75">
                    <div className="card-body">
                        Heres some flight information
                        <FlightTrip dataParentToChild={data} />
                    </div>
                </div>
            </div>
        );
        
    }
}

export default FlightCard;