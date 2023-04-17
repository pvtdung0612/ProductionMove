import cryptoJS from "../utils/cryptoJS"
import componentsService from "../services/componentsService"

let hasWhiteSpace = (s) => {
    // xử dụng regrex để kiểm tra có khoảng trắng hay không
    return (/\s/g).test(s);
}

let validDellCorpSession = async (req, res, next) => {
    let pass = true;

    if (pass) {
        if (pass && !req.session.account) {
            res.status(200).json({
                errCode: -1,
                message: "Access dell corp failure, you need login",
            });
            pass = false;
        } else if (pass && req.session.account.roleKey !== "R1") {
            res.status(200).json({
                errCode: -1,
                message: "Access dell corp failure, you are not dell corp",
            });
            pass = false;
        } else if (pass && req.session.account.workplaceID) {
            let isExistDellCorpByID = await componentsService.isExistDellCorpByID(req.session.account.workplaceID);
            if (pass && !isExistDellCorpByID) {
                res.status(200).json({
                    errCode: -1,
                    message: "Access dell corp failure, Dell Corp is not exist",
                });
                pass = false;
            }
        } else {
            pass = false;
        }
    }

    if (pass) next()
}

let validProductLineManagementCreate = async (req, res, next) => {
    let pass = true;

    // Valid null data
    if (pass) {
        if (pass && !req.body) {
            res.status(200).json({
                errCode: 1,
                message: "Data input is invalid",
            });
            pass = false;
        }
    }

    // Valid data suitable
    if (pass) {
        if (pass && (!req.body.productLine || !req.body.productLine.trim())) {
            res.status(200).json({
                errCode: 1,
                message: "Product line is empty",
            });
            pass = false;
        }
        if (pass && (!req.body.price || !req.body.price.trim())) {
            res.status(200).json({
                errCode: 1,
                message: "Price is empty",
            });
            pass = false;
        }
        if (pass && (!req.body.cpu || !req.body.cpu.trim())) {
            res.status(200).json({
                errCode: 1,
                message: "CPU is empty",
            });
            pass = false;
        }
        if (pass && (!req.body.screen || !req.body.screen.trim())) {
            res.status(200).json({
                errCode: 1,
                message: "Screen is empty",
            });
            pass = false;
        }
        if (pass && (!req.body.description || !req.body.description.trim())) {
            res.status(200).json({
                errCode: 1,
                message: "Description is empty",
            });
            pass = false;
        }
    }

    if (pass) {
        let isExistProductLineByProductLine = await componentsService.isExistProductLineByProductLine(req.body.productLine);
        if (pass && isExistProductLineByProductLine) {
            res.status(200).json({
                errCode: 1,
                message: "Product line has been exist",
            });
            pass = false;
        }
    }

    if (pass) next()
}

let validProductLineManagementUpdate = async (req, res, next) => {
    let pass = true;

    if (pass && !req.body) {
        res.status(200).json({
            errCode: 1,
            message: "Update productLine fail, RequestData is empty",
        });
        pass = false;
    }

    if (pass && !req.body.id) {
        res.status(200).json({
            errCode: 1,
            message: "ID's product line is empty",
        });
        pass = false;
    }

    // Valid data suitable
    if (pass) {
        if (pass && (!req.body.productLine || !req.body.productLine.trim())) {
            res.status(200).json({
                errCode: 1,
                message: "Product line is empty",
            });
            pass = false;
        }
        if (pass && !req.body.price || !req.body.price.trim()) {
            res.status(200).json({
                errCode: 1,
                message: "Price is empty",
            });
            pass = false;
        }
        if (pass && !req.body.cpu || !req.body.cpu.trim()) {
            res.status(200).json({
                errCode: 1,
                message: "CPU is empty",
            });
            pass = false;
        }
        if (pass && !req.body.screen || !req.body.screen.trim()) {
            res.status(200).json({
                errCode: 1,
                message: "Screen is empty",
            });
            pass = false;
        }
        if (pass && !req.body.description || !req.body.description.trim()) {
            res.status(200).json({
                errCode: 1,
                message: "Description is empty",
            });
            pass = false;
        }
    }

    if (pass) {
        let productlineNew = await componentsService.getProductLineByID(req.body.id);
        if (pass && productlineNew !== req.body.productLine) {
            let isExistProductLine = await componentsService.isExistProductLineByProductLine(req.body.productLine);
            if (pass && isExistProductLine) {
                res.status(200).json({
                    errCode: 1,
                    message: "Product line is exist, Please try product line other",
                });
                pass = false;
            }
        }
    }

    if (pass) next()
}

