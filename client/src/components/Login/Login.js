import './Login.css';

import { Component } from 'react';
import { login } from '../../services/authService';
import Context from '../../contexts/context';

class Login extends Component {
    static contextType = Context;

    constructor(props) {
        super(props);
        
        this.state = {
            summaryValidation: ""
        };

        this.errors = {
            Password: "The Password field is required.",
            Username: "The Username field is required."
        }

        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    async onSubmitHandler(ev) {
        ev.preventDefault();

        let username = ev.target.username.value;
        let password = ev.target.password.value;
        if(!username || !password) {
            return;
        }

        let summaryValidation = "";

        try {
            let result = await login(username, password);

            if (result.errors) {
                Object.keys(result.errors)
                    .forEach(k => summaryValidation += this.errors[k] + " ");
            } else if(result.error){
                summaryValidation = result.error;
            } else if(result.success){
                this.context.setMessage(result.success);

                localStorage.setItem("token", result.token);
                this.context.setToken(result.token);

                localStorage.setItem("user", JSON.stringify(result.user));
                this.context.setUser(result.user);

                this.props.history.push("/");
            }
        }
        catch (e) {
            console.log(e);
        }

        this.setState(oldState => {return {...oldState, summaryValidation}});
    }

    componentDidMount() {
        if(this.context.message) {
            setTimeout(() => {
                this.context.setMessage("");
            }, 5000);
        }
    }

    render() {
        return (
            <section className="main-login-form-wrapper">
                <p className="information-message">{this.context.message}</p>
                <h2 className="main-login-form-heading">Login</h2>
                <span className="error-message">{this.state.summaryValidation}</span>
                <form className="main-login-form" onSubmit={this.onSubmitHandler}>
                    <label htmlFor="username">Username</label>
                    <input id="username"
                        name="username"
                        type="text" />

                    <label htmlFor="password">Password</label>
                    <input id="password"
                        name="password"
                        type="password" />

                    <input type="submit" value="Login" />
                </form>
            </section>
        )
    }
}

export default Login;