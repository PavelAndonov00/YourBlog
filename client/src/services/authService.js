import { get, post } from '../data/requester';

const _ACCOUNT = "https://localhost:5001/Account/";

const register = (username, email, password, confirmPassword) => {
    return post(_ACCOUNT + "Register", { username, email, password, confirmPassword });
};

const login = (username, password) => {
    return post(_ACCOUNT + "Login", { username, password });
};

const resetPassword = (oldPassword, newPassword, confirmNewPassword) => {
    return post(_ACCOUNT + "ResetPassword", { oldPassword, newPassword, confirmNewPassword });
};

const changeEmail = (password, newEmail, confirmNewEmail) => {
    return post(_ACCOUNT + "ChangeEmail", { password, newEmail, confirmNewEmail });
};

const updatePersonalInfo = (firstName, lastName, phoneNumber, birthDate) => {
    return post(_ACCOUNT + "UpdatePersonalInfo", { firstName, lastName, phoneNumber, birthDate });
};

const getPersonalInfo = () => {
    return get(_ACCOUNT + "GetPersonalInfo");
};

export {
    register,
    login,
    resetPassword,
    changeEmail,
    updatePersonalInfo,
    getPersonalInfo
};