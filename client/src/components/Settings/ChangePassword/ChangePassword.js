import './ChangePassword.css';

const ChangePassword = ({

}) => {
    return (
        <>
            <h2 className="main-profile-settings-main-heading">Change password</h2>
            <form className="main-profile-settings-main-form">
                <label htmlFor="oldPassword">Old Password</label>
                <input id="oldPassword"
                    name="oldPassword"
                    type="password" />

                <label htmlFor="newPassword">New Password</label>
                <input id="newPassword"
                    name="newPassword"
                    type="password" />

                <label htmlFor="confirmNewPassword">Confirm New Password</label>
                <input id="confirmNewPassword"
                    name="confirmNewPassword"
                    type="password" />

                <input type="submit" value="Confirm" />
            </form>
        </>
    );
}

export default ChangePassword;