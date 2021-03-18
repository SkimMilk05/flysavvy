import React, { Component } from 'react';
import './background.css';
import Slideshow from './Slideshow'
import SearchSession from './SearchSession'

class Background extends Component {
    constructor(props) {
        super(props);
        this.state = { //fields
            submitted: false,
        }
    }

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