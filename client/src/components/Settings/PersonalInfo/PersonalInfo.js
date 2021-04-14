import './PersonalInfo.css';

import { } from '../../../';
import { useContext, useEffect, useState } from 'react';
import { updatePersonalInfo, getPersonalInfo } from '../../../services/authService';
import Context from '../../../contexts/context';

const PersonalInfo = ({ history }) => {
    const PHONENUMBER_REGEX = /[0-9]{10}/gm;

    const context = useContext(Context);
    const [validation, setValidation] = useState({
        summary: "",
        FirstNameValidation: "",
        LastNameValidation: "",
        PhoneNumberValidation: "",
    });

    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [phoneNumber, setphoneNumber] = useState("");
    const [birthDate, setbirthDate] = useState("");
    const setInputs = {
        setfirstName,
        setlastName,
        setphoneNumber,
        setbirthDate
    };

    const errors = {
        FirstName: "First name must be at least 6 characters long.",
        LastName: "Last name must be at least 6 characters long.",
        PhoneNumber: "Phone number must consist of exactly 10 digits.",
    };

    const setInput = (name, value) => {
        setInputs["set" + name](value);
    }

    useEffect(() => {
        async function fetchData() {
            try {
                var result = await getPersonalInfo();
                if (result.success) {
                    let data = result.data;
                    for (const key in data) {
                        setInput(key, data[key]);
                    }
                }
            } catch (e) {
                console.log(e);
            }
        }

        fetchData();
    }, []);

    const onChange = (ev) => {
        setInput(ev.target.name, ev.target.value);
    }

    const onSubmit = async (ev) => {
        ev.preventDefault();

        let currentValidation = {};

        if (firstName.length < 6) {
            currentValidation.FirstNameValidation = errors.FirstName;
        } else {
            currentValidation.FirstNameValidation = "";
        }

        if (lastName.length < 6) {
            currentValidation.LastNameValidation = errors.LastName;
        } else {
            currentValidation.LastNameValidation = "";
        }

        if (!phoneNumber.match(PHONENUMBER_REGEX)) {
            currentValidation.PhoneNumberValidation = errors.PhoneNumber;
        } else {
            currentValidation.PhoneNumberValidation = "";
        }

        if (!Object.values(currentValidation).find(v => v != false)) {
            try {
                let result = await updatePersonalInfo(firstName, lastName, phoneNumber, birthDate);

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
    }

    return (
        <>
            <h2 className="main-profile-settings-main-heading">Personal Info</h2>
            <p className="error-message">{validation.summary}</p>
            <form className="main-profile-settings-main-form"
                onSubmit={onSubmit}>
                <label htmlFor="firstName">First Name</label>
                <input id="firstName"
                    name="firstName"
                    type="text"
                    value={firstName} onChange={onChange} />
                <span className="error-message">
                    {validation.FirstNameValidation}
                </span>

                <label htmlFor="lastName">Last Name</label>
                <input id="lastName"
                    name="lastName"
                    type="text"
                    value={lastName} onChange={onChange} />
                <span className="error-message">
                    {validation.LastNameValidation}
                </span>

                <label htmlFor="phoneNumber">Phone Number</label>
                <input id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    value={phoneNumber} onChange={onChange} />
                <span className="error-message">
                    {validation.PhoneNumberValidation}
                </span>

                <label htmlFor="birthDate">Date of birth</label>
                <input id="birthDate"
                    name="birthDate"
                    type="date"
                    value={birthDate} onChange={onChange} />

                <input type="submit" value="Save" />
            </form>
        </>
    );
}

export default PersonalInfo;