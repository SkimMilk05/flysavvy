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
            </div>);
        
    }
}

export default LoadImage;
