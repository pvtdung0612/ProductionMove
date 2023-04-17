
"use strict";

import db from "../models/index";
import nodemailer from "nodemailer";
const { Op } = require("sequelize");

let isCanInsuranceCenterReportFactory = async (_workplaceID, _productID) => {
    try {
        let product = await db.Product.findOne({
            where: {
                id: _productID,
                status: {
                    [Op.or]: [
                        "Đang sửa chữa bảo hành"
                    ]
                },
                hereRole: "R4",
                hereID: _workplaceID,
            }
        })

        if (product) {
            let insurance = await db.Insurance.findOne({
                where: {
                    productID: product.id,
                    insuranceCenterID: _workplaceID,
                    result: {
                        [Op.or]: [
                            "FAILURE"
                        ]
                    },
                }
            })
            if (insurance) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } catch (error) {
        return false
    }
    return false;
}
let isCanInsuranceCenterSendFactory = async (_workplaceID, _productID) => {
    try {
        let product = await db.Product.findOne({
            where: {
                id: _productID,
                status: {
                    [Op.or]: [
                        "Lỗi, cần trả về nhà máy"
                    ]
                },
                hereRole: "R4",
                hereID: _workplaceID,
            }
        })

        if (product) {
            let insurance = await db.Insurance.findOne({
                where: {
                    productID: product.id,
                    insuranceCenterID: _workplaceID,
                    result: {
                        [Op.or]: [
                            "FAILURE"
                        ]
                    },
                }
            })
            if (insurance) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } catch (error) {
        return false
    }
    return false;
}
let isCanInsuranceCenterSendAgent = async (_workplaceID, _productID) => {
    try {
        let product = await db.Product.findOne({
            where: {
                id: _productID,
                status: {
                    [Op.or]: [
                        "Đang sửa chữa bảo hành",
                    ]
                },
                hereRole: "R4",
                hereID: _workplaceID,
            }
        })

        if (product) {
            let insurance = await db.Insurance.findOne({
                where: {
                    productID: product.id,
                    insuranceCenterID: _workplaceID,
                    result: {
                        [Op.or]: [
                            "SUCCESS",
                            "FAILURE"
                        ]
                    },
                }
            })
            if (insurance) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } catch (error) {
        return false
    }
    return false;
}
let isCanFinishInsurance = async (_workplaceID, _productID) => {
    try {
        let product = await db.Product.findOne({
            where: {
                id: _productID,
                status: {
                    [Op.or]: [
                        "Đang sửa chữa bảo hành",
                    ]
                },
                hereRole: "R4",
                hereID: _workplaceID,
            }
        })
        if (product) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false
    }
    return false;
}
let isProductCanExportToAgent = async (_productID) => {
    try {
        let product = await db.Product.findOne({
            where: {
                id: _productID,
                status: {
                    [Op.or]: [
                        "Mới sản xuất",
                    ]
                },
                hereRole: "R2",
            }
        })
        if (product) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false
    }
    return false;
}
let isExistProductDeleteByFactory = async (_productID) => {
    try {
        let product = await db.Product.findOne({
            where: {
                id: _productID,
                status: {
                    [Op.or]: [
                        "Mới sản xuất",
                        "Lỗi, đã đưa về cơ sở sản xuất",
                    ]
                },
                hereRole: "R2",
            }
        })
        if (product) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false
    }
    return false;
}
let isCanGetInsurance = async (_productID) => {
    try {
        let product = await db.Product.findOne({
            raw: true,
            where: {
                id: _productID,
                status: "Lỗi, cần bảo hành",
                hereRole: "R3",
            }
        })

        if (product) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false
    }
    return false;
}
let isCanUpdateCustomerBySDT = async (_customerID, _newSdt) => {
    try {
        let customer = await db.Customer.findOne({
            raw: true,
            where: {
                id: _customerID,
            }
        })

        if (customer) {
            if (_newSdt == customer.sdt) {
                return true;
            } else {
                return await isCanCreateNewCustomerBySDT(_newSdt)
            }
        } else {
            return false;
        }
    } catch (error) {
        return false
    }
    return false;
}
let isCanUpdateCustomerByEmail = async (_customerID, _newEmail) => {
    try {
        let customer = await db.Customer.findOne({
            raw: true,
            where: {
                id: _customerID,
            }
        })

        if (customer) {
            if (_newEmail == customer.email) {
                return true;
            } else {
                return await isCanCreateNewCustomerByEmail(_newEmail)
            }
        } else {
            return false;
        }
    } catch (error) {
        return false
    }
    return false;
}
let isCanDeleteByID = async (_id) => {
    try {
        let customer = await db.Customer.findOne({
            where: {
                id: _id,
            }
        })

        if (customer) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false
    }
    return false;
}
let isCanCreateNewCustomerBySDT = async (_sdt) => {
    try {
        let customer = await db.Customer.findOne({
            raw: true,
            where: {
                sdt: _sdt,
            }
        })

        if (customer) {
            return false;
        } else {
            return true;
        }
    } catch (error) {
        return false
    }
    return false;
}
let isCanCreateNewCustomerByEmail = async (_email) => {
    try {
        let customer = await db.Customer.findOne({
            raw: true,
            where: {
                email: _email,
            }
        })

        if (customer) {
            return false;
        } else {
            return true;
        }
    } catch (error) {
        return false
    }
    return false;
}
let isCanSendMailSendInsuranceFailFactory = async (_agentID, _productID) => {
    try {
        let product = await db.Product.findOne({
            raw: true,
            where: {
                id: _productID,
                agentID: _agentID,
                status: "Lỗi, đã đưa về cơ sở sản xuất",
                hereRole: "R2",
            }
        })

        if (product) {
            let insurance = await db.Insurance.findOne({
                where: {
                    productID: _productID,
                },
                order: [['createdAt', 'DESC']],
            })

            if (insurance) {
                if (insurance.result === "FAILURE") {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    } catch (error) {
        return false
    }
    return false;
}
let isCanSendInsuranceFailFactory = async (_productID) => {
    try {
        let product = await db.Product.findOne({
            where: {
                id: _productID,
                status: "Đã bảo hành xong",
                hereRole: "R3",
            }
        })

        if (product) {
            let insurance = await db.Insurance.findOne({
                where: {
                    productID: _productID,
                },
                order: [['createdAt', 'DESC']],
            })

            if (insurance) {
                if (insurance.result == "FAILURE") {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    } catch (error) {
        return false
    }
    return false;
}
let isCanSendInsuranceSuccessCustomer = async (_productID) => {
    try {
        let product = await db.Product.findOne({
            where: {
                id: _productID,
                status: "Đã bảo hành xong",
                hereRole: "R3",
            }
        })

        if (product) {
            let insurance = await db.Insurance.findOne({
                where: {
                    productID: _productID,
                },
                order: [['createdAt', 'DESC']],
            })

            if (insurance) {
                if (insurance.result === "SUCCESS") {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    } catch (error) {
        return false
    }
    return false;
}
let isCanReceiveInsuranceSuccess = async (_productID) => {
    try {
        let product = await db.Product.findOne({
            where: {
                id: _productID,
                status: "Đang sửa chữa bảo hành",
            }
        })

        if (product) {
            let insurance = await db.Insurance.findOne({
                where: {
                    productID: _productID,
                },
                order: [['createdAt', 'DESC']],
            })

            if (insurance) {
                if (insurance.result === "SUCCESS" || insurance.result === "FAILURE") {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    } catch (error) {
        return false
    }
    return false;
}
let isExistInsuranceCenter = async (_insuranceID) => {
    try {
        let insuranceCenter = await db.InsuranceCenter.findOne({
            where: {
                id: _insuranceID,
            }
        })
        if (insuranceCenter) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false
    }
    return false;
}
let isReportBeforeSendInsuranceCenter = async (_productID) => {
    try {
        let product = await db.Product.findOne({
            where: {
                id: _productID,
                status: "Lỗi, cần bảo hành"
            }
        })
        if (product) {

            let errorReport = await db.ErrorReport.findOne({
                where: {
                    productID: _productID,
                },
                order: [['createdAt', 'DESC']],
            })

            if (errorReport) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } catch (error) {
        return false
    }
    return false;
}
let isCanReportProduct = async (_agentID, _productID) => {
    try {
        let product = await db.Product.findOne({
            where: {
                id: _productID,
                agentID: _agentID,
                status: {
                    [Op.or]: [
                        "Đã bán",
                        "Đã trả lại bảo hành cho khách hàng",
                        "Lỗi cần triệu hồi",]
                },
            }
        })
        if (product) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false
    }
    return false;
}
let isUnSoldProduct = async (_agentID, _productID) => {
    try {
        let product = await db.Product.findOne({
            where: {
                id: _productID,
                agentID: _agentID,
                status: "Đưa về đại lý",
            }
        })
        if (product) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false
    }
    return false;
}
let isExistCustomer = async (_id) => {
    try {
        let customer = await db.Customer.findOne({
            where: {
                id: _id,
            }
        })
        if (customer) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false
    }
    return false;
}
let isNewProduct = async (_id) => {
    try {
        let product = await db.Product.findOne({
            where: {
                id: _id,
                status: "Mới sản xuất"
            }
        })
        if (product) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false
    }
    return false;
}
let isExistProduct = async (_id) => {
    try {
        let product = await db.Product.findOne({
            where: { id: _id }
        })
        if (product) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false
    }
    return false;
}
let isExistAgent = async (_agentID) => {
    try {
        let agent = await db.Agent.findOne({
            where: { id: _agentID }
        })
        if (agent) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false
    }
    return false;
}
let isExistProductLineByProductLine = async (_productLine) => {
    try {
        let productline = await db.ProductLine.findOne({
            where: { productLine: _productLine }
        })
        if (productline) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false
    }
    return false;
}
let isExistProductLineByID = async (_productlineID) => {
    try {
        let productline = await db.ProductLine.findOne({
            where: { id: _productlineID }
        })
        if (productline) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false
    }
    return false;
}
let isExistFactoryByID = async (_id) => {
    try {
        let factory = await db.Factories.findOne({
            where: { id: _id }
        })
        if (factory) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false
    }
    return false;
}

let isExistDellCorpByID = async (_id) => {
    try {
        if (_id == 1) {
            let account = await db.Account.findOne({
                where: {
                    id: _id,
                    roleKey: "R1"
                }
            })
            if (account) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } catch (error) {
        return false
    }
    return false;
}

let isExistUsernameOther = async (_username) => {
    try {
        let account = await db.Account.findOne({
            where: { username: _username }
        })
        if (account) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false
    }
    return false;
}

let isExistID = async (_id) => {
    try {
        let account = await db.Account.findOne({
            where: { id: _id }
        })
        if (account) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false
    }
    return false;
}

let isExistWorkplaceIDDellCorp = (workplaceID) => {
    if (workplaceID != 1) return false;
    return true;
}

let isExistWorkplaceIDFactory = async (_workplaceID) => {
    try {
        let factory = await db.Factories.findOne({
            where: { id: _workplaceID }
        })
        if (factory) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false
    }
    return false;
}

let isExistWorkplaceIDAgent = async (_workplaceID) => {
    try {
        let agent = await db.Agent.findOne({
            where: { id: _workplaceID }
        })
        if (agent) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false
    }
    return false;
}

let isExistWorkplaceIDInsuranceCenter = async (_workplaceID) => {
    try {
        console.log("workpalceID: ", _workplaceID);
        let insuranceCenter = await db.InsuranceCenter.findOne({
            where: { id: _workplaceID }
        })
        if (insuranceCenter) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false
    }
    return false;
}

let getAccountByID = async (_accountID) => {
    try {
        let account = await db.Account.findOne({
            where: { id: _accountID }
        })

        return account;
    } catch (error) {
        return false
    }
    return null;
}

let getUsernameByID = async (_id) => {
    try {
        let account = await db.Account.findOne({
            where: { id: _id }
        })
        if (account) {
            return account.username;
        }
    } catch (error) {
        return false
    }
    return null;
}

let getProductLineByID = (_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let product = await db.ProductLine.findOne({
                raw: true,
                where: { id: _id }
            })
            resolve(product.productLine);
        } catch (error) {
            reject(error);
        }
    })
}

let getFactoryNameByID = (_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let factory = await db.Factories.findOne({
                raw: true,
                where: { id: _id }
            })
            resolve(factory.name);
        } catch (error) {
            reject(error);
        }
    })
}

let getAgentNameByID = (_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let agent = await db.Agent.findOne({
                raw: true,
                where: { id: _id }
            })
            resolve(agent.name);
        } catch (error) {
            reject(error);
        }
    })
}

let getInsuranceCenterNameByID = (_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let insuranceCenter = await db.InsuranceCenter.findOne({
                raw: true,
                where: { id: _id }
            })
            resolve(insuranceCenter.name);
        } catch (error) {
            reject(error);
        }
    })
}

let getProductNameByID = (_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let product = await db.Product.findOne({
                raw: true,
                where: { id: _id }
            })
            resolve(product.name);
        } catch (error) {
            reject(error);
        }
    })
}

let getProductStatusByID = (_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let product = await db.Product.findOne({
                raw: true,
                where: { id: _id }
            })
            resolve(product.status);
        } catch (error) {
            reject(error);
        }
    })
}


