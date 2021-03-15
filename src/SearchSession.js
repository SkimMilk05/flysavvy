import React, { Component } from 'react';
import SearchCard from './SearchCard';

class SearchSession extends Component {
    constructor(props) {
        super(props);
        this.state = { //fields
            flight_info: null
        }
    }

    catchFlightData = (flightData) => {
        this.setState({flight_info: flightData})
        console.log('Set flight Data!')
    }

    render() {
        const data = this.state.flight_info;

        return (
            <div>
                <SearchCard passFlightData = {this.catchFlightData}/>
            </div>
            
        )
    }

}

export default SearchSession;