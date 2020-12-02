import React from "react";

class Search extends React.Component {
  state = {
    search: "",
    genre: null,
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  searchHandler = (e) => {
    e.preventDefault();
    let search = this.state.search;
    this.props.searchDoer(search);
  };

  genreHandler = (e) => {
    // this.setState({ [e.target.name]: e.target.value },
    //   console.log(e.target.value),
      this.props.genreDoer(e.target.value)
      ;
  };

  render() {
    const genresArr = [
      {
        "id": null,
        "name": "Genre"
      },
      {
        "id": 28,
        "name": "Action"
      },
      {
        "id": 12,
        "name": "Adventure"
      },
      {
        "id": 16,
        "name": "Animation"
      },
      {
        "id": 35,
        "name": "Comedy"
      },
      {
        "id": 80,
        "name": "Crime"
      },
      {
        "id": 99,
        "name": "Documentary"
      },
      {
        "id": 18,
        "name": "Drama"
      },
      {
        "id": 10751,
        "name": "Family"
      },
      {
        "id": 14,
        "name": "Fantasy"
      },
      {
        "id": 36,
        "name": "History"
      },
      {
        "id": 27,
        "name": "Horror"
      },
      {
        "id": 10402,
        "name": "Music"
      },
      {
        "id": 9648,
        "name": "Mystery"
      },
      {
        "id": 10749,
        "name": "Romance"
      },
      {
        "id": 878,
        "name": "Science Fiction"
      },
      {
        "id": 10770,
        "name": "TV Movie"
      },
      {
        "id": 53,
        "name": "Thriller"
      },
      {
        "id": 10752,
        "name": "War"
      },
      {
        "id": 37,
        "name": "Western"
      }
    ]
    return (
      <><div className="search">

        <form onSubmit={this.searchHandler} className="form-group">
          <input
            className="form-control"
            type="text"
            name="search"
            placeholder="Search"
            value={this.state.search}
            onChange={this.changeHandler}
          />
          <button className="btn search-btn" type="submit">Search</button>
        </form>
        <p className="divider"> OR </p>
        <div className="drop-down">
              <select className="form-control" name="genre" onChange={this.genreHandler} value={this.state.value} onSelect={this.genreHandler}>{
                genresArr.map((genreObj) => {
                  return <option value={genreObj.id}>{genreObj.name}</option>
                })
              }</select>
            </div>

      </div>
      </>
    )
  }
}

export default Search;
