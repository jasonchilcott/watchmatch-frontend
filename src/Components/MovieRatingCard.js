import React from "react"
 import ReactStars from "react-rating-stars-component";
import { NavLink } from 'react-router-dom'



class MovieRatingCard extends React.Component {

  state = {
    
    stars: 0
  }

  componentDidMount() {
    this.fetchUser()

  }


  fetchUser = () => {
    const token = localStorage.getItem("token");

      fetch(`http://localhost:3000/api/v1/users/${this.props.user_id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        
      })
        .then((r) => r.json())
        .then((userObj) =>
          this.setState(() => ({
            user: userObj
          }))
          
        )
  }


  render() {
    
    
    return(
        <>
        {!this.state.user ? <h1>Loading</h1> : 
        
                <div className="rating-card" key={this.props.id}>

                  <NavLink  to={`users/${this.state.user.id}`} currentUser={this.props.user} >

                <p>{this.state.user.username}: </p>
                  </NavLink>
        

                  
                    <ReactStars
                      className="stars"
                      count={5}
                      edit={false}
                      value={this.props.stars}
                      isHalf={true}
                      size={24}
                      activeColor="#ff0000"
                    />
                </div>
        }
              </>
            )
          }
        
}
export default MovieRatingCard