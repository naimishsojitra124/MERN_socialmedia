import { getDataAPI, postDataAPI } from "../../utils/fetchData";
import { TYPES } from "./authAction";

export const POST_TYPES = {
    CREATE_POST: 'CREATE_POST',
    LOADING_POST: "LOADING_POST",
    GET_POSTS: "GET_POSTS",
}

export const createPost = ({newPost, auth}) => async (dispatch) => {
    try {
        dispatch({ type: TYPES.ALERT, payload: { loading: true } });

        const res = await postDataAPI('post/createPost', { newPost }, auth.token);

        dispatch({ type: POST_TYPES.CREATE_POST, payload: res.data.newPost });

        dispatch({ type: TYPES.ALERT, payload: { loading: false } });
    } catch (err) {
        dispatch({ type: TYPES.ALERT, payload: { error: err.response.data.msg } });
    }
}

export const getPosts = (token) => async (dispatch) => {
    try {
        dispatch({ type: POST_TYPES.LOADING_POST, payload: true });

        const res = await getDataAPI('post/getPosts', token);
        console.log(res.data)

        dispatch({ type: POST_TYPES.GET_POSTS, payload: res.data });

        dispatch({ type: POST_TYPES.LOADING_POST, payload: false });
    } catch (err) {
        dispatch({ type: TYPES.ALERT, payload: { error: err.response.data.msg } });
    }
}