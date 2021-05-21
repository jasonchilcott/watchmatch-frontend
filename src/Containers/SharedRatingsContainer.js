import React from "react"
import ProfileRatingCard from '../Components/ProfileRatingCard'

class SharedRatingsContainer extends React.Component{


  renderRatings = () => {
    const profile = this.props.profile
    const user = this.props.user;

    // array of movie_ids of all movies rated by the current user
    const currentUserMovies = user.ratings.map((rating) => rating.movie_id);

    //array of ratings for movies the match and current user have both rated
    let sharedMovies = profile.ratings.filter((rating) =>
      currentUserMovies.includes(rating.movie_id)
    );
    sharedMovies.length === 0 ?  <p>You have no shared movies with this user.</p> :
    sharedMovies.map((rating) => {
      return <ProfileRatingCard key={rating.id} movie_id={rating.movie_id} user_id={this.props.user.id} stars={rating.stars}/>
    })
  }
  
  render() {
    
    
    return(
        <div className="profile-ratings-container">
          {this.props.profile.ratings && this.props.user.ratings ? (<>
          
          {this.renderRatings()}
          </>)
          :
          (<h4>Loading... </h4>)
          }
        </div>
    )

}

}

export default SharedRatingsContainer
