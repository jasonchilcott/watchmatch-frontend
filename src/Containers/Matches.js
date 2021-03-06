import React from "react";
import MatchesContainer from "./MatchesContainer";

class Matches extends React.Component {
  state = {
    matches: [],
  };

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = () => {
    const token = localStorage.getItem("token");

    fetch("https://watchmatch-api.herokuapp.com/api/v1/users", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((r) => r.json())
      .then(
        (allUsers) => this.filterAllUsers(allUsers)
      )

      .catch((error) => console.error(error));
  };

  sharedMovies = (user) => {
    const currentUserMovies = this.props.user.ratings.map(
      (rating) => rating.movie_id
    );
    return user.ratings.filter((rating) =>
      currentUserMovies.includes(rating.movie_id)
    );
  };

  haveSharedMovies = (users) => {
    if (this.props.user.ratings) {
      const currentUserMovies = this.props.user.ratings.map(
        (rating) => rating.movie_id
      );

      let filteredUsers = [];

      users.forEach((user) => {
        user.ratings.forEach((rating) => {
          if (currentUserMovies.includes(rating.movie_id)) {
            filteredUsers.push(user);
          }
        });
      });
      let unique = [...new Set(filteredUsers)];
      return unique;
    }
  };

  filterAllUsers = (users) => {
    const currentUser = this.props.user;
    const usersMinusSelf = users.filter((user) => user.id !== currentUser.id);
    const filteredUsers = this.haveSharedMovies(usersMinusSelf);
    this.setState(() => ({ matches: [...filteredUsers] }));
  };


  render() {
    return (
      <>
        {/* <InfiniteScroll
                dataLength={this.state.matches.length} //This is important field to render the next data
                next={() => console.log("hit bottom")}
                hasMore={true}
                loader={<h4>Loading...</h4>}
                endMessage={
                <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
                </p>
                }
            > */}

        <>
          <div className="matches">
            {this.state.matches.length > 0 ? (
              <>
                <h1>MATCHES</h1>
                <br></br>
                <br></br>
                <MatchesContainer
                  matches={this.state.matches}
                  user={this.props.user}
                />
              </>
            ) : (
              <h4>Loading...</h4>
            )}
          </div>
        </>

        {/* </InfiniteScroll> */}
      </>
    );
  }
}

export default Matches;
