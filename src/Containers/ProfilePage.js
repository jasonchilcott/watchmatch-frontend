import React from "react";
import ProfileRatingsContainer from './ProfileRatingsContainer'


class ProfilePage extends React.Component {
  state = {
    editing: false,
    avatar_url: this.props.user.avatar_url || "",
    one_line: this.props.user.one_line || "",
    detailed_bio: this.props.user.detailed_bio || "",
    twitter: this.props.user.twitter || "",
    instagram: this.props.user.instagram || "",


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

  editButton = () => {
    if (this.state.profile.id === this.props.user.id) {
      return <button onClick={() => this.setState({editing: true})}>Edit profile</button>
    }
  }
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  
  patchHandler = (e) => {
    e.preventDefault();
    const noAtTwit = this.state.twitter.replace(`@`, "")
    const noAtInsta = this.state.instagram.replace(`@`, "")
    const editObj = {
      avatar_url: this.state.avatar_url,
      one_line: this.state.one_line,
      detailed_bio: this.state.detailed_bio,
      twitter: noAtTwit,
      instagram: noAtInsta
    }

    const token = localStorage.getItem("token");

    fetch(`http://localhost:3000/api/v1/users/${this.props.user.id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({user: editObj})
        
      })
        .then((r) => r.json())
        .then((profileObj) =>
          this.setState(() => ({
            profile: profileObj,
            editing: false

          }),
          
        )
          
        )
        .catch((error) => console.error(error));
    
  }



  editHandler = () => {
    if (this.state.editing === false) {

      let profile = this.state.profile
      return (

      <div className="profile">
        <img className="profile-avatar" src={`${profile.avatar_url}`} alt={`${profile.username}'s avatar`}/>
        <h1 className="profile-username">{profile.username}</h1>

        {this.editButton()}

        {profile.ratings ? <h2 className="profile-ratings-number">{`${profile.ratings.length} ratings`}</h2> : null}
        
        {profile.one_line ? <h3 className="profile-one-line">{profile.one_line}</h3> : <h3>This user hasn't added a one-liner yet.</h3>}
        {profile.twitter ? <a href={'https://twitter.com/' + profile.twitter } target="_blank" className="profile-social">Twitter: @{profile.twitter}</a>
        : <p>This user hasn't added a Twitter account yet.</p>}
        <br></br>
        {profile.instagram ? <a href={'https://instagram.com/' + profile.instagram } target="_blank" className="profile-social">Instagram: @{profile.instagram}</a> 
        : <p>This user hasn't added an Instagram account yet.</p>}
        
        {profile.detailed_bio ? <p className="profile-detailed-bio">{profile.detailed_bio}</p> : <p>This user hasn't added a detailed bio yet.</p>}

      </div>)

    }else if((this.state.editing === true)) {
      const user = this.props.user
      return (
      <div className="edit profile">
        <h2 className="create-account">Edit your profile</h2>

<form className="edit-profile-form" onSubmit={this.patchHandler}>
  
  <label>URL for your avatar. Can be you, a drawing you like, a movie screenshot, whatever: </label>
  <input
    className="form-control"
    type="text"
    name="avatar_url"
    placeholder={user.avatar_url ? user.avatar_url : "URL of avatar"}
    value={this.state.avatar_url}
    onChange={this.changeHandler}
  />
  <br></br>
  <br></br>
  <label>One line that sums you up, or a catchphrase: </label>
  <input
    className="form-control"
    type="text"
    name="one_line"
    placeholder={user.one_line ? user.one_line : "One line bio"}
    value={this.state.one_line}
    onChange={this.changeHandler}
  />
  <br></br>
  <br></br>
  <label>Detailed bio. Tell anything else you want everyone to know about you here: </label>
  <textarea
    name="detailed_bio"
    placeholder={user.detailed_bio ? user.detailed_bio : "Write your whole story"}
    value={this.state.detailed_bio}
    onChange={this.changeHandler}
    rows={10}
cols={35}
  />
  <br></br>
  <br></br>
  <label>Your Twitter username: </label>
  <input
    className="form-control"
    type="text"
    name="twitter"
    placeholder={user.twitter ? user.twitter : "Twitter username"}
    value={this.state.twitter}
    onChange={this.changeHandler}
  />
  <br></br>
  <br></br><label>Your Instagram username: </label>
  <input
    className="form-control"
    type="text"
    name="instagram"
    placeholder={user.instagram ? user.instagram : "Instargram username"}
    value={this.state.instagram}
    onChange={this.changeHandler}
  />
  <br></br>
  <br></br>
  <button type="submit" className="btn btn-primary">Submit </button>
</form>
<br />

      </div>
      )

    }
  }

  render() {
    let profile = this.state.profile
    //console.log(this.state.profile)
    
    return (
      
      <>
      {!profile ? <h1>Loading...</h1> : 
      <div className="profile-page-div" key={profile.id}>
        {this.editHandler()}

      
      
        
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
