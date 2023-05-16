import React from "react";
import Tilt from 'react-parallax-tilt';
import brain from './smartbrain-logo.png'
import './Logo.css';
const Logo = () => {
    return (
            <Tilt className="logo br2 shadow-2 ma4 mt0">
                <div style={{ textAlign: "center", margin: "0 auto"}}>
                    <img src={brain}/>
                </div>
            </Tilt>
    
    )
}
export default Logo;