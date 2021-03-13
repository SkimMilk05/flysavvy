import React, { Component } from 'react';
import './searchSession.css';
//import form components 
import DatePicker from "react-datepicker"; //date picker
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select'; //select and search

function dateToString(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
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
            origin: '',
            destination: '',
            outbound: new Date(),
            inbound: new Date(),
            currency: '',

            //get from parent, search session.
            places_list: [
                {label: 'LAX', value: 'LAX-sky'},
                {label: 'IAD', value: 'IAD-sky'},
                {label: 'HNL', value: 'HNL-sky'}
            ],

            //get from parent, search session
            currency_list : [
                {label: 'USD', value: 'USD'}
            ]
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.apiCall = this.apiCall.bind(this);

    }



    apiCall() {

        var country = "US";
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
        alert('You sumbitted a form!');
        event.preventDefault();
        this.apiCall();
    }

    

    render() {

        const places = this.state.places_list;
        const currencies = this.state.currency_list;
        return ( 
            <form onSubmit={this.handleSubmit}>
                {/* Leaving From */}
                <Select options={places} placeholder="Leaving From" onChange={(e) => this.handleChange("origin-selecter", e)}/>
                        
                {/* Going To */}
                <Select options={places} placeholder="Going To" onChange={(e) => this.handleChange("destination-selecter", e)}/>

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