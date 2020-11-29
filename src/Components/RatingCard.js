import React from "react"
import ReactStars from "react-rating-stars-component";
import { NavLink } from 'react-router-dom'



class RatingCard extends React.Component {

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
    <p>{this.state.user.username}: {this.props.stars} stars</p>
        

                  {/* <NavLink to={`movies/${movie.id}`} user={this.props.user} movie={movie}>
                    <img src={poster_url} alt={movie.title}/>
                    <h2>{movie.title}</h2>

                  </NavLink>
                    <ReactStars
                      className="stars"
                      count={5}
                      value={this.state.stars}
                      isHalf={true}
                      onChange={this.starHandler}
                      size={24}
                      activeColor="#ff0000"
                    /> */}
                </div>
        }
              </>
            )
          }
        
}
export default RatingCard