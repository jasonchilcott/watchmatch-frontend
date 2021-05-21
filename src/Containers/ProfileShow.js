import React from "react";
import { Route , Switch} from 'react-router-dom'
import ProfilePage from './ProfilePage.js'


class ProfileShow extends React.Component {
  
  


  render() {
    return (
      <>
      <Switch>
      <Route path='/users/:id' render={({ match }) => {
        let id = parseInt(match.params.id) 
        
        return <ProfilePage profileId={id} user={this.props.user}/>
      }} />
      <Route path='/profile' exact render={() => {
        
        return <ProfilePage className='profile-page' profileId={this.props.user.id} user={this.props.user}/>
      }} />

      </Switch>
      </>
    )
  }
}

export default ProfileShow;
