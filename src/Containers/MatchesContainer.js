import React from "react";
import MatchCard from "../Components/MatchCard";

class MatchesContainer extends React.Component {
  renderMatches = () => {
    let matches = this.props.matches;
    let sortedMatches = [];

    matches.forEach(
      (match) => (match.compatibility = this.ratingsCompatibility(match))
    );

    sortedMatches = matches.sort(
      (a, b) => parseFloat(b.compatibility) - parseFloat(a.compatibility)
    );

    return sortedMatches.map((match) => {
      
      return <MatchCard key={match.id} match={match} user={this.props.user} />;
    });

  };

  //averages weighted difference of ratings of current user and match and returns compatibility as a percentage
  ratingsCompatibility = (match) => {
    const user = this.props.user;

    // array of movie_ids of all movies rated by the current user
    const currentUserMovies = user.ratings.map((rating) => rating.movie_id);

    //array of ratings for movies the match and current user have both rated
    let sharedMovies = match.ratings.filter((rating) =>
      currentUserMovies.includes(rating.movie_id)
    );

    //maps through all shared movies, comparing the stars rating the user and match have given
    let compareRatings = sharedMovies.map((matchRating) => {

      // the current user's rating for the movie the match rated
      let userRating = user.ratings.find(
        (rating) => rating.movie_id === matchRating.movie_id
      );

      //finds difference between two 0.5-5 ratings and applies an exponential curve
      let weightedDifference = (a, b) => {
        return ((a - b) / 4.5) ** 2;
      };

      return weightedDifference(userRating.stars, matchRating.stars);
    });

    //margin of error based on how many of the same movie/show/etc two people have both rated
    let highestPossibleMatch = ((1 - 1 / sharedMovies.length) * 100);

    let ratingsDiffArray = compareRatings;

    //the mean of the weighted difference values of each shared rated movie between user/match, converted to a percentage
    let compatibility = ((1 - ratingsDiffArray.reduce((a, b) => a + b) / ratingsDiffArray.length) * 100);

    //returns margin of error if margin of error is greater than match percentage
    if (compatibility > highestPossibleMatch) {
      return highestPossibleMatch;
    } else {
      return compatibility;
    }
  };

  render() {
    return <div className="matches-container">{this.renderMatches()}</div>;
  }
}

export default MatchesContainer;
