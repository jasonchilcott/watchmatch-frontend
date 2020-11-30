import React from "react";



class ProfilePage extends React.Component {
  state = {
    
  };

  componentDidMount() {
    this.fetchProfile()
  }

  fetchProfile = () => {
    const token = localStorage.getItem("token");

      fetch(`http://localhost:3000/api/v1/users/${this.props.profile_id}`, {
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
        
          
          <h1>{profile.username}</h1>
      </div>
      }
    </>
    )
  }
}

export default ProfilePage;
