const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

const PASSWORD_VALIDATION_MESSAGE = "Password must have at least one upper and one lower case letter. At least one digit and special symbol. At least 8 characters long.";

const PASSWORDS_DO_NOT_MATCH = "Passwords do not match.";

export {PASSWORD_REGEX, PASSWORD_VALIDATION_MESSAGE, PASSWORDS_DO_NOT_MATCH};