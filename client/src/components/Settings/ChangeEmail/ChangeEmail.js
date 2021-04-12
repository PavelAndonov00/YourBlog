import {
    EMAIL_REGEX,
    EMAIL_VALIDATION_MESSAGE
} from '../../../global/constants';

import { useContext, useState } from 'react';

import './ChangeEmail.css';
import {changeEmail} from '../../../services/authService';
import Context from '../../../contexts/context';

const ChangeEmail = ({ history }) => {
    const context = useContext(Context);

    const [validation, setValidation] = useState({
        summary: "",
        NewEmailValidation: "",
        ConfirmNewEmailValidation: ""
    });

    const errors = {
        NewEmail: EMAIL_VALIDATION_MESSAGE,
        ConfirmNewEmail: "Emails do not match."
    };

    const onSubmit = async (ev) => {
        ev.preventDefault();

        let currentValidation = {};

        let password = ev.target.password.value;
        if (!password) {
            return;
        }

        let newEmail = ev.target.newEmail.value;
        if (!newEmail.match(EMAIL_REGEX)) {
            currentValidation.NewEmailValidation = errors.NewEmail;
        } else {
            currentValidation.NewEmailValidation = "";
        }

        let confirmNewEmail = ev.target.confirmNewEmail.value;
        if (newEmail !== confirmNewEmail && !currentValidation.NewEmailValidation) {
            currentValidation.ConfirmNewEmailValidation = errors.ConfirmNewEmail;
        } else {
            currentValidation.ConfirmNewEmailValidation = "";
        }

        // TODO: This logic is repeated in many files so must be extracted in hook 
        if (!Object.values(currentValidation).find(v => v != false)) {
            try {
                let result = await changeEmail(password, newEmail, confirmNewEmail);

                if (result.errors) {
                    Object.keys(result.errors)
                        .forEach(k => currentValidation[k + "Validation"] = errors[k]);
                } else if (result.error) {
                    currentValidation.summary = result.error;
                } else if (result.success) {
                    history.push("/profile/settings")
                    context.setMessage(result.message);
                }
            } catch (error) {
                console.log(error);
            }
        }

        setValidation(oldState => { return { ...oldState, ...currentValidation } });
    };

    return (
        <>
            <h2 className="main-profile-settings-main-heading">Change Email</h2>
            <p className="error-message">{validation.summary}</p>
            <form className="main-profile-settings-main-form"
                onSubmit={onSubmit}>
                <label htmlFor="password">Password</label>
                <input id="password"
                    name="password"
                    type="password" />

                <label htmlFor="newEmail">New Email</label>
                <input id="newEmail"
                    name="newEmail"
                    type="text" />
                <span className="error-message">
                    {validation.NewEmailValidation}
                </span>

                <label htmlFor="confirmNewEmail">Confirm New Email</label>
                <input id="confirmNewEmail"
                    name="confirmNewEmail"
                    type="text" />
                    <span className="error-message">
                    {validation.NewEmailValidation || validation.ConfirmNewEmailValidation}
                </span>

                <input type="submit" value="Confirm" />
            </form>
        </>
    );
}

export default ChangeEmail;