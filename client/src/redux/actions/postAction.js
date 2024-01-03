import { getDataAPI, patchDataAPI, postDataAPI } from '../../utils/fetchData';
import { TYPES } from './authAction';

export const POST_TYPES = {
  CREATE_POST: 'CREATE_POST',
  LOADING_POST: 'LOADING_POST',
  GET_POSTS: 'GET_POSTS',
  UPDATE_POST: 'UPDATE_POST',
  DELETE_POST: 'DELETE_POST',
};

export const createPost =
  ({ newPost, auth }) =>
  async (dispatch) => {
    try {
      dispatch({ type: TYPES.ALERT, payload: { loading: true } });

      const res = await postDataAPI('post/createPost', { newPost }, auth.token);

      dispatch({
        type: POST_TYPES.CREATE_POST,
        payload: res.data.newPost,
      });

      dispatch({
        type: TYPES.ALERT,
        payload: { success: res.data.msg },
      });

      window.location.href = '/';
      dispatch({ type: TYPES.ALERT, payload: { loading: false } });
    } catch (err) {
      dispatch({
        type: TYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const getPosts = (token) => async (dispatch) => {
  try {
    dispatch({ type: POST_TYPES.LOADING_POST, payload: true });

    const res = await getDataAPI('post/getPosts', token);

    dispatch({ type: POST_TYPES.GET_POSTS, payload: res.data });

    dispatch({ type: POST_TYPES.LOADING_POST, payload: false });
  } catch (err) {
    dispatch({
      type: TYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};

export const updatePost =
  ({ caption, location, images, auth, status }) =>
  async (dispatch) => {
    try {
      dispatch({ type: TYPES.ALERT, payload: { loading: true } });

      const res = await patchDataAPI(
        `post/updatePost/${status.post?._id}`,
        { caption, location, images },
        auth?.token
      );

      dispatch({
        type: POST_TYPES.UPDATE_POST,
        payload: res.data.post,
      });

      dispatch({
        type: TYPES.ALERT,
        payload: { success: res.data.msg },
      });

      window.location.reload();

      dispatch({ type: TYPES.ALERT, payload: { loading: false } });
    } catch (err) {
      dispatch({
        type: TYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const likePost =
  ({ post, auth }) =>
  async (dispatch) => {
    const newPost = { ...post, likes: [...post.likes, auth.user] };

    dispatch({
      type: POST_TYPES.UPDATE_POST,
      payload: newPost,
    });

    try {
      await patchDataAPI(`post/${post._id}/like`, null, auth.token);
    } catch (err) {
      dispatch({
        type: TYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const unlikePost =
  ({ post, auth }) =>
  async (dispatch) => {
    const newPost = {
      ...post,
      likes: post.likes.filter((like) => like._id !== auth.user._id),
    };

    dispatch({
      type: POST_TYPES.UPDATE_POST,
      payload: newPost,
    });

    try {
      await patchDataAPI(`post/${post._id}/unlike`, null, auth.token);
    } catch (err) {
      dispatch({
        type: TYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };
