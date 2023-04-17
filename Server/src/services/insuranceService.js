import db from "../models/index";
const { Op } = require("sequelize");
import componentsService from "../services/componentsService"

let getInsuranceManagement = (_workplaceID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let products = await db.Product.findAll({
                raw: true,
                where: {
                    status: {
                        [Op.or]: [
                            "Đang sửa chữa bảo hành",
                            "Lỗi, cần trả về nhà máy",
                            "Lỗi, cần bảo hành",
                        ]
                    },
                    insuranceCenterID: _workplaceID,
                    hereRole: {
                        [Op.or]: [
                            "R3",
                            "R4",
                        ]
                    }
                },
                attributes: [
                    "id",
                    "name",
                    "productLine",
                    "status", // trạng thái
                    "bornDate", // ngày sản xuất trả về ngày tháng năm
                    "factoryID", // cơ sở sản xuất
                    "agentID", // đại lý
                    "insurancecenterID", // trung tâm bảo hành
                    "hereRole", // loại thực thể sở hữu
                    "hereID", // ID thực thể sở hữu
                ],
            });

            if (products) {
                // Add columns for display
                // factoryName: ten cơ sở sản xuất
                // agentName: tên đại lý
                // insurancecenterName: tên trung tâm bảo hành hiện tại
                // bornDateMonth: ngày sản xuất trả về tháng
                // bornDateQuarter: ngày sản xuất trả về quý
                // bornDateYear: ngày sản xuất trả về năm
                for (let index = 0; index < products.length; index++) {
                    let item = products[index];

                    // Convert bornDate
                    if (item.bornDate) {
                        item.bornDate = (new Date(item.bornDate)).toLocaleDateString();
                        let bornDate = new Date(item.bornDate);

                        const [month, year] = [
                            bornDate.getMonth(),
                            bornDate.getFullYear(),
                        ];

                        item.bornDateMonth = month + 1;
                        if (month < 4) {
                            item.bornDateQuarter = 1;
                        } else if (month < 7) {
                            item.bornDateQuarter = 2;
                        } else if (month < 10) {
                            item.bornDateQuarter = 3;
                        } else {
                            item.bornDateQuarter = 4;
                        }
                        item.bornDateYear = year;
                    }

                    item.factoryName = null;
                    item.agentName = null;
                    item.insurancecenterName = null;

                    // Convert factoryID to factoryName for each product
                    if (item.factoryID) {
                        let promiseFactory = new Promise(async (resolve, reject) => {
                            let factory = await db.Factories.findOne({
                                raw: true,
                                where: { id: item.factoryID }
                            })
                            resolve(factory.name);
                            reject(null);
                        });

                        item.factoryName = await promiseFactory;
                    }

                    // Convert agentID to agentName for each product
                    if (item.agentID) {
                        let promiseAgent = new Promise(async (resolve, reject) => {
                            let agent = await db.Agent.findOne({
                                raw: true,
                                where: { id: item.agentID }
                            })
                            resolve(agent.name);
                            reject(null);
                        });

                        item.agentName = await promiseAgent;
                    }

                    // Convert insurancecenterID to insurancecenterName for each product
                    if (item.insurancecenterID) {
                        let promiseInsuranceCenter = new Promise(async (resolve, reject) => {
                            let insuranceCenter = await db.InsuranceCenter.findOne({
                                raw: true,
                                where: { id: item.insurancecenterID }
                            })
                            resolve(insuranceCenter.name);
                            reject(null);
                        });

                        item.insurancecenterName = await promiseInsuranceCenter;
                    }

                    item.insuranceResult = "CHƯA BẢO HÀNH";
                    let insurance = await componentsService.getInsuranceByProductID(item.id);
                    if (insurance) {
                        item.insuranceResult = "ĐANG BẢO HÀNH";
                        if (insurance.result) {
                            item.insuranceResult = insurance.result;
                        }
                    }
                }
                resolve(products);
            } else {
                resolve([]);
            }

        } catch (e) {
            reject(e);
        }
    });
};

