import React from "react";
import ProfileRatingsContainer from './ProfileRatingsContainer'


class ProfilePage extends React.Component {
  state = {
    
  };

  componentDidMount() {
    
    this.fetchProfile()
    
  }

  fetchProfile = () => {
    const token = localStorage.getItem("token");
    

      fetch(`http://localhost:3000/api/v1/users/${this.props.profileId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        
      })
        .then((r) => r.json())
        .then((profileObj) =>
          this.setState(() => ({
            profile: profileObj
          }))
          
        )
        .catch((error) => console.error(error));

    };

  render() {
    let profile = this.state.profile
    //console.log(this.state.profile)
    
    return (
      
      <>
      {!profile ? <h1>Loading...</h1> : 

      
      
        <div className="profile-page-div" key={profile.id}>
        
        <img className="profile-avatar" src={`${profile.avatar_url}`} alt={`${profile.username}'s avatar`}/>
        <h1 className="profile-username">{profile.username}</h1>

        {profile.ratings ? <h2 className="profile-ratings-number">{`${profile.ratings.length} ratings`}</h2> : null}
        
        {profile.one_line ? <h3 className="profile-one-line">{profile.one_line}</h3> : <h3>This user hasn't added a one-liner yet.</h3>}
        {profile.twitter ? <a href={'https://twitter.com/' + profile.twitter } className="profile-social">Twitter: @{profile.twitter}</a>
        : <p>This user hasn't added a Twitter account yet.</p>}
        {profile.instagram ? <a href={'https://instagram.com/' + profile.instagram } className="profile-social">Instagram: @{profile.detailed_bio}</a> 
        : <p>This user hasn't added an Instagram account yet.</p>}
        {/* <p className="profile-detailed-bio">{profile.detailed_bio}</p> */}
        {profile.detailed_bio ? <p className="profile-detailed-bio">{profile.detailed_bio}</p> : <p>This user hasn't added a detailed bio yet.</p>}
        <br/>
        <h2>Ratings:</h2>
      <ProfileRatingsContainer profile={profile} user={this.props.user}/>
      </div>
      }
    </>
    )
  }
}

export default ProfilePage;
