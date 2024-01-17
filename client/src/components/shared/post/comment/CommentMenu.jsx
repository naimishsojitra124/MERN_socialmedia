import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from '../../../../redux/actions/commentAction';

const CommentMenu = ({ post, comment, setShowCommentMenu }) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleCloseCommentMenu = () => {
    setShowCommentMenu(false);
  };

  const handleDeleteComment = () => {
    dispatch(deleteComment(comment, post, auth));
  };

  return (
    <div className='comment_menu'>
      <div className='comment_menu-wrapper'>
        <button
          className='comment_menu-item comment_menu-delete'
          onClick={handleDeleteComment}>
          Delete
        </button>
        <button
          className='comment_menu-item comment_menu-cancel'
          onClick={handleCloseCommentMenu}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CommentMenu;
