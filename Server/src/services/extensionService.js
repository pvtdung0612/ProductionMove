import db from "../models/index";

let postGetAllAgent = () => {
    return new Promise(async (resolve, reject) => {
        try {
            // Get info all agent
            let agents = await db.Agent.findAll({
                raw: true,
            });
            resolve(agents);
        } catch (e) {
            reject(e);
        }
    });
};

let postGetAllProductLine = () => {
    return new Promise(async (resolve, reject) => {
        try {
            // Get info all productline
            let productlines = await db.ProductLine.findAll({
                raw: true,
                attributes: [
                    "id",
                    "productLine",
                ],
            });
            resolve(productlines);
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    postGetAllAgent: postGetAllAgent,
    postGetAllProductLine: postGetAllProductLine,
}