import React, { Component } from 'react';
import './searchSession.css';
//import form components 
import DatePicker from "react-datepicker"; //date picker
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select'; //select and search

/*
 *Application Logic
 * 1. User types in place
 *     after you get past two characters, send api request to find places list.
 *     user chooses a place. The value that is set to this.state.origin/destination is the ID that skyscanner uses. 
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
            country: 'US',
            origin: '',
            destination: '',
            outbound: new Date(),
            inbound: new Date(),
            currency: 'USD',

            //get from parent, search session.
            places_list: [
                {label: 'Anywhere', value: 'anywhere'},
            ],

            //get from parent, search session
            currency_list : [
                {label: 'USD', value: 'USD'}
            ]
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getFlightInfo = this.getFlightInfo.bind(this);
        this.getPlaces = this.getPlaces.bind(this);

    }

    getPlaces(event) {

        var country = this.state.country;
        var currency = this.state.currency;
        var place = event.value;

        fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/${country}/${currency}/en-US/?query=${place}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "73c4c7b9e4msh0a2357717fa16ddp1db3bdjsn8cef95e5049c",
            "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
        }
        })
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.error(err);
        });

        console.log(place);
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
            console.error(err);
        });            
    }

    //handle any changes to the form
    handleChange(selecter, event) {
        if (selecter == "origin-selecter") {
            this.setState({origin: event.value});
        }
        if (selecter == "destination-selecter") {
            this.setState({destination: event.value});
        }
        if (selecter == "outbound-selecter") {
            this.setState({outbound: event});
        }
        if (selecter == "inbound-selecter") {
            this.setState({inbound: event});
        }
        if (selecter == "currency-selecter") {
            this.setState({currency: event.value});
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        this.getFlightInfo();
    }

    

    render() {

        const places = this.state.places_list;
        const currencies = this.state.currency_list;
        return ( 
            <form onSubmit={this.handleSubmit}>
                {/* Leaving From */}
                <Select options={places} placeholder="Leaving From" onInputChange={this.getPlaces} onChange={(e) => this.handleChange("origin-selecter", e)}/>
                        
                {/* Going To */}
                <Select options={places} placeholder="Going To" onInputChange={this.getPlaces} onChange={(e) => this.handleChange("destination-selecter", e)}/>

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