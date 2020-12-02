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
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  localSignupHandler = (e) => {
    e.preventDefault();
    this.props.signUpHandler(this.state);

    this.setState(() => ({
      username: "",
      password: "",
      confirm_password: "",
      avatar_url: "",
      one_line: "",
      detailed_bio: "",
    }));
  };

  render() {
    return (
      <>
        <div className="signup">
          <h2 className="create-account">Create a new account</h2>

          <form className="signup-form" onSubmit={this.localSignupHandler}>
            <label>Choose a username: </label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={this.state.username}
              onChange={this.changeHandler}
            />
            <br></br>
            <br></br>
            <label>Choose a password: </label>
            <input
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
              type="password"
              name="confirm_password"
              placeholder="Confirm Password"
              value={this.state.confirm_password}
              onChange={this.changeHandler}
            />
            <br></br>
            <br></br>
            <label>One line that sums you up, or a catchprhase: </label>
            <input
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
              type="text"
              name="avatar_url"
              placeholder="URL of avatar"
              value={this.state.avatar_url}
              onChange={this.changeHandler}
            />
            <br></br>
            <br></br>
            <input type="submit" value="Sign up" />
          </form>
          <br />
          <NavLink to="/login">OR LOG IN</NavLink>
        </div>
      </>
    );
  }
}

export default Signup;
