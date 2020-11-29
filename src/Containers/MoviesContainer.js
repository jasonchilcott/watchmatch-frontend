import React from "react"
import MovieCard from "../Components/MovieCard"

class MoviesContainer extends React.Component{


  renderMovies = () => this.props.movies.map((movie) => {
    return <MovieCard key={movie.id} movie={movie} user={this.props.user}/>
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
