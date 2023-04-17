import factoryService from "../services/factoryService"

let dashboardFactory = async (req, res) => {
    if (req.session.account) {
        return res.status(200).json({
            errCode: 0,
            message: "Get dashboard dell corp success",
            data: {
                account: req.session.account,
                taskbars: ["Quản lý sản phẩm",
                    "Quản lý bán hàng",
                    "Theo dõi lỗi"]
            }
        });
    }


};

let getProductManagement = async (req, res) => {
    let responseData = await factoryService.getProductManagement(req.session.account.workplaceID);
    return res.status(200).json({
        errCode: 0,
        message: "Get all product success",
        dataLength: responseData.length,
        data: responseData
    });
};

let postProductManagementDelete = async (req, res) => {
    let responseData = await factoryService.postProductManagementDelete(req.session.account.workplaceID, req.body.productID);
    return res.status(200).json({
        errCode: responseData.errCode,
        message: responseData.message,
    });
};
let postProductManagementEnterBatches = async (req, res) => {
    let responseData = await factoryService.postProductManagementEnterBatches(req.session.account.workplaceID, req.body);
    return res.status(200).json({
        errCode: 0,
        message: "Enter new batches success",
        data: responseData
    });
};

let postProductManagementExportToAgent = async (req, res) => {
    let responseData = await factoryService.postProductManagementExportToAgent(req.body.productID, req.body.agentID);
    return res.status(200).json({
        errCode: 0,
        message: "Export to agent success",
        data: responseData
    });
};

let getReceiveDefectiveProduct = async (req, res) => {
    let responseData = await factoryService.getReceiveDefectiveProduct(req.session.account.workplaceID);
    return res.status(200).json({
        errCode: 0,
        message: "Get all defective products need receive is success",
        dataLength: responseData.length,
        data: responseData
    });
};

let postReceiveDefectiveProductReceiveProduct = async (req, res) => {
    let responseData = await factoryService.postReceiveDefectiveProductReceiveProduct(req.session.account.workplaceID, req.body.productID);
    return res.status(200).json({
        errCode: 0,
        message: "Recieve defective products is success",
        dataLength: responseData.length,
        data: responseData
    });
};

let getSellManagement = async (req, res) => {
    let responseData = await factoryService.getSellManagement(req.session.account.workplaceID);
    return res.status(200).json({
        errCode: 0,
        message: "Get all sell success",
        dataLength: responseData.length,
        data: responseData
    });
};
let getGetSell = async (req, res) => {
    let responseData = await factoryService.getGetSell(req.session.account.workplaceID);
    return res.status(200).json({
        errCode: 0,
        message: "Get all sell success",
        dataLength: responseData.length,
        data: responseData
    });
};

let getErrorManagement = async (req, res) => {
    let responseData = await factoryService.getErrorManagement(req.session.account.workplaceID);
    return res.status(200).json({
        errCode: 0,
        message: "Get all error report success",
        dataLength: responseData.length,
        data: responseData
    });
};

module.exports = {
    dashboardFactory: dashboardFactory,
    getProductManagement: getProductManagement,
    postProductManagementDelete: postProductManagementDelete,
    postProductManagementEnterBatches: postProductManagementEnterBatches,
    postProductManagementExportToAgent: postProductManagementExportToAgent,
    getReceiveDefectiveProduct: getReceiveDefectiveProduct,
    postReceiveDefectiveProductReceiveProduct: postReceiveDefectiveProductReceiveProduct,
    getSellManagement: getSellManagement,
    getGetSell: getGetSell,
    getErrorManagement: getErrorManagement,
}