import { post } from '../data/requester';

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

export {
    register, login, resetPassword
};