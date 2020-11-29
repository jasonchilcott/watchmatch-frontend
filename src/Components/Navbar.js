import React from "react"
import { NavLink } from 'react-router-dom'

class Navbar extends React.Component{
    render(){
    return(
        <><div className='navbar'><ul>
        <li>
          <NavLink exact activeClassName="active" to="/">
            RATE
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/matches">
            MATCHES
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/profile">
            PROFILE
          </NavLink>
        </li>
        {this.props.user === {} 
        ? 
        <li>
          <NavLink activeClassName="active" to="/login" >
            LOGIN
          </NavLink>
        </li> 
        :
        <li>
          <NavLink activeClassName="active" to="/logout" onClick={this.props.logMeOut}>
            LOGOUT
          </NavLink>
        </li> 
        }
      </ul>
        </div>

    
    </>
    )}
}

export default Navbar