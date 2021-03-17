import React, { Component } from 'react';
import './flightCard.css';
import FlightTrip from './FlightTrip';

class FlightCard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        console.log("rendered flight cards")
        const outbound = this.props.outbound;
        const inbound = this.props.inbound;

        if (typeof inbound !== 'undefined') {
            var inbound_exists = true;
        }

        return (
            
            <div className="flight-card" key={this.props.key}>
                <div className="card w-75">
                    <div className="card-body">
                        Heres some flight information
                        Price: {this.props.currency + this.props.price}
                        {this.props.round_trip && "Round trip"}
                        {!this.props.round_trip && "One way"}
                        {this.props.best_price && "Best price!"}
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