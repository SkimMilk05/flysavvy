import React, { Component } from 'react';
import './heading.css';

class Heading extends Component {
    render() {
        return (
            <nav className="navbar shadow-sm fixed-top navbar-light bg-light">
                <div>
                    <span className="fas fa-plane-departure"></span>
                    <span className="logo-text"> FlySavvy</span>
                </div>
                <div className="navbar-div">
                    <span className="phrase">Find cheap flights, fast</span> 
                </div>
            </nav>             
        );
    }
}

export default Heading;