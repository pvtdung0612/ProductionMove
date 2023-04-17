import db from "../models/index";
const { Op } = require("sequelize");
import componentsService from "../services/componentsService"

let getProductManagement = (_agentID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let products = await db.Product.findAll({
                raw: true,
                where: {
                    agentID: _agentID,
                    status: {
                        [Op.or]: [
                            "Đưa về đại lý",
                            "Đã bán",
                            "Lỗi cần triệu hồi",
                            "Hết thời gian bảo hành",
                            "Trả lại cơ sở sản xuất",
                            "Đã trả lại bảo hành cho khách hàng",]
                    },
                    hereRole: {
                        [Op.or]: [
                            "R3",
                            "R5",]
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

let getProductManagementEnterFromFactoryGetProduct = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let products = await db.Product.findAll({
                raw: true,
                where: {
                    status: "Mới sản xuất",
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

            // // Add columns for display
            // // factoryName: ten cơ sở sản xuất
            // // agentName: tên đại lý
            // // insurancecenterName: tên trung tâm bảo hành hiện tại
            // // bornDateMonth: ngày sản xuất trả về tháng
            // // bornDateQuarter: ngày sản xuất trả về quý
            // // bornDateYear: ngày sản xuất trả về năm
            // for (let index = 0; index < products.length; index++) {
            //     let item = products[index];

            //     // Convert bornDate
            //     if (item.bornDate) {
            //         item.bornDate = (new Date(item.bornDate)).toLocaleDateString();
            //         let bornDate = new Date(item.bornDate);

            //         const [month, year] = [
            //             bornDate.getMonth(),
            //             bornDate.getFullYear(),
            //         ];

            //         item.bornDateMonth = month + 1;
            //         if (month < 4) {
            //             item.bornDateQuarter = 1;
            //         } else if (month < 7) {
            //             item.bornDateQuarter = 2;
            //         } else if (month < 10) {
            //             item.bornDateQuarter = 3;
            //         } else {
            //             item.bornDateQuarter = 4;
            //         }
            //         item.bornDateYear = year;
            //     }

            //     item.factoryName = null;
            //     item.agentName = null;
            //     item.insurancecenterName = null;

            //     // Convert factoryID to factoryName for each product
            //     if (item.factoryID) {
            //         let promiseFactory = new Promise(async (resolve, reject) => {
            //             let factory = await db.Factories.findOne({
            //                 raw: true,
            //                 where: { id: item.factoryID }
            //             })
            //             resolve(factory.name);
            //             reject(null);
            //         });

            //         item.factoryName = await promiseFactory;
            //     }

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

            //     // Convert insurancecenterID to insurancecenterName for each product
            //     if (item.insurancecenterID) {
            //         let promiseInsuranceCenter = new Promise(async (resolve, reject) => {
            //             let insuranceCenter = await db.InsuranceCenter.findOne({
            //                 raw: true,
            //                 where: { id: item.insurancecenterID }
            //             })
            //             resolve(insuranceCenter.name);
            //             reject(null);
            //         });

            //         item.insurancecenterName = await promiseInsuranceCenter;
            //     }
            // }

            resolve(products);
        } catch (e) {
            reject(e);
        }
    });
};

let postProductManagementEnterFromFactory = (_workplaceID, products) => {
    return new Promise(async (resolve, reject) => {
        try {
            let countProductValid = 0;
            for (let index = 0; index < products.length; index++) {
                const element = products[index];

                let product = await db.Product.findOne({
                    where: {
                        id: element.id,
                        status: "Mới sản xuất",
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
                if (product) {
                    countProductValid++;

                    product.status = "Đưa về đại lý";
                    product.agentID = _workplaceID;
                    product.hereRole = "R3";
                    product.hereID = _workplaceID;

                    await product.save()
                }
            }

            if (countProductValid == 0) {
                resolve({
                    errCode: 1,
                    message: "Have no product valid"
                });
            } else {
                resolve({
                    errCode: 0,
                    message: "Enter product from factory success",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};


let getProductManagementSellForCustomerGetCustomer = () => {
    return new Promise(async (resolve, reject) => {
        try {
            // This service for Sell For Customer
            let customers = await db.Customer.findAll({
                raw: true,
            });

            resolve(customers);
        } catch (e) {
            reject(e);
        }
    });
};
let postProductManagementSellForCustomer = (_workplaceID, _productID, _customerID) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Find and valid suitable product
            let product = await db.Product.findOne({
                where: {
                    id: _productID,
                    status: "Đưa về đại lý",
                },
            });

            if (product) {
                // Update info product
                product.status = "Đã bán";
                product.hereRole = "R5";
                product.hereID = _customerID;

                await product.save();

                // Create info Sold
                let sellDate = new Date();
                await db.Sell.create({
                    customerID: _customerID,
                    productID: _productID,
                    sellDate: (sellDate).toLocaleDateString(),
                    agentID: _workplaceID,
                    insuranceTermEndDate: (new Date(sellDate.setMonth(sellDate.getMonth() + 6))).toLocaleDateString()
                });

                // Resolve
                resolve({
                    errCode: 0,
                    message: "Sell product success"
                });
            }
            else {
                resolve({
                    errCode: 1,
                    message: "Product is not for sale"
                });
            }
        } catch (e) {
            reject(e);
        }
    });
}

let postProductManagementReportError = (_workplaceID, _productID) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Find and valid suitable product
            let product = await db.Product.findOne({
                where: {
                    id: _productID,
                    status: {
                        [Op.or]: [
                            "Đã bán",
                            "Đã trả lại bảo hành cho khách hàng",
                            "Lỗi cần triệu hồi",]
                    },
                },
            });

            if (product) {
                // Update info product
                product.status = "Lỗi cần triệu hồi";

                await product.save();

                // resolves
                resolve({
                    errCode: 0,
                    message: "Report error product success"
                });
            }
            else {
                resolve({
                    errCode: 1,
                    message: "Can't report product, product must sold previously"
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
let postProductManagementReportErrorSendMail = (_workplaceID, _productID, _descriptionError) => {
    return new Promise(async (resolve, reject) => {
        try {
            let subjectMail = "Báo lỗi sản phẩm";
            let textMail = null;
            let htmlMail = null;

            // Get info agent, product, customer for content mail
            let agent = await db.Agent.findOne({
                raw: true,
                where: { id: _workplaceID }
            })

            let product = await db.Product.findOne({
                raw: true,
                where: { id: _productID }
            })

            let customer = await componentsService.getCustomerBySoldProductID(_productID);

            let sell = await db.Sell.findOne({
                where: {
                    customerID: customer.id,
                    productID: product.id
                }
            })

            // Create content mail
            htmlMail = `
            <div>
                <h2>` + agent.name.trim() + ` xin thông báo<h2><br/>
                <div>Chúng tôi đã phát hiện lỗi sản phẩm. Mong quý khách hàng đến đại lý của chúng tôi bảo hành để được sử dụng sản phẩm trong trình trạng tốt nhất. Cảm ơn quý khách!<div>
                <div>
                    Sản phẩm: ` + product.name.trim() + `<br/>
                    Mô tả lỗi: ` + _descriptionError.trim() + `<br/>
                    Ngày mua sản phẩm: ` + (new Date(sell.sellDate)).toLocaleDateString() + `<br/>
                    Hạn bảo hành: ` + (new Date(sell.insuranceTermEndDate)).toLocaleDateString() + `<br/>
                <div>
            <div>
            `;

            // Send notify mail for customer
            let successSendMail = await componentsService.sendMail([customer.email], subjectMail, textMail, htmlMail)
            if (successSendMail) {
                resolve({
                    errCode: 0,
                    message: "Send mail success"
                })
            } else {
                resolve({
                    errCode: 1,
                    message: "Send mail fail"
                })
            }
        } catch (e) {
            reject(e);
        }
    });
};

let postProductManagementGetInsurance = (_workplaceID, _productID, _descriptionInsurance) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Find and valid product suitable
            let product = await db.Product.findOne({
                where: {
                    id: _productID,
                    status: {
                        [Op.or]: [
                            "Đã bán",
                            "Đã trả lại bảo hành cho khách hàng",
                            "Lỗi cần triệu hồi",]
                    },
                },
            });

            if (product) {
                // Update info product
                product.status = "Lỗi, cần bảo hành";
                product.agentID = _workplaceID;
                product.hereRole = "R3";
                product.hereID = _workplaceID;

                await product.save();

                // Create error report
                await db.ErrorReport.create({
                    customerID: product.hereID,
                    productID: product.id,
                    description: _descriptionInsurance,
                });

                // Get numbers time insuranced
                let insurances = await db.Insurance.findAll({
                    where: {
                        productID: _productID,
                        result: "SUCCESS",
                    },
                });

                let insuranceTime = 0;
                if (insurances) {
                    insuranceTime = insurances.length
                }

                // Resolve
                resolve({
                    errCode: 0,
                    message: "Received a product that needs insurance for " + insuranceTime + " time success"
                });
            }
            else {
                resolve({
                    errCode: 1,
                    message: "Can't Received the product"
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let getInsuranceManagement = (_agentID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let products = await db.Product.findAll({
                raw: true,
                where: {
                    agentID: _agentID,
                    status: {
                        [Op.or]: [
                            "Lỗi, cần bảo hành",
                            "Đã bảo hành xong",
                            "Đang sửa chữa bảo hành",
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

let postInsuranceManagementSendInsuranceCenter = (_workplaceID, _productID, _insurancecenterID) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Find and valid product suitable
            let product = await db.Product.findOne({
                where: {
                    id: _productID,
                    status: "Lỗi, cần bảo hành",
                },
            });

            if (product) {
                // Find error report
                let errorReport = await db.ErrorReport.findOne({
                    where: {
                        productID: _productID,
                    },
                    order: [['createdAt', 'DESC']],
                })

                // Create Insurance
                await db.Insurance.create({
                    insuranceCenterID: _insurancecenterID,
                    productID: _productID,
                    errorReportsID: errorReport.id,
                    startDate: (new Date()).toLocaleDateString()
                });

                // Update info product
                product.status = "Đang sửa chữa bảo hành";
                product.agentID = _workplaceID;
                product.hereRole = "R4";
                product.hereID = _insurancecenterID;

                await product.save();

                // Resolve
                // Find error report
                let insuranceCenter = await db.InsuranceCenter.findOne({
                    where: {
                        id: _insurancecenterID,
                    },
                })
                resolve({
                    errCode: 0,
                    message: "Send to " + insuranceCenter.name + " success"
                });
            }
            else {
                resolve({
                    errCode: 1,
                    message: "Send insurance fail, Product not exist"
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let getInsuranceManagementSendInsuranceCenterGetAllInsuranceCenter = () => {
    return new Promise(async (resolve, reject) => {
        try {
            // This service for Sell For Customer
            let insuranceCenters = await db.InsuranceCenter.findAll({
                raw: true,
            });

            resolve(insuranceCenters);
        } catch (e) {
            reject(e);
        }
    });
};

let postInsuranceManagementReceiveInsuranceSuccess = (_workplaceID, _productID) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Find and valid product suitable
            let product = await db.Product.findOne({
                where: {
                    id: _productID,
                    status: "Đang sửa chữa bảo hành",
                },
            });

            if (product) {
                // Find insurance for find insuranceCenterID
                let insurance = await db.Insurance.findOne({
                    where: {
                        productID: _productID,
                    },
                    order: [['createdAt', 'DESC']],
                })

                let insuranceCenter = await db.InsuranceCenter.findOne({
                    where: {
                        id: insurance.insuranceCenterID,
                    },
                })

                // Update info product
                product.status = "Đã bảo hành xong";
                product.agentID = _workplaceID;
                product.insurancecenterID = insurance.insuranceCenterID;
                product.hereRole = "R3";
                product.hereID = _workplaceID;

                await product.save();

                resolve({
                    errCode: 0,
                    message: "Receive insurance product from " + insuranceCenter.name + " is success"
                });
            }
            else {
                resolve({
                    errCode: 1,
                    message: "Receive insurance fail, The Product must be under warranty before Receive",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
let postInsuranceManagementSendInsuranceSuccessCustomer = (_workplaceID, _productID) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Find and valid product suitable
            let product = await db.Product.findOne({
                where: {
                    id: _productID,
                    status: "Đã bảo hành xong",
                    hereRole: "R3",
                    hereID: _workplaceID,
                },
            });

            if (product) {
                // Find insurance for find insuranceCenterID
                let sell = await db.Sell.findOne({
                    where: {
                        productID: _productID,
                    },
                })

                // Update info product
                product.status = "Đã trả lại bảo hành cho khách hàng";
                product.agentID = _workplaceID;
                product.hereRole = "R5";
                product.hereID = sell.customerID;

                await product.save();

                resolve({
                    errCode: 0,
                    message: "Send back product for customer success"
                });
            }
            else {
                resolve({
                    errCode: 1,
                    message: "Send back product fail, Agent not manage this product",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
let postInsuranceManagementSendInsuranceFailFactory = (_workplaceID, _productID) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Find and valid product suitable
            let product = await db.Product.findOne({
                where: {
                    id: _productID,
                    status: "Đã bảo hành xong",
                    hereRole: "R3",
                    hereID: _workplaceID,
                },
            });

            if (product) {
                // Update info product
                product.status = "Lỗi, đã đưa về cơ sở sản xuất";
                product.agentID = _workplaceID;
                product.hereRole = "R2";
                product.hereID = product.factoryID;

                await product.save();

                resolve({
                    errCode: 0,
                    message: "Send fail product for factory is success"
                });
            }
            else {
                resolve({
                    errCode: 1,
                    message: "Send product for factory fail, Product is invalid",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
let postInsuranceManagementSendInsuranceFailFactorySendMail = (_workplaceID, _productID, _descriptionError) => {
    return new Promise(async (resolve, reject) => {
        try {
            let responseData = {};
            let subjectMail = "Báo lỗi sản phẩm";
            let textMail = null;
            let htmlMail = null;

            // Get info agent, product, customer for content mail
            let agent = await db.Agent.findOne({
                where: { id: _workplaceID }
            })

            let product = await db.Product.findOne({
                where: { id: _productID }
            })

            let customer = await componentsService.getCustomerBySoldProductID(_productID);

            let sell = await db.Sell.findOne({
                where: {
                    customerID: customer.id,
                    productID: product.id
                }
            })

            // Create content mail
            htmlMail = `
            <div>
                <h2>` + agent.name.trim() + ` xin thông báo<h2><br>
                <div>
                    Chúng tôi đã phát hiện lỗi sản phẩm, sản phẩm đã hỏng nặng vì vậy chúng tôi đã thu hồi sản phẩm về cơ sỏ sản xuất.
                    Mong quý khách hàng thông cảm và đến đại lý của chúng tôi để được thay thế bằng sản phẩm khác
                    . Cảm ơn quý khách!
                <div>
                <br/>
                <div>
                    Sản phẩm: ` + product.name.trim() + `<br/>
                    Mô tả lỗi: ` + _descriptionError.trim() + `<br/>
                    Ngày mua sản phẩm: ` + (new Date(sell.sellDate)).toLocaleDateString() + `<br/>
                <div>
            <div>
            `;

            // Send notify mail for customer
            let successSendMail = await componentsService.sendMail([customer.email], subjectMail, textMail, htmlMail)
            if (successSendMail) {
                resolve({
                    errCode: 0,
                    message: "Send mail success"
                })
            } else {
                resolve({
                    errCode: 1,
                    message: "Send mail fail"
                })
            }
        } catch (e) {
            reject(e);
        }
    });
};

let getCustomerManagement = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let customers = await db.Customer.findAll({
                raw: true,
            });

            if (customers) {
                resolve(customers);
            } else {
                resolve([]);
            }
        } catch (e) {
            reject(e);
        }
    });
};

let postCustomerManagementCreate = (_name, _sdt, _email, _address) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Customer.create({
                name: _name,
                sdt: _sdt,
                email: _email,
                address: _address,
            });


            resolve({
                errCode: 0,
                message: "Create new customer success"
            });
        } catch (e) {
            reject(e);
        }
    });
};

let postCustomerManagementDelete = (_customerID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let customer = await db.Customer.findOne({
                where: { id: _customerID }
            });
            if (customer) {
                await customer.destroy()

                resolve({
                    errCode: 0,
                    message: "Delete customer success"
                });
            } else {
                resolve({
                    errCode: 1,
                    message: "Customer ID not exist"
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
let postCustomerManagementUpdate = (_customerID, _name, _sdt, _email, _address) => {
    return new Promise(async (resolve, reject) => {
        try {
            let customer = await db.Customer.findOne({
                where: { id: _customerID }
            });

            if (customer) {
                customer.name = _name;
                customer.sdt = _sdt;
                customer.email = _email;
                customer.address = _address;

                await customer.save();

                resolve({
                    errCode: 0,
                    message: "Update customer success"
                });
            } else {
                resolve({
                    errCode: 1,
                    message: "Customer ID not exist"
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let getGetSell = (_agentID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let sellByAgent = [];
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
                            agentID: _agentID
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

                        sellByAgent.push(item);
                    }
                }
                resolve(sellByAgent);
            } else {
                resolve([]);
            }

        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
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