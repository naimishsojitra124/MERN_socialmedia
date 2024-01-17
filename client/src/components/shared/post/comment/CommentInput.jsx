import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { createComment } from '../../../../redux/actions/commentAction';
import { TYPES } from '../../../../redux/actions/authAction';

const CommentInput = ({ post, onReply, setOnReply }) => {
  const [content, setContent] = useState('');
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  useEffect(() => {
    if (onReply === null) {
      setContent('');
    } else {
      setContent(`@${onReply?.user?.username} `);
      inputRef.current.focus();
    }
  }, [onReply]);

  const createNewComment = () => {
    return {
      content,
      likes: [],
      user: auth.user,
      createdAt: new Date().toISOString(),
      reply: onReply === null ? undefined : onReply.commentId,
      tag: onReply === null ? undefined : onReply.user,
    };
  };

  const handleComment = (e) => {
    e.preventDefault();

    if (!content.trim()) {
      setOnReply(null);
      return;
    }

    if (content.length > 1000) {
      dispatch({
        type: TYPES.ALERT,
        payload: {
          error: 'Comment cannot exceed 1000 characters.',
        },
      });
      setContent('');
      return;
    }

    const newComment = createNewComment();
    dispatch(createComment(post, newComment, auth));

    // Reset the states after posting the comment/reply
    setContent('');
    setOnReply(null);
  };

  return (
    <form className='comment_input' onSubmit={handleComment}>
      <textarea
        ref={inputRef}
        type='text'
        placeholder='Add a comment...'
        className='comment_input-field'
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type='submit' className='comment_submit-btn'>
        Post
      </button>
    </form>
  );
};

CommentInput.propTypes = {
  post: PropTypes.object.isRequired,
  onReply: PropTypes.object,
  setOnReply: PropTypes.func,
};

export default CommentInput;
