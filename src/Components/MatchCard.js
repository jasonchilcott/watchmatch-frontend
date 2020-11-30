import React from "react"
import { NavLink } from 'react-router-dom'



class MatchCard extends React.Component {

  state = {
    
    
  }

  

  
  render() {
    
    
    return(
        <>
        {!this.props.match.id ? <h1>Loading...</h1> : 
        
                <div className="match-card" key={this.props.match.id}>

                  <NavLink  to={`/users/${this.props.match.id}`} user={this.props.user} >

                <h4>{this.props.match.username} </h4>
                  </NavLink>
        

                  
                    
                </div>
        }
              </>
            )
          }
        
}
export default MatchCard