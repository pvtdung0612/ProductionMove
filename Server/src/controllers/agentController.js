import agentService from "../services/agentService"

let dashboardAgent = async (req, res) => {
    if (req.session.account) {
        return res.status(200).json({
            errCode: 0,
            message: "Get dashboard dell corp success",
            data: {
                account: req.session.account,
                taskbars: ["Quản lý sản phẩm",
                    "Quản lý bảo hành sản phẩm",
                    "Quản lý khách hàng"]
            }
        });
    }
};

let getProductManagement = async (req, res) => {
    let responseData = await agentService.getProductManagement(req.session.account.workplaceID);
    return res.status(200).json({
        errCode: 0,
        message: "Get all product success",
        dataLength: responseData.length,
        data: responseData
    });
};

let getProductManagementEnterFromFactoryGetProduct = async (req, res) => {
    let responseData = await agentService.getProductManagementEnterFromFactoryGetProduct();
    if (responseData) {
        return res.status(200).json({
            errCode: 0,
            message: "Get new products success",
            dataLength: responseData.length,
            data: responseData
        });
    } else {
        return res.status(200).json({
            errCode: 0,
            message: "Have no new product valid",
            dataLength: responseData.length,
            data: responseData
        });
    }
};

let postProductManagementEnterFromFactory = async (req, res) => {
    let responseData = await agentService.postProductManagementEnterFromFactory(req.session.account.workplaceID, req.body.products);
    return res.status(200).json({
        errCode: responseData.errCode,
        message: responseData.message,
    });
};

let getProductManagementSellForCustomerGetCustomer = async (req, res) => {
    let responseData = await agentService.getProductManagementSellForCustomerGetCustomer();
    if (responseData) {
        return res.status(200).json({
            errCode: 0,
            message: "Get customers success",
            dataLength: responseData.length,
            data: responseData
        });
    } else {
        return res.status(200).json({
            errCode: 0,
            message: "Have no customer",
            dataLength: responseData.length,
            data: responseData
        });
    }
};

let postProductManagementSellForCustomer = async (req, res) => {
    let responseData = await agentService.postProductManagementSellForCustomer(req.session.account.workplaceID, req.body.productID, req.body.customerID);
    return res.status(200).json({
        errCode: responseData.errCode,
        message: responseData.message,
    });
};

let postProductManagementReportError = async (req, res) => {
    let responseData = await agentService.postProductManagementReportError(req.session.account.workplaceID, req.body.productID, req.body.descriptionError);
    return res.status(200).json({
        errCode: responseData.errCode,
        message: responseData.message,
    });
};

let postProductManagementReportErrorSendMail = async (req, res) => {
    let responseData = await agentService.postProductManagementReportErrorSendMail(req.session.account.workplaceID, req.body.productID, req.body.descriptionError);
    return res.status(200).json({
        errCode: responseData.errCode,
        message: responseData.message,
    });
};

let postProductManagementGetInsurance = async (req, res) => {
    let responseData = await agentService.postProductManagementGetInsurance(req.session.account.workplaceID, req.body.productID, req.body.descriptionInsurance);
    return res.status(200).json({
        errCode: responseData.errCode,
        message: responseData.message,
    });
};

let getInsuranceManagement = async (req, res) => {
    let responseData = await agentService.getInsuranceManagement(req.session.account.workplaceID);
    return res.status(200).json({
        errCode: 0,
        message: "Get insurance product management",
        dataLength: responseData.length,
        data: responseData,
    });
};

let postInsuranceManagementSendInsuranceCenter = async (req, res) => {
    let responseData = await agentService.postInsuranceManagementSendInsuranceCenter(req.session.account.workplaceID, req.body.productID, req.body.insurancecenterID);
    return res.status(200).json({
        errCode: responseData.errCode,
        message: responseData.message,
    });
};

let getInsuranceManagementSendInsuranceCenterGetAllInsuranceCenter = async (req, res) => {
    let responseData = await agentService.getInsuranceManagementSendInsuranceCenterGetAllInsuranceCenter();
    return res.status(200).json({
        errCode: 0,
        message: "Get all insurance center success",
        dataLength: responseData.length,
        data: responseData,
    });
};

