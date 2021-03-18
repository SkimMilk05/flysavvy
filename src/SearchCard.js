import React, { Component } from 'react';

//import personal css
import "./searchCard.css";

//import form components 
import DatePicker from "react-datepicker"; //date picker
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select'; //select and search
import AsyncSelect from 'react-select/async';
import Toggle from 'react-toggle'; //for toggle for round trip
import "react-toggle/style.css"; 
import {dateToStringAPI} from './dateToString.js'

/*
 *Application Logic
 * 0. When component mounts
 *      load countries - GET list markets
 *      load currencies - GET currencies
 * 1. User types in place
 *     when they type in input, send api request to find places list.
 *     user chooses a place. destination is the ID that skyscanner uses. 
 * 2. After you return places list, send request to browse dates/quotes to get flight information
 * 3. After you obtain flight information, pass on the data to flightCard components and load. 
 *     
 */

class SearchCard extends Component {

    constructor(props) {
        super(props);
        this.state = { //fields
            submitted: false,
            round_trip: true,

            country: 'US', //set default to US. Other countries work with US query 
            origin: '',
            destination: '',
            outbound: new Date(),
            inbound: new Date(),
            currency: 'USD',
            locale: 'en-US',

            countries_loaded: false,
            currencies_loaded: false,

            flight_info: null

            
            
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getFlightInfo = this.getFlightInfo.bind(this);
        this.getCurrencies = this.getCurrencies.bind(this);
        this.getCountries = this.getCountries.bind(this);
        this.loadPlaces = this.loadPlaces.bind(this);
        this.cleanFlightInfo = this.cleanFlightInfo.bind(this);
    }

    //get list of countries and currencies accepted by Skyscanner on mount
    componentDidMount() {
        this.getCountries();
        this.getCurrencies();
    }

/** FORM METHODS */
    //this method makes API call to get list of acceptable countries
    getCountries() {
        fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/reference/v1.0/countries/en-US", {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "73c4c7b9e4msh0a2357717fa16ddp1db3bdjsn8cef95e5049c",
                "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
            }
        })
        .then(response => {
            console.log(response);
            return response.json();
        })
        .then(json => {
            console.log(json);
            const countries = json.Countries.map(function (cnt) {
                return { value: cnt.Code, label: cnt.Name };
            });
            this.setState({
                country_list: countries,
                countries_loaded: true
            });
        })
    }

    //this method makes API call to get list of acceptable currencies
    getCurrencies() {
        fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/reference/v1.0/currencies", {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-key": "73c4c7b9e4msh0a2357717fa16ddp1db3bdjsn8cef95e5049c",
                        "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
                    }
        })
        .then(response => {
            console.log(response);
            return response.json();
        })
        .then(json => {
            console.log(json);
            var currencies = json.Currencies.map(function (curr) {
                return { value: curr.Code, label: `(${curr.Symbol}) ${curr.Code}`};
            });
            this.setState({
                currency_list: currencies,
                currencies_loaded: true
            });
        })
    }


    //this method asynchronously loads list of acceptable places based on user's query input frpm the API call
    async loadPlaces(inputValue) {
        var country = this.state.country;
        var locale = this.state.locale;
        var currency = this.state.currency;

        const response = await fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/${country}/${currency}/${locale}/?query=${inputValue}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "73c4c7b9e4msh0a2357717fa16ddp1db3bdjsn8cef95e5049c",
                "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
            }
        });
        console.log(response);
        const json = await response.json();
        return json.Places.map(function (place) {
            return { value: place.PlaceId, label: place.PlaceName };
        });
    }

