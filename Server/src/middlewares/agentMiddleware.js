import componentsService from "../services/componentsService"

let validAgentSession = async (req, res, next) => {
    let pass = true;

    if (pass) {
        if (pass && !req.session.account) {
            res.status(200).json({
                errCode: -1,
                message: "Access agent fail, you need login",
            });
            pass = false;
        } else if (pass && req.session.account.roleKey !== "R3") {
            res.status(200).json({
                errCode: -1,
                message: "Access agent failure, you are not agent",
            });
            pass = false;
        } else if (pass && req.session.account.workplaceID) {
            let isExistAgent = await componentsService.isExistAgent(req.session.account.workplaceID);
            if (!isExistAgent) {
                res.status(200).json({
                    errCode: -1,
                    message: "Access agent failure, agent is not exist",
                });
                pass = false;
            }
        } else {
            pass = false;
        }
    }

    if (pass) next()
}

let validProductManagementEnterFromFactory = async (req, res, next) => {
    let pass = true;
    // Valid data
    if (pass) {
        if (pass && !req.body) {
            res.status(200).json({
                errCode: 1,
                message: "Enter from factory fail, data is invalid",
            });
            pass = false;
        }
    }

    // Valid quantity
    if (pass) {
        if (pass && !req.body.products) {
            res.status(200).json({
                errCode: 1,
                message: "Enter from factory fail, products is empty",
            });
            pass = false;
        } else {
            try {
                for (let index = 0; index < req.body.products.length; index++) {
                    const element = req.body.products[index];

                    let isExistProduct = await componentsService.isExistProduct(element.id);
                    if (!isExistProduct) {
                        res.status(200).json({
                            errCode: 1,
                            message: "Enter from factory fail, product (id:" + element.id + ") is not exist",
                        });
                        pass = false;
                    }

                    let isNewProduct = await componentsService.isNewProduct(element.id);
                    if (!isNewProduct) {
                        res.status(200).json({
                            errCode: 1,
                            message: "Enter from factory fail, product (id:" + element.id + ") is not new product",
                        });
                        pass = false;
                    }
                }
            } catch (error) {
                res.status(200).json({
                    errCode: 1,
                    message: "Enter from factory fail, products is invalid",
                });
                pass = false;
            }
        }
    }

    if (pass) next()
}
let validProductManagementSellForCustomer = async (req, res, next) => {
    let pass = true;
    // Valid data
    if (pass) {
        if (pass && !req.body) {
            res.status(200).json({
                errCode: 1,
                message: "Sell for customer fail, data is invalid",
            });
            pass = false;
        }
    }

    // Valid empty
    if (pass) {
        if (pass && !req.body.productID) {
            res.status(200).json({
                errCode: 1,
                message: "Sell for customer fail, ID's product is empty",
            });
            pass = false;
        }
        if (pass && !req.body.customerID) {
            res.status(200).json({
                errCode: 1,
                message: "Sell for customer fail, ID's customer is empty",
            });
            pass = false;
        }
    }

    // Valid data valid
    if (pass) {
        let isExistProduct = await componentsService.isExistProduct(req.body.productID);
        if (pass && !isExistProduct) {
            res.status(200).json({
                errCode: 1,
                message: "Sell for customer fail, product (id:" + req.body.productID + ") is not exist",
            });
            pass = false;
        }
        let isExistCustomer = await componentsService.isExistCustomer(req.body.customerID);
        if (pass && !isExistCustomer) {
            res.status(200).json({
                errCode: 1,
                message: "Sell for customer fail, customer (id:" + req.body.customerID + ") is not exist",
            });
            pass = false;
        }
        let isUnSoldProduct = await componentsService.isUnSoldProduct(req.session.account.workplaceID, req.body.productID);
        if (pass && !isUnSoldProduct) {
            res.status(200).json({
                errCode: 1,
                message: "The product is not for sale",
            });
            pass = false;
        }
    }

    if (pass) next()
}

