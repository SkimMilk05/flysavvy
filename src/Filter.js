import React, { Component } from 'react';
import './filter.css';

class Filter extends Component {

    constructor(props) {
        super(props);
        this.state = { //fields
            high_to_low : false //only have low_to_high or high_to_low
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        var high_to_low = false;
        if (event.target.value === "true") {
            high_to_low = true;
        }
        this.props.passFilterData(high_to_low); //pass data to search Session
    }

    render() {
        return (
            <div onChange={this.handleChange}>
                <table className="table">
                <thead>
                    <tr><th scope="col">Filter</th></tr>
                </thead>
                <tbody>
                    <tr><td> 
                        <input type="radio" value="false" name="sort" checked /> Lowest to Highest
                    </td></tr>
                    <tr><td>
                    <input type="radio" value="true" name="sort" /> Highest to Lowest
                    </td></tr>
                </tbody>
            </table>
            </div>
            
        );
        
    }
}

export default Filter;