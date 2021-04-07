import { useContext, useState } from 'react';

import './ChangePassword.css';
import { PASSWORD_REGEX, PASSWORD_VALIDATION_MESSAGE, PASSWORDS_DO_NOT_MATCH } from '../../../global/constants';
import { resetPassword } from '../../../services/authService';
import Context from '../../../contexts/context';

const ChangePassword = ({ history }) => {
    const context = useContext(Context);

    const [validation, setValidation] = useState({
        summary: "",
        OldPasswordValidation: "",
        NewPasswordValidation: "",
        ConfirmNewPasswordValidation: ""
    });

    const errors = {
        OldPassword: "Invalid password.",
        NewPassword: PASSWORD_VALIDATION_MESSAGE,
        ConfirmNewPassword: PASSWORDS_DO_NOT_MATCH
    };

    const onSubmit = async (ev) => {
        ev.preventDefault();

        let currentValidation = {};

        let result = await resetPassword("", "", "");

        if (result.errors) {
            Object.keys(result.errors)
                .forEach(k => currentValidation[k + "Validation"] = errors[k]);
        } else if (result.error) {
            currentValidation.summary = result.error;
        } else if (result.success) {
            context.setMessage(result.message);
            history.push("/profile/settings")
        }
        setValidation(oldState => { return { ...oldState, ...currentValidation } });
        return;

        let oldPassword = ev.target.oldPassword.value;
        if (!oldPassword) {
            return;
        }

        let newPassword = ev.target.newPassword.value;
        if (!newPassword.match({ PASSWORD_REGEX })) {
            currentValidation.NewPasswordValidation = errors.NewPassword;
        } else {
            currentValidation.NewPasswordValidation = "";
        }

        let confirmNewPassword = ev.target.confirmNewPassword.value;
        if (newPassword !== confirmNewPassword && !currentValidation.NewPasswordValidation) {
            currentValidation.ConfirmNewPasswordValidation = errors.ConfirmNewPassword;
        } else {
            currentValidation.ConfirmNewPasswordValidation = "";
        }

        if (!Object.values(currentValidation).find(v => v != false)) {
            try {
                let result = await resetPassword(oldPassword, newPassword, confirmNewPassword);

                if (result.errors) {
                    Object.keys(result.errors)
                        .forEach(k => currentValidation[k + "Validation"] = errors[k]);
                } else if (result.error) {
                    currentValidation.summary = result.error;
                } else if (result.success) {
                    context.setMessage(result.message);
                    history.push("/profile/settings")
                }
            } catch (error) {
                console.log(error);
            }
        }

        setValidation(oldState => { return { ...oldState, ...currentValidation } });
    }

    return (
        <>
            <h2 className="main-profile-settings-main-heading">Change Password</h2>
            <p className="error-message">{validation.summary}</p>
            <form className="main-profile-settings-main-form"
                onSubmit={onSubmit}>
                <label htmlFor="oldPassword">Old Password</label>
                <input id="oldPassword"
                    name="oldPassword"
                    type="password" />
                <span className="error-message">
                    {validation.OldPasswordValidation}
                </span>

                <label htmlFor="newPassword">New Password</label>
                <input id="newPassword"
                    name="newPassword"
                    type="password" />
                <span className="error-message">
                    {validation.NewPasswordValidation}
                </span>

                <label htmlFor="confirmNewPassword">Confirm New Password</label>
                <input id="confirmNewPassword"
                    name="confirmNewPassword"
                    type="password" />
                <span className="error-message">
                    {validation.NewPasswordValidation || validation.ConfirmNewPasswordValidation}
                </span>

                <input type="submit" value="Confirm" />
            </form>
        </>
    );
}

export default ChangePassword;