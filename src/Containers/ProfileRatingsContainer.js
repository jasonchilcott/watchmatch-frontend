import React from "react"
import ProfileRatingCard from '../Components/ProfileRatingCard'

class ProfileRatingsContainer extends React.Component{


  renderRatings = () => this.props.profile.ratings.map((rating) => {
      return <ProfileRatingCard key={rating.id} movie_id={rating.movie_id} user_id={this.props.user.id} stars={rating.stars}/>
    })
  
  
  render() {
    
    
    return(
        <div className="profile-ratings-container">
          {this.props.profile.ratings ? (<>
          
          {this.renderRatings()}
          </>)
          :
          (<h4>Loading... </h4>)
          }
        </div>
    )

}

}

export default ProfileRatingsContainer
