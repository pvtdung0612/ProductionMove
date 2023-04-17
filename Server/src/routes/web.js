import express from "express";
import routeMiddleware from "../middlewares/routeMiddleware";
import accountMiddleware from "../middlewares/accountMiddleware"
import dellCorpMinddleware from "../middlewares/dellCorpMinddleware";
import factoryMiddleware from "../middlewares/factoryMiddleware";
import agentMiddleware from "../middlewares/agentMiddleware"
import insuranceMiddleware from "../middlewares/insuranceMiddleware"
import homeController from "../controllers/homeController";
import accountController from "../controllers/accountController";
import dellCorpController from "../controllers/dellCorpController";
import factoryController from "../controllers/factoryController";
import agentController from "../controllers/agentController";
import insuranceController from "../controllers/insuranceController";
import extensionController from "../controllers/extensionController"

let router = express.Router();

// // Test Middle ware with route to understand middleware next() and next('route'): must be have two method get to use next('route')
// // handler for the /user/:id path, which renders a special page
// router.get('/user/:id', function (req, res, next) {
//   console.log('special 1')
//   next('route')
//   res.send('special')
// }, function (req, res, next) {
//   console.log('special 2')
//   // res.send('special')
// })

// // a middleware sub-stack that handles GET requests to the /user/:id path
// router.get('/user/:id', function (req, res, next) {
//   console.log('regular 1')
//   // if the user ID is 0, skip to the next routernext('route')
//   next('route')
//   // otherwise pass control to the next middleware function in this stack
// }, function (req, res, next) {
//   console.log('regular 2')
//   // render a regular page
//   res.send('regular')
// })

// router.get('/user/:id', function (req, res, next) {
//   console.log('special 1')
//   next('route')
// }, function (req, res, next) {
//   console.log('special 2')
//   res.send('special')
// })


