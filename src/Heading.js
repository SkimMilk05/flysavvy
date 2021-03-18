import React, { Component } from 'react';
import './heading.css';

class Heading extends Component {
    render() {
        return (
        <div>
            <nav className="navbar shadow-sm fixed-top navbar-light bg-light">
                <img className="navbar-left" src="./logo.png" alt="Logo"/>
                <h6 className="logo-text">FlySavvy</h6>
                <h6 className="phrase">Find cheap flights, fast</h6> 
            </nav> 
        </div>
            
        );
    }
}

export default Heading;