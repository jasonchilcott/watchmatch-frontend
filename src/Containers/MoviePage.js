import React from "react";
import ReactStars from "react-rating-stars-component";
import MovieRatingsContainer from "./MovieRatingsContainer";

class MoviePage extends React.Component {
  state = {
    userRatingId: null,
    stars: this.props.rating ? this.props.rating.stars : 0,
  };

  // getRating = () => {
  //   if (this.props.user) {
  //     const movie = this.props.movie;
  //     if (
  //       this.props.user.ratings.some((rating) => rating.movie_id === movie.id)
  //     ) {
  //       let thisRating = this.props.user.ratings.find(
  //         (rating) => rating.movie_id === movie.id
  //       );
  //       this.setState({
  //         userRatingId: thisRating.id,
  //         stars: thisRating.stars,
  //       });
  //     }
  //   }
  // };

  componentDidMount() {
    this.fetchMovie();
  }

  fetchMovie = () => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:3000/api/v1/movies/${this.props.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((r) => r.json())
      .then((movieObj) =>
        this.setState(() => ({
          movie: movieObj,
        }))
      )
      //.then(() => this.getRating())

      .catch((error) => console.error(error));
  };

  starHandler = (rating) => {
    let ratingObj = {
      movie_id: this.state.movie.id,
      user_id: this.props.user.id,
      stars: rating,
    };
    const token = localStorage.getItem("token");

    if (this.state.userRatingId && this.state.stars !== rating) {
      console.log("patch");
      fetch(`http://localhost:3000/api/v1/ratings/${this.state.userRatingId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ stars: rating }),
      })
        .then((resp) => resp.json())
        .then((rating) =>
          this.setState({
            stars: rating.stars,
          })
        );
    } else if (!this.state.userRatingId) {
      console.log("post", rating, this.state.stars);
      fetch("http://localhost:3000/api/v1/ratings", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(ratingObj),
      })
        .then((resp) => resp.json())
        .then((rating) =>
          this.setState({
            userRatingId: rating.id,
            stars: rating.stars,
          })
        );
    }
  };

  render() {
    let movie = this.state.movie;
    let poster_url = "/no_poster.png"
    if (movie) {
      if (movie.poster_path) {
        poster_url = `https://image.tmdb.org/t/p/w780${movie.poster_path}`
      }
    }

    return (
      <>
        {!movie ? (
          <h1>Loading</h1>
        ) : (
          <div className="movie-page" key={movie.id}>
            <div className="movie info">
              <div>
            <img
              className="movie-page-poster"
              src={poster_url}
              alt={movie.title}
            />

              </div>
              <div>

            <h1 className="movie-page-title">{movie.title}</h1>
        <h3>Released on: {movie.release_date}</h3>

            <ReactStars
              className="stars"
              count={5}
              value={this.state.stars}
              isHalf={true}
              onChange={this.starHandler}
              size={24}
              activeColor="#ff0000"
            />

            <p className="movie-page-overview">{movie.overview}</p>
              </div>


            </div>
            <br />
            <MovieRatingsContainer movie={movie} user={this.props.user}/>
          </div>
        )}
      </>
    );
  }

}

export default MoviePage;