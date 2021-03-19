import React, { Component } from 'react';
import './noResults.css'


class NoResults extends Component {

    render() {

        return (
            <div className="d-flex noResults">
                <div className="mx-auto my-auto">
                     No Search Results
                </div>
            </div>
            
        );
    }

}

export default NoResults;