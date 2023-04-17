import componentsService from "../services/componentsService"

let validInsuranceCenterSession = async (req, res, next) => {
    let pass = true;

    if (pass) {
        if (pass && !req.session.account) {
            res.status(200).json({
                errCode: -1,
                message: "Access insurance center fail, you need login",
            });
            pass = false;
        } else if (pass && req.session.account.roleKey !== "R4") {
            res.status(200).json({
                errCode: -1,
                message: "Access insurance center failure, you are not insurance center",
            });
            pass = false;
        } else if (pass && req.session.account.workplaceID) {
            let isExistInsuranceCenter = await componentsService.isExistInsuranceCenter(req.session.account.workplaceID);
            if (!isExistInsuranceCenter) {
                res.status(200).json({
                    errCode: -1,
                    message: "Access insurance center failure, Insurance Center is not exist",
                });
                pass = false;
            }
        } else {
            pass = false;
        }
    }

    if (pass) next()
}
let validInsuranceManagementReceiveInsuranceAgent = async (req, res, next) => {
    let pass = true;
    // Valid data
    if (pass && !req.body) {
        res.status(200).json({
            errCode: 1,
            message: "Get insurance fail, data is invalid",
        });
        pass = false;
    }

    // Valid empty
    if (pass && !req.body.productID) {
        res.status(200).json({
            errCode: 1,
            message: "Get insurance fail, ID's product is empty",
        });
        pass = false;
    }

    // Valid data suitable
    let isExistProduct = await componentsService.isExistProduct(req.body.productID);
    if (pass && !isExistProduct) {
        res.status(200).json({
            errCode: 1,
            message: "Get insurance fail, product (id:" + req.body.productID + ") is not exist",
        });
        pass = false;
    }
    let isCanGetInsurance = await componentsService.isCanGetInsurance(req.session.account.workplaceID, req.body.productID);
    if (pass && !isCanGetInsurance) {
        res.status(200).json({
            errCode: 1,
            message: "Get insurance fail, Status Product must be: Lỗi, cần bảo hành",
        });
        pass = false;
    }

    if (pass) next()
}

let validInsuranceManagementFinishInsurance = async (req, res, next) => {
    let pass = true;
    // Valid data
    if (pass && !req.body) {
        res.status(200).json({
            errCode: 1,
            message: "Finish fail, data is invalid",
        });
        pass = false;
    }

    // Valid empty
    if (pass && !req.body.productID) {
        res.status(200).json({
            errCode: 1,
            message: "Finish fail, ID's product is empty",
        });
        pass = false;
    }
    if (pass && !req.body.endDate) {
        res.status(200).json({
            errCode: 1,
            message: "Finish fail, EndDate is empty",
        });
        pass = false;
    }
    if (pass && !req.body.result) {
        res.status(200).json({
            errCode: 1,
            message: "Finish fail, Result is empty",
        });
        pass = false;
    }
    if (pass && !req.body.description) {
        res.status(200).json({
            errCode: 1,
            message: "Finish fail, Description is empty",
        });
        pass = false;
    }



    // Valid data suitable
    let isExistProduct = await componentsService.isExistProduct(req.body.productID);
    if (pass && !isExistProduct) {
        res.status(200).json({
            errCode: 1,
            message: "Finish fail, product (id:" + req.body.productID + ") is not exist",
        });
        pass = false;
    }
    let isCanFinishInsurance = await componentsService.isCanFinishInsurance(req.session.account.workplaceID, req.body.productID);
    if (pass && !isCanFinishInsurance) {
        res.status(200).json({
            errCode: 1,
            message: "Finish fail, Status Product must be: Đang sửa chữa bảo hành",
        });
        pass = false;
    }
    if (pass && !(req.body.result == "SUCCESS" || req.body.result == "FAILURE")) {
        res.status(200).json({
            errCode: 1,
            message: "Finish fail, Result must be: SUCCESS or FAILURE",
        });
        pass = false;
    }
    if (pass && !req.body.endDate || !(new Date(req.body.endDate) instanceof Date) || new Date(req.body.endDate) == "Invalid Date") {
        res.status(200).json({
            errCode: 1,
            message: "Finish fail, EndDate of product is invalid",
        });
        pass = false;
    }
    if (pass && !req.body.description.trim()) {
        res.status(200).json({
            errCode: 1,
            message: "Finish fail, Description is empty",
        });
        pass = false;
    }

    if (pass) next()
}
let validInsuranceManagementSendAgent = async (req, res, next) => {
    let pass = true;
    // Valid data
    if (pass && !req.body) {
        res.status(200).json({
            errCode: 1,
            message: "Send fail, data is invalid",
        });
        pass = false;
    }

    // Valid empty
    if (pass && !req.body.productID) {
        res.status(200).json({
            errCode: 1,
            message: "Send fail, ID's product is empty",
        });
        pass = false;
    }
    if (pass && !req.body.agentID) {
        res.status(200).json({
            errCode: 1,
            message: "Send fail, agentID is empty",
        });
        pass = false;
    }

    // Valid data suitable
    let isExistProduct = await componentsService.isExistProduct(req.body.productID);
    if (pass && !isExistProduct) {
        res.status(200).json({
            errCode: 1,
            message: "Send fail, product (id:" + req.body.productID + ") is not exist",
        });
        pass = false;
    }
    let isExistAgent = await componentsService.isExistAgent(req.body.agentID);
    if (pass && !isExistAgent) {
        res.status(200).json({
            errCode: 1,
            message: "Send fail, Agent (id:" + req.body.productID + ") is not exist",
        });
        pass = false;
    }
    let isCanInsuranceCenterSendAgent = await componentsService.isCanInsuranceCenterSendAgent(req.session.account.workplaceID, req.body.productID);
    if (pass && !isCanInsuranceCenterSendAgent) {
        res.status(200).json({
            errCode: 1,
            message: "Send fail, Product must be finish insurance",
        });
        pass = false;
    }

    if (pass) next()
}

