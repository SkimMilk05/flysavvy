import React, { Component } from 'react';
import './background.css';
import Slideshow from './Slideshow'
import SearchSession from './SearchSession'

class Background extends Component {
    constructor(props) {
        super(props);
        this.state = { //fields
            submitted: false, //turns true when user submits first search session, so the slideshow can stop rendering
        }

        this.catchSubmitData = this.catchSubmitData.bind(this);
    }

    //get if form has been submitted for the first time from SearchSession
    catchSubmitData = (flightData) => {
        this.setState({submitted: true});
    }

    render() {

        const opening_page = !this.state.submitted;

        return (
            <div className={opening_page ? 'Opening-Background': 'Background'}>
                {opening_page && <Slideshow/>}
                <SearchSession passSubmitData= {this.catchSubmitData}/>
            </div>
        );
    }
}

export default Background;