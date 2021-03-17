import React, { Component } from 'react';
import './flightCard.css';
import FlightTrip from './FlightTrip';

class FlightCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            key: this.props.key,
            round_trip: this.props.round_trip,
            best_price: this.props.best_price,
            price: this.props.price,
            currency: this.props.currency,
            outbound: this.props.outbound,
            inbound: this.props.inbound
        };

        console.log(this.state.outbound);
    }

    render() {
        const {key, round_trip, best_price, price, currency, outbound, inbound} = this.state;

        if (typeof inbound !== 'undefined') {
            var inbound_exists = true;
        }

        return (
            <div className="flight-card" key={key}>
                <div className="card w-75">
                    <div className="card-body">
                        Heres some flight information
                        Price: {currency + price}
                        {round_trip && "Round trip"}
                        {!round_trip && "One way"}
                        {best_price && "Best price!"}
                        {<FlightTrip 
                            nonstop={outbound.nonStop} 
                            airline={outbound.airline.Name}  
                            departDate={outbound.departDate} 
                            leavingFrom={`${outbound.leavingFrom.Name} ${outbound.leavingFrom.Type}`} 
                            arrivingTo={`${outbound.arrivingTo.Name} ${outbound.arrivingTo.Type}`}
                        />}

                        {inbound_exists && <FlightTrip 
                            nonstop={inbound.nonStop} 
                            airline={inbound.airline.Name}  
                            departDate={inbound.departDate} 
                            leavingFrom={`${inbound.leavingFrom.Name} ${inbound.leavingFrom.Type}`} 
                            arrivingTo={`${inbound.arrivingTo.Name} ${inbound.arrivingTo.Type}`}
                        />}
                    </div>
                </div>
            </div>
        );
        
    }
}

export default FlightCard;