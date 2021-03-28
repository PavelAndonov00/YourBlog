import './Register.css';

import {Component} from 'react';

class Register extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className="register-form-wrapper">
                <h2 className="register-form-heading">Register form</h2>
                <form className="register-form">
                    <label htmlFor="username">Username</label>
                    <input id="username"
                        name="username"
                        placeholder="Username"
                        type="text" />
                    <label htmlFor="email">Email</label>
                    <input id="email"
                        name="email"
                        placeholder="Email"
                        type="text" />
                    <label htmlFor="password">Password</label>
                    <input id="password"
                        name="password"
                        placeholder="Password"
                        type="password" />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        type="password" />
                    <input type="submit" value="Submit"/>
                </form>
            </section>
        )
    }
}

export default Register;