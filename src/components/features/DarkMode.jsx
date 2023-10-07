import React from "react";
import { ReactComponent as Sun } from "./svgs/Sun.svg";
import { ReactComponent as Moon } from "./svgs/Moon.svg";
import "./DarkMode.css";

const DarkMode = () => {
    const setDarkMode  = () => {
        document.querySelector('body').setAttribute('data-theme','dark')
    }
    const setLightMode  = () => {
        document.querySelector('body').setAttribute('data-theme','light')
    }
   const toggleMode = (e) => {e.target.checked ? setDarkMode() : setLightMode() }
   
    return ( 
        <li className='dark_mode'>
            <input
                className='dark_mode_input'
                type='checkbox'
                id='darkmode-toggle'
                onChange={toggleMode}
            />
            <label className='dark_mode_label' for='darkmode-toggle'>

                <Sun />
                <Moon />
            </label>
            {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus explicabo neque, reiciendis omnis laborum deserunt!</p> */}
        </li>
    );
};

export default DarkMode;
