import React, { Component } from 'react';
import './flightCard.css';

class FlightCard extends Component {

    constructor(props) {
        super(props);
        this.state = { //fields
            nonStop: false,
            roundTrip: true,
            airline: '',
            departTime: '',
            arriveTime: '',
            leavingFrom: '',
            goingTo: '',
            price: 0.00,


            bestPrice: false,
        }
    }

    render() {

        var onTop = this.state.onTop;

        
        return (
            <div className="flight-card">
                <div className="card">
                    <div className="card-body">
                        Heres some flight information
                    </div>
                </div>
            </div>
        );
        
    }
}

export default FlightCard;