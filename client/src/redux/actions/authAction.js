import { postDataAPI } from "../../utils/fetchData";
import validation from "../../utils/validation,";

export const TYPES = {
  AUTH: "AUTH",
  ALERT: "ALERT",
  THEME: "THEME",
  STATUS: "STATUS",
};

export const register = (data) => async (dispatch) => {
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

    localStorage.setItem("firstLogin", true);

    dispatch({ type: TYPES.ALERT, payload: { success: res.data.msg } });
  } catch (err) {
    dispatch({ type: TYPES.ALERT, payload: { error: err.response.data.msg } });
  }
};

export const login = (data) => async (dispatch) => {
  try {
    dispatch({ type: TYPES.ALERT, payload: { loading: true } });
    const res = await postDataAPI("auth/login", data);

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

export const refreshToken = () => async (dispatch) => {
  const firstLogin = localStorage.getItem("firstLogin");
  if (firstLogin) {
    dispatch({ type: TYPES.ALERT, payload: { loading: true } });
    try {
      const res = await postDataAPI("auth/refresh_token");

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
