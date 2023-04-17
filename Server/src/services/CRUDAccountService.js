import db, { sequelize } from "../models";
import cryptoJS from "../utils/cryptoJS"

let validationAccountIsExistUsername = async (username) => {
  let isValid = false;
  try {
    let usernameExist = await db.Account.findAll({
      where: { username: username },
    });
    if (usernameExist.length > 0) {
      isValid = true;
    }
  } catch (e) {
    isValid = true;
  }
  return isValid;
};

let validationAccountIsEmpty = (account) => {
  let isValid = false;
  if (!account.password || !account.workplaceID || !account.password) {
    isValid = true;
  }
  return isValid;
};

let createAccount = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let checkIsValidUsername = await validationAccountIsExistUsername(
        data.username
      );
      let checkIsValidAccountEmpty = validationAccountIsEmpty(data);
      if (checkIsValidUsername) {
        resolve({
          errCode: 1,
          message: "Username is exist",
        });
      } else if (checkIsValidAccountEmpty) {
        resolve({
          errCode: 1,
          message: "Password is empty",
        });
      } else {
        let hashPasswordFromBcrypt = await hashAccountPassword(data.password);
        await db.Account.create({
          username: data.username,
          password: hashPasswordFromBcrypt,
          roleKey: data.roleKey,
          workplaceID: data.workplaceID,
          image: data.image,
        });
        resolve({
          errCode: 0,
          message: "Create account success",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let hashAccountPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = cryptoJS.encrypt(password);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

let getAllAccount = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let accounts = db.Account.findAll({
        raw: true,
      });
      resolve(accounts);
    } catch (e) {
      reject(e);
    }
  });
};

let getAccountInfoByID = (accountID) => {
  return new Promise(async (resolve, reject) => {
    try {
      let account = await db.Account.findOne({
        where: { id: accountID },
        raw: true,
      });
      if (account) {
        resolve(account);
      } else {
        resolve([]);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let updateAccountData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // validation Account
      // if (
      //   validationAccountExistUsername(data) &&
      //   validationAccountIsEmpty(data)
      // ) {
      // } else {
      //   console.log("Username is exist, Please enter another Username");
      //   resolve({
      //     errCode: 1,
      //     message: "Username is exist, Please enter another Username",
      //     data: null,
      //   });
      // }
      let account = await db.Account.findOne({
        where: { id: data.id },
        // query: {
        //   raw: false,
        // },
      });
      if (account) {
        account.username = data.username;
        account.password = data.password;
        account.roleKey = data.roleKey;
        account.workplaceID = data.workplaceID;

        await account.save();
        let allAccount = await db.Account.findAll({
          raw: true,
        });
        resolve({
          errCode: 0,
          message: "Update account success",
          data: allAccount,
        });
      } else {
        resolve({
          errCode: 1,
          message: "Account's ID is not exist",
          data: null,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteAccountByID = (accountID) => {
  return new Promise(async (resolve, reject) => {
    try {
      let account = await db.Account.findOne({
        where: { id: accountID },
      });

      if (account) {
        await account.destroy();
        let allAccount = await db.Account.findAll();
        resolve({
          errCode: 0,
          message: "Delete Account success",
          data: allAccount,
        });
      } else {
        resolve({
          errCode: 1,
          message: "Delete Account unsuccess",
          data: [],
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createAccount: createAccount,
  getAllAccount: getAllAccount,
  getAccountInfoByID: getAccountInfoByID,
  updateAccountData: updateAccountData,
  deleteAccountByID: deleteAccountByID,
};
