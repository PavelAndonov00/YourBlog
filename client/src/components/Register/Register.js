import './Register.css';

import {Component} from 'react';

class Register extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className="main-register-form-wrapper">
                <h2 className="main-register-form-heading">Register</h2>
                <form className="main-register-form">
                    <label htmlFor="username">Username</label>
                    <input id="username"
                        name="username"
                        type="text" />
                    <label htmlFor="email">Email</label>
                    <input id="email"
                        name="email"
                        type="text" />
                    <label htmlFor="password">Password</label>
                    <input id="password"
                        name="password"
                        type="password" />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input id="confirmPassword"
                        name="confirmPassword"
                        type="password" />
                    <input type="submit" value="Register"/>
                </form>
            </section>
        )
    }
}

export default Register;