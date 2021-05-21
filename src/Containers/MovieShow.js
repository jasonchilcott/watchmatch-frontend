import React from "react";
import { Route } from 'react-router-dom'
import MoviePage from './MoviePage.js'


class MovieShow extends React.Component {
  
  


  render() {
    return (
      <>
      
      <Route path='/movies/:id' render={({ match }) => {
        const id = parseInt(match.params.id) 
        let rating = 0
        if (this.props.user.ratings){
        rating = this.props.user.ratings.find(rating => rating.movie_id === id)
      }
        
        return <MoviePage id={id} rating={rating} user={this.props.user}/>
      }} />
      </>
    )
  }
}

export default MovieShow;