let postInsuranceManagementReceiveInsuranceAgent = (_workplaceID, _productID) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Find and valid product suitable
            let product = await db.Product.findOne({
                where: {
                    id: _productID,
                    status: "Lỗi, cần bảo hành",
                    hereRole: "R3"
                },
            });

            if (product) {
                // Find error report
                // Error report has been created by agent previously
                let errorReport = await db.ErrorReport.findOne({
                    where: {
                        productID: _productID,
                    },
                    order: [['createdAt', 'DESC']],
                })

                // Create Insurance
                await db.Insurance.create({
                    insuranceCenterID: _workplaceID,
                    productID: _productID,
                    errorReportsID: errorReport.id,
                    startDate: (new Date()).toLocaleDateString()
                });

                // Update info product
                product.status = "Đang sửa chữa bảo hành";
                product.insurancecenterID = _workplaceID;
                product.hereRole = "R4";
                product.hereID = _workplaceID;

                await product.save();

                // Resolve
                // Find error report
                let agent = await db.Agent.findOne({
                    where: {
                        id: product.agentID,
                    },
                })
                if (agent) {
                    resolve({
                        errCode: 0,
                        message: "Receive product from " + agent.name + " success"
                    });
                } else {
                    resolve({
                        errCode: 0,
                        message: "Receive product from success"
                    });
                }
            }
            else {
                // Valided in middleware
                resolve({
                    errCode: 1,
                    message: "Receive product fail, Product not exist"
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let postInsuranceManagementFinishInsurance = (_workplaceID, _productID, _endDate, _result, _description) => {
    return new Promise(async (resolve, reject) => {
        try {
            let insurance = await db.Insurance.findOne({
                where: {
                    productID: _productID,
                    insuranceCenterID: _workplaceID,
                },
                order: [['createdAt', 'DESC']],
            })

            if (insurance) {
                insurance.endDate = _endDate;
                insurance.result = _result;
                insurance.description = _description

                // if (_result == "FAILURE") {
                //     let product = await db.Product.findOne({
                //         where: {
                //             id: _productID,
                //         },
                //     })

                //     if (product) {
                //         product.status = "Lỗi, cần trả về nhà máy";
                //     }
                // }

                await insurance.save();

                resolve({
                    errCode: 0,
                    message: "Finish insurance success"
                });
            }
            else {
                resolve({
                    errCode: 1,
                    message: "Finish fail, Not found insurance valid"
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
let postInsuranceManagementSendAgent = (_workplaceID, _productID, _agentID) => {
    return new Promise(async (resolve, reject) => {
        try {

            // Find and valid product suitable
            let product = await db.Product.findOne({
                where: {
                    id: _productID,
                    status: "Đang sửa chữa bảo hành",
                    hereRole: "R4"
                },
            });


            if (product) {
                // Update info product
                product.status = "Đã bảo hành xong";
                product.insurancecenterID = _workplaceID;
                product.hereRole = "R3";
                product.hereID = _agentID;

                await product.save();

                resolve({
                    errCode: 0,
                    message: "Send product success"
                });
            }
            else {
                resolve({
                    errCode: 1,
                    message: "Send fail, Not found product valid"
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
let postInsuranceManagementReportFactory = (_workplaceID, _productID) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Find and valid product suitable
            let product = await db.Product.findOne({
                where: {
                    id: _productID,
                    status: "Đang sửa chữa bảo hành",
                    hereRole: "R4"
                },
            });

            if (product) {
                // Update info product
                product.status = "Lỗi, cần trả về nhà máy";

                await product.save();

                resolve({
                    errCode: 0,
                    message: "Report product success"
                });
            }
            else {
                resolve({
                    errCode: 1,
                    message: "Report fail, Not found product valid"
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
let postInsuranceManagementSendFactory = (_workplaceID, _productID, _factoryID) => {
    return new Promise(async (resolve, reject) => {
        try {

            // Find and valid product suitable
            let product = await db.Product.findOne({
                where: {
                    id: _productID,
                    status: "Lỗi, cần trả về nhà máy",
                    hereRole: "R4"
                },
            });


            if (product) {
                // Update info product
                product.status = "Lỗi, đã đưa về cơ sở sản xuất";
                product.insurancecenterID = _workplaceID;
                product.hereRole = "R2";
                product.hereID = _factoryID;

                await product.save();

                resolve({
                    errCode: 0,
                    message: "Send product success"
                });
            }
            else {
                resolve({
                    errCode: 1,
                    message: "Send fail, Not found product valid"
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    getInsuranceManagement: getInsuranceManagement,
    postInsuranceManagementReceiveInsuranceAgent: postInsuranceManagementReceiveInsuranceAgent,
    postInsuranceManagementFinishInsurance: postInsuranceManagementFinishInsurance,
    postInsuranceManagementSendAgent: postInsuranceManagementSendAgent,
    postInsuranceManagementReportFactory: postInsuranceManagementReportFactory,
    postInsuranceManagementSendFactory: postInsuranceManagementSendFactory,
}