import React from "react";
import Search from "../Components/Search";
import RateSidebar from "../Components/RateSidebar"


import MoviesContainer from "./MoviesContainer";
//import InfiniteScroll from 'react-infinite-scroll-component';

class Rate extends React.Component {
  state = {
    movies: [],
    search: "",
    id: "7065199",
    searchOrList: "list",
    page: 1,
    genre: null
  };

  componentDidMount() {
    this.fetchMovies();
  }

  fetchMovies = () => {

    const apiKey = "a3c8a67818b95d395055b1c64330a5d4"
    let movieUrl = `https://api.themoviedb.org/4/list/7065199?page=${this.state.page}&api_key=${apiKey}`;
    switch (this.state.searchOrList) {
      case "list":
        movieUrl = `https://api.themoviedb.org/4/list/${this.state.id}?page=${this.state.page}&api_key=${apiKey}`;
        break;
      case "search":
        movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${this.state.search}&page=${this.state.page}&include_adult=false`
        break;
      case "genre":
        movieUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${this.state.page}&with_genres=${this.state.genre}`
        break;
      case "person":
        movieUrl = `https://api.themoviedb.org/3/person/${this.state.id}/movie_credits?api_key=a3c8a67818b95d395055b1c64330a5d4&language=en-US`
        break
      default:
        console.log(`search or list is ${this.state.searchOrList}.`);
    }
    //console.log(this.state.searchOrList, movieUrl)
    //const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${this.state.query}&page=${this.state.page}&include_adult=false`
    //https://api.themoviedb.org/3/person/2963/movie_credits?api_key=a3c8a67818b95d395055b1c64330a5d4&language=en-US
    
    // v3: https://api.themoviedb.org/3/list/7065199?api_key=${apiKey}&language=en-US
     if (this.state.searchOrList === "person") {
      fetch(
        movieUrl 
      )
        .then((resp) => resp.json())
        .then((
          movieData 
        ) => this.addMoviesToDB(movieData.cast)
        );

     } else {
    fetch(
      movieUrl 
    )
      .then((resp) => resp.json())
      .then((
        movieData 
      ) =>
        

        this.addMoviesToDB(movieData.results)
      );
  };
}

  addMoviesToDB = (movies) => {
    movies.forEach((movie) => {
      let moviesObj = {
        api_id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        overview: movie.overview,
        release_date: movie.release_date
      };

      const token = localStorage.getItem("token");

      fetch("https://watchmatch-api.herokuapp.com//api/v1/movies", {
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

  sidebarDoer = (type, id) => {
    this.setState(
      {
        movies: [],
        id: id,
        searchOrList: type,
        page: 1
      },
      this.fetchMovies
    );
  };

  genreDoer = (genre) => {
    this.setState(
      {
        movies: [],
        genre: genre,
        searchOrList: "genre",
        page: 1
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
        <Search className='search' searchDoer={this.searchDoer} genreDoer={this.genreDoer}/>
        <RateSidebar className='sidebar' sidebarDoer={this.sidebarDoer}/>
        {this.state.movies && this.state.movies.length > 0 ? (
          <MoviesContainer movies={this.state.movies} user={this.props.user} />
        ) : (
          <h2>Loading...</h2>
        )}
        <button onClick={this.fetchMoreDoer}>Load More</button>

      </div>
        
      </>
    );
  }
}

export default Rate;
