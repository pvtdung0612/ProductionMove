const { Op } = require("sequelize");
import db from "../models/index";
import componentsService from "../services/componentsService"

// SERVICE FOR PRODUCT  ----------------------------------
let getProductManagement = (_factoryID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let products = await db.Product.findAll({
                raw: true,
                where: {
                    // status: "Mới sản xuất",
                    hereRole: "R2",
                    hereID: _factoryID,
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
            }

            resolve(products);
        } catch (e) {
            reject(e);
        }
    });
};

let postProductManagementDelete = (_workplaceID, _productID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let product = await db.Product.findOne({
                where: {
                    id: _productID,
                    status: {
                        [Op.or]: [
                            "Mới sản xuất",
                            "Lỗi, đã đưa về cơ sở sản xuất",
                        ]
                    },
                    hereRole: "R2",
                }
            })
            if (product) {
                await product.destroy()

                resolve({
                    errCode: 0,
                    message: "Delete product success"
                });
            } else {
                resolve({
                    errCode: 0,
                    message: "Delete product fail, ID's product is exist"
                });
            }

        } catch (e) {
            reject(e);
        }
    });
};

let postProductManagementEnterBatches = (_workplaceID, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // data.quantity: số lượng sản phẩm trong lô
            if (data.quantity && data.quantity > 0 && _workplaceID) {
                let productline = await db.ProductLine.findOne({
                    raw: true,
                    where: {
                        id: data.productlineID,
                    },
                    attributes: [
                        "productLine",
                    ],
                });

                for (let index = 0; index < data.quantity; index++) {
                    await db.Product.create({
                        name: data.name, // Tên sản phẩm
                        productLine: productline.productLine, // tên dòng sản phẩm
                        bornDate: (new Date(data.bornDate)).toLocaleDateString(), // Ngày sản xuất
                        status: "Mới sản xuất",
                        factoryID: _workplaceID,
                        agentID: null,
                        insurancecenterID: null,
                        hereRole: "R2",
                        hereID: _workplaceID,
                    });
                }

                resolve([]);
            }
        } catch (e) {
            reject(e);
        }
    });
};

let postProductManagementExportToAgent = (_productID, _agentID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let product = await db.Product.findOne({
                // raw: true,
                where: {
                    id: _productID,
                },
                // attributes: [
                //     "id",
                //     "name",
                //     "productLine",
                //     "status", // trạng thái
                //     "bornDate", // ngày sản xuất trả về ngày tháng năm
                //     "factoryID", // cơ sở sản xuất
                //     "agentID", // đại lý
                //     "insurancecenterID", // trung tâm bảo hành
                //     "hereRole", // loại thực thể sở hữu
                //     "hereID", // ID thực thể sở hữu
                // ],
            });

            // Update product
            product.agentID = _agentID;
            product.status = "Đưa về đại lý";
            product.hereRole = "R3";
            product.hereID = _agentID;

            await product.save();

            resolve([]);
        } catch (e) {
            reject(e);
        }
    });
};

let getReceiveDefectiveProduct = (_factoryID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let products = await db.Product.findAll({
                raw: true,
                where: {
                    factoryID: _factoryID,
                    hereRole: "R4",
                    status: "Lỗi, cần trả về nhà máy",
                },
                attributes: [
                    "id",
                    "name",
                    "productLine",
                    "status", // trạng thái
                    "bornDate", // ngày sản xuất trả về ngày tháng năm
                    "insurancecenterID", // trung tâm bảo hành
                    "hereRole", // loại thực thể sở hữu
                    "hereID", // ID thực thể sở hữu
                ],
            });

            // Add columns for display
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
            }

            resolve(products);
        } catch (e) {
            reject(e);
        }
    });
};

let postReceiveDefectiveProductReceiveProduct = (_factoryID, _productID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let product = await db.Product.findOne({
                // raw: true,
                where: {
                    id: _productID,
                    factoryID: _factoryID,
                    hereRole: "R4",
                    status: "Lỗi, cần trả về nhà máy",
                },
                // attributes: [
                //     "id",
                //     "name",
                //     "productLine",
                //     "status", // trạng thái
                //     "bornDate", // ngày sản xuất trả về ngày tháng năm
                //     "insurancecenterID", // trung tâm bảo hành
                //     "hereRole", // loại thực thể sở hữu
                //     "hereID", // ID thực thể sở hữu
                // ],
            });
            if (product) {

                product.factoryID = _factoryID;
                product.hereRole = "R2";
                product.hereID = _factoryID;
                product.status = "Lỗi, đã đưa về cơ sở sản xuất";

                await product.save();
            }

            resolve([]);
        } catch (e) {
            reject(e);
        }
    });
};

