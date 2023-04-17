import dellCorpService from "../services/dellCorpService"

let dashboardDellCorp = async (req, res) => {
    if (!req.session.account) {
        // return res.status(200).json({
        //     errCode: 0,
        //     message: "Get dashboard dell corp success",
        //     data: {
        //         account: req.session.account,
        //         taskbars: ["Quản lý dòng sản phẩm",
        //             "Quản lý tài khoản",
        //             "Theo dõi đợn vị sản phẩm"]
        //     }
        // });
    }

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
};

// CONTROLLER FOR PRODUCTLINE --------------------------
let getProductlineManagement = async (req, res) => {
    let responseData = await dellCorpService.getProductlineManagement();
    return res.status(200).json({
        errCode: 0,
        message: "Get all product success",
        data: responseData
    });
};

let postProductlineManagementCreate = async (req, res) => {
    let responseData = await dellCorpService.postProductlineManagementCreate(req.body);
    return res.status(200).json(responseData);
};

let putProductlineManagementUpdate = async (req, res) => {
    let data = {
        id: req.body.id,
        productLine: req.body.productLine,
        price: req.body.price,
        cpu: req.body.cpu,
        screen: req.body.screen,
        description: req.body.description,
    }

    let responseData = await dellCorpService.putProductlineManagementUpdate(data);
    return res.status(200).json(responseData);
};

let delelteProductlineManagementDelete = async (req, res) => {
    let responseData = await dellCorpService.delelteProductlineManagementDelete(req.body.id);
    return res.status(200).json(responseData);
};

// CONTROLLER FOR ACCOUNT --------------------------
let getAccountManagement = async (req, res) => {
    let responseData = await dellCorpService.getAccountManagement();
    return res.status(200).json({
        errCode: 0,
        message: "Get all account success",
        data: responseData
    });
};

let postAccountManagementCreate = async (req, res) => {
    let responseData = await dellCorpService.postAccountManagementCreate(req.body);
    return res.status(200).json(responseData);
};

let putAccountManagementUpdate = async (req, res) => {
    let data = {
        id: req.body.id,
        username: req.body.username,
        password: req.body.password,
        roleKey: req.body.roleKey,
        workplaceID: req.body.workplaceID,
        image: req.body.image,
    }

    let responseData = await dellCorpService.putAccountManagementUpdate(data);
    return res.status(200).json(responseData);
};

let delteAccountManagementDelete = async (req, res) => {
    let responseData = await dellCorpService.delteAccountManagementDelete(req.body.id);
    return res.status(200).json(responseData);
};

// CONTROLLER FOR PRODUCT --------------------------
let getProductManagement = async (req, res) => {
    let responseData = await dellCorpService.getProductManagement();
    return res.status(200).json({
        errCode: 0,
        message: "Get all product success",
        data: responseData
    });
};

module.exports = {
    dashboardDellCorp: dashboardDellCorp,
    getProductlineManagement: getProductlineManagement,
    postProductlineManagementCreate: postProductlineManagementCreate,
    putProductlineManagementUpdate: putProductlineManagementUpdate,
    delelteProductlineManagementDelete: delelteProductlineManagementDelete,
    getAccountManagement: getAccountManagement,
    postAccountManagementCreate: postAccountManagementCreate,
    putAccountManagementUpdate: putAccountManagementUpdate,
    delteAccountManagementDelete: delteAccountManagementDelete,
    getProductManagement: getProductManagement,
}