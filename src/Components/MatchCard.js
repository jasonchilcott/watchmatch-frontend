import React from "react";
import { NavLink } from "react-router-dom";

class MatchCard extends React.Component {
  state = {};

  colorCompatibility = () => {
    if (this.props.match.compatibility >= 75) {
      return (
        <h2 className="good-match">
          {parseFloat(this.props.match.compatibility).toFixed(1)}%
        </h2>
      );
    } else if (this.props.match.compatibility <= 50) {
      return (
        <h2 className="bad-match">
          {parseFloat(this.props.match.compatibility).toFixed(1)}%
        </h2>
      );
    } else {
      return (
        <h2 className="okay-match">
          {parseFloat(this.props.match.compatibility).toFixed(1)}%
        </h2>
      );
    }
  };

  render() {
    let avatar_url = "no_poster.png";
    if (this.props.match) {
      if (this.props.match.avatar_url) {
        avatar_url = this.props.match.avatar_url;
      }
    }
    return (
      <>
        {!this.props.match.id ? (
          <h1>Loading...</h1>
        ) : (
          <div className="match-card" key={this.props.match.id}>
            <NavLink
              to={`/users/${this.props.match.id}`}
              user={this.props.user}
            >
              <img
                className="match-avatar"
                src={`${avatar_url}`}
                alt={`${this.props.match.username}'s avatar`}
              />

              {this.colorCompatibility()}

              <h2>{this.props.match.username}</h2>
              {this.props.match.ratings ? <h2 className="match-ratings-number">{`${this.props.match.ratings.length} ratings`}</h2> : null}
            </NavLink>
          </div>
        )}
      </>
    );
  }
}
export default MatchCard;
