import React, { Component } from 'react';
import SearchCard from './SearchCard';
import FlightCard from './FlightCard';
import Filter from './Filter';
import NoResults from './NoResults';

import './searchSession.css'

class SearchSession extends Component {
    constructor(props) {
        super(props);
        this.state = { //fields
            submitted: false,
            flight_cards: [],
            reverse_cards: [], //store reversed flight cards so I don't have to sort array every time filter changes
            filter_high_to_low: false //default low to high

        }
        this.catchFlightData = this.catchFlightData.bind(this);
        this.catchFilterData = this.catchFilterData.bind(this);
    }

    catchFlightData = (flightData) => {
        console.log('Set flight Data!');
        const array = flightData.map((flight, i) => (
            <FlightCard key={i} i={i} round_trip={flight.round_trip} best_price={flight.best_price} price={flight.price} currency={flight.currency} outbound={flight.outbound} inbound={flight.inbound} />
        ));
        this.setState({
            submitted: true,
            flight_cards: array,
            reverse_cards: array.slice().reverse() //reverse method is in-place (mutates original array). Use slice() to make a copy of array     
        });
        this.props.passSubmitData(true);
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

        const no_results = (flight_cards.length === 0 && submitted) ? true : false;

        return (
            <div className={submitted ? 'search-sesion': 'begin-session d-flex align-items-center'}>

                <SearchCard passFlightData = {this.catchFlightData}/>


                {submitted? 
                    <div className='row results'>
                        <div className='col-3'>
                            <Filter passFilterData = {this.catchFilterData}/>
                        </div>
                        <div className='col scrollable'>
                            {no_results && <NoResults />}
                            {filter_high_to_low? reverse_cards : flight_cards}
                        </div>
                    </div> 
                    : null
                }
                
            </div>
            
        );

        if (submitted) {
            return (
            <div className='search-session'>
                <div className='row'>
                    <div className='col'>
                        <SearchCard passFlightData = {this.catchFlightData}/>
                    </div>
                </div>
                <div className='row results'>
                    <div className='col-3'>
                        <Filter passFilterData = {this.catchFilterData}/>
                    </div>
                    <div className='col scrollable'>
                        {no_results && <NoResults />}
                        {filter_high_to_low? reverse_cards : flight_cards}
                    </div>
                </div>
                
                
            </div>
            );
        } else {
            return (
                <div className='begin-session d-flex align-items-center'>
                    <SearchCard passFlightData = {this.catchFlightData}/>
                </div>
            );
        }
    }

}

export default SearchSession;