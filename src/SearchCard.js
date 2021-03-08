import React, { Component } from 'react';
import './searchCard.css';
//import form components 
import DatePicker from "react-datepicker"; //date picker
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select'; //select and search

class SearchCard extends Component {

    constructor(props) {
        super(props);
        this.state = { //fields
            onTop: false,
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
        this.setDate = this.setDate.bind(this);
        this.setPlace = this.setPlace.bind(this);
        this.setCurrency = this.setCurrency.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //
    

    //set dates
    setDate(outbound, event) {
        if (outbound) {
            this.setState({
                outbound: event
            })
        } else {
            this.setState({
                inbound: event
            })
        }
    }

    //set places
    setPlace(leaving, event) {
        if (leaving) {
            this.setState({
                origin: event.value
            });
        } else {
            this.setState({
                destination: event.value
            })
        }
    }

    setCurrency(event) {
        this.setState({ 
            currency: event.value
        });
    }


    handleSubmit(event) {
        alert('You sumbitted a form!');
        event.preventDefault();
    }

    render() {

        var onTop = this.state.onTop;

        const places = this.state.places_list;
        const currencies = this.state.currency_list;
        
        if (onTop) {
            return (
                <div className="top-search-card">
                    <div className="card">
                        <div className="card-body">
                        </div>
                    </div>
                </div>
            );
        }
        else if (!onTop) {
            return ( 
                
                <div className="mid-search-card">
                    <div className="card w-75">
                        <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            {/* Leaving From */}
                            <Select name="orgin-selecter" options={places} placeholder="Leaving From" onChange={(e) => this.setPlace(true, e)}/>
                                    
                            {/* Going To */}
                            <Select name="destination-selecter" options={places} placeholder="Going To" onChange={(e) => this.setPlace(false, e)}/>

                            {/*Outbound Date*/}
                            <DatePicker name="outbound-selecter" selected={this.state.outbound} onChange={(e) => this.setDate(true, e)} label="outbound" dateFormat="MM/dd/yyyy" />

                            {/* Inbound Date*/}
                            <DatePicker name="inbound-selecter" selected={this.state.inbound} onChange={(e) => this.setDate(false, e)} label="inbound" dateFormat="MM/dd/yyyy" />

                            {/* currency */}
                            <Select name="currency-selecter" options={currencies} placeholder="Currency" onChange={this.setCurrency}/>

                            {/*Submit button */}
                                <input type="submit" value="Submit" />
                            </form>
                        </div>
                    </div>
                </div>
            );
        }
        
    }
}

export default SearchCard;