import React from "react"
import RatingCard from '../Components/RatingCard'

class RatingsContainer extends React.Component{


  renderRatings = () => this.props.movie.ratings.map((rating) => {
      return <RatingCard key={rating.id} movie_id={rating.movie_id} user_id={rating.user_id} stars={rating.stars}/>
    })
  
  
  render() {
    
    
    return(
        <div className="ratings-container">
            {this.renderRatings()}
        </div>
    )

}

}

export default RatingsContainer
