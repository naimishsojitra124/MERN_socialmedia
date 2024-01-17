import React, { useState } from 'react';
import { CommentCard } from '../../../index';

const Comment = ({ comment, post, onReply, replyComments, depth, showRepliesMap, handleToggleReplies, getRepliesCount }) => (
  <div style={{ marginLeft: `${depth <= 2 ? depth * 1 : 0}rem` }}>
    <CommentCard comment={comment} post={post} onReply={onReply} />

    {comment._id && (
      <>
        {getRepliesCount(comment._id, replyComments) > 0 && (
          <div className='comment_display-replies'>
            <hr className='comment_display-separator' />
            <button
              onClick={() => handleToggleReplies(comment._id)}
              className='comment_display-replies-button'>
              {showRepliesMap[comment._id]
                ? 'Hide Replies'
                : `View (${getRepliesCount(comment._id, replyComments)}) Replies`}
            </button>
          </div>
        )}
        {showRepliesMap[comment._id] && (
          <RecursiveCommentDisplay
            comments={replyComments.filter((item) => item.reply === comment._id)}
            post={post}
            onReply={onReply}
            replyComments={replyComments}
            depth={depth + 1}
          />
        )}
      </>
    )}
  </div>
);

const RecursiveCommentDisplay = ({ comments, post, onReply, replyComments, depth = 0 }) => {
  const [showRepliesMap, setShowRepliesMap] = useState({});

  const handleToggleReplies = (commentId) => {
    setShowRepliesMap((previousShowRepliesMap) => ({
      ...previousShowRepliesMap,
      [commentId]: !previousShowRepliesMap[commentId],
    }));
  };

  const getRepliesCount = (commentId, replies) => {
    const directRepliesCount = replies.filter((item) => item.reply === commentId).length;
    const nestedRepliesCount = replies
      .filter((item) => item.reply === commentId)
      .reduce((count, reply) => count + getRepliesCount(reply._id, replies), 0);

    return directRepliesCount + nestedRepliesCount;
  };

  return (
    <>
      {comments?.map((comment, index) => (
        <Comment
          key={comment._id}
          comment={comment}
          post={post}
          onReply={onReply}
          replyComments={replyComments}
          depth={depth}
          showRepliesMap={showRepliesMap}
          handleToggleReplies={handleToggleReplies}
          getRepliesCount={getRepliesCount}
        />
      ))}
    </>
  );
};

export default RecursiveCommentDisplay;
