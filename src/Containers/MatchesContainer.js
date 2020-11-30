import React from "react"
import MatchCard from "../Components/MatchCard"

class MatchesContainer extends React.Component{


  renderMatches = () => this.props.matches.map((match) => {
    return <MatchCard key={match.id} match={match} user={this.props.user}/>
  })

  //finds difference between two 0.5-5 ratings and applies an exponential curve
weightedDifference = (a, b) => {
  return (((a - b)/4.5)**2)
} 

//returns list of movies the match and current user have both rated
sharedMovies = (match) => {
  const currentUserMovies = this.props.user.ratings.map((rating) => rating.movie_id)
  return match.ratings.filter(rating => currentUserMovies.includes(rating.movie_id))
}

//compares ratings in array, needs to be changed to work with an array of objects
compareRatings = (arrA, arrB) => {
  return arrA.map((rating, index) => {
    return this.weightedDifference(rating, arrB[index])
  })
}

//averages weighted difference of ratings of two arrays and returns compatibility as a percentage
ratingsCompatibility = (arrA, arrB) => {
  let  ratingsDiffArray = this.compareRatings(arrA, arrB)
  let compatibility = ((1 - (ratingsDiffArray.reduce((a, b) => a + b) / ratingsDiffArray.length) ) * 100 )
  // if (compatibility > highestPossibleMatch) {
  //   return highestPossibleMatch
  // } else {
    return compatibility
  // }

}

//margin of error based on how many of the same movie/show/etc two people have both rated
highestPossibleMatch = (numberOfSharedRatings) => {
  return ((1 - ( 1 / numberOfSharedRatings )) * 100 )
}



  render() {

    return(
        <div className="matches-container">
            {this.renderMatches()}
        </div>

)

}



}

export default MatchesContainer
