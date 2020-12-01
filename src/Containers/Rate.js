import React from "react";
import Search from "../Components/Search";

import MoviesContainer from "./MoviesContainer";
//import InfiniteScroll from 'react-infinite-scroll-component';

class Rate extends React.Component {
  state = {
    movies: [],
    search: "",
    page: 1,
  };

  componentDidMount() {
    this.fetchMovies();
  }

  fetchMovies = () => {
    //const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=a3c8a67818b95d395055b1c64330a5d4&query=${this.state.search}&page=${this.state.page}&include_adult=false`
    const movieUrl = `https://api.themoviedb.org/4/list/7065199?page=${this.state.page}&api_key=a3c8a67818b95d395055b1c64330a5d4`;
    // v3: https://api.themoviedb.org/3/list/7065199?api_key=a3c8a67818b95d395055b1c64330a5d4&language=en-US

    fetch(
      movieUrl //, {
      //     headers: {
      //     Accept: "application/json",
      //
      // }
      // }
    )
      .then((resp) => resp.json())
      .then((
        movieData //{ this.setState(() => ({
      ) =>
        //  movies: [...this.state.movies, ...movieData.results]
        //}
        //)
        //)

        this.addMoviesToDB(movieData.results)
      );
  };

  addMoviesToDB = (movies) => {
    movies.forEach((movie) => {
      let moviesObj = {
        api_id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        overview: movie.overview,
      };

      const token = localStorage.getItem("token");

      fetch("http://localhost:3000/api/v1/movies", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(moviesObj),
      })
        .then((r) => r.json())
        .then((savedMovie) =>
          this.setState(() => ({
            movies: [...this.state.movies, savedMovie],
          }))
        )

        .catch((error) => console.error(error));
    });
  };

  

  fetchMoreDoer = () => {
    this.setState(
      {
        page: this.state.page + 1,
      },
      this.fetchMovies
    );
  };

  searchDoer = (search) => {
    this.setState(
      {
        movies: [],
        search: search,
      },
      this.fetchMovies()
    );
  };

  render() {
    
    return (
      <>
      <div className='rate'>
        <Search className='search' searchDoer={this.searchDoer} />
        
        {this.state.movies ? (
          <MoviesContainer movies={this.state.movies} user={this.props.user} />
        ) : (
          <h4>Loading...</h4>
        )}
        <button onClick={this.fetchMoreDoer}>Load More</button>

      </div>
        
      </>
    );
  }
}

export default Rate;
