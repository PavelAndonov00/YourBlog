import './Login.css';

import { Component } from 'react';

class Login extends Component {
    constructor(props) {
        super(props);
        console.log(props.match.params.id);
    }

    render() {
        return (
            <section className="main-login-form-wrapper">
                <h2 className="main-login-form-heading">Login</h2>
                <form className="main-login-form">
                    <label htmlFor="loginInfo">Username or Email</label>
                    <input id="loginInfo"
                        name="loginInfo"
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