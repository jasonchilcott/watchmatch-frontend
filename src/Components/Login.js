import React from "react"
import { NavLink } from 'react-router-dom'


class Login extends React.Component{
  state={
    username: "",
    password: "",
    loginError: this.props.loginError
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.loginError !== prevProps.loginError) {
      this.setState(()=>({
        loginError: this.props.loginError
      }))
    }
  }

  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }
  
  localLoginHandler = (e) => {
    e.preventDefault()
    this.props.loginHandler(this.state)

    this.setState(()=>({
      username: "",
      password: ""
    }))
  }    

  handleErrors = () => {
    return <p className='error'> {this.state.loginError.message}</p>
  
}
  
  render(){
    return(
      <>
      <div className="login">
      <p>Please Log in:</p>

      <form className="login-form" onSubmit={this.localLoginHandler}>
        
        <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.changeHandler} />
        <br>
        </br>
        <br>
        </br>
        <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.changeHandler} />
        <br>
        </br>
        <br>
        </br>
        <input type="submit" input="true" value="Log In" />
        { this.state.loginError ? this.handleErrors() : null }
      
      </form>
      <br/>
      <NavLink to="/signup">
        OR SIGN UP
      </NavLink>
      </div>
      </>
    )
  }
}

export default Login