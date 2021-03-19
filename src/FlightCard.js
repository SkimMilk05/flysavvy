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
            <div className={this.props.i === 0? "flight-card card border-success w-100 shadow-sm": "flight-card card border-secondary w-100 shadow-sm"} key={this.props.i}>
                <div className="card-body m-0 p-0">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="row">
                                    <div className="col leg-info m-0 p-0">
                                        <FlightTrip 
                                            nonstop={outbound.nonStop} 
                                            airline={outbound.airline.Name}  
                                            departDate={outbound.departDate} 
                                            leavingFrom={outbound.leavingFrom} 
                                            arrivingTo={outbound.arrivingTo}
                                        />
                                    </div>
                                </div>
                                {inbound_exists?  
                                <div className="row">
                                    <div className="col border-top leg-info m-0 p-0">
                                       <FlightTrip 
                                        nonstop={inbound.nonStop} 
                                        airline={inbound.airline.Name}  
                                        departDate={inbound.departDate} 
                                        leavingFrom={inbound.leavingFrom} 
                                        arrivingTo={inbound.arrivingTo}
                                    />
                                    </div>
                                </div>
                                : null}
                            </div>
                            <div className="d-flex col-4 border-left">
                                <div className="trip-info my-auto mx-auto">
                                    <h2 className="price">{this.props.currency + this.props.price}</h2>
                                    <h6 className="trip">{this.props.round_trip? "Round trip": "One way"}</h6>
                                    <h5 className="best-price"><span className="badge badge-success">{this.props.best_price && "Best price!"}</span></h5>
                                </div>
                                
                            </div>
                        </div>
                    </div>             
                </div>
            </div>
        );
        
    }
}

export default FlightCard;