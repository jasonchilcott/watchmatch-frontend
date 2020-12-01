import React from "react";
import ReactStars from "react-rating-stars-component";
import { NavLink } from "react-router-dom";

class ProfileRatingCard extends React.Component {
  state = {};

  componentDidMount() {
    this.fetchMovie();
  }

  fetchMovie = () => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:3000/api/v1/movies/${this.props.movie_id}`, {
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
      );
  };

  render() {
    if (this.state.movie) {
      const movie = this.state.movie;
      let poster_url = "no_poster.png";
      if (movie.poster_path) {
        poster_url = `https://image.tmdb.org/t/p/w342${movie.poster_path}`;
      }

      return (
        <>
          <div className="profile-rating-card" key={this.props.id}>
            <NavLink to={`/movies/${movie.id}`} user={this.props.user}>
              <img className='profile-rating-poster' src={poster_url} alt={movie.title} />

              <h4>{movie.title}</h4>
            </NavLink>

            <ReactStars
              className="stars"
              count={5}
              edit={false}
              value={this.props.stars}
              isHalf={true}
              size={24}
              activeColor="#ff0000"
            />
          </div>
        </>
      );
    } else {
      return <h4>Loading...</h4>;
    }
  }
}

export default ProfileRatingCard;
