import React from "react";
import { NavLink } from "react-router-dom";

class Navbar extends React.Component {
  render() {
    return (
      <>
          <div className="navbar">
            <ul className="nav"> 
              <li className="nav-item">
                <NavLink exact activeClassName="active" className="nav-link" to="/">
                  RATE
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink activeClassName="active" className="nav-link" to="/matches">
                  MATCHES
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink
                  activeClassName="active"
                  className="nav-link"
                  to="/profile"
                  user={this.props.user}
                >
                  PROFILE
                </NavLink>
            </li>
            {this.props.user === {} ? (
                <li className="nav-item">
                  <NavLink activeClassName="active" className="nav-link" to="/login">
                    LOGIN
                  </NavLink>
                </li>
            ) : (
                <li className="nav-item">
                  <NavLink
                    activeClassName="active"
                    className="nav-link"
                    to="/logout"
                  onClick={this.props.logMeOut}
                  >
                    LOGOUT
                  </NavLink>
                </li>
              )}
          </ul>
        </div>
      </>
    );
  }
}

export default Navbar;
