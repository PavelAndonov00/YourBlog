import './Register.css';

import { Component } from 'react';
import { register } from '../../services/authService';
import Context from '../../contexts/context';

class Register extends Component {
    static contextType = Context;
    constructor(props) {
        super(props);
        this.state = {
            summary: "",
            usernameValidation: "",
            emailValidation: "",
            passwordValidation: "",
            confirmpasswordValidation: ""
        };

        this.EMAIL_REGEX = /^.+@.+[.].+$/gm;
        this.PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

        this.errors = {
            Username: "Username must be least 5 characters long.",
            Password: "Password must have at least one upper and one lower case letter. At least one digit and special symbol. At least 8 characters long.",
            ConfirmPassword: "Passwords do not match.",
            Email: "Email is not valid email address."
        };

        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    async onSubmitHandler(ev) {
        ev.preventDefault();

        let validation = {};

        let username = ev.target.username.value;
        if (username.length < 5) {
            validation.usernameValidation = this.errors.Username;
        } else {
            validation.usernameValidation = ""
        }

        let email = ev.target.email.value;
        if (!email.match(this.EMAIL_REGEX)) {
            validation.emailValidation = this.errors.Email;
        } else {
            validation.emailValidation = ""
        }

        let password = ev.target.password.value;
        if (!password.match(this.PASSWORD_REGEX)) {
            validation.passwordValidation = this.errors.Password;
        } else {
            validation.passwordValidation = "";
        }

        let confirmPassword = ev.target.confirmPassword.value;
        if (password !== confirmPassword && !validation.passwordValidation) {
            validation.confirmpasswordValidation = this.errors.ConfirmPassword;
        }

        // Is validated
        if (!Object.values(validation).find(v => v != false)) {
            try {
                let result = await register(username, email, password, confirmPassword);

                if (result.errors) {
                    Object.keys(result.errors)
                        .forEach(k => validation[k.toLowerCase() + "Validation"] = this.errors[k]);
                } else if (Array.isArray(result)) {
                    validation.summary = result.map(e => e.description).join(" ");
                } else if (result.success) {
                    this.context.setMessage(result.message);
                    this.props.history.push("/login")
                }
            } catch (error) {
                console.log(error);
            }
        }

        this.setState(oldState => { return { ...oldState, ...validation } });
    }

    render() {
        return (
            <section className="main-register-form-wrapper">
                <h2 className="main-register-form-heading">Register</h2>
                <p className="error-message">{this.state.summary}</p>
                <form className="main-register-form"
                    onSubmit={this.onSubmitHandler}>
                    <label htmlFor="username">Username</label>
                    <input id="username"
                        name="username"
                        type="text" />
                    <span className="error-message">
                        {this.state.usernameValidation}
                    </span>

                    <label htmlFor="email">Email</label>
                    <input id="email"
                        name="email"
                        type="text" />
                    <span className="error-message">
                        {this.state.emailValidation}
                    </span>

                    <label htmlFor="password">Password</label>
                    <input id="password"
                        name="password"
                        type="password" />
                    <span className="error-message">
                        {this.state.passwordValidation}
                    </span>


                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input id="confirmPassword"
                        name="confirmPassword"
                        type="password" />
                    <span className="error-message">
                        {this.state.confirmpasswordValidation ||
                            this.state.passwordValidation}
                    </span>

                    <input type="submit" value="Register" />
                </form>
            </section>
        )
    }
}

export default Register;