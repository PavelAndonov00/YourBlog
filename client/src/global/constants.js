const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dq62pylpx/upload";
const CLOUDINARY_ASSET = "zswzhiud";

const PHOTO_GOES_HERE_URL = "https://res.cloudinary.com/dq62pylpx/image/upload/v1618008695/photogoeshere_uqvefw.jpg";
const PROHIBIT_IMAGE_URL = "https://res.cloudinary.com/dq62pylpx/image/upload/v1618009436/768px-Eo_circle_red_not-allowed.svg_nueryp.png";

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
const EMAIL_REGEX = /^.+@.+[.].+$/gm;

const PASSWORD_VALIDATION_MESSAGE = "Password must have at least one upper and one lower case letter. At least one digit and special symbol. At least 8 characters long.";
const PASSWORDS_DO_NOT_MATCH = "Passwords do not match.";
const EMAIL_VALIDATION_MESSAGE = "Email is not valid email address.";

export {
    PASSWORD_REGEX,
    PASSWORD_VALIDATION_MESSAGE,
    PASSWORDS_DO_NOT_MATCH,
    EMAIL_REGEX,
    EMAIL_VALIDATION_MESSAGE,
    CLOUDINARY_URL,
    CLOUDINARY_ASSET,
    PHOTO_GOES_HERE_URL,
    PROHIBIT_IMAGE_URL
};