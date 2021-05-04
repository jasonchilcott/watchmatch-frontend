import React from "react";
import { NavLink } from "react-router-dom";

class Navbar extends React.Component {
  render() {
    return (
      <>
          <div className="navbar">
            <ul className="nav"> 
              {(Object.keys(this.props.user).length === 0 && this.props.user.constructor === Object) || !this.props.user ? (
                  <li className="nav-item">
                  </li>
              ) : (
                <>
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
                </>
              )}
          </ul>
        </div>
      </>
    );
  }
}

export default Navbar;
