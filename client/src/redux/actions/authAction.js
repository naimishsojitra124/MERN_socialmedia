import { postDataAPI } from "../../utils/fetchData";
import validation from "../../utils/validation,";

export const TYPES = {
  AUTH: "AUTH",
  ALERT: "ALERT",
  THEME: "THEME",
  STATUS: "STATUS",
};

// Register action
export const register = (data) => async (dispatch) => {
  // Validate data
  const checkData = validation(data);
  if (checkData.errLength > 0) {
    return dispatch({ type: TYPES.ALERT, payload: checkData.errMsg });
  }
  try {
    dispatch({ type: TYPES.ALERT, payload: { loading: true } });
    const res = await postDataAPI("auth/register", data);

    dispatch({
      type: TYPES.AUTH,
      payload: {
        token: res.data.accessToken,
        user: res.data.user,
      },
    });

    // Save token to localStorage
    localStorage.setItem("firstLogin", true);

    dispatch({ type: TYPES.ALERT, payload: { success: res.data.msg } });
  } catch (err) {
    dispatch({ type: TYPES.ALERT, payload: { error: err.response.data.msg } });
  }
};

// Login action
export const login = (data) => async (dispatch) => {
  try {
    dispatch({ type: TYPES.ALERT, payload: { loading: true } });
    const res = await postDataAPI("auth/login", data);

    // Save token to localStorage
    localStorage.setItem("firstLogin", true);

    dispatch({
      type: TYPES.AUTH,
      payload: {
        token: res.data.accessToken,
        user: res.data.user,
      },
    });

    dispatch({ type: TYPES.ALERT, payload: { success: res.data.msg } });
  } catch (err) {
    dispatch({ type: TYPES.ALERT, payload: { error: err.response.data.msg } });
  }
};

// Logout action
export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem("firstLogin");
    await postDataAPI("auth/logout");

    window.location.href = "/login";
  } catch (err) {
    dispatch({ type: TYPES.ALERT, payload: { error: err.response.data.msg } });
  }
};

// Refresh token action
export const refreshToken = () => async (dispatch) => {
  // Check if firstLogin is true
  const firstLogin = localStorage.getItem("firstLogin");
  if (firstLogin) {
    dispatch({ type: TYPES.ALERT, payload: { loading: true } });
    try {
      // Get new access token
      const res = await postDataAPI("auth/refresh_token");

      // Dispatch new access token
      dispatch({
        type: TYPES.AUTH,
        payload: {
          token: res.data.accessToken,
          user: res.data.user,
        },
      });

      dispatch({ type: TYPES.ALERT, payload: {} });
    } catch (error) {
      dispatch({
        type: TYPES.ALERT,
        payload: {
          error: error.response.data.msg,
        },
      });
    }
  }
};