let validProductLineManagementDelete = async (req, res, next) => {
    let pass = true;

    if (pass && !req.body) {
        res.status(200).json({
            errCode: 1,
            message: "Delete productLine fail, RequestData is empty",
        });
        pass = false;
    }

    if (pass && !req.body.id) {
        res.status(200).json({
            errCode: 1,
            message: "Delete fail, ID's product line is empty",
        });
        pass = false;
    }

    // Valid data suitable
    if (pass) {
        if (pass && (!req.body.productLine || !req.body.productLine.trim())) {
            res.status(200).json({
                errCode: 1,
                message: "Delete fail, Product line is empty",
            });
            pass = false;
        }
        if (pass && !req.body.price || !req.body.price.trim()) {
            res.status(200).json({
                errCode: 1,
                message: "Delete fail, Price is empty",
            });
            pass = false;
        }
        if (pass && !req.body.cpu || !req.body.cpu.trim()) {
            res.status(200).json({
                errCode: 1,
                message: "Delete fail, CPU is empty",
            });
            pass = false;
        }
        if (pass && !req.body.screen || !req.body.screen.trim()) {
            res.status(200).json({
                errCode: 1,
                message: "Delete fail, Screen is empty",
            });
            pass = false;
        }
        if (pass && !req.body.description || !req.body.description.trim()) {
            res.status(200).json({
                errCode: 1,
                message: "Delete fail, Description is empty",
            });
            pass = false;
        }
    }

    if (pass) {
        let productlineNew = await componentsService.getProductLineByID(req.body.id);
        if (pass && productlineNew !== req.body.productLine) {
            let isExistProductLine = await componentsService.isExistProductLineByProductLine(req.body.productLine);
            if (pass && isExistProductLine) {
                res.status(200).json({
                    errCode: 1,
                    message: "Product line is exist, Please try product line other",
                });
                pass = false;
            }
        }
    }

    if (pass) next()
}

let validAccountManagementCreate = async (req, res, next) => {
    // 3864 Trick: Frontend need valid also. if still wrong => hacker fake request

    let pass = true;

    // Validation Username
    if (pass) {
        if (pass && !req.body.username) {
            res.status(200).json({
                errCode: 1,
                message: "Username is empty",
            });
            pass = false;
        } else if (pass && hasWhiteSpace(req.body.username)) {
            res.status(200).json({
                errCode: 1,
                message: "Username has space",
            });
            pass = false;
        } else {
            let isExistUsernameOther = await componentsService.isExistUsernameOther(req.body.username);
            if (pass && isExistUsernameOther) {
                res.status(200).json({
                    errCode: 1,
                    message: "Username is exist",
                });
                pass = false;
            }
        }
    }
    // Validation Password
    if (pass) {
        if (pass && !req.body.password) {
            res.status(200).json({
                errCode: 1,
                message: "Password is empty",
            });
            pass = false;
        } else if (pass && hasWhiteSpace(req.body.password)) {
            res.status(200).json({
                errCode: 1,
                message: "Password has space",
            });
            pass = false;
        }
    }
    // Validation roleKey
    if (pass) {
        if (pass && !(req.body.roleKey == "R1"
            || req.body.roleKey == "R2"
            || req.body.roleKey == "R3"
            || req.body.roleKey == "R4")) {
            res.status(200).json({
                errCode: 1,
                message: "RoleKey is invalid",
            });
            pass = false;
        }
    }
    // Validation workplaceID
    if (pass) {
        if (!req.body.workplaceID) {
            res.status(200).json({
                errCode: 1,
                message: "WorkplaceID is invalid",
            });
            pass = false
        }
        else {
            switch (req.body.roleKey) {
                case "R1":
                    pass = await componentsService.isExistWorkplaceIDDellCorp(req.body.workplaceID);
                    break;
                case "R2":
                    pass = await componentsService.isExistWorkplaceIDFactory(req.body.workplaceID);
                    break;
                case "R3":
                    pass = await componentsService.isExistWorkplaceIDAgent(req.body.workplaceID);
                    break;
                case "R4":
                    pass = await componentsService.isExistWorkplaceIDInsuranceCenter(req.body.workplaceID);
                    break;

                default:
                    pass = false;
                    break;
            }

            if (!pass) {
                res.status(200).json({
                    errCode: 1,
                    message: "WorkplaceID is invalid",
                });
            }
        }
    }

    // if pass valid next to create new account
    if (pass) {
        next()
    };
}

