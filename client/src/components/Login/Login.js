import './Login.css';

import { Component } from 'react';

class Login extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className="login-form-wrapper">
                <h2 className="login-form-heading">Login form</h2>
                <form className="login-form">
                    <label htmlFor="loginInfo">Username or Email</label>
                    <input id="loginInfo"
                        name="loginInfo"
                        placeholder="Username or Email"
                        type="text" />
                    <label htmlFor="password">Password</label>
                    <input id="password"
                        name="password"
                        placeholder="Password"
                        type="password" />
                    <input type="submit" value="Submit" />
                </form>
            </section>
        )
    }
}

export default Login;