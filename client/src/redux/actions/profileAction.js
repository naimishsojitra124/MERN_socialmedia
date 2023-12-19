import { getDataAPI, patchDataAPI } from "../../utils/fetchData";
import { TYPES } from "./authAction";
import { changePasswordValidation } from "../../utils/validation";

export const PROFILE_TYPES = {
  LOADING: "LOADING",
  GET_USER: "GET_USER",
};

// Get user profile
export const getUserProfile =
  ({ users, userId, auth }) =>
  async (dispatch) => {
    // Check if user is already in users array
    if (users.every((user) => user?._id !== userId)) {
      try {
        dispatch({
          type: PROFILE_TYPES.LOADING,
          payload: true,
        });
        // Get user data
        const res = await getDataAPI(`user/${userId}`, auth.token);

        dispatch({
          type: PROFILE_TYPES.GET_USER,
          payload: res.data,
        });

        dispatch({
          type: PROFILE_TYPES.LOADING,
          payload: false,
        });
      } catch (err) {
        dispatch({
          type: TYPES.ALERT,
          payload: { error: err.response.data.msg },
        });

        dispatch({ type: PROFILE_TYPES.LOADING, payload: false });
      }
    }
  };

export const updateUserProfile =
  ({ formData, auth }) =>
  async (dispatch) => {
    try {
      dispatch({ type: PROFILE_TYPES.LOADING, payload: true });
      const res = await patchDataAPI("user/updateUser", formData, auth.token);

      dispatch({
        type: TYPES.AUTH,
        payload: {
          token: auth.token,
          user: res.data.user,
        },
      });

      dispatch({ type: TYPES.ALERT, payload: { success: res?.data?.msg } });

      dispatch({ type: PROFILE_TYPES.LOADING, payload: false });
    } catch (err) {
      dispatch({
        type: TYPES.ALERT,
        payload: { error: err.response.data?.msg },
      });

      dispatch({ type: PROFILE_TYPES.LOADING, payload: false });
    }
  };

export const changePassword =
  ({ formData, auth }) =>
  async (dispatch) => {
    //Validate Data
    const checkData = changePasswordValidation(formData);
    if (checkData.errLength > 0) {
      return dispatch({ type: TYPES.ALERT, payload: checkData.errMsg });
    }

    try {
      dispatch({ type: PROFILE_TYPES.LOADING, payload: true });
      const res = await patchDataAPI(
        "user/updatePassword",
        formData,
        auth.token
      );

      console.log(res);

      dispatch({ type: TYPES.ALERT, payload: { success: res?.data?.msg } });

      dispatch({ type: PROFILE_TYPES.LOADING, payload: false });
    } catch (err) {
      dispatch({
        type: TYPES.ALERT,
        payload: { error: err.response.data?.msg },
      });

      dispatch({ type: PROFILE_TYPES.LOADING, payload: false });
    }
  };
