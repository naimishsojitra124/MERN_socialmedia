import { postDataAPI } from '../../utils/fetchData';
import { validation } from '../../utils/validation';

export const TYPES = {
  AUTH: 'AUTH',
  ALERT: 'ALERT',
  THEME: 'THEME',
  STATUS: 'STATUS',
};

// Register action
export const register = (data) => async (dispatch) => {
  // Validate data
  const checkData = validation(data);
  if (checkData.errLength > 0) {
    return dispatch({ type: TYPES.ALERT, payload: checkData.errMsg });
  }
  try {
    // Dispatch loading
    dispatch({ type: TYPES.ALERT, payload: { loading: true } });
    // Post data to server
    const res = await postDataAPI('auth/register', data);

    // Dispatch auth
    dispatch({
      type: TYPES.AUTH,
      payload: {
        token: res.data.accessToken,
        user: res.data.user,
      },
    });

    // Save token to localStorage
    localStorage.setItem('firstLogin', true);

    dispatch({ type: TYPES.ALERT, payload: { success: res.data.msg } });
  } catch (err) {
    dispatch({
      type: TYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};

// Login action
export const login = (data) => async (dispatch) => {
  try {
    dispatch({ type: TYPES.ALERT, payload: { loading: true } });

    // Post data to server
    const res = await postDataAPI('auth/login', data);

    // Save token to localStorage
    localStorage.setItem('firstLogin', true);

    // Dispatch auth
    dispatch({
      type: TYPES.AUTH,
      payload: {
        token: res.data.accessToken,
        user: res.data.user,
      },
    });

    dispatch({ type: TYPES.ALERT, payload: { success: res.data.msg } });
  } catch (err) {
    dispatch({
      type: TYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};

// Logout action
export const logout = () => async (dispatch) => {
  try {
    // Remove firstLogin from localStorage
    localStorage.removeItem('firstLogin');

    // Remove token from localStorage
    await postDataAPI('auth/logout');

    window.location.href = '/login';
  } catch (err) {
    dispatch({
      type: TYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};

// Refresh token action
export const refreshToken = () => async (dispatch) => {
  // Check if firstLogin is true
  const firstLogin = localStorage.getItem('firstLogin');
  if (firstLogin) {
    dispatch({ type: TYPES.ALERT, payload: { loading: true } });
    try {
      // Get new access token
      const res = await postDataAPI('auth/refresh_token');

      // Dispatch new access token
      dispatch({
        type: TYPES.AUTH,
        payload: {
          token: res.data.accessToken,
          user: res.data.user,
        },
      });

      dispatch({ type: TYPES.ALERT, payload: { loading: false } });
    } catch (err) {
      dispatch({
        type: TYPES.ALERT,
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  }
};

// Edit user action
export const EditData = (data, id, post) => {
  const newData = data?.map((item) => (item?._id === id ? post : item));
  return newData;
};

// Delete user action
export const DeleteData = (data, id) => {
  const newData = data?.filter((item) => item?._id !== id);
  return newData;
};
