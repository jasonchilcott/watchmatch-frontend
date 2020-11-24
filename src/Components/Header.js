import Navbar from "./Navbar"
import React from "react"

const Header = (props) => {

    return (
    <header className="header">
        <img className="logo" src="watchmatch-logo.png" alt="watchmatch logo"/>
        <Navbar />
    </header>
    )
}

export default Header