import './PersonalInfo.css';

const PersonalInfo = () => {
    const onSubmit = (ev) => {
        ev.preventDefault();
    }

    return (
        <>
            <h2 className="main-profile-settings-main-heading">Personal Info</h2>
            <form className="main-profile-settings-main-form">
                <label htmlFor="firstName">First Name</label>
                <input id="firstName"
                    name="firstName"
                    type="text" />

                <label htmlFor="lastName">Last Name</label>
                <input id="lastName"
                    name="lastName"
                    type="text" />

                <label htmlFor="phoneNumber">Phone Number</label>
                <input id="phoneNumber"
                    name="lastName"
                    type="tel"
                    pattern="[0-9]{10}" required />

                <label htmlFor="birthDate">Date of birth</label>
                <input id="birthDate"
                    name="birthDate"
                    type="date" />

                <input type="submit" value="Save" />
            </form>
        </>
    );
}

export default PersonalInfo;