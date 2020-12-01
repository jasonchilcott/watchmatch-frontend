import React from "react";

class Search extends React.Component {
  state = {
    search: "",
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  searchHandler = (e) => {
    e.preventDefault();
    let search = this.state.search;
    this.props.searchDoer(search);
  };

  render() {
    return (
      <>
        <form className="search" onSubmit={this.searchHandler}>
          <input
            type="text"
            name="search"
            placeholder="Search"
            value={this.state.search}
            onChange={this.changeHandler}
          />
          <input type="submit" value="Search" />
        </form>
      </>
    );
  }
}

export default Search;
