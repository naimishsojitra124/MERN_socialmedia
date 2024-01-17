import { patchDataAPI, postDataAPI } from '../../utils/fetchData';
import { DeleteData, EditData, TYPES } from './authAction';
import { POST_TYPES } from './postAction';

export const createComment = (post, newComment, auth) => async (dispatch) => {
  const newPost = { ...post, comments: [...post.comments, newComment] };

  dispatch({
    type: POST_TYPES.UPDATE_POST,
    payload: newPost,
  });

  try {
    const data = { ...newComment, postId: post._id, postUserId: post.user._id };
    const res = await postDataAPI('comment/createComment', data, auth.token);

    const newData = { ...res.data.newComment, user: auth.user };
    const newPost = { ...post, comments: [...post.comments, newData] };

    dispatch({
      type: POST_TYPES.UPDATE_POST,
      payload: newPost,
    });
  } catch (err) {
    dispatch({
      type: TYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};

export const likeComment = (comment, post, auth) => async (dispatch) => {
  const newCm = { ...comment, likes: [...comment.likes, auth.user] };
  const newComments = EditData(post.comments, comment._id, newCm);
  const newPost = { ...post, comments: newComments };

  dispatch({
    type: POST_TYPES.UPDATE_POST,
    payload: newPost,
  });

  try {
    const res = await patchDataAPI(
      `comment/${comment._id}/likecomment`,
      null,
      auth.token
    );
    console.log(res);
  } catch (err) {
    dispatch({
      type: TYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};

export const unlikeComment = (comment, post, auth) => async (dispatch) => {
  const newCm = {
    ...comment,
    likes: DeleteData(comment.likes, auth.user._id),
  };
  const newComments = EditData(post.comments, comment._id, newCm);
  const newPost = { ...post, comments: newComments };

  dispatch({
    type: POST_TYPES.UPDATE_POST,
    payload: newPost,
  });

  try {
    const res = await patchDataAPI(
      `comment/${comment._id}/unlikecomment`,
      null,
      auth.token
    );
    console.log(res);
  } catch (err) {
    dispatch({
      type: TYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};

export const deleteComment = (comment, post, auth) => async (dispatch) => {
  const deleteArr = findCommentAndReplies(comment._id, post.comments);
  const newPost = {
    ...post,
    comments: post.comments.filter(
      (cm) => !deleteArr.find((da) => cm._id === da._id)
    ),
  };

  dispatch({
    type: POST_TYPES.UPDATE_POST,
    payload: newPost,
  });

  try {
    deleteArr.forEach((item) => {
      patchDataAPI(`comment/${item._id}/deletecomment`, null, auth.token);
    });
  } catch (err) {
    dispatch({
      type: TYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};

// Recursive function to find a comment and its replies
const findCommentAndReplies = (commentId, comments) => {
  const commentToDelete = comments.find((cm) => cm._id === commentId);
  let deleteArr = [commentToDelete];

  if (commentToDelete) {
    // Find and add replies
    const repliesToDelete = comments.filter((cm) => cm.reply === commentId);
    repliesToDelete.forEach((reply) => {
      deleteArr = [...deleteArr, ...findCommentAndReplies(reply._id, comments)];
    });
  }

  return deleteArr;
};
