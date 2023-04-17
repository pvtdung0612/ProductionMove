import db from "../models/index";
import cryptoJS from "../utils/cryptoJS"

// SERVICE FOR PRODUCTLINE ----------------------------------
let getProductlineManagement = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let productlines = await db.ProductLine.findAll({
                raw: true,
                attributes: [
                    "id",
                    "productLine",
                    "price",
                    "cpu",
                    "screen",
                    // "image",
                    "description",
                ],
            });

            // await productlines.forEach(async function (item) {
            //     let myPromise = new Promise(async (resolve, reject) => {
            //         let products = await db.Product.findAll({
            //             raw: true,
            //             where: { productLine: item.productLine }
            //         })
            //         resolve(products);
            //         reject("error");
            //     });
            //     let products = await myPromise;
            //     item.total = products.length;
            //     console.log(products.length);
            // })

            // Get total products have this productLine
            for (let index = 0; index < productlines.length; index++) {
                let item = productlines[index];

                let myPromise = new Promise(async (resolve, reject) => {
                    let products = await db.Product.findAll({
                        raw: true,
                        where: { productLine: item.productLine }
                    })
                    resolve(products);
                    reject("error");
                });

                item.total = (await myPromise).length
            }
            resolve(productlines)
        } catch (e) {
            reject(e);
        }
    });
};

let postProductlineManagementCreate = (data) => {
    return new Promise(async (resolve, reject) => {
        let responseData = {
            errCode: 1,
            message: "...",
        };
        try {
            // Create new Account
            await db.ProductLine.create({
                productLine: data.productLine,
                price: data.price,
                cpu: data.cpu,
                screen: data.screen,
                description: data.description,
            });
            responseData.errCode = 0;
            responseData.message = "Create new productline success"
        } catch (error) {
            responseData.errCode = 1;
            responseData.message = "Error",
                reject(error)
        }
        resolve(responseData)
    })
}

