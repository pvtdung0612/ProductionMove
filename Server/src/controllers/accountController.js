import accountService from "../services/accountService";

let handleLogin = async (req, res) => {
  // Handle Session
  // Trường hợp client chỉ có một request và request tiếp theo xảy ra sau thời gian > maxCountDownSecond thì cookie.maxAge refresh session về lần đầu tiên
  // Trường hợp xử lý là trường hợp request quá nhiều lần mà cookie.maxAge chưa kịp refresh và session của client đó vẫn còn tồn tại
  const maxCountDownTurn = process.env.APP_SESSION_MAX_REQUEST;
  const maxCountDownSecond = process.env.APP_SESSION_MAX_TIME_SECOND_WAIT;

  if (req.session.countDownTurn && req.session.countDownTurn > 1) {
    // Thời gian đếm ngược bắt đầu nếu vượt quá giới hạn request
    req.session.startCountDownTime = Date.now();
  }

  if (req.session.countDownTurn) {
    // tăng session.countDownTurn mỗi lần có request từ client
    if (req.session.countDownTurn > 1) {
      req.session.countDownTurn--;
    } else {
      // Nếu có nhiều lượt request thì server trả về errCode = 1; bắt client đợi hết maxCountDownSecond thì mới được request tiếp
      req.session.countDownSecond = maxCountDownSecond - (new Date(new Date() - req.session.startCountDownTime)).getSeconds();

      if (req.session.countDownSecond > 0) {
        return res.status(200).json({
          errCode: 1,
          message: "You are logging in too many times, please try again in " +
            req.session.countDownSecond
            + "s",
        });
      } else {
        // Nếu thời gian đếm ngược hết thì reset lại tất cả
        req.session.countDownTurn = maxCountDownTurn;
      }
    }

  } else {
    // Nếu client lần đầu request thì khởi tạo session.countDownTurn cho client
    req.session.countDownTurn = maxCountDownTurn;
  }

  // Handle Check Login
  let username = req.body.username;
  let password = req.body.password;

  if (!username) {
    return res.status(200).json({
      errCode: 1,
      message: "Please enter your Username",
    });
  }
  if (!password) {
    return res.status(200).json({
      errCode: 1,
      message: "Please enter your Password",
    });
  }

  let resolveData = await accountService.handleAccountLogin(username, password);

  if (resolveData.account) {
    req.session.account = resolveData.account
  }
  // SetAccessTokenCookieInResponse(res, "token", "localhost")

  return res.status(200).json({
    errCode: resolveData.errCode,
    message: resolveData.message,
    data: resolveData.account ? resolveData.account : {},
    dashboardURL: resolveData.dashboardURL,
  });
};

let handleLogout = async (req, res) => {
  req.session.account = null;
  return res.status(200).json({
    errCode: 0,
    message: "Logout success",
  });
};

module.exports = {
  handleLogin: handleLogin,
  handleLogout: handleLogout,
};