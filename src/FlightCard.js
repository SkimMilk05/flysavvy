import React, { Component } from 'react';
import './flightCard.css';
import FlightTrip from './FlightTrip'

class FlightCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            round_trip: this.props.round_trip,
            best_price: this.props.best_price,
            price: this.props.price,
            currency: this.props.currency,
            outbound: this.props.outbound,
            inbound: this.props.inbound
        };
    }

    render() {
        
        const price = this.state.price;
        const currency = this.state.currency;

        return (
            <div className="flight-card">
                <div className="card w-75">
                    <div className="card-body">
                        Heres some flight information
                        Price: {currency + price}
                    </div>
                </div>
            </div>
        );
        
    }
}

export default FlightCard;