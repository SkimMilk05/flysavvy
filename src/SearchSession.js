import React, { Component } from 'react';
import SearchCard from './SearchCard';
import FlightCard from './FlightCard';
import Filter from './Filter';
import NoResults from './NoResults';
import LoadImage from './LoadImage';

import './searchSession.css'

/*
 *SearchSession Logic
 * 0. At first, only render searchCard
 *      searchCard sends up flight data based on user's search inputs
 * 1. After obtaining flight data from searchCard, create array of flightCard components and create a separate 
 * reverse array.
 * 2. Render filter (set to lowest to highest) and flight_cards array
 * 3. Change between rendering flight_card or reverse_cards based on changes to the Filter
 * 4. User has option to enter new search in searchCard. Onsubmit on searchCard, repeat the process again with new results. 
 */

class SearchSession extends Component {
    constructor(props) {
        super(props);
        this.state = { //fields
            start_load: false, 
            submitted: false, 
            flight_cards: [],
            reverse_cards: [], //store reversed flight cards so I don't have to sort array every time filter changes
            filter_high_to_low: false, //default low to high
            book: false

        }
        this.catchStartLoad = this.catchStartLoad.bind(this);
        this.catchFlightData = this.catchFlightData.bind(this);
        this.catchFilterData = this.catchFilterData.bind(this);
        this.catchBook = this.catchBook.bind(this);
    }

    //get when to load from SearchCard
    catchStartLoad = (startLoad) => {
        this.setState({start_load: startLoad});
    }

    //get when to "redirect" to book flights from FlightCard
    catchBook = (book) => {
        this.setState({book: book});
    }

    //get flight data from SearchCard and initialize flight cards/reverse cards array
    catchFlightData = (flightData) => {
        console.log('Set flight Data!');
        const array = flightData.map((flight, i) => ( //make flight cards array
            <FlightCard passBook = {this.catchBook} key={i} i={i} round_trip={flight.round_trip} best_price={flight.best_price} price={flight.price} currency={flight.currency} outbound={flight.outbound} inbound={flight.inbound} />
        ));
        this.setState({ 
            submitted: true,
            flight_cards: array, //store arrays
            reverse_cards: array.slice().reverse() //reverse method is in-place (mutates original array). Use slice() to make a copy of array     
        });
        this.props.passSubmitData(true); //let background know that first search has been done
        console.log('Set state!');
    }

    //get whether to filter low to high, or high to low from Filter component
    catchFilterData = (high_to_low) => {
        this.setState({filter_high_to_low: high_to_low});
        console.log(high_to_low);
    }

    render() {
        const start_load = this.state.start_load;
        const submitted = this.state.submitted;
        const flight_cards = this.state.flight_cards;
        const reverse_cards = this.state.reverse_cards;
        const filter_high_to_low = this.state.filter_high_to_low;
        const book = this.state.book;

        const no_results = (flight_cards.length === 0 && submitted) ? true : false;

        //if this is the user's first search, have the card in the middle, with no filter and flight cards loaded
        //if user clicked search button, but the flight information is still loading, render load image + top card. When flight cards are ready, render them instead of the load image. If there are no flight cards, render NoResutls component
        //if user clicked "book flights," render booking load image when the page "redirects"
        return (
            <div className={start_load ? 'search-sesion': 'begin-session d-flex align-items-center'}>

                <SearchCard passStartLoad = {this.catchStartLoad} passFlightData = {this.catchFlightData}/>

                {((start_load && !submitted) || book)  &&
                    <div className="d-flex load-page">
                        <div className="mx-auto my-auto">
                            <LoadImage book = {this.state.book}/>
                        </div>
                    </div>
                } 
                {(start_load && submitted && !book) &&
                    <div className='row'>
                        <div className='col-3 scrollable results'>
                            <Filter passFilterData = {this.catchFilterData}/>
                        </div>
                        <div className='col scrollable results'>
                            {no_results && <NoResults />}
                            {filter_high_to_low? reverse_cards : flight_cards}
                        </div>
                    </div> 
                }
                
            </div>
            
        );
    }

}

export default SearchSession;