import db from "../models";
import CRUDAccountService from "../services/CRUDAccountService";
import cryptoJS from "../utils/cryptoJS"

let getTestCrypto = (req, res) => {
  return res.status(200).json({
    errCode: 0,
    message: "success",
    data: {
      encrypt: cryptoJS.encrypt("mytext"),
      decrypt: cryptoJS.decrypt(cryptoJS.encrypt("mytext")),
    },
  });
};

let getTestAxiosGet = (req, res) => {
  return res.status(200).json({
    errCode: 0,
    message: "Test success",
    data: {},
  });
};

let getHomePage = async (req, res) => {
  try {
    let data = await db.Account.findAll();
    return res.render("homePage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (e) {
    console.log(e);
    return res.send(e);
  }
};

let getAboutPage = (req, res) => {
  return res.render("test/about.ejs");
};

let getCRUDAccount = (req, res) => {
  return res.render("crud-account.ejs");
};

let postCRUDAccount = async (req, res) => {
  let message = await CRUDAccountService.createAccount(req.body);
  return res.send("post crud from server");
};

let displayGetCRUDAccount = async (req, res) => {
  let data = await CRUDAccountService.getAllAccount();
  return res.render("displayCRUDAccount.ejs", {
    dataTable: data,
  });
};

let getEditCRUDAccount = async (req, res) => {
  let accountID = req.query.id;
  if (accountID) {
    let accountData = await CRUDAccountService.getAccountInfoByID(accountID);
    // check account not found
    // if (!accountData) {
    //   return res.send("Account with id=" + accountID + " not found");
    // }

    return res.render("editCRUDAccount.ejs", {
      account: accountData,
    });
  } else {
    return res.send("ID is not valid");
  }
};

let putCRUDAccount = async (req, res) => {
  let data = req.body;
  let resService = await CRUDAccountService.updateAccountData(data);
  return res.render("displayCRUDAccount.ejs", {
    dataTable: resService.data,
  });
};

let getDeleteCRUDAccount = async (req, res) => {
  let id = req.query.id;
  if (id) {
    let resService = await CRUDAccountService.deleteAccountByID(id);
    return res.render("displayCRUDAccount.ejs", {
      dataTable: resService.data,
    });
  } else {
    return res.send("Invalid ID");
  }
};

module.exports = {
  getTestCrypto: getTestCrypto,
  getTestAxiosGet: getTestAxiosGet,
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getCRUDAccount: getCRUDAccount,
  postCRUDAccount: postCRUDAccount,
  displayGetCRUDAccount: displayGetCRUDAccount,
  getEditCRUDAccount: getEditCRUDAccount,
  putCRUDAccount: putCRUDAccount,
  getDeleteCRUDAccount: getDeleteCRUDAccount,
};
