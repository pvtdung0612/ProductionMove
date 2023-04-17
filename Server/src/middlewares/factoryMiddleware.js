import componentsService from "../services/componentsService"

let validFactorySession = async (req, res, next) => {
    let pass = true;

    if (pass) {
        if (pass && !req.session.account) {
            res.status(200).json({
                errCode: -1,
                message: "Access factory failure, you need login",
            });
            pass = false;
        } else if (pass && req.session.account.roleKey !== "R2") {
            res.status(200).json({
                errCode: -1,
                message: "Access factory failure, you are not factory",
            });
            pass = false;
        } else if (pass && req.session.account.workplaceID) {
            let isExistFactoryByID = await componentsService.isExistFactoryByID(req.session.account.workplaceID);
            if (pass && !isExistFactoryByID) {
                res.status(200).json({
                    errCode: -1,
                    message: "Access factory failure, factory is not exist",
                });
                pass = false;
            }
        } else {
            pass = false;
        }
    }

    if (pass) next()
}

let validEnterBatches = async (req, res, next) => {
    let pass = true;
    // Valid data
    if (pass) {
        if (pass && !req.body) {
            res.status(200).json({
                errCode: 1,
                message: "Enter batches fail, data is invalid",
            });
            pass = false;
        }
    }

    // Valid quantity
    if (pass) {
        if (pass && !req.body.quantity || req.body.quantity < 1) {
            res.status(200).json({
                errCode: 1,
                message: "Enter batches fail, quantity must be greater than 0",
            });
            pass = false;
        }
    }

    // Valid name
    if (pass) {
        if (pass && !req.body.name || !req.body.name.trim()) {
            res.status(200).json({
                errCode: 1,
                message: "Enter batches fail, name is empty",
            });
            pass = false;
        }
    }

    // Valid date
    if (pass) {
        if (pass && !req.body.bornDate || !(new Date(req.body.bornDate) instanceof Date) || new Date(req.body.bornDate) == "Invalid Date") {
            res.status(200).json({
                errCode: 1,
                message: "Enter batches fail, Born date of product is invalid",
            });
            pass = false;
        }
    }

    if (pass) {
        if (pass && !req.body.productlineID) {
            res.status(200).json({
                errCode: 1,
                message: "Enter batches fail, productlineID is empty",
            });
            pass = false;
        } else {
            let isExistProductLineByID = await componentsService.isExistProductLineByID(req.body.productlineID);
            if (pass && !isExistProductLineByID) {
                res.status(200).json({
                    errCode: 1,
                    message: "Enter batches fail, productlineID is not exist",
                });
                pass = false;
            }
        }
    }

    if (pass) next()
}
let validProductManagementDelete = async (req, res, next) => {
    let pass = true;
    // Valid data
    if (pass && !req.body) {
        res.status(200).json({
            errCode: 1,
            message: "Delete fail, data is invalid",
        });
        pass = false;
    }

    // Valid empty
    if (pass && !req.body.productID) {
        res.status(200).json({
            errCode: 1,
            message: "Delete fail, ID's product is empty",
        });
        pass = false;
    }

    // Valid data suitable
    let isExistProductDeleteByFactory = await componentsService.isExistProductDeleteByFactory(req.body.productID);
    if (pass && !isExistProductDeleteByFactory) {
        res.status(200).json({
            errCode: 1,
            message: "Delete fail, Product must be in factory",
        });
        pass = false;
    }

    if (pass) next()
}

let validExportToAgent = async (req, res, next) => {
    let pass = true;
    // Valid data
    if (pass) {
        if (pass && !req.body) {
            res.status(200).json({
                errCode: 1,
                message: "Export agent fail, data is invalid",
            });
            pass = false;
        }
    }

    // Valid productID
    if (pass && !req.body.productID) {
        res.status(200).json({
            errCode: 1,
            message: "Export agent fail, ID's product is empty",
        });
        pass = false;
    }
    let isProductCanExportToAgent = await componentsService.isProductCanExportToAgent(req.body.productID);
    if (pass && !isProductCanExportToAgent) {
        let isExistAgent = await componentsService.isExistAgent(req.body.agentID);
        if (pass && !isExistAgent) {
            res.status(200).json({
                errCode: 1,
                message: "Export agent fail, This is not new product",
            });
            pass = false;
        }
    }

    // Valid agentID
    if (pass) {
        if (pass && !req.body.agentID) {
            res.status(200).json({
                errCode: 1,
                message: "Export agent fail, ID's agent is invalid",
            });
            pass = false;
        } else {
            let isExistAgent = await componentsService.isExistAgent(req.body.agentID);
            if (pass && !isExistAgent) {
                res.status(200).json({
                    errCode: 1,
                    message: "Export agent fail, Agent is not exist",
                });
                pass = false;
            }
        }
    }

    if (pass) next()
}

let validReceiveDefectiveProductReceiveProduct = async (req, res, next) => {
    let pass = true;
    // Valid data
    if (pass) {
        if (pass && !req.body) {
            res.status(200).json({
                errCode: 1,
                message: "Recive defective product fail, data is invalid",
            });
            pass = false;
        }
    }

    // Valid productID
    if (pass) {
        if (pass && !req.body.productID) {
            res.status(200).json({
                errCode: 1,
                message: "Recive defective product fail, ID's product is invalid",
            });
            pass = false;
        } else {
            let isExistProduct = await componentsService.isExistProduct(req.body.productID);
            if (pass && !isExistProduct) {
                res.status(200).json({
                    errCode: 1,
                    message: "Recive defective product fail, Product is not exist",
                });
                pass = false;
            }
        }
    }

    if (pass) next()
}

module.exports = {
    validFactorySession: validFactorySession,
    validProductManagementDelete: validProductManagementDelete,
    validEnterBatches: validEnterBatches,
    validExportToAgent: validExportToAgent,
    validReceiveDefectiveProductReceiveProduct: validReceiveDefectiveProductReceiveProduct,
}