import React from "react"
import ProfileRatingCard from '../Components/ProfileRatingCard'

class ProfileRatingsContainer extends React.Component{


  renderRatings = () => this.props.profile.ratings.map((rating) => {
      return <ProfileRatingCard key={rating.id} movie_id={rating.movie_id} user_id={rating.user_id} stars={rating.stars}/>
    })
  
  
  render() {
    
    
    return(
        <div className="profile-ratings-container">
          <h2>Ratings:</h2>
            {this.renderRatings()}
        </div>
    )

}

}

export default ProfileRatingsContainer
