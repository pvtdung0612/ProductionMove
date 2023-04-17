import componentsService from "../services/componentsService"

let validation = (value, field) => {
    //Space Regex
    const spaceRegex = new RegExp("^[^ ]*$");

    // Regex username
    const beginNameRegex = new RegExp("^[A-Za-z]");
    const lengthNameRegex = new RegExp("^.{3,16}");
    const usernameRegex = new RegExp("^[a-zA-Z0-9]*$");

    //Regex password
    const lengthPasswordRegex = new RegExp("^.{3,}");
    const passwordRegex = new RegExp(
        "^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9@$!%*#?&]+)$"
    );

    // return error
    if (field === "username") {
        if (!value) return "Username is empty";
        if (!beginNameRegex.test(value))
            return "Username must start with a word";
        else if (!spaceRegex.test(value)) return "Username is not contain space";
        else if (!usernameRegex.test(value))
            return "Username just only contain words and numbers";
        else if (!lengthNameRegex.test(value))
            return "Length's username must be 3-16";
        return "Valid";
    } else if (field === "password") {
        if (!value) return "Password is empty";
        if (!spaceRegex.test(value)) return "Username is not contain space";
        else if (!passwordRegex.test(value))
            return "Password must contain at least a word or a number";
        else if (!lengthPasswordRegex.test(value))
            return "Minimum length of 3 characters";
        return "Valid";
    }

    return "Invalid";
};

let validAccountLogin = async (req, res, next) => {
    let pass = true;

    if (pass) {
        let validUsername = validation(req.body.username, "username");
        if (validUsername != "Valid") {
            res.status(200).json({
                errCode: 1,
                message: validUsername,
            });
            pass = false;
        }
    }
    if (pass) {
        let validPassword = validation(req.body.password, "password");
        if (validPassword != "Valid") {
            res.status(200).json({
                errCode: 1,
                message: validPassword,
            });
            pass = false;
        }
    }

    if (pass) next()
}
let validAccountLogout = async (req, res, next) => {
    let pass = true;

    if (pass && !req.session.account) {
        res.status(200).json({
            errCode: 1,
            message: "Have no info saved previously, You need login before",
        });
        pass = false;
    }

    if (pass) next()
}

module.exports = {
    validAccountLogin: validAccountLogin,
    validAccountLogout: validAccountLogout,
}