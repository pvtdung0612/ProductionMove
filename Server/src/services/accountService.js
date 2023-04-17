import db from "../models/index";
import cryptoJS from "../utils/cryptoJS"
import componentsService from "./componentsService"

let checkAccountUsername = (username) => {
  return new Promise(async (resolve, reject) => {
    try {
      let account = await db.Account.findOne({
        where: { username: username },
      });

      if (account) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleAccountLogin = (username, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let resolveData = {};
      let isExist = await checkAccountUsername(username);
      if (isExist) {
        // Username exxist
        let account = await db.Account.findOne({
          where: { username: username },
          attributes: [
            "id",
            "username",
            "password",
            "roleKey",
            "workplaceID",
            "image",
          ],
          raw: true,
        });

        if (account) {
          // Account Exist
          if (password === cryptoJS.decrypt(account.password)) {
            resolveData.errCode = 0;
            resolveData.message = "Login success";
            delete account.password;
            resolveData.account = account;
            resolveData.account.workplaceName = await componentsService.getNameHereWorkplace(account.roleKey, account.workplaceID)

            // Send url Dashboard then login
            if (account.roleKey == "R1") {
              resolveData.dashboardURL = "/api/dell-corp";
            }
            else if (account.roleKey == "R2") {
              resolveData.dashboardURL = "/api/factory";
            }
            else if (account.roleKey == "R3") {
              resolveData.dashboardURL = "/api/agent";
            }
            else if (account.roleKey == "R4") {
              resolveData.dashboardURL = "/api/insurance";
            }
          } else {
            resolveData.errCode = 1;
            resolveData.message = "Password is not correct";
          }
        } else {
          // Account is not Exist
          resolveData.errCode = 1;
          resolveData.message = "Account is not found";
        }
      } else {
        // Username is not exxist
        resolveData.errCode = 1;
        resolveData.message =
          "Your's Username is not exist. Please try other Username";
      }
      resolve(resolveData);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handleAccountLogin: handleAccountLogin,
};