let putProductlineManagementUpdate = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let productline = await db.ProductLine.findOne({
                where: { id: data.id }
            });

            if (productline) {
                // Update all product have this productLine
                if (productline.productLine != data.productLine) {
                    let products = await db.Product.findAll({
                        where: { productLine: productline.productLine }
                    })

                    products.forEach(function (element) {
                        element.productLine = data.productLine;
                        element.save();
                    });

                    // products.save()
                }

                // Update this productLine
                productline.productLine = data.productLine;
                productline.price = data.price;
                productline.cpu = data.cpu;
                productline.screen = data.screen;
                productline.description = data.description;

                // save and resolve
                await productline.save();
                resolve({
                    errCode: 0,
                    message: "Update productline and all products success"
                });
            } else {
                resolve({
                    errCode: 1,
                    message: "ID's productline don't exist"
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let delelteProductlineManagementDelete = (_idProductLine) => {
    return new Promise(async (resolve, reject) => {
        try {
            let productline = await db.ProductLine.findOne({
                where: { id: _idProductLine }
            });

            if (productline) {
                // Find all products have this productline to change value is null
                let products = await db.Product.findAll({
                    where: { productLine: productline.productLine }
                })

                products.forEach(function (element) {
                    element.productLine = null;
                    element.save();
                });

                // delete this productline
                await productline.destroy()
                resolve({
                    errCode: 0,
                    message: "Delete productline and update all products success"
                });
            } else {
                resolve({
                    errCode: 1,
                    message: "ID's productline don't exist"
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

// SERVICE FOR ACCOUNT  ----------------------------------
let getAccountManagement = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let accounts = await db.Account.findAll({
                raw: true,
                attributes: [
                    "id",
                    "username",
                    "password",
                    "roleKey",
                    "workplaceID",
                    "image",
                ],
            });

            accounts.forEach(function (element) {
                element.password = cryptoJS.decrypt(element.password);
            });

            for (let index = 0; index < accounts.length; index++) {
                let item = accounts[index];

                item.workplaceName = null;

                // Convert workplaceName to workplaceName for each account
                if (item.workplaceID) {
                    // Account work in DellCorp: R1
                    if (item.roleKey === "R1") {
                        item.workplaceName = "DellCorp";
                    }

                    // Account work in Factory: R2
                    if (item.roleKey === "R2") {
                        let promiseFactory = new Promise(async (resolve, reject) => {
                            let factory = await db.Factories.findOne({
                                raw: true,
                                where: { id: item.workplaceID }
                            })
                            resolve(factory.name);
                            reject(null);
                        });

                        item.workplaceName = await promiseFactory;
                    }

                    // Account work in Agent: R3
                    if (item.roleKey === "R3") {
                        let promiseAgent = new Promise(async (resolve, reject) => {
                            let agent = await db.Agent.findOne({
                                raw: true,
                                where: { id: item.workplaceID }
                            })
                            resolve(agent.name);
                            reject(null);
                        });

                        item.workplaceName = await promiseAgent;
                    }

                    // Account work in InsuranceCenter: R4
                    if (item.roleKey === "R4") {
                        let promiseInsuranceCenter = new Promise(async (resolve, reject) => {
                            let insuranceCenter = await db.InsuranceCenter.findOne({
                                raw: true,
                                where: { id: item.workplaceID }
                            })
                            resolve(insuranceCenter.name);
                            reject(null);
                        });

                        item.workplaceName = await promiseInsuranceCenter;
                    }
                }
            }

            resolve(accounts);
        } catch (e) {
            reject(e);
        }
    });
};

let postAccountManagementCreate = (data) => {
    return new Promise(async (resolve, reject) => {
        let responseData = {
            errCode: 1,
            message: "...",
        };
        try {
            // Create new Account
            await db.Account.create({
                username: data.username,
                password: cryptoJS.encrypt(data.password),
                roleKey: data.roleKey,
                workplaceID: data.workplaceID,
                image: data.image,
            });
            responseData.errCode = 0;
            responseData.message = "Create new account success"
        } catch (error) {
            responseData.errCode = 1;
            responseData.message = "Error",
                reject(error)
        }
        resolve(responseData)
    })
}

let delteAccountManagementDelete = (_idAccount) => {
    return new Promise(async (resolve, reject) => {
        try {
            let account = await db.Account.findOne({
                where: { id: _idAccount }
            });

            if (account) {
                await account.destroy()
                resolve({
                    errCode: 0,
                    message: "Delete account success"
                });
            } else {
                resolve({
                    errCode: 1,
                    message: "ID's account don't exist"
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let putAccountManagementUpdate = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let account = await db.Account.findOne({
                where: { id: data.id }
            });

            if (account) {
                account.username = data.username;
                account.password = cryptoJS.encrypt(data.password);
                account.roleKey = data.roleKey;
                account.workplaceID = data.workplaceID;
                account.image = data.image;

                await account.save();
                resolve({
                    errCode: 0,
                    message: "Edit account success"
                });
            } else {
                resolve({
                    errCode: 1,
                    message: "ID's account don't exist"
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

// SERVICE FOR PRODUCT  ----------------------------------
let getProductManagement = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let products = await db.Product.findAll({
                raw: true,
                attributes: [
                    "id",
                    "name",
                    "productLine",
                    "status", // trạng thái
                    "bornDate", // ngày sản xuất
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


module.exports = {
    getProductlineManagement: getProductlineManagement,
    postProductlineManagementCreate: postProductlineManagementCreate,
    putProductlineManagementUpdate: putProductlineManagementUpdate,
    delelteProductlineManagementDelete: delelteProductlineManagementDelete,
    getAccountManagement: getAccountManagement,
    postAccountManagementCreate: postAccountManagementCreate,
    delteAccountManagementDelete: delteAccountManagementDelete,
    putAccountManagementUpdate: putAccountManagementUpdate,
    getProductManagement: getProductManagement,
};