let getSellManagement = (_factoryID) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Get all product of factory
            let products = await db.Product.findAll({
                raw: true,
                where: {
                    hereRole: "R5",
                    factoryID: _factoryID
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

            // // Add columns for get info
            // // agentName: tên đại lý
            // for (let index = 0; index < products.length; index++) {
            //     let item = products[index];

            //     item.agentName = null;

            //     // Convert agentID to agentName for each product
            //     if (item.agentID) {
            //         let promiseAgent = new Promise(async (resolve, reject) => {
            //             let agent = await db.Agent.findOne({
            //                 raw: true,
            //                 where: { id: item.agentID }
            //             })
            //             resolve(agent.name);
            //             reject(null);
            //         });

            //         item.agentName = await promiseAgent;
            //     }
            // }

            // Get all sell of dellcorp
            let sells = await db.Sell.findAll({
                raw: true,
            });

            // Add columns for get info
            // agentName: tên đại lý
            for (let index = 0; index < sells.length; index++) {
                let item = sells[index];

                item.agentName = null;

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
            }

            // Get all sell of factory
            let sellsOfFactory = [];

            for (let index = 0; index < products.length; index++) {
                let item = products[index];

                sells.forEach(element => {
                    if (element.productID == item.id) {
                        sellsOfFactory.push(element);
                    }
                });
            }

            // Add columns for display
            // productName: ten sản phẩm đã bán
            // agentName: tên đại lý đã bán
            // sellDateMonth: ngày bán trả về tháng
            // sellDateQuarter: ngày bán trả về quý
            // sellDateYear: ngày bán trả về năm
            for (let index = 0; index < sellsOfFactory.length; index++) {
                let item = sellsOfFactory[index];

                // Convert productID to productName
                item.productName = products[index].name;

                // Convert sellDate
                if (item.sellDate) {
                    item.sellDateMonth;
                    item.sellDateQuarter;
                    item.sellDateYear;

                    item.sellDate = (new Date(item.sellDate)).toLocaleDateString();
                    let sellDate = new Date(item.sellDate);

                    const [month, year] = [
                        sellDate.getMonth(),
                        sellDate.getFullYear(),
                    ];

                    item.sellDateMonth = month + 1;
                    if (month < 4) {
                        item.sellDateQuarter = 1;
                    } else if (month < 7) {
                        item.sellDateQuarter = 2;
                    } else if (month < 10) {
                        item.sellDateQuarter = 3;
                    } else {
                        item.sellDateQuarter = 4;
                    }
                    item.sellDateYear = year;
                }
            }

            resolve(sellsOfFactory);
        } catch (e) {
            reject(e);
        }
    });
};
let getGetSell = (_factoryID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let sellByFactory = [];
            // Get all sell of dellcorp
            let sells = await db.Sell.findAll({
                raw: true,
            });

            if (sells) {
                // Add columns for get info
                for (let index = 0; index < sells.length; index++) {
                    let item = sells[index];

                    let product = await db.Product.findOne({
                        raw: true,
                        where: {
                            id: item.productID,
                            factoryID: _factoryID
                        },
                    });

                    // Add columns for responseData info
                    if (product) {
                        let customer = await db.Customer.findOne({
                            raw: true,
                            where: {
                                id: item.customerID,
                            },
                        });
                        let agent = await db.Agent.findOne({
                            where: { id: product.agentID }
                        })
                        let insuranceCenter = await db.InsuranceCenter.findOne({
                            where: { id: product.insurancecenterID }
                        })
                        item.productName = product.name;
                        item.productLine = product.productLine;
                        item.productStatus = product.status;
                        item.customerName = customer.name;
                        item.agentName = agent.name;

                        if (insuranceCenter) {
                            item.insuranceCenterName = insuranceCenter.name;
                        } else {
                            item.insuranceCenterName = null;
                        }

                        sellByFactory.push(item);
                    }
                }
                resolve(sellByFactory);
            } else {
                resolve([]);
            }

        } catch (e) {
            reject(e);
        }
    });
};

let getErrorManagement = (_factoryID) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Get all product of factory
            let products = await db.Product.findAll({
                raw: true,
                where: {
                    factoryID: _factoryID,
                    status: {
                        [Op.or]: [
                            "Lỗi, đã đưa về cơ sở sản xuất",
                            "Lỗi, cần bảo hành",
                            "Đã bảo hành xong",
                            "Trả lại cơ sở sản xuất",
                            "Đã trả lại bảo hành cho khách hàng",
                            "Lỗi cần triệu hồi",
                            "Lỗi, đã đưa về cơ sở sản xuất",
                            "Đang sửa chữa bảo hành",
                            "Lỗi, cần trả về nhà máy",
                        ]
                    },
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

            // Get all error report of dellcorp
            let errorreports = await db.ErrorReport.findAll({
                raw: true,
            });

            // Get all sell of factory
            let errorreportsOfFactory = [];

            for (let index = 0; index < products.length; index++) {
                let item = products[index];

                for (let index = 0; index < errorreports.length; index++) {
                    const element = errorreports[index];

                    if (element.productID == item.id) {
                        let elementAddColumns = { ...element };
                        elementAddColumns.productName = item.name;
                        elementAddColumns.productStatus = item.status;
                        elementAddColumns.productLine = item.productLine;
                        elementAddColumns.factoryName = await componentsService.getFactoryNameByID(item.factoryID);
                        elementAddColumns.agentName = await componentsService.getAgentNameByID(item.agentID);
                        elementAddColumns.insurancecenterName = await componentsService.getInsuranceCenterNameByID(item.insurancecenterID);
                        errorreportsOfFactory.push(elementAddColumns);
                    }
                }
            }

            resolve(errorreportsOfFactory);
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
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