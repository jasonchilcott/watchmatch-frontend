import React from "react";
import { Route } from 'react-router-dom'
import MoviePage from './MoviePage.js'


class MovieShow extends React.Component {
  
  


  render() {
    //console.log(this.props)
    return (
      <>
      
      <Route path='/movies/:id' render={({ match }) => {
        let id = parseInt(match.params.id) 
        
        return <MoviePage id={id} user={this.props.user}/>
      }} />
      </>
    )
  }
}

export default MovieShow;
