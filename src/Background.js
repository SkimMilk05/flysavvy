import React, { Component } from 'react';
import './background.css';
import Slideshow from './Slideshow'

class Background extends Component {
    render() {
        return (
            <div className="Background">
                <h1>Hello World</h1>
                <Slideshow/>
            </div>
        );
    }
}

export default Background;