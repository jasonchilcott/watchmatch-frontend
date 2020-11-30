import React from "react"
import MovieCard from "../Components/MovieCard"

class MoviesContainer extends React.Component{


  renderMovies = () => this.props.movies.map((movie) => {
    const user = this.props.user
    let rating = 0
        if (user.ratings){
        rating = user.ratings.find(rating => rating.movie_id === movie.id)
      }
    return <MovieCard key={movie.id} movie={movie} user={user}/>
  })

  render() {

    return(
        <div className="movies-container">
            {this.renderMovies()}
        </div>

)

}



}

export default MoviesContainer
