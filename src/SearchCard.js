import React, { Component } from 'react';


//import form components 
import DatePicker from "react-datepicker"; //date picker
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select'; //select and search
import AsyncSelect from 'react-select/async';
import Toggle from 'react-toggle'; //for toggle for round trip
import "react-toggle/style.css"; 
import {dateToString} from './dateToString.js'

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

            info: null

            
            
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.getCurrencies = this.getCurrencies.bind(this);
        this.getCountries = this.getCountries.bind(this);
        this.loadPlaces = this.loadPlaces.bind(this);
    }

    componentDidMount() {
        this.getCountries();
        this.getCurrencies();
    }

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
            this.setState({currency: event.value});
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({submitted: true});
        //pass all form parameters to parent, SearchSession
    }
    

    
    render() {
            var submitted = this.state.submitted;

            var one_way = !(this.state.round_trip);
            var loaded = this.state.currencies_loaded && this.state.countries_loaded;
            const currencies = this.state.currency_list;

            var info = this.state.info;
            
            if (loaded) {
                return ( 
                    <div className="mid-search-card">
                        <div className="card w-75">
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
                    </div>
                    
                );
            } else {
                return null;
            }
            
        
    }
}

export default SearchCard;