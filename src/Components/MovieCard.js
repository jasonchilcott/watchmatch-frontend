import React from "react"
import ReactStars from "react-rating-stars-component";



class MovieCard extends React.Component {

  state = {
    userRatingId: null,
    stars: 0
  }

  componentDidMount(){
    this.getRating()

  }


  getRating = () => {
    if (this.props.user) {
    const ratings = this.props.user.ratings
    const movie = this.props.movie
    if (ratings.some(rating => rating.movie_id === movie.id)){
      let thisRating = ratings.find(rating => rating.movie_id === movie.id)
      this.setState({ 
        userRatingId: thisRating.id,
        stars: thisRating.stars
      })
      
    }}
  }





  starHandler = (rating) => {
    let ratingObj = {
      movie_id: this.props.movie.id,
      user_id: this.props.user.id,
      stars: rating
    }
    const token = localStorage.getItem("token")

    if ( this.state.userRatingId && (this.state.stars !== rating) ) {
      fetch(`http://localhost:3000/api/v1/ratings/${this.state.userRatingId}`,{
              method: 'PATCH',
              headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
                  Accept: 'application/json'
              },
              body: JSON.stringify(
                {stars: rating}
              )
          })
          .then(resp => resp.json())
          .then(rating => this.setState({
            stars: rating.stars
          }))

      


    } else {
      fetch('http://localhost:3000/api/v1/ratings',{
              method: 'POST',
              headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
                  Accept: 'application/json'
              },
              body: JSON.stringify(
                ratingObj
              )
          })
          .then(resp => resp.json())
          .then(rating => this.setState({
            userRatingId: rating.id,
            stars: rating.stars
          }))


    }
    


    
  }

  






  render() {
    const movie = this.props.movie
    let poster_url = "no_poster.png"
    if (movie.poster_path) {
      poster_url = `https://image.tmdb.org/t/p/w185${movie.poster_path}`
    }
    return(
        <>
                <div className="movie-card" key={movie.id}>
                    <img src={poster_url} alt={movie.title}/>
                    <h2>{movie.title}</h2>
                    <ReactStars
                      className="stars"
                      count={5}
                      value={this.state.stars}
                      isHalf={true}
                      onChange={this.starHandler}
                      size={24}
                      activeColor="#ff0000"
                    />
                </div>
              </>
            )
          }
        
}
export default MovieCard