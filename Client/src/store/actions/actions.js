import actionTypes from "./actionTypes";

export const loginSuccess = (inFo) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    inFo: inFo,
  };
};
export const logOut = () => {
  return {
    type: actionTypes.LOG_OUT,
  };
};

export const getData = (inFo) => {
  return {
    type: actionTypes.GET_DATA,
  };
};
