import React, { Component } from 'react';
import './searchSession.css';
//import form components 
import DatePicker from "react-datepicker"; //date picker
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select'; //select and search
import AsyncSelect from 'react-select/async';

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
function dateToString(date) { //date must be in YYYY-MM-DD format
    var year = date.getFullYear();
    var month = date.getMonth() + 1; //getMonth returns 0-11, 0 for Jan
    var day = date.getDate();

    const single_digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    if (single_digits.includes(month)) {
        month = "0" + month.toString();
    }
    if (single_digits.includes(day)) {
        day = "0" + day.toString();
    }
    var d = `${year}-${month}-${day}`;
    return d;
}




class SearchSession extends Component {

    constructor(props) {
        super(props);
        this.state = { //fields
            submitted: false,
            country: '',
            origin: '',
            destination: '',
            outbound: new Date(),
            inbound: new Date(),
            currency: '',
            locale: 'en-US',

        };

        


        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getFlightInfo = this.getFlightInfo.bind(this);
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
            this.setState({country_list: countries});
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
                return { value: curr.Code, label: curr.Code };
            });
            this.setState({currency_list: currencies});
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



    getFlightInfo() {

        var country = this.state.country;
        var currency = this.state.currency;
        var origin = this.state.origin;
        var destination = this.state.destination;

        var outbound = dateToString(this.state.outbound); 

        var url = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/${country}/${currency}/en-US/${origin}/${destination}/${outbound}/`;

        fetch(url, {
        method: "GET",
        headers: {
            "x-rapidapi-key": "73c4c7b9e4msh0a2357717fa16ddp1db3bdjsn8cef95e5049c",
            "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
        }
        })
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        });            
    }

    //handle any changes to the form
    handleChange(selecter, event) {
        if (selecter === "country-selecter") {
            this.setState({country: event.value});
        }
        if (selecter === "origin-selecter") {
            this.setState({origin: event.value});
        }
        if (selecter === "destination-selecter") {
            this.setState({destination: event.value});
        }
        if (selecter === "outbound-selecter") {
            this.setState({outbound: event});
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
        this.getFlightInfo();
    }
    

    

    render() {

        const currencies = this.state.currency_list;
        const countries = this.state.country_list;
        return ( 
            <form onSubmit={this.handleSubmit}>

                {/* Country */}
                <Select options={countries} placeholder="Country" onChange={(e) => this.handleChange("country-selecter", e)}/>

                {/* Leaving From */}
                <AsyncSelect placeholder="Going To " noOptionsMessage={() => "Search for a place"} cacheOptions loadOptions={this.loadPlaces} onChange={(e) => this.handleChange("origin-selecter", e)} />
                

                {/* Going To */}
                <AsyncSelect placeholder="Leaving From" noOptionsMessage={() => "Search for a place"} cacheOptions loadOptions={this.loadPlaces} onChange={(e) => this.handleChange("destination-selecter", e)} />

                {/*Outbound Date*/}
                <DatePicker selected={this.state.outbound} onChange={(e) => this.handleChange("outbound-selecter", e)} label="outbound" dateFormat="MM/dd/yyyy" minDate={new Date()}/>

                {/* Inbound Date*/}
                <DatePicker selected={this.state.inbound} onChange={(e) => this.handleChange("inbound-selecter", e)} label="inbound" dateFormat="MM/dd/yyyy" minDate={this.state.outbound} />

                {/* currency */}
                <Select options={currencies} placeholder="Currency" onChange={(e) => this.handleChange("currency-selecter", e)}/>

                {/*Submit button */}
                    <input type="submit" value="Submit" />
            </form>
        );
        
    }
}

export default SearchSession;