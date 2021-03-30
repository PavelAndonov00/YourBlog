import './PersonalInfo.css';

const PersonalInfo = () => {
    const onSubmit = (ev) => {
        ev.preventDefault();
    }

    return (
        <section className="main-personalinfo-form-wrapper">
            <h2 className="main-personalinfo-form-heading">Personal Info</h2>
            <form onSubmit={onSubmit}
                className="main-personalinfo-form">
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
        </section >
    );
}

export default PersonalInfo;