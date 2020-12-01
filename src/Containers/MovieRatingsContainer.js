import React from "react"
import MovieRatingCard from '../Components/MovieRatingCard'

class MovieRatingsContainer extends React.Component{


  renderRatings = () => {
    console.log(this.props)
    const filteredRatings = this.props.movie.ratings.filter((rating => rating.user_id !== this.props.user.id))
    console.log(filteredRatings)
    return filteredRatings.map((rating) => {
      return <MovieRatingCard key={rating.id} movie_id={rating.movie_id} user_id={rating.user_id} stars={rating.stars}/>
    })
  }
  
  render() {
    
    
    return(
        <div className="movie-ratings-container">
            {this.renderRatings()}
        </div>
    )

}

}

export default MovieRatingsContainer