let validInsuranceManagementSendFactory = async (req, res, next) => {
    let pass = true;
    // Valid data
    if (pass && !req.body) {
        res.status(200).json({
            errCode: 1,
            message: "Send fail, data is invalid",
        });
        pass = false;
    }

    // Valid empty
    if (pass && !req.body.productID) {
        res.status(200).json({
            errCode: 1,
            message: "Send fail, ID's product is empty",
        });
        pass = false;
    }
    if (pass && !req.body.factoryID) {
        res.status(200).json({
            errCode: 1,
            message: "Send fail, factoryID is empty",
        });
        pass = false;
    }

    // Valid data suitable
    let isExistProduct = await componentsService.isExistProduct(req.body.productID);
    if (pass && !isExistProduct) {
        res.status(200).json({
            errCode: 1,
            message: "Send fail, product (id:" + req.body.productID + ") is not exist",
        });
        pass = false;
    }
    let isExistFactoryByID = await componentsService.isExistFactoryByID(req.body.factoryID);
    if (pass && !isExistFactoryByID) {
        res.status(200).json({
            errCode: 1,
            message: "Send fail, factory (id:" + req.body.productID + ") is not exist",
        });
        pass = false;
    }
    let isCanInsuranceCenterSendFactory = await componentsService.isCanInsuranceCenterSendFactory(req.session.account.workplaceID, req.body.productID);
    if (pass && !isCanInsuranceCenterSendFactory) {
        res.status(200).json({
            errCode: 1,
            message: "Send fail, Product must be finish insurance Report factory previously",
        });
        pass = false;
    }

    if (pass) next()
}
let validInsuranceManagementReportFactory = async (req, res, next) => {
    let pass = true;
    // Valid data
    if (pass && !req.body) {
        res.status(200).json({
            errCode: 1,
            message: "Report fail, data is invalid",
        });
        pass = false;
    }

    // Valid empty
    if (pass && !req.body.productID) {
        res.status(200).json({
            errCode: 1,
            message: "Report fail, ID's product is empty",
        });
        pass = false;
    }
    // if (pass && !req.body.factoryID) {
    //     res.status(200).json({
    //         errCode: 1,
    //         message: "Report fail, factoryID is empty",
    //     });
    //     pass = false;
    // }

    // Valid data suitable
    let isExistProduct = await componentsService.isExistProduct(req.body.productID);
    if (pass && !isExistProduct) {
        res.status(200).json({
            errCode: 1,
            message: "Report fail, product (id:" + req.body.productID + ") is not exist",
        });
        pass = false;
    }
    // let isExistFactoryByID = await componentsService.isExistFactoryByID(req.body.factoryID);
    // if (pass && !isExistFactoryByID) {
    //     res.status(200).json({
    //         errCode: 1,
    //         message: "Report fail, factory (id:" + req.body.productID + ") is not exist",
    //     });
    //     pass = false;
    // }
    let isCanInsuranceCenterReportFactory = await componentsService.isCanInsuranceCenterReportFactory(req.session.account.workplaceID, req.body.productID);
    if (pass && !isCanInsuranceCenterReportFactory) {
        res.status(200).json({
            errCode: 1,
            message: "Report fail, Product must be finish insurance FAILURE",
        });
        pass = false;
    }

    if (pass) next()
}

module.exports = {
    validInsuranceCenterSession: validInsuranceCenterSession,
    validInsuranceManagementReceiveInsuranceAgent: validInsuranceManagementReceiveInsuranceAgent,
    validInsuranceManagementFinishInsurance: validInsuranceManagementFinishInsurance,
    validInsuranceManagementSendAgent: validInsuranceManagementSendAgent,
    validInsuranceManagementReportFactory: validInsuranceManagementReportFactory,
    validInsuranceManagementSendFactory: validInsuranceManagementSendFactory,
}