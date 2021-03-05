import React, { Component } from 'react';
import './filter.css';

class Filter extends Component {

    constructor(props) {
        super(props);
        this.state = { //fields
            low_to_high : false,
            high_to_low : false
        }
    }

    render() {

        var low_to_high = this.state.low_to_high;
        var high_to_low = this.state.high_to_low;

        
        return (
            <table className="table">
                <thead>
                    <tr><th scope="col">Filter</th></tr>
                </thead>
                <tbody>
                    <tr><td>Lowest to Highest</td></tr>
                    <tr><td>Highest to Lowest</td></tr>
                </tbody>
            </table>
        );
        
    }
}

export default Filter;