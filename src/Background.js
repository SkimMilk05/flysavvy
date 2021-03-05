import React, { Component } from 'react';
import './background.css';
import Slideshow from './Slideshow'
import FlightCard from './FlightCard'
import Filter from './Filter'
import SearchCard from './SearchCard'
import LoadImage from './LoadImage'

class Background extends Component {
    render() {
        return (
            <div className="Background">
                {/*<FlightCard/>*/}
                {/*<Slideshow/>*/}
                {/*<Filter/>*/}
                <SearchCard/>
                {/*<LoadImage/>*/}
            </div>
        );
    }
}

export default Background;