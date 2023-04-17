import insuranceService from "../services/insuranceService"

let dashboardInsurance = async (req, res) => {
    if (req.session.account) {
        return res.status(200).json({
            errCode: 0,
            message: "Get dashboard dell corp success",
            data: {
                account: req.session.account,
                taskbars: ["Quản lý dòng sản phẩm",
                    "Quản lý tài khoản",
                    "Theo dõi đợn vị sản phẩm"]
            }
        });
    }
};

let getInsuranceManagement = async (req, res) => {
    let responseData = await insuranceService.getInsuranceManagement(req.session.account.workplaceID);
    return res.status(200).json({
        errCode: 0,
        message: "Get all insurance product success",
        dataLength: responseData.length,
        data: responseData
    });
};


let postInsuranceManagementReceiveInsuranceAgent = async (req, res) => {
    let responseData = await insuranceService.postInsuranceManagementReceiveInsuranceAgent(req.session.account.workplaceID, req.body.productID);
    return res.status(200).json({
        errCode: responseData.errCode,
        message: responseData.message,
    });
};

let postInsuranceManagementFinishInsurance = async (req, res) => {
    let responseData = await insuranceService.postInsuranceManagementFinishInsurance(
        req.session.account.workplaceID, req.body.productID,
        req.body.endDate,
        req.body.result, req.body.description);
    return res.status(200).json({
        errCode: responseData.errCode,
        message: responseData.message,
    });
};

let postInsuranceManagementSendAgent = async (req, res) => {
    let responseData = await insuranceService.postInsuranceManagementSendAgent(
        req.session.account.workplaceID, req.body.productID,
        req.body.agentID);
    return res.status(200).json({
        errCode: responseData.errCode,
        message: responseData.message,
    });
};
let postInsuranceManagementReportFactory = async (req, res) => {
    let responseData = await insuranceService.postInsuranceManagementReportFactory(
        req.session.account.workplaceID, req.body.productID);
    return res.status(200).json({
        errCode: responseData.errCode,
        message: responseData.message,
    });
};
let postInsuranceManagementSendFactory = async (req, res) => {
    let responseData = await insuranceService.postInsuranceManagementSendFactory(
        req.session.account.workplaceID, req.body.productID,
        req.body.factoryID);
    return res.status(200).json({
        errCode: responseData.errCode,
        message: responseData.message,
    });
};

module.exports = {
    dashboardInsurance: dashboardInsurance,
    getInsuranceManagement: getInsuranceManagement,
    postInsuranceManagementReceiveInsuranceAgent: postInsuranceManagementReceiveInsuranceAgent,
    postInsuranceManagementFinishInsurance: postInsuranceManagementFinishInsurance,
    postInsuranceManagementSendAgent: postInsuranceManagementSendAgent,
    postInsuranceManagementReportFactory: postInsuranceManagementReportFactory,
    postInsuranceManagementSendFactory: postInsuranceManagementSendFactory,
}