import React from "react"
import MovieRatingCard from '../Components/MovieRatingCard'

class MovieRatingsContainer extends React.Component{


  renderRatings = () => this.props.movie.ratings.map((rating) => {
      return <MovieRatingCard key={rating.id} movie_id={rating.movie_id} user_id={rating.user_id} stars={rating.stars}/>
    })
  
  
  render() {
    
    
    return(
        <div className="movie-ratings-container">
            {this.renderRatings()}
        </div>
    )

}

}

export default MovieRatingsContainer