let isEmail = (email) => {
    var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    if (!email)
        return false;

    if (email.length > 254)
        return false;

    var valid = emailRegex.test(email);
    if (!valid)
        return false;

    // Further checking of some things regex can't handle
    var parts = email.split("@");
    if (parts[0].length > 64)
        return false;

    var domainParts = parts[1].split(".");
    if (domainParts.some(function (part) { return part.length > 63; }))
        return false;

    return true;
}

// async..await is not allowed in global scope, must use a wrapper
let sendMail = async (_toListMail, _subject, _text, _htmlContent) => {
    // Hướng dẫn sử dụng
    // await componentsService.sendMail(["dungn8979@gmail.com"], "subject", "text", "html")

    try {
        _toListMail.forEach(element => {
            if (!isEmail(element)) {
                return false;
            }
        });

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.APP_EMAIL_USERMAIL, // generated ethereal user
                pass: process.env.APP_EMAIL_PASSWORD, // generated ethereal password
            },
        });

        // send mail with defined transport object
        await transporter.sendMail({
            from: process.env.APP_EMAIL_USERMAIL, // sender address
            to: _toListMail, // list of receivers
            subject: _subject, // Subject line
            text: _text, // plain text body
            html: _htmlContent, // html body
        });

        return true;
    } catch (error) {
        return false;
    }

    // // _toListMail.forEach(element => {
    // //     if (!isEmailValid(element)) return "Email " + element + " is invalid";
    // // });

    // // create reusable transporter object using the default SMTP transport
    // console.log("log into");
    // let transporter = nodemailer.createTransport({
    //     service: "gmail",
    //     host: "smtp.gmail.com",
    //     port: 587,
    //     secure: false, // true for 465, false for other ports
    //     auth: {
    //         user: process.env.APP_EMAIL_USERMAIL, // generated ethereal user
    //         pass: process.env.APP_EMAIL_PASSWORD, // generated ethereal password
    //     },
    // });

    // // send mail with defined transport object
    // let info = await transporter.sendMail({
    //     from: process.env.APP_EMAIL_USERMAIL, // sender address
    //     to: "dungn8979@gmail.com",//, baz@example.com", // list of receivers
    //     subject: "sad", // Subject line
    //     text: "dsa", // plain text body
    //     html: "_htmlContent", // html body
    // }, (err, data) => {
    //     if (err) {
    //         console.log(err);
    //         return err;
    //     } else {
    //         return "Send mail success";
    //     }
    // });

    // // console.log("Message sent: %s", info.messageId);


    // // // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // // // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

