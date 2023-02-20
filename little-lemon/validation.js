
export const emailValidation = (email) => {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email.match(validRegex)) {
        return true
    } else {
        return false
    }
}

export const nameValidation = (name) => {

    if (!(/\d/.test(name)) && name.length > 1) {
        return true
    } else {
        return false
    }
}