import React, { Component } from 'react';
import './searchCard.css';

class SearchCard extends Component {

    constructor(props) {
        super(props);
        this.state = { //fields
            onTop: false
        }
    }

    render() {

        var onTop = this.state.onTop;

        if (onTop) {
            return (
                <div className="top-search-card">
                    <div className="card">
                        <div className="card-body">
                            Top Flight
                        </div>
                    </div>
                </div>
            );
        }
        else if (!onTop) {
            return (
                <div className="mid-search-card">
                    <div className="card w-75">
                        <div className="card-body">
                            Mid Flight
                        </div>
                    </div>
                </div>
            );
        }
        
    }
}

export default SearchCard;