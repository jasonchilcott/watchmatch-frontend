import React from "react";



class ProfilePage extends React.Component {
  state = {
    
  };

  componentDidMount() {
    this.fetchProfile()
  }

  fetchProfile = () => {
    const token = localStorage.getItem("token");
    console.log(this.props)

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
    return (
      
      <>
      {!profile ? <h1>Loading</h1> : 
      
      <div className="profile-page" key={profile.id}>
        
        <img className="avatar" src={`${profile.avatar_url}`} alt={`${profile.username}'s avatar`}/>
        <h1 className="profile-username">{profile.username}</h1>
        <h3 className="profile-one-line">{profile.one_line}</h3>
        <p className="profile-detailed-bio">{profile.detailed_bio}</p>
      </div>
      }
    </>
    )
  }
}

export default ProfilePage;