let validProductManagementReportError = async (req, res, next) => {
    let pass = true;
    // Valid data
    if (pass) {
        if (pass && !req.body) {
            res.status(200).json({
                errCode: 1,
                message: "Report error fail, data is invalid",
            });
            pass = false;
        }
    }

    // Valid empty
    if (pass) {
        if (pass && !req.body.productID) {
            res.status(200).json({
                errCode: 1,
                message: "Report error fail, ID's product is empty",
            });
            pass = false;
        }
    }

    // Valid data suitable
    if (pass) {
        let isExistProduct = await componentsService.isExistProduct(req.body.productID);
        if (pass && !isExistProduct) {
            res.status(200).json({
                errCode: 1,
                message: "Report error fail, product (id:" + req.body.productID + ") is not exist",
            });
            pass = false;
        }
        let isCanReportProduct = await componentsService.isCanReportProduct(req.session.account.workplaceID, req.body.productID);
        if (pass && !isCanReportProduct) {
            res.status(200).json({
                errCode: 1,
                message: "Report product fail, customer not own it",
            });
            pass = false;
        }
    }

    if (pass) next()
}
let validProductManagementReportErrorSendMail = async (req, res, next) => {
    let pass = true;
    // Valid data
    if (pass) {
        if (pass && !req.body) {
            res.status(200).json({
                errCode: 1,
                message: "Report error fail, data is invalid",
            });
            pass = false;
        }
    }

    // Valid empty
    if (pass) {
        if (pass && !req.body.productID) {
            res.status(200).json({
                errCode: 1,
                message: "Report error fail, ID's product is empty",
            });
            pass = false;
        }
        if (pass && !req.body.descriptionError) {
            res.status(200).json({
                errCode: 1,
                message: "Report error fail, Please add description error",
            });
            pass = false;
        }
    }

    // Valid data suitable
    if (pass) {
        let isExistProduct = await componentsService.isExistProduct(req.body.productID);
        if (pass && !isExistProduct) {
            res.status(200).json({
                errCode: 1,
                message: "Report error fail, product (id:" + req.body.productID + ") is not exist",
            });
            pass = false;
        }
        if (pass && !req.body.descriptionError.trim()) {
            res.status(200).json({
                errCode: 1,
                message: "Report error fail, Description error is empty",
            });
            pass = false;
        }
        let isCanReportProduct = await componentsService.isCanReportProduct(req.session.account.workplaceID, req.body.productID);
        if (pass && !isCanReportProduct) {
            res.status(200).json({
                errCode: 1,
                message: "Can't report product, Customer not own it",
            });
            pass = false;
        }
        let customer = await componentsService.getCustomerBySoldProductID(req.body.productID)
        if (pass && !customer) {
            res.status(200).json({
                errCode: 1,
                message: "Can't report product, Customer haven't buy product yet",
            });
            pass = false;
        } else {
            if (pass) {
                let isEmail = componentsService.isEmail(customer.email);
                if (!isEmail) {

                    res.status(200).json({
                        errCode: 1,
                        message: "Can't report product, Email's customer is invalid",
                    });
                    pass = false;
                }
            }
        }
    }

    if (pass) next()
}

