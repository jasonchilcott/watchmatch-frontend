import React from "react";
import { NavLink } from "react-router-dom";

class Signup extends React.Component {
  state = {
    username: "",
    password: "",
    confirm_password: "",
    avatar_url: "",
    one_line: "",
    detailed_bio: "",
    signupError: this.props.signupError
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidUpdate(prevProps) {
    
    if (this.props.signupError !== prevProps.signupError) {
      this.setState(()=>({
        signupError: this.props.signupError
      }))
    }
  }

  localSignupHandler = (e) => {
    e.preventDefault();
    const userRe = /^([a-zA-Z0-9]){1}([\w]){4,15}$/
    const passRe = /^[A-Za-z0-9]{4,16}$/

    if (this.state.password !== this.state.confirm_password){
      this.setState({signupError: "Password must match"})
    } else if (!userRe.test(this.state.username)){
      this.setState({signupError: "Choose a valid username"})
    } else if (!passRe.test(this.state.password)){
      this.setState({signupError: "Choose a valid password"})
    } else { 
      this.props.signUpHandler(this.state);
  
      };

    }
  

  handleSignupError = () => {
    return <p className='error'> {this.state.signupError}</p>
}

  // username regex: /^([a-zA-Z0-9]){1}([a-zA-Z0-9\_]){4,15}$/

  render() {
    return (
      <>
        <div className="signup">
          <h2 className="create-account">Create a new account</h2>

          <form className="signup-form" onSubmit={this.localSignupHandler}>
            <label>Choose a username: </label>
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="Username"
              value={this.state.username}
              onChange={this.changeHandler}
            />
            <br></br>
            <br></br>
            <label>Choose a password: </label>
            <input
              className="form-control"
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.changeHandler}
            />
            <br></br>
            <br></br>
            <label>Confirm password: </label>
            <input
              className="form-control"
              type="password"
              name="confirm_password"
              placeholder="Confirm Password"
              value={this.state.confirm_password}
              onChange={this.changeHandler}
            />
            <br></br>
            <br></br>
            <label>One line that sums you up, or a catchphrase: </label>
            <input
              className="form-control"
              type="text"
              name="one_line"
              placeholder="One line bio"
              value={this.state.one_line}
              onChange={this.changeHandler}
            />
            {/* <br></br>
            <br></br>
            <label>Detailed bio. Tell anything else you want everyone to know about you here: </label>
            <textarea
              name="detailed_bio"
              placeholder="Write your whole story"
              value={this.state.detailed_bio}
              onChange={this.changeHandler}
              rows={10}
          cols={35}
            /> */}
            <br></br>
            <br></br>
            <label>URL for your avatar. Can be you, a drawing you like, a movie screenshot, whatever: </label>
            <input
              className="form-control"
              type="text"
              name="avatar_url"
              placeholder="URL of avatar"
              value={this.state.avatar_url}
              onChange={this.changeHandler}
            />
            <br></br>
            <br></br>
            <button type="submit" className="btn btn-primary">Sign up </button>
            { this.state.signupError ? this.handleSignupError() : null }
          </form>
          <br />
          <NavLink to="/login">OR LOG IN</NavLink>
        </div>
      </>
    );
  }
}

export default Signup;
