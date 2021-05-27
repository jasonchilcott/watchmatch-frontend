
import './App.css';
import React from "react"
import { Route, Switch, withRouter } from 'react-router-dom'
import Header from './Components/Header'
import Signup from "./Components/Signup"
import Login from "./Components/Login"
import Rate from './Containers/Rate';
import Matches from './Containers/Matches';
import MovieShow from './Containers/MovieShow.js'
import ProfileShow from './Containers/ProfileShow.js'


class App extends React.Component{
  state={
    user: {},
    loginError: null
  }

  componentDidMount() {
    const token = localStorage.getItem("token")
    if (token && token !== "undefined") {
      fetch("https://watchmatch-api.herokuapp.com/api/v1/profile", {
        method: "GET",
        headers: {Authorization: `Bearer ${token}`},
      })
        .then(resp => resp.json())
        .then(data => this.setState({user: data.user}))
    } else {
      this.props.history.push("/login")
    }
  }

  signUpHandler = (userObj) => {
    fetch(`https://watchmatch-api.herokuapp.com/api/v1/users`, {
      method: "POST",
      headers:{
        "content-type": "application/json",
        accepts: "application/json"
      },
      body: JSON.stringify({user: userObj})
      }).then(async (resp) =>{
        try {
            const json = await resp.json();
            if (!resp.ok) { throw json; }
            localStorage.setItem("token", json.jwt);
            this.setState({ user: json.user }, () => this.props.history.push(`/rate`));
          } catch (json) {
            this.setState({signupError: json.errors});
          }
        
      }
    )
  }


  loginHandler = (userInfo) => {
    fetch(`https://watchmatch-api.herokuapp.com/api/v1/login`,{
      method: "POST",
      headers:{
          "content-type": "application/json",
          accepts: "application/json",
        },
        body: JSON.stringify({user: userInfo})
      }).then(async (resp) =>{
      try {
          const json = await resp.json();
          if (!resp.ok) { throw json; }
          localStorage.setItem("token", json.jwt);
          this.setState({ user: json.user }, () => this.props.history.push(`/rate`));
        } catch (json) {
          this.setState({loginError: json});
        }
    }
  )
}


  logMeOut = () => {
    localStorage.removeItem("token")
    this.setState({user: {}})
    this.props.history.push("/login")
  }

  

  render(){

    

    return (
      <div className="App">
        <Header user={this.state.user} logMeOut={this.logMeOut}/>
        <div className="content-wrapper">
          <Switch>
            <Route path="/signup" render={()=> <Signup signUpHandler={this.signUpHandler} signupError={this.state.signupError}/>} />
            <Route path="/login" render={()=> <Login loginHandler={this.loginHandler} loginError={this.state.loginError}/>} />
            <Route path="/rate" render={()=> <Rate user={this.state.user} />} />
            <Route path="/"  exact render={()=> <Rate user={this.state.user} />} />
            <Route path="/matches" render={()=> <Matches user={this.state.user} />} />
            <Route path="/movies" render={()=> <MovieShow user={this.state.user} />} />
            <Route path="/users" render={()=> <ProfileShow user={this.state.user} />} />
            <Route path="/profile" exact render={()=> <ProfileShow user={this.state.user} />} /> 
            <Route path="/logout" render={()=> <Login loginHandler={this.loginHandler} logMeOut={this.logMeOut} loginError={this.state.loginError}/> }/>

          </Switch>
        </div>
      </div>
    );
  }
}
export default withRouter(App);
