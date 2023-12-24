import { postDataAPI } from "../../utils/fetchData";
import { TYPES } from "./authAction";

export const POST_TYPES = {
    CREATE_POST: 'CREATE_POST',
}

export const createPost = ({newPost, auth}) => async (dispatch) => {
    try {
        dispatch({ type: TYPES.ALERT, payload: { loading: true } });

        const res = await postDataAPI('post/createPost', { newPost }, auth.token);
        console.log(res);

        dispatch({ type: POST_TYPES.CREATE_POST, payload: res.data.newPost });

        dispatch({ type: TYPES.ALERT, payload: { loading: false } });
    } catch (err) {
        dispatch({ type: TYPES.ALERT, payload: { error: err.response.data.msg } });
    }
}