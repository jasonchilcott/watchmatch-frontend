import React from "react";
import ReactStars from "react-rating-stars-component";
import { NavLink } from "react-router-dom";

class MovieRatingCard extends React.Component {
  state = {
    stars: 0,
  };

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = () => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:3000/api/v1/users/${this.props.user_id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((r) => r.json())
      .then((userObj) =>
        this.setState(() => ({
          user: userObj,
        }))
      );
  };

  render() {
    let avatar_url = "no_poster.png";
    if (this.state.user) {
      if (this.state.user.avatar_url) {
        avatar_url = this.state.user.avatar_url;
      }
    }

    return (
      <>
        {!this.state.user ? (
          <h1>Loading</h1>
        ) : (
          <div className="rating-card" key={this.props.id}>
            <NavLink to={`/users/${this.state.user.id}`} user={this.props.user}>
              <img
                className="movie-rating-avatar"
                src={`${avatar_url}`}
                alt={`${this.state.user.username}'s avatar`}
              />

              <h4>{this.state.user.username}: </h4>
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
        )}
      </>
    );
  }
}
export default MovieRatingCard;
