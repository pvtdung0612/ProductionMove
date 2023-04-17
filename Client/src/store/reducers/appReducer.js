import actionTypes from "../actions/actionTypes";
import { logout } from "../../api/manager";

const INITIAL_STATE = () => {
  return {
    isLoginIn: false,
    user: null,
    data: {
      accountManager: [],
      productManager: [],
      productTypeManager: [],
    },
  };
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isLoginIn: true,
        user: action.inFo.data,
      };
    }

    case actionTypes.LOGIN_FAIL: {
      return {
        ...state,
        isLoginIn: false,
        user: null,
      };
    }

    case actionTypes.LOG_OUT: {
      logout().then((res) => {
      });
      return {
        ...state,
        isLoginIn: false,
        user: null,
      };
    }

    // case actionTypes.GET_DATA: {
    // }
    default:
      return state;
  }
};
export default reducer;
