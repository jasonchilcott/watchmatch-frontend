import React from "react"
 import ReactStars from "react-rating-stars-component";
import { NavLink } from 'react-router-dom'



class ProfileRatingCard extends React.Component {

  state = {
    
    stars: 0
  }

  componentDidMount() {
    this.fetchMovie()

  }


  fetchMovie = () => {
    const token = localStorage.getItem("token");

      fetch(`http://localhost:3000/api/v1/movies/${this.props.movie_id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        
      })
        .then((r) => r.json())
        .then((movieObj) =>
          this.setState(() => ({
            movie: movieObj
          }))
          
        )
  }


  render() {
    
    
    return(
        <>
        {!this.state.movie ? <h1>Loading</h1> : 
        
                <div className="profile-rating-card" key={this.props.id}>

                  <NavLink  to={`/movies/${this.state.movie.id}`} user={this.props.user} >

                <h4>{this.state.movie.title}: </h4>
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
export default ProfileRatingCard