let validAccountManagementUpdate = async (req, res, next) => {
    // 3864 Trick: Frontend need valid also. if still wrong => hacker fake request

    let pass = true;

    if (pass && !req.body) {
        res.status(200).json({
            errCode: 1,
            message: "Update fail, Request is empty",
        });
        pass = false;
    }
    if (pass && !req.body.id) {
        res.status(200).json({
            errCode: 1,
            message: "Update fail, ID's account is empty",
        });
        pass = false;
    }

    // Validation Username
    if (pass) {
        if (pass && !req.body.username) {
            res.status(200).json({
                errCode: 1,
                message: "Username is empty",
            });
            pass = false;
        } else if (pass && hasWhiteSpace(req.body.username)) {
            res.status(200).json({
                errCode: 1,
                message: "Username has space",
            });
            pass = false;
        } else {
            let usernameOfAccount = await componentsService.getUsernameByID(req.body.id);
            if (pass && usernameOfAccount !== req.body.username) {
                let isExistUsernameOther = await componentsService.isExistUsernameOther(req.body.username);
                if (pass && isExistUsernameOther) {
                    res.status(200).json({
                        errCode: 1,
                        message: "Username is exist",
                    });
                    pass = false;
                }
            }
        }
    }
    // Validation Password
    if (pass) {
        if (pass && !req.body.password) {
            res.status(200).json({
                errCode: 1,
                message: "Password is empty",
            });
            pass = false;
        } else if (pass && hasWhiteSpace(req.body.password)) {
            res.status(200).json({
                errCode: 1,
                message: "Password has space",
            });
            pass = false;
        }
    }
    // Validation roleKey
    if (pass) {
        if (pass && !(req.body.roleKey == "R1"
            || req.body.roleKey == "R2"
            || req.body.roleKey == "R3"
            || req.body.roleKey == "R4")) {
            res.status(200).json({
                errCode: 1,
                message: "RoleKey is invalid",
            });
            pass = false;
        }
    }
    // Validation workplaceID
    if (pass) {
        if (pass && !req.body.workplaceID) {
            res.status(200).json({
                errCode: 1,
                message: "WorkplaceID is invalid",
            });
            pass = false
        }
        else {
            switch (req.body.roleKey) {
                case "R1":
                    pass = await componentsService.isExistWorkplaceIDDellCorp(req.body.workplaceID);
                    break;
                case "R2":
                    pass = await componentsService.isExistWorkplaceIDFactory(req.body.workplaceID);
                    break;
                case "R3":
                    pass = await componentsService.isExistWorkplaceIDAgent(req.body.workplaceID);
                    break;
                case "R4":
                    pass = await componentsService.isExistWorkplaceIDInsuranceCenter(req.body.workplaceID);
                    break;

                default:
                    pass = false;
                    break;
            }

            if (!pass) {
                res.status(200).json({
                    errCode: 1,
                    message: "WorkplaceID is invalid",
                });
            }
        }
    }

    // if pass valid next to create new account
    if (pass) {
        next()
    };
}


let validAccountManagementDelete = async (req, res, next) => {
    // 3864 Trick: Frontend need valid also. if still wrong => hacker fake request

    let pass = true;

    if (pass && !req.body) {
        res.status(200).json({
            errCode: 1,
            message: "Delete fail, Request empty",
        });
        pass = false;
    }

    let getAccountByID = await componentsService.getAccountByID(req.body.id)
    if (pass && !getAccountByID) {
        res.status(200).json({
            errCode: 1,
            message: "ID's account not exist",
        });
        pass = false;
    }
    if (pass && !req.session.account) {
        res.status(200).json({
            errCode: -1,
            message: "Session's account not exist",
        });
        pass = false;
    }
    if (pass && req.session.account.id == req.body.id) {
        res.status(200).json({
            errCode: 1,
            message: "You are logging. Can't delete",
        });
        pass = false;
    }

    // if pass valid next to create new account
    if (pass) {
        next()
    };
}

module.exports = {
    validDellCorpSession: validDellCorpSession,
    validProductLineManagementCreate: validProductLineManagementCreate,
    validProductLineManagementUpdate: validProductLineManagementUpdate,
    validProductLineManagementDelete: validProductLineManagementDelete,
    validAccountManagementCreate: validAccountManagementCreate,
    validAccountManagementUpdate: validAccountManagementUpdate,
    validAccountManagementDelete: validAccountManagementDelete,
}