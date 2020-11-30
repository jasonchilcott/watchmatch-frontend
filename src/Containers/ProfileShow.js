import React from "react";
import { Route , Switch} from 'react-router-dom'
import ProfilePage from './ProfilePage.js'


class ProfileShow extends React.Component {
  
  


  render() {
    console.log(this.props)
    return (
      <>
      <Switch>
      <Route path='/users/:id' render={({ match }) => {
        let id = parseInt(match.params.id) 
        
        return <ProfilePage profile_id={id} current_user={this.props.user}/>
      }} />
      <Route path='/profile' exact render={() => {
        
        return <ProfilePage profile_id={this.props.user.id} current_user={this.props.user}/>
      }} />

      </Switch>
      </>
    )
  }
}

export default ProfileShow;
