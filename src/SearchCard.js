import React, { Component } from 'react';
import './searchCard.css';

//import form
import SearchSession from "./SearchSession"

class SearchCard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return ( 
            <div className="mid-search-card">
                <div className="card w-75">
                    <div className="card-body">
                    <SearchSession/>
                    </div>
                </div>
            </div>
        );
    }
    }

export default SearchCard;