let getCustomerBySoldProductID = (_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let sell = await db.Sell.findOne({
                raw: true,
                where: { productID: _id }
            })

            if (sell) {
                let customer = await db.Customer.findOne({
                    raw: true,
                    where: { id: sell.customerID }
                })
                resolve(customer);
            } else {
                resolve();
            }
        } catch (error) {
            reject(error);
        }
    })
}

let getInsuranceByProductID = (_productID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let insurance = await db.Insurance.findOne({
                where: { productID: _productID },
                order: [['createdAt', 'DESC']],
            })

            if (insurance) {
                resolve(insurance);
            } else {
                resolve();
            }
        } catch (error) {
            reject(error);
        }
    })
}

let getFactoryByProductID = (_productID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let product = await db.Product.findOne({
                where: { id: _productID }
            })

            if (product) {
                let factory = await db.Factories.findOne({
                    where: { id: product.factoryID }
                })
                resolve(factory);
            } else {
                resolve();
            }
        } catch (error) {
            reject(error);
        }
    })
}

let getNameHereWorkplace = (_roleKey, _workplaceID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let name;
            switch (_roleKey) {
                case "R1":
                    name = "DellCorp";
                    break;
                case "R2":
                    name = await getFactoryNameByID(_workplaceID);
                    break;
                case "R3":
                    name = await getAgentNameByID(_workplaceID);
                    break;
                case "R4":
                    name = await getInsuranceCenterNameByID(_workplaceID);
                    break;

                default:
                    name = null;
                    break;
            }
            resolve(name)
        } catch (error) {
            reject(error);
        }
    })
}


