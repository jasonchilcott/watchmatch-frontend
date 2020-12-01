import React from "react";
import { NavLink } from "react-router-dom";

class MatchCard extends React.Component {
  state = {} ;

  render() {
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
              <h2>
                {parseFloat(this.props.match.compatibility).toFixed(1)}% with {this.props.match.username}
              </h2>
            </NavLink>
          </div>
        )}
      </>
    );
  }
}
export default MatchCard;
