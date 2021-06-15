import Navbar from "./Navbar"
import { NavLink } from "react-router-dom";
import React from "react"

const Header = (props) => {

    return (
    <header className="header">
    
        <NavLink to="/" user={props.user}>
            <img className="logo" src="/logo512.png" alt="watchmatch logo"/>
        </NavLink>


        <Navbar user={props.user} logMeOut={props.logMeOut}/>
    </header>
    )
}

export default Header