module.exports = {
    isCanInsuranceCenterSendFactory: isCanInsuranceCenterSendFactory,
    isCanInsuranceCenterReportFactory: isCanInsuranceCenterReportFactory,
    isCanInsuranceCenterSendAgent: isCanInsuranceCenterSendAgent,
    isCanFinishInsurance: isCanFinishInsurance,
    isProductCanExportToAgent: isProductCanExportToAgent,
    isExistProductDeleteByFactory: isExistProductDeleteByFactory,
    isCanGetInsurance: isCanGetInsurance,
    isCanUpdateCustomerBySDT: isCanUpdateCustomerBySDT,
    isCanUpdateCustomerByEmail: isCanUpdateCustomerByEmail,
    isCanDeleteByID: isCanDeleteByID,
    isCanCreateNewCustomerBySDT: isCanCreateNewCustomerBySDT,
    isCanCreateNewCustomerByEmail: isCanCreateNewCustomerByEmail,
    isCanSendMailSendInsuranceFailFactory: isCanSendMailSendInsuranceFailFactory,
    isCanSendInsuranceFailFactory: isCanSendInsuranceFailFactory,
    isCanSendInsuranceSuccessCustomer: isCanSendInsuranceSuccessCustomer,
    isCanReceiveInsuranceSuccess: isCanReceiveInsuranceSuccess,
    isExistInsuranceCenter: isExistInsuranceCenter,
    isReportBeforeSendInsuranceCenter: isReportBeforeSendInsuranceCenter,
    isCanReportProduct: isCanReportProduct,
    isUnSoldProduct: isUnSoldProduct,
    isExistCustomer: isExistCustomer,
    isNewProduct: isNewProduct,
    isExistProduct: isExistProduct,
    isExistAgent: isExistAgent,
    isExistProductLineByProductLine: isExistProductLineByProductLine,
    isExistProductLineByID: isExistProductLineByID,
    isExistFactoryByID: isExistFactoryByID,
    isExistDellCorpByID: isExistDellCorpByID,
    isExistUsernameOther: isExistUsernameOther,
    isExistID: isExistID,
    isExistWorkplaceIDDellCorp: isExistWorkplaceIDDellCorp,
    isExistWorkplaceIDFactory: isExistWorkplaceIDFactory,
    isExistWorkplaceIDAgent: isExistWorkplaceIDAgent,
    isExistWorkplaceIDInsuranceCenter: isExistWorkplaceIDInsuranceCenter,
    getAccountByID: getAccountByID,
    getUsernameByID: getUsernameByID,
    getProductLineByID: getProductLineByID,
    getFactoryNameByID: getFactoryNameByID,
    getAgentNameByID: getAgentNameByID,
    getInsuranceCenterNameByID: getInsuranceCenterNameByID,
    getProductNameByID: getProductNameByID,
    getProductStatusByID: getProductStatusByID,
    isEmail: isEmail,
    sendMail: sendMail,
    getCustomerBySoldProductID: getCustomerBySoldProductID,
    getInsuranceByProductID: getInsuranceByProductID,
    getFactoryByProductID: getFactoryByProductID,
    getNameHereWorkplace: getNameHereWorkplace,
}