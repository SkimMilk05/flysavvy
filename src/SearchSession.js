import React, { Component } from 'react';
import SearchCard from './SearchCard';
import FlightCard from './FlightCard';
import Filter from './Filter';

class SearchSession extends Component {
    constructor(props) {
        super(props);
        this.state = { //fields
            submitted: false,
            flight_cards: [],
            reverse_cards: [], //store reversed flight cards so I don't have to sort array every time filter changes
            filter_high_to_low: false //default low to high

        }
    }

    catchFlightData = (flightData) => {
        console.log('Set flight Data!');
        const array = flightData.map((flight) => (
            <FlightCard key={flight.key} round_trip={flight.round_trip} best_price={flight.best_price} price={flight.price} currency={flight.currency} outbound={flight.outbound} inbound={flight.inbound} />
        ));
        this.setState({
            submitted: true,
            flight_cards: array,
            reverse_cards: array.slice().reverse() //reverse method is in-place (mutates original array). Use slice() to make a copy of array     
        });
        console.log('Set state!');
    }

    catchFilterData = (high_to_low) => {
        this.setState({filter_high_to_low: high_to_low});
        console.log(high_to_low);
    }

    render() {
        const submitted = this.state.submitted;
        const flight_cards = this.state.flight_cards;
        const reverse_cards = this.state.reverse_cards;
        const filter_high_to_low = this.state.filter_high_to_low;

        return (
            <div>
                <SearchCard passFlightData = {this.catchFlightData}/>
                {!filter_high_to_low && flight_cards}
                {filter_high_to_low && reverse_cards}
                {submitted && <Filter passFilterData = {this.catchFilterData}/>}
            </div>
            
        );
    }

}

export default SearchSession;