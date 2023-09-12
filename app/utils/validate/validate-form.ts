import _ from 'lodash';

import {REGEX_EMAIL} from './regex';

export const isValidEmail = (email: string): boolean => {
    const reg = REGEX_EMAIL;
    if (reg.test(email) === false) {
        return false;
    }
    return true;
};

export const isValidPassword = (password: string): boolean => {
    // Check for minimum length
    if (password.length < 8) {
        return false;
    }

    // Check for at least one uppercase letter, one lowercase letter, and one number
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /\d/;

    if (
        !uppercaseRegex.test(password) ||
        !lowercaseRegex.test(password) ||
        !numberRegex.test(password)
    ) {
        return false;
    }

    // If all checks pass, the password is valid
    return true;
};

export function isValidUrl(url = '') {
    const regex = /^https?:\/\//i;
    return regex.test(url);
}

export const isNilOrEmpty = (text: string | null | undefined): boolean => {
    if (_.isNil(text) || _.isEmpty(text)) {
        return true;
    }
    return false;
};

export const isNilOrNaN = (text: string | null | undefined): boolean => {
    if (isNilOrEmpty(text)) {
        return true;
    }
    const number = _.isNumber(text);
    if (_.isNaN(number)) {
        return true;
    }
    return false;
};