let postInsuranceManagementReceiveInsuranceSuccess = async (req, res) => {
    let responseData = await agentService.postInsuranceManagementReceiveInsuranceSuccess(req.session.account.workplaceID, req.body.productID);
    return res.status(200).json({
        errCode: responseData.errCode,
        message: responseData.message,
    });
};

let postInsuranceManagementSendInsuranceSuccessCustomer = async (req, res) => {
    let responseData = await agentService.postInsuranceManagementSendInsuranceSuccessCustomer(req.session.account.workplaceID, req.body.productID);
    return res.status(200).json({
        errCode: responseData.errCode,
        message: responseData.message,
    });
};

let postInsuranceManagementSendInsuranceFailFactory = async (req, res) => {
    let responseData = await agentService.postInsuranceManagementSendInsuranceFailFactory(req.session.account.workplaceID, req.body.productID);
    return res.status(200).json({
        errCode: responseData.errCode,
        message: responseData.message,
    });
};
let postInsuranceManagementSendInsuranceFailFactorySendMail = async (req, res) => {
    let responseData = await agentService.postInsuranceManagementSendInsuranceFailFactorySendMail(req.session.account.workplaceID, req.body.productID, req.body.descriptionError);
    return res.status(200).json({
        errCode: responseData.errCode,
        message: responseData.message,
    });
};

let getCustomerManagement = async (req, res) => {
    let responseData = await agentService.getCustomerManagement();
    return res.status(200).json({
        errCode: 0,
        message: "Get all customer success",
        dataLength: responseData.length,
        data: responseData
    });
};
let postCustomerManagementCreate = async (req, res) => {
    let responseData = await agentService.postCustomerManagementCreate(req.body.name, req.body.sdt, req.body.email, req.body.address);
    return res.status(200).json({
        errCode: responseData.errCode,
        message: responseData.message,
    });
};
let postCustomerManagementDelete = async (req, res) => {
    let responseData = await agentService.postCustomerManagementDelete(req.body.customerID);
    return res.status(200).json({
        errCode: responseData.errCode,
        message: responseData.message,
    });
};

let postCustomerManagementUpdate = async (req, res) => {
    let responseData = await agentService.postCustomerManagementUpdate(req.body.customerID, req.body.name, req.body.sdt, req.body.email, req.body.address);
    return res.status(200).json({
        errCode: responseData.errCode,
        message: responseData.message,
    });
};

let getGetSell = async (req, res) => {
    let responseData = await agentService.getGetSell(req.session.account.workplaceID);
    return res.status(200).json({
        errCode: 0,
        message: "Get all sells success",
        dataLength: responseData.length,
        data: responseData
    });
};

module.exports = {
    dashboardAgent: dashboardAgent,
    getProductManagement: getProductManagement,
    getProductManagementEnterFromFactoryGetProduct: getProductManagementEnterFromFactoryGetProduct,
    postProductManagementEnterFromFactory: postProductManagementEnterFromFactory,
    getProductManagementSellForCustomerGetCustomer: getProductManagementSellForCustomerGetCustomer,
    postProductManagementSellForCustomer: postProductManagementSellForCustomer,
    postProductManagementReportError: postProductManagementReportError,
    postProductManagementReportErrorSendMail: postProductManagementReportErrorSendMail,
    postProductManagementGetInsurance: postProductManagementGetInsurance,
    getInsuranceManagement: getInsuranceManagement,
    postInsuranceManagementSendInsuranceCenter: postInsuranceManagementSendInsuranceCenter,
    getInsuranceManagementSendInsuranceCenterGetAllInsuranceCenter: getInsuranceManagementSendInsuranceCenterGetAllInsuranceCenter,
    postInsuranceManagementReceiveInsuranceSuccess: postInsuranceManagementReceiveInsuranceSuccess,
    postInsuranceManagementSendInsuranceSuccessCustomer: postInsuranceManagementSendInsuranceSuccessCustomer,
    postInsuranceManagementSendInsuranceFailFactory: postInsuranceManagementSendInsuranceFailFactory,
    postInsuranceManagementSendInsuranceFailFactorySendMail: postInsuranceManagementSendInsuranceFailFactorySendMail,
    getCustomerManagement: getCustomerManagement,
    postCustomerManagementCreate: postCustomerManagementCreate,
    postCustomerManagementDelete: postCustomerManagementDelete,
    postCustomerManagementUpdate: postCustomerManagementUpdate,
    getGetSell: getGetSell,
}