let validProductManagementGetInsurance = async (req, res, next) => {
    let pass = true;
    // Valid data
    if (pass) {
        if (pass && !req.body) {
            res.status(200).json({
                errCode: 1,
                message: "Get insurance fail, data is invalid",
            });
            pass = false;
        }
    }

    // Valid empty
    if (pass) {
        if (pass && !req.body.productID) {
            res.status(200).json({
                errCode: 1,
                message: "Get insurance fail, ID's product is empty",
            });
            pass = false;
        }
        if (pass && !req.body.descriptionInsurance) {
            res.status(200).json({
                errCode: 1,
                message: "Get insurance fail, Please add description insurance",
            });
            pass = false;
        }
    }

    // Valid data suitable
    if (pass) {
        let isExistProduct = await componentsService.isExistProduct(req.body.productID);
        if (pass && !isExistProduct) {
            res.status(200).json({
                errCode: 1,
                message: "Get insurance fail, product (id:" + req.body.productID + ") is not exist",
            });
            pass = false;
        }
        if (pass && !req.body.descriptionInsurance.trim()) {
            res.status(200).json({
                errCode: 1,
                message: "Get insurance fail, Description error is empty",
            });
            pass = false;
        }
    }

    if (pass) next()
}
let validInsuranceManagementSendInsuranceCenter = async (req, res, next) => {
    let pass = true;
    // Valid data
    if (pass) {
        if (pass && !req.body) {
            res.status(200).json({
                errCode: 1,
                message: "Send insurance fail, data is invalid",
            });
            pass = false;
        }
    }

    // Valid empty. need input
    if (pass) {
        if (pass && !req.body.productID) {
            res.status(200).json({
                errCode: 1,
                message: "Send insurance fail, ID's product is empty",
            });
            pass = false;
        }
        if (pass && !req.body.insurancecenterID) {
            res.status(200).json({
                errCode: 1,
                message: "Send insurance fail, ID's insurancecenter is empty",
            });
            pass = false;
        }
    }

    // Valid input data suitable
    if (pass) {
        let isExistProduct = await componentsService.isExistProduct(req.body.productID);
        if (pass && !isExistProduct) {
            res.status(200).json({
                errCode: 1,
                message: "Send insurance fail, product (id:" + req.body.productID + ") is not exist",
            });
            pass = false;
        }
        let isReportBeforeSendInsuranceCenter = await componentsService.isReportBeforeSendInsuranceCenter(req.body.productID);
        if (pass && !isReportBeforeSendInsuranceCenter) {
            res.status(200).json({
                errCode: 1,
                message: "Send insurance fail, product (id:" + req.body.productID + ") is not report error before",
            });
            pass = false;
        }
        let isExistInsuranceCenter = await componentsService.isExistInsuranceCenter(req.body.insurancecenterID);
        if (pass && !isExistInsuranceCenter) {
            res.status(200).json({
                errCode: 1,
                message: "Send insurance fail, Insurance Center (id:" + req.body.productID + ") is not exist",
            });
            pass = false;
        }
    }

    if (pass) next()
}
let validInsuranceManagementReceiveInsuranceSuccess = async (req, res, next) => {
    let pass = true;
    // Valid data
    if (pass) {
        if (pass && !req.body) {
            res.status(200).json({
                errCode: 1,
                message: "Receive insurance fail, data is invalid",
            });
            pass = false;
        }
    }

    // Valid empty. need input
    if (pass) {
        if (pass && !req.body.productID) {
            res.status(200).json({
                errCode: 1,
                message: "Receive insurance fail, ID's product is empty",
            });
            pass = false;
        }
    }

    // Valid input data suitable
    if (pass) {
        let isExistProduct = await componentsService.isExistProduct(req.body.productID);
        if (pass && !isExistProduct) {
            res.status(200).json({
                errCode: 1,
                message: "Receive insurance fail, product (id:" + req.body.productID + ") is not exist",
            });
            pass = false;
        }
        let isCanReceiveInsuranceSuccess = await componentsService.isCanReceiveInsuranceSuccess(req.body.productID);
        if (pass && !isCanReceiveInsuranceSuccess) {
            res.status(200).json({
                errCode: 1,
                message: "Receive insurance fail, The Product must be under warranty before Receive",
            });
            pass = false;
        }
    }

    if (pass) next()
}
let validInsuranceManagementSendInsuranceSuccessCustomer = async (req, res, next) => {
    let pass = true;
    // Valid data
    if (pass) {
        if (pass && !req.body) {
            res.status(200).json({
                errCode: 1,
                message: "Send back product fail, data is invalid",
            });
            pass = false;
        }
    }

    // Valid empty. need input
    if (pass) {
        if (pass && !req.body.productID) {
            res.status(200).json({
                errCode: 1,
                message: "Send back product fail, ID's product is empty",
            });
            pass = false;
        }
    }

    // Valid input data suitable
    if (pass) {
        let isCanSendInsuranceSuccessCustomer = await componentsService.isCanSendInsuranceSuccessCustomer(req.body.productID);
        if (pass && !isCanSendInsuranceSuccessCustomer) {
            res.status(200).json({
                errCode: 1,
                message: "Send back product fail, The Product is invalid",
            });
            pass = false;
        }
        let getCustomerBySoldProductID = await componentsService.getCustomerBySoldProductID(req.body.productID);
        if (pass && !getCustomerBySoldProductID) {
            res.status(200).json({
                errCode: 1,
                message: "Send back product fail, Have no customer by product (id:" + req.body.productID + ")",
            });
            pass = false;
        }
    }

    if (pass) next()
}
let validInsuranceManagementSendInsuranceFailFactory = async (req, res, next) => {
    let pass = true;
    // Valid data
    if (pass) {
        if (pass && !req.body) {
            res.status(200).json({
                errCode: 1,
                message: "Send back product fail, data is invalid",
            });
            pass = false;
        }
    }

    // Valid empty. need input
    if (pass) {
        if (pass && !req.body.productID) {
            res.status(200).json({
                errCode: 1,
                message: "Send back product fail, ID's product is empty",
            });
            pass = false;
        }
    }

    // Valid input data suitable
    if (pass) {
        let isCanSendInsuranceFailFactory = await componentsService.isCanSendInsuranceFailFactory(req.body.productID);
        if (pass && !isCanSendInsuranceFailFactory) {
            res.status(200).json({
                errCode: 1,
                message: "Send product for factory fail, The Product is invalid",
            });
            pass = false;
        }
        let getFactoryByProductID = await componentsService.getFactoryByProductID(req.body.productID);
        if (pass && !getFactoryByProductID) {
            res.status(200).json({
                errCode: 1,
                message: "Send product for factory fail, Factory created this product is not exist",
            });
            pass = false;
        }
    }

    if (pass) next()
}
let validInsuranceManagementSendInsuranceFailFactorySendMail = async (req, res, next) => {
    let pass = true;
    // Valid data
    if (pass) {
        if (pass && !req.body) {
            res.status(200).json({
                errCode: 1,
                message: "Send Mail for customer fail, data is invalid",
            });
            pass = false;
        }
    }

    // Valid empty
    if (pass) {
        if (pass && !req.body.productID) {
            res.status(200).json({
                errCode: 1,
                message: "Send Mail for customer fail, ID's product is empty",
            });
            pass = false;
        }
        if (pass && !req.body.descriptionError) {
            res.status(200).json({
                errCode: 1,
                message: "Send Mail for customer fail, Please add description error",
            });
            pass = false;
        }
    }

    // Valid data suitable
    if (pass) {
        let isExistProduct = await componentsService.isExistProduct(req.body.productID);
        if (pass && !isExistProduct) {
            res.status(200).json({
                errCode: 1,
                message: "Send Mail for customer fail, product (id:" + req.body.productID + ") is not exist",
            });
            pass = false;
        }
        if (pass && !req.body.descriptionError.trim()) {
            res.status(200).json({
                errCode: 1,
                message: "Send Mail for customer fail, Description error is empty",
            });
            pass = false;
        }
        let isCanSendMailSendInsuranceFailFactory = await componentsService.isCanSendMailSendInsuranceFailFactory(req.session.account.workplaceID, req.body.productID);
        if (pass && !isCanSendMailSendInsuranceFailFactory) {
            res.status(200).json({
                errCode: 1,
                message: "Send Mail for customer fail, Product is invalid",
            });
            pass = false;
        }
    }

    if (pass) next()
}
let validCustomerManagementCreate = async (req, res, next) => {
    let pass = true;
    // Valid data
    if (pass) {
        if (pass && !req.body) {
            res.status(200).json({
                errCode: 1,
                message: "Create customer fail, data is invalid",
            });
            pass = false;
        }
    }

    // Valid empty
    if (pass) {
        if (pass && !req.body.name) {
            res.status(200).json({
                errCode: 1,
                message: "Create customer fail, Name is empty",
            });
            pass = false;
        }
        if (pass && !req.body.sdt) {
            res.status(200).json({
                errCode: 1,
                message: "Create customer fail, SĐT is empty",
            });
            pass = false;
        }
        if (pass && req.body.sdt.length < 10) {
            res.status(200).json({
                errCode: 1,
                message: "Create customer fail, Length's SĐT must be greater than 9",
            });
            pass = false;
        }
        if (pass && !req.body.email) {
            res.status(200).json({
                errCode: 1,
                message: "Create customer fail, Email is empty",
            });
            pass = false;
        }
        let isEmail = await componentsService.isEmail(req.body.email)
        if (pass && !isEmail) {
            res.status(200).json({
                errCode: 1,
                message: "Create customer fail, Email is invalid",
            });
            pass = false;
        }
        if (pass && !req.body.address) {
            res.status(200).json({
                errCode: 1,
                message: "Create customer fail, Address is empty",
            });
            pass = false;
        }
    }

    // Valid data suitable
    if (pass) {
        let isCanCreateNewCustomerBySDT = await componentsService.isCanCreateNewCustomerBySDT(req.body.sdt);
        if (pass && !isCanCreateNewCustomerBySDT) {
            res.status(200).json({
                errCode: 1,
                message: "Create customer fail, SĐT has been create",
            });
            pass = false;
        }
        let isCanCreateNewCustomerByEmail = await componentsService.isCanCreateNewCustomerByEmail(req.body.email);
        if (pass && !isCanCreateNewCustomerByEmail) {
            res.status(200).json({
                errCode: 1,
                message: "Create customer fail, Email has been create",
            });
            pass = false;
        }
    }

    if (pass) next()
}
let validCustomerManagementDelete = async (req, res, next) => {
    let pass = true;
    // Valid data
    if (pass) {
        if (pass && !req.body) {
            res.status(200).json({
                errCode: 1,
                message: "Delete customer fail, data is invalid",
            });
            pass = false;
        }
    }

    // Valid empty
    if (pass) {
        if (pass && !req.body.customerID) {
            res.status(200).json({
                errCode: 1,
                message: "Delete customer fail, Customer ID is empty",
            });
            pass = false;
        }
    }

    // Valid data suitable
    if (pass) {
        let isCanDeleteByID = await componentsService.isCanDeleteByID(req.body.customerID);
        if (pass && !isCanDeleteByID) {
            res.status(200).json({
                errCode: 1,
                message: "Delete customer fail, ID is invalid",
            });
            pass = false;
        }
    }

    if (pass) next()
}
let validCustomerManagementUpdate = async (req, res, next) => {
    let pass = true;
    // Valid data
    if (pass) {
        if (pass && !req.body) {
            res.status(200).json({
                errCode: 1,
                message: "Update customer fail, data is invalid",
            });
            pass = false;
        }
    }

    // Valid empty
    if (pass) {
        if (pass && !req.body.customerID) {
            res.status(200).json({
                errCode: 1,
                message: "Update customer fail, Customer ID is empty",
            });
            pass = false;
        }
        if (pass && !req.body.name) {
            res.status(200).json({
                errCode: 1,
                message: "Update customer fail, Name is empty",
            });
            pass = false;
        }
        if (pass && !req.body.sdt) {
            res.status(200).json({
                errCode: 1,
                message: "Update customer fail, SĐT is empty",
            });
            pass = false;
        }
        if (pass && !req.body.email) {
            res.status(200).json({
                errCode: 1,
                message: "Update customer fail, Email is empty",
            });
            pass = false;
        }
        if (pass && !req.body.address) {
            res.status(200).json({
                errCode: 1,
                message: "Update customer fail, Address is empty",
            });
            pass = false;
        }
    }

    // Valid data suitable
    if (pass) {
        let isExistCustomer = await componentsService.isExistCustomer(req.body.customerID);
        if (pass && !isExistCustomer) {
            res.status(200).json({
                errCode: 1,
                message: "Update customer fail, Customer not exist",
            });
            pass = false;
        }
        let isCanUpdateCustomerBySDT = await componentsService.isCanUpdateCustomerBySDT(req.body.customerID, req.body.sdt);
        if (pass && !isCanUpdateCustomerBySDT) {
            res.status(200).json({
                errCode: 1,
                message: "Update customer fail, SĐT has been create",
            });
            pass = false;
        }
        let isCanUpdateCustomerByEmail = await componentsService.isCanUpdateCustomerByEmail(req.body.customerID, req.body.email);
        if (pass && !isCanUpdateCustomerByEmail) {
            res.status(200).json({
                errCode: 1,
                message: "Update customer fail, Email has been create",
            });
            pass = false;
        }
    }

    if (pass) next()
}
module.exports = {
    validAgentSession: validAgentSession,
    validProductManagementEnterFromFactory: validProductManagementEnterFromFactory,
    validProductManagementSellForCustomer: validProductManagementSellForCustomer,
    validProductManagementReportError: validProductManagementReportError,
    validProductManagementReportErrorSendMail: validProductManagementReportErrorSendMail,
    validProductManagementGetInsurance: validProductManagementGetInsurance,
    validInsuranceManagementSendInsuranceCenter: validInsuranceManagementSendInsuranceCenter,
    validInsuranceManagementReceiveInsuranceSuccess: validInsuranceManagementReceiveInsuranceSuccess,
    validInsuranceManagementSendInsuranceSuccessCustomer: validInsuranceManagementSendInsuranceSuccessCustomer,
    validInsuranceManagementSendInsuranceFailFactory: validInsuranceManagementSendInsuranceFailFactory,
    validInsuranceManagementSendInsuranceFailFactorySendMail: validInsuranceManagementSendInsuranceFailFactorySendMail,
    validCustomerManagementCreate: validCustomerManagementCreate,
    validCustomerManagementDelete: validCustomerManagementDelete,
    validCustomerManagementUpdate: validCustomerManagementUpdate,
}