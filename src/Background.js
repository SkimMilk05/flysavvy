import React, { Component } from 'react';
import './background.css';
//import Slideshow from './Slideshow'
import Filter from './Filter'
import SearchSession from './SearchSession'
//import LoadImage from './LoadImage'

class Background extends Component {
    render() {
        return (
            <div className="Background">
                <SearchSession/>
                {/*<Slideshow/>*/}
                {/*<LoadImage/>*/}
            </div>
        );
    }
}

export default Background;