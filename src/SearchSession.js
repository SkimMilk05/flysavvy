import React, { Component } from 'react';
import './searchSession.css';
//import form components 
import DatePicker from "react-datepicker"; //date picker
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select'; //select and search

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
                <DatePicker selected={this.state.outbound} onChange={(e) => this.handleChange("outbound-selecter", e)} label="outbound" dateFormat="MM/dd/yyyy" />

                {/* Inbound Date*/}
                <DatePicker selected={this.state.inbound} onChange={(e) => this.handleChange("inbound-selecter", e)} label="inbound" dateFormat="MM/dd/yyyy" />

                {/* currency */}
                <Select options={currencies} placeholder="Currency" onChange={(e) => this.handleChange("currency-selecter", e)}/>

                {/*Submit button */}
                    <input type="submit" value="Submit" />
            </form>
        );
        
    }
}

export default SearchSession;