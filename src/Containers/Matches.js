import React from "react";

class Matches extends React.Component {

  state ={
    matches: {}
  }

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
        {this.state.matches ? (
          //<MatchesContainer matches={this.state.matches} user={this.props.user} />
          <h1>Matches</h1>
        ) : (
          <h4>Loading...</h4>
        )}
        
        {/* </InfiniteScroll> */}
      </>
    );
  }


}

export default Matches;
