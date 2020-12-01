import React from "react";
import Search from "../Components/Search";
import RateSidebar from "../Components/RateSidebar"


import MoviesContainer from "./MoviesContainer";
//import InfiniteScroll from 'react-infinite-scroll-component';

class Rate extends React.Component {
  state = {
    movies: [],
    search: "",
    list: "7065199",
    searchOrList: "list",
    page: 1,
  };

  componentDidMount() {
    this.fetchMovies();
  }

  fetchMovies = () => {
    let movieUrl = `https://api.themoviedb.org/4/list/7065199?page=${this.state.page}&api_key=a3c8a67818b95d395055b1c64330a5d4`;
    switch (this.state.searchOrList) {
      case "list":
        movieUrl = `https://api.themoviedb.org/4/list/${this.state.list}?page=${this.state.page}&api_key=a3c8a67818b95d395055b1c64330a5d4`;
        break;
      case "search":
        movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=a3c8a67818b95d395055b1c64330a5d4&language=en-US&query=${this.state.search}&page=${this.state.page}&include_adult=false`
        
        break;
      default:
        console.log(`search or list is ${this.state.searchOrList}.`);
    }
    console.log(this.state.searchOrList, movieUrl)
    //const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=a3c8a67818b95d395055b1c64330a5d4&query=${this.state.query}&page=${this.state.page}&include_adult=false`
    
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
        searchOrList: "search",
        page: 1
      },
      this.fetchMovies
    );
  };

  render() {
    
    return (
      <>
      <div className='rate'>
        <Search className='search' searchDoer={this.searchDoer} />
        <RateSidebar className='sidebar'/>
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
