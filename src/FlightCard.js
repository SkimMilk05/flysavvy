import React, { Component } from 'react';
import './flightCard.css';
import FlightTrip from './FlightTrip';

class FlightCard extends Component {

    render() {
        console.log("rendered flight cards")
        const outbound = this.props.outbound;
        const inbound = this.props.inbound;

        const inbound_exists = (typeof inbound !== 'undefined')? true: false;

        return (
            <div className="flight-card card w-100" key={this.props.i}>
                <div className="card-body">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="row">
                                    <div className="col leg-info">
                                        <FlightTrip 
                                            nonstop={outbound.nonStop} 
                                            airline={outbound.airline.Name}  
                                            departDate={outbound.departDate} 
                                            leavingFrom={`${outbound.leavingFrom.Name} ${outbound.leavingFrom.Type}`} 
                                            arrivingTo={`${outbound.arrivingTo.Name} ${outbound.arrivingTo.Type}`}
                                        />
                                    </div>
                                </div>
                                {inbound_exists?  
                                <div className="row border-top">
                                    <div className="col leg-info">
                                       <FlightTrip 
                                        nonstop={inbound.nonStop} 
                                        airline={inbound.airline.Name}  
                                        departDate={inbound.departDate} 
                                        leavingFrom={`${inbound.leavingFrom.Name} ${inbound.leavingFrom.Type}`} 
                                        arrivingTo={`${inbound.arrivingTo.Name} ${inbound.arrivingTo.Type}`}
                                    />
                                    </div>
                                </div>
                                : null}
                            </div>
                            <div className="col-4 trip-info border-left">
                                <h4 className="price">{this.props.currency + this.props.price}</h4>
                                <h6 className="trip">{this.props.round_trip? "Round trip": "One way"}</h6>
                                <h5 className="best-price">{this.props.best_price && "Best price!"}</h5>
                            </div>
                        </div>
                    </div>             
                </div>
            </div>
        );
        
    }
}

export default FlightCard;