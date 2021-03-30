import './ChangeEmail.css';

const ChangeEmail = () => {
    return (
        <>
            <h2 className="main-profile-settings-main-heading">Change email</h2>
            <form className="main-profile-settings-main-form">
                <label htmlFor="password">Password</label>
                <input id="password"
                    name="password"
                    type="password" />

                <label htmlFor="newEmail">New Email</label>
                <input id="newEmail"
                    name="newEmail"
                    type="text" />

                <label htmlFor="confirmNewEmail">Confirm New Email</label>
                <input id="confirmNewEmail"
                    name="confirmNewEmail"
                    type="text" />

                <input type="submit" value="Confirm" />
            </form>
        </>
    );
}

export default ChangeEmail;