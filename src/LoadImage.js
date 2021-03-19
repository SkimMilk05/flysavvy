import React, { Component } from 'react';
import './loadImage.css';

const AnimationButton = ({i}) => 
    (<div className='span' style={{transform: `rotate(calc(18deg * ${i}))`}}>
        <div className='ball' style={{'animationDelay': `calc(0.1s * ${i})`}}></div>
    </div>)


class LoadImage extends Component {
    render() {
        const load_html = [];
        for(let i =1; i<21;i++) {
            load_html.push(<AnimationButton key={i} i={i} />)
        }
        return (
            <div className="loader">
                {load_html}
                <div className="plane">
                </div>
                {this.props.book? 
                <h6 className="loading-mess">Taking you to the booking site <br/>
                <p className="fine-print">if Skyscanner API provided ticketing information, FlySavvy would then redirect the user to book their ticket</p>
                </h6>
                
                : <h6 className="loading-mess">Loading flights</h6>
                }
            </div>
        );
        
    }
}

export default LoadImage;
