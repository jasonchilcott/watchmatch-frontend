import React from "react"
import { NavLink } from 'react-router-dom'

class Signup extends React.Component{
    state={
        
        
        username: "",
        password: "",
        confirm_password: "",
        avatar_url: "",
        one_line: "",
        detailed_bio: ""
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    
    localSignupHandler = (e) => {
        e.preventDefault()
        this.props.signUpHandler(this.state)

        this.setState(()=>({
          username: "",
          password: "",
          confirm_password: "",
          avatar_url: "",
          one_line: "",
          detailed_bio: ""
        }))
    }
    


    render(){
        return(
            <>
            <div className="signup">
            <h4 className="create-account">Create a new account</h4>

            <form className="signup-form" onSubmit={this.localSignupHandler}>

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
                <input type="password" name="confirm_password" placeholder="Confirm Password" value={this.state.confirm_password} onChange={this.changeHandler} />
                <br>
                </br>
                <br>
                </br>
                <input type="text" name="one_line" placeholder="Sum yourself up with one line or catchphrase" value={this.state.one_line} onChange={this.changeHandler} />
                <br>
                </br>
                <br>
                </br>
                <input type="text_area" name="detailed_bio" placeholder="Tell anything else you want us to know about you here" value={this.state.detailed_bio} onChange={this.changeHandler} />
                <br>
                </br>
                <br>
                </br>
                <input type="text" name="avatar_url" placeholder="URL of avatar" value={this.state.avatar_url} onChange={this.changeHandler} />
                <br>
                </br>
                <br>
                </br>
                <input type="submit" value="sign up"/>
            
            </form>
            <br/>
            <NavLink to="/login">
             OR LOG IN
          </NavLink>

            </div>
            </>
        )
    }
}

export default Signup