let initWebRoute = (app) => {
  // API for TEST BACKEND
  router.get("/", homeController.getHomePage);
  router.get("/test-crypto", homeController.getTestCrypto);
  router.get("/test-axios-get", homeController.getTestAxiosGet);
  router.get("/about", homeController.getAboutPage);

  router.get("/crud-account", homeController.getCRUDAccount);

  router.post("/post-crud-account", homeController.postCRUDAccount);
  router.get("/get-crud-account", homeController.displayGetCRUDAccount);

  router.get("/edit-crud-account", homeController.getEditCRUDAccount);
  router.post("/put-crud-account", homeController.putCRUDAccount);

  router.get("/delete-crud-account", homeController.getDeleteCRUDAccount);

  // API for LOGIN
  router.post("/api/login", accountMiddleware.validAccountLogin, accountController.handleLogin);
  router.get("/api/logout", accountMiddleware.validAccountLogout, accountController.handleLogout);

  // API for extension
  router.get("/api/extension/get-all-agent", extensionController.postGetAllAgent);
  router.get("/api/extension/get-all-productline", extensionController.postGetAllProductLine);

  // API for account DELL CORP
  router.get("/api/dell-corp", dellCorpMinddleware.validDellCorpSession, dellCorpController.dashboardDellCorp);
  router.get("/api/dell-corp/productline-management", dellCorpMinddleware.validDellCorpSession, dellCorpController.getProductlineManagement);
  router.post("/api/dell-corp/productline-management/create", dellCorpMinddleware.validDellCorpSession, dellCorpMinddleware.validProductLineManagementCreate, dellCorpController.postProductlineManagementCreate);
  router.post("/api/dell-corp/productline-management/update", dellCorpMinddleware.validDellCorpSession, dellCorpMinddleware.validProductLineManagementUpdate, dellCorpController.putProductlineManagementUpdate);
  router.post("/api/dell-corp/productline-management/delete", dellCorpMinddleware.validDellCorpSession, dellCorpMinddleware.validProductLineManagementDelete, dellCorpController.delelteProductlineManagementDelete);

  router.get("/api/dell-corp/account-management", dellCorpMinddleware.validDellCorpSession, dellCorpController.getAccountManagement);
  router.post("/api/dell-corp/account-management/create", dellCorpMinddleware.validDellCorpSession, accountMiddleware.validAccountLogin, dellCorpMinddleware.validAccountManagementCreate, dellCorpController.postAccountManagementCreate);
  router.post("/api/dell-corp/account-management/delete", dellCorpMinddleware.validDellCorpSession, dellCorpMinddleware.validAccountManagementDelete, dellCorpController.delteAccountManagementDelete);
  router.post("/api/dell-corp/account-management/update", dellCorpMinddleware.validDellCorpSession, accountMiddleware.validAccountLogin, dellCorpMinddleware.validAccountManagementUpdate, dellCorpController.putAccountManagementUpdate);

  router.get("/api/dell-corp/product-management", dellCorpMinddleware.validDellCorpSession, dellCorpController.getProductManagement);

  // API for account FACTORY
  router.get("/api/factory", factoryMiddleware.validFactorySession, factoryController.dashboardFactory);
  router.get("/api/factory/product-management", factoryMiddleware.validFactorySession, factoryController.getProductManagement);
  router.post("/api/factory/product-management/delete", factoryMiddleware.validFactorySession, factoryMiddleware.validProductManagementDelete, factoryController.postProductManagementDelete);
  router.post("/api/factory/product-management/enter-batches", factoryMiddleware.validFactorySession, factoryMiddleware.validEnterBatches, factoryController.postProductManagementEnterBatches);
  router.post("/api/factory/product-management/export-to-agent", factoryMiddleware.validFactorySession, factoryMiddleware.validExportToAgent, factoryController.postProductManagementExportToAgent);

  // lấy thông tin của những sản phẩm bị lỗi đang ở trung tâm bảo hành muốn đưa về cơ sở sản xuất bản đầu -> api này phục vụ /api/factory/defective-product-management/receive-product
  router.get("/api/factory/defective-product-management", factoryMiddleware.validFactorySession, factoryController.getReceiveDefectiveProduct);
  router.post("/api/factory/defective-product-management/receive-product", factoryMiddleware.validFactorySession, factoryMiddleware.validReceiveDefectiveProductReceiveProduct, factoryController.postReceiveDefectiveProductReceiveProduct);
  router.get("/api/factory/sell-management", factoryMiddleware.validFactorySession, factoryController.getSellManagement);
  router.get("/api/factory/get-sell", factoryMiddleware.validFactorySession, factoryController.getGetSell);
  router.get("/api/factory/error-management", factoryMiddleware.validFactorySession, factoryController.getErrorManagement);

  // API for account AGENT
  router.get("/api/agent", agentMiddleware.validAgentSession, agentController.dashboardAgent);
  router.get("/api/product-management", agentMiddleware.validAgentSession, agentController.getProductManagement);
  router.get("/api/product-management/enter-from-factory/get-product", agentMiddleware.validAgentSession, agentController.getProductManagementEnterFromFactoryGetProduct);
  router.post("/api/product-management/enter-from-factory", agentMiddleware.validAgentSession, agentMiddleware.validProductManagementEnterFromFactory, agentController.postProductManagementEnterFromFactory);
  router.get("/api/product-management/sell-for-customer/get-customer", agentMiddleware.validAgentSession, agentController.getProductManagementSellForCustomerGetCustomer);
  router.post("/api/product-management/sell-for-customer", agentMiddleware.validAgentSession, agentMiddleware.validProductManagementSellForCustomer, agentController.postProductManagementSellForCustomer);
  router.post("/api/product-management/report-error", agentMiddleware.validAgentSession, agentMiddleware.validProductManagementReportError, agentController.postProductManagementReportError);
  router.post("/api/product-management/report-error/send-mail", agentMiddleware.validAgentSession, agentMiddleware.validProductManagementReportErrorSendMail, agentController.postProductManagementReportErrorSendMail);
  router.post("/api/product-management/get-insurance", agentMiddleware.validAgentSession, agentMiddleware.validProductManagementGetInsurance, agentController.postProductManagementGetInsurance);

  router.get("/api/insurance-management", agentMiddleware.validAgentSession, agentController.getInsuranceManagement);
  router.post("/api/insurance-management/send-insurance-center", agentMiddleware.validAgentSession, agentMiddleware.validInsuranceManagementSendInsuranceCenter, agentController.postInsuranceManagementSendInsuranceCenter);
  router.get("/api/insurance-management/send-insurance-center/get-all-insurance-center", agentMiddleware.validAgentSession, agentController.getInsuranceManagementSendInsuranceCenterGetAllInsuranceCenter);
  router.post("/api/insurance-management/receive-insurance-success", agentMiddleware.validAgentSession, agentMiddleware.validInsuranceManagementReceiveInsuranceSuccess, agentController.postInsuranceManagementReceiveInsuranceSuccess);
  router.post("/api/insurance-management/send-insurance-success-customer", agentMiddleware.validAgentSession, agentMiddleware.validInsuranceManagementSendInsuranceSuccessCustomer, agentController.postInsuranceManagementSendInsuranceSuccessCustomer);
  router.post("/api/insurance-management/send-insurance-fail-factory", agentMiddleware.validAgentSession, agentMiddleware.validInsuranceManagementSendInsuranceFailFactory, agentController.postInsuranceManagementSendInsuranceFailFactory);
  router.post("/api/insurance-management/send-insurance-fail-factory/send-mail", agentMiddleware.validAgentSession, agentMiddleware.validInsuranceManagementSendInsuranceFailFactorySendMail, agentController.postInsuranceManagementSendInsuranceFailFactorySendMail);

  router.get("/api/customer-management", agentMiddleware.validAgentSession, agentController.getCustomerManagement);
  router.post("/api/customer-management/create", agentMiddleware.validAgentSession, agentMiddleware.validCustomerManagementCreate, agentController.postCustomerManagementCreate);
  router.post("/api/customer-management/delete", agentMiddleware.validAgentSession, agentMiddleware.validCustomerManagementDelete, agentController.postCustomerManagementDelete);
  router.post("/api/customer-management/update", agentMiddleware.validAgentSession, agentMiddleware.validCustomerManagementUpdate, agentController.postCustomerManagementUpdate);

  router.get("/api/agent/get-sell", agentMiddleware.validAgentSession, agentController.getGetSell);

  // API for account INSURANCE
  router.get("/api/insurance", insuranceMiddleware.validInsuranceCenterSession, insuranceController.dashboardInsurance);
  router.get("/api/insurance/insurance-management", insuranceMiddleware.validInsuranceCenterSession, insuranceController.getInsuranceManagement);
  router.post("/api/insurance/insurance-management/receive-insurance-agent", insuranceMiddleware.validInsuranceCenterSession, insuranceMiddleware.validInsuranceManagementReceiveInsuranceAgent, insuranceController.postInsuranceManagementReceiveInsuranceAgent);
  router.post("/api/insurance/insurance-management/finish-insurance", insuranceMiddleware.validInsuranceCenterSession, insuranceMiddleware.validInsuranceManagementFinishInsurance, insuranceController.postInsuranceManagementFinishInsurance);
  router.post("/api/insurance/insurance-management/send-agent", insuranceMiddleware.validInsuranceCenterSession, insuranceMiddleware.validInsuranceManagementSendAgent, insuranceController.postInsuranceManagementSendAgent);
  router.post("/api/insurance/insurance-management/report-factory", insuranceMiddleware.validInsuranceCenterSession, insuranceMiddleware.validInsuranceManagementReportFactory, insuranceController.postInsuranceManagementReportFactory);
  router.post("/api/insurance/insurance-management/send-factory", insuranceMiddleware.validInsuranceCenterSession, insuranceMiddleware.validInsuranceManagementSendFactory, insuranceController.postInsuranceManagementSendFactory);

  return app.use("/", router);
};

module.exports = initWebRoute;
