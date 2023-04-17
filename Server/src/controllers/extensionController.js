import extensionService from "../services/extensionService";

let postGetAllAgent = async (req, res) => {
    let responseData = await extensionService.postGetAllAgent();
    return res.status(200).json({
        errCode: 0,
        message: "Get all agent success",
        data: responseData
    });
}

let postGetAllProductLine = async (req, res) => {
    let responseData = await extensionService.postGetAllProductLine();
    return res.status(200).json({
        errCode: 0,
        message: "Get all product line success",
        data: responseData
    });
}

module.exports = {
    postGetAllAgent: postGetAllAgent,
    postGetAllProductLine: postGetAllProductLine,
}