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
        if (!username || !password) {
            return;
        }

        let summaryValidation = "";

        try {
            let result = await login(username, password);

            if (result.errors) {
                Object.keys(result.errors)
                    .forEach(k => summaryValidation += this.errors[k] + " ");
            } else if (result.error) {
                summaryValidation = result.error;
            } else if (result.success) {
                localStorage.setItem("user", JSON.stringify(result.user));
                
                // setInterval(() => {
                //     localStorage.setItem("user", JSON.stringify({}));
                //     this.props.history.push('/login');
                //     this.context.setMessage("Session expired!");
                // }, 600000 * 6 * 12) // 10min * 6 * 12 = 12 hours
                
                this.props.history.push("/");
                this.context.setMessage(result.success);
            }
        }
        catch (e) {
            console.log(e);
        }

        this.setState(oldState => { return { ...oldState, summaryValidation } });
    }

    render() {
        return (
            <section className="main-login-form-wrapper">
                <h2 className="main-login-form-heading">Login</h2>
                <p className="error-message">{this.state.summaryValidation}</p>
                <form className="main-login-form" onSubmit={this.onSubmitHandler}>
                    <label htmlFor="username">Username or Email</label>
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