import React, { Component } from 'react';
import './slideshow.css';

class Slideshow extends Component {
    render() {
        return (
            
            <ul className="cb-slideshow">
                <li><span>Image 01</span></li>
                <li><span>Image 02</span></li>
                <li><span>Image 03</span></li>
                <li><span>Image 04</span></li>
                <li><span>Image 05</span></li>
                <li><span>Image 06</span></li>
            </ul>
        );
    }
}

export default Slideshow;