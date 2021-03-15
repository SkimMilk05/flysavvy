import React, { Component } from 'react';
import './background.css';
import Slideshow from './Slideshow'
import FlightCard from './FlightCard'
import Filter from './Filter'
import SearchSession from './SearchSession'
import LoadImage from './LoadImage'

class Background extends Component {
    render() {
        return (
            <div className="Background">
                {/*<FlightCard/>*/}
                {/*<Slideshow/>*/}
                {/*<Filter/>*/}
                <SearchSession/>
                <FlightCard/>
                {/*<LoadImage/>*/}
            </div>
        );
    }
}

export default Background;