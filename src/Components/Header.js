import Navbar from "./Navbar"
import React from "react"

const Header = (props) => {

    return (
    <header className="header">
        <a href="/">
        <img className="logo" src="/logo512.png" alt="watchmatch logo"/>
        </a>
        <Navbar user={props.user} logMeOut={props.logMeOut}/>
    </header>
    )
}

export default Header