import React from "react"


class Login extends React.Component{
    state={
        username: "",
        password: ""
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
    
    render(){
        return(
            <>
            <p>Please Log in:</p>
            <div className="login">

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
            
            </form>

            </div>
            </>
        )
    }
}

export default Login