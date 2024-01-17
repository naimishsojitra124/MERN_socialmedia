import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { RecursiveCommentDisplay } from '../../../index';

const Comments = ({ post, onReply }) => {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState([]);
  const [next, setNext] = useState(3);
  const [replyComments, setReplyComments] = useState([]);

  useEffect(() => {
    const topLevelComments = post.comments.filter((comment) => !comment.reply);
    const numberOfTopLevelComments = topLevelComments.length;

    const commentsToShow =
      numberOfTopLevelComments <= 3 ? numberOfTopLevelComments : next;

    setComments(topLevelComments);
    setShowComments(topLevelComments.slice(numberOfTopLevelComments - commentsToShow));
  }, [next, post.comments]);

  useEffect(() => {
    const replyComments = post.comments.filter((comment) => comment.reply);
    setReplyComments(replyComments);
  }, [post.comments]);

  return (
    <div className='comments'>
      <RecursiveCommentDisplay
        comments={showComments}
        post={post}
        onReply={onReply}
        replyComments={replyComments}
      />

      {comments.length - next > 0 && (
        <div className='comments_more'>
          <img
            src='/assets/icons/add.svg'
            alt='add'
            className='comments_more-icon'
            onClick={() => setNext(next + 5)}
          />
        </div>
      )}
    </div>
  );
};

Comments.propTypes = {
  post: PropTypes.object.isRequired,
  onReply: PropTypes.func.isRequired,
};

export default Comments;