/** HANDLE CHANGE TO FORM AND HANDLE FORM SUBMIT METHODS */

       //handle any changes to the form
       handleChange(selecter, event) {
        if (selecter === "round-trip-selecter") {
            this.setState({round_trip: !(event.target.checked)});
        }
        if (selecter === "origin-selecter") {
            this.setState({origin: event.value});
        }
        if (selecter === "destination-selecter") {
            this.setState({destination: event.value});
        }
        if (selecter === "outbound-selecter") {
            this.setState({outbound: event});
            this.setState({inbound: event});
        }
        if (selecter === "inbound-selecter") {
            this.setState({inbound: event});
        }
        if (selecter === "currency-selecter") {
            console.log(event.value);
            this.setState({currency: event.value});
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({submitted: true});
        this.getFlightInfo();
    }

/** RUNS AFTER SUBMIT METHODS */
    //this method gets list of quotes from Browse Quotes endpoint onSubmit, then passes the cleaned version of the json data to its parent SearchSession Component
    getFlightInfo() {

        var round_trip = this.state.round_trip;
        var country = this.state.country;
        var currency = this.state.currency;
        var origin = this.state.origin;
        var destination = this.state.destination;

        var outbound = dateToStringAPI(this.state.outbound); 
        var inbound = dateToStringAPI(this.state.inbound);

        var url;
        
        if (round_trip) {
            url = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/${country}/${currency}/en-US/${origin}/${destination}/${outbound}/${inbound}`;
        } else {
            url = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/${country}/${currency}/en-US/${origin}/${destination}/${outbound}`;
        }
        
        fetch(url, {
        method: "GET",
        headers: {
            "x-rapidapi-key": "73c4c7b9e4msh0a2357717fa16ddp1db3bdjsn8cef95e5049c",
            "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
        }
        })
        .then(response => {
            console.log(response);
            return response.json();
        })
        .then(json => {
            console.log(json);
            const info = this.cleanFlightInfo(json); //see method below
            this.props.passFlightData(info); //send data up to parent component
        })            
    }

    //cleans the json info to only necessary information after API GET Browse Quotes. Used within getFlightInfo();
    cleanFlightInfo(json) {
            /**Dealing with JSON
             * Carriers: {CarrierId, Name}
             * Places: {Name, Type, PlaceId, ...}
             * Quotes:
             *  Each quote objecct has
             *      Direct - bool
             *      MinPrice - price
             *      (InboundLeg)/Outbound leg - CarrierIds: array of airlines, DepartDate: timestamp (time is always 12am, and no arrive time), DestinationId, OriginId
             * 
             * Process each quote object to be one flight card, where:
             *    roundTrip = SearchSession.state.round_trip
             *    bestPrice = true if json[0], false if otherwise
             *    //if round Trip, the flight card will have two flight trips
             * 
             *    Each leg/trip is a flight trip component:
             *      outbound = true if Outbound leg, false if Inbound leg
             *      nonStop = true if Direct
             *      airline = find airline name from CarrierId in Carriers
             *      departDate = DepartDate
             *      leavingFrom = find place "Name + Type" from OriginId
             *      arrivingTo = find place "Name + Type" from DestinationId
             *      price = MinPrice
             *      
             * NOTE: Skyscanner API returns Quotes objects array that is sorted from least to greatest MinPrice!! 
             */


        const round_trip = this.state.round_trip;
        const curr_sym = json.Currencies[0].Symbol;

        const info = json.Quotes.map(function(quote) {
            var clean_info;

        //Deal with outbound leg first    
            //set variables
            const quote_id = quote.QuoteId;

            var first_quote = false;
            if (quote_id === 1) {
                first_quote = true;
            }

            //find airline name, origin name, and destination name from Ids
            const airline_name = json.Carriers.find(airline => {
                if (airline.CarrierId === quote.OutboundLeg.CarrierIds[0]) {
                    return airline;
                } else {return null;}
            });

            const origin_name = json.Places.find(place => {
                if (place.PlaceId === quote.OutboundLeg.OriginId) {
                    return place;
                } else {return null;}
            });

            const destination_name = json.Places.find(place => {
                if (place.PlaceId === quote.OutboundLeg.DestinationId) {
                    return place;
                } else {return null;}
            });

            clean_info = {
                key: quote_id,
                round_trip: round_trip,
                best_price: first_quote,
                price: quote.MinPrice,
                currency: curr_sym,
                
                outbound: {
                    nonStop: quote.Direct,
                    airline: airline_name,
                    departDate: quote.OutboundLeg.DepartureDate,
                    leavingFrom: origin_name,
                    arrivingTo: destination_name,
                }
            }
        
        //If inbound leg exists
            if (round_trip) {
                //find airline name, origin name, and destination name from Ids
                const airline_name = json.Carriers.find(airline => {
                    if (airline.CarrierId === quote.InboundLeg.CarrierIds[0]) {
                        return airline;
                    } else {return null;}
                });

                const origin_name = json.Places.find(place => {
                    if (place.PlaceId === quote.InboundLeg.OriginId) {
                        return place;
                    } else {return null;}
                });

                const destination_name = json.Places.find(place => {
                    if (place.PlaceId === quote.InboundLeg.DestinationId) {
                        return place;
                    } else {return null;}
                });

                //add inbound attribute to cleaned data
                clean_info.inbound = {
                    nonStop: quote.Direct,
                    airline: airline_name,
                    departDate: quote.InboundLeg.DepartureDate,
                    leavingFrom: origin_name,
                    arrivingTo: destination_name,
                }
            }
            
            return clean_info;
        });

        console.log(info);
        return info;
    }

 
    

//render function
    render() {
            var submitted = this.state.submitted;

            var one_way = !(this.state.round_trip);
            var loaded = this.state.currencies_loaded && this.state.countries_loaded;
            const currencies = this.state.currency_list;
            
            if (loaded) {
                return ( 
                    <div className={submitted ? 'top-card navbar sticky-top navbar-light': 'mid-card card w-75 mx-auto shadow-lg'}>
                        <div className="card-body">
                            <form onSubmit={this.handleSubmit}>
                                <label>
                                <Toggle
                                    defaultChecked={one_way}
                                    icons={false}
                                    onChange={(e) => this.handleChange("round-trip-selecter", e)} />
                                <span>One-way</span>
                                </label>

                                {/* Leaving From */}
                                <AsyncSelect placeholder="Leaving From" noOptionsMessage={() => "Search for a place"} cacheOptions loadOptions={this.loadPlaces} onChange={(e) => this.handleChange("origin-selecter", e)} />

                                {/* Going To */}
                                <AsyncSelect placeholder="Going To" noOptionsMessage={() => "Search for a place"} cacheOptions loadOptions={this.loadPlaces} onChange={(e) => this.handleChange("destination-selecter", e)} />

                                {/*Outbound Date*/}
                                <DatePicker selected={this.state.outbound} onChange={(e) => this.handleChange("outbound-selecter", e)} label="outbound" dateFormat="MM/dd/yyyy" minDate={new Date()}/>


                                {/* Inbound Date*/}
                                {!one_way && <DatePicker selected={this.state.inbound} onChange={(e) => this.handleChange("inbound-selecter", e)} label="inbound" dateFormat="MM/dd/yyyy" minDate={this.state.outbound} />}

                                {/* currency */}
                                <Select defaultValue={currencies.find(item => {return item.value === 'USD'})}
                                    options={currencies} placeholder="Currency" onChange={(e) => this.handleChange("currency-selecter", e)}/>

                                {/*Submit button */}
                                <input type="submit" value="Submit" />
                            </form>
                        </div>
                    </div>
                    
                );
            } else {
                return null;
            }
            
        
    }
}

export default SearchCard;