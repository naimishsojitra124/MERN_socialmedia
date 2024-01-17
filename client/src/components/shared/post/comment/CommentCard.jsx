import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { CommentMenu } from '../../../index';
import { useDispatch, useSelector } from 'react-redux';
import { likeComment, unlikeComment } from '../../../../redux/actions/commentAction';

const CommentCard = ({ comment, post, onReply }) => {
  const [readMore, setReadMore] = useState(false);
  const [loadLike, setLoadLike] = useState(false);
  const [isCommentLiked, setIsCommentLiked] = useState(false);
  const [showCommentMenu, setShowCommentMenu] = useState(false);
  const [isReplying, setIsReplying] = useState(false);

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUserClick = () => {
    navigate(`/profile/${comment.tag._id}`);
  };

  const processCommentContent = (content) => {
    if (comment?.reply) {
      const usernameRegex = /@(\w+)/g;
      return content
        ?.split(usernameRegex)
        .map((segment, index) =>
          index % 2 === 0 ? (
            segment
          ) : (
            <span
              key={index}
              style={{
                color: 'var(--primary-500)',
                cursor: 'pointer',
                fontWeight: 'var(--font-weight-semibold)',
              }}
              onClick={handleUserClick}
            >
              @{segment}
            </span>
          )
        );
    } else {
      return content;
    }
  };

  const processedContent = processCommentContent(comment.comment);

  useEffect(() => {
    setIsCommentLiked(comment.likes.some((like) => like._id === auth.user._id));
  }, [comment, auth.user._id]);

  const styleCard = {
    opacity: comment._id ? 1 : 0.5,
    pointerEvents: comment._id ? 'inherit' : 'none',
  };

  const handleLikeComment = async () => {
    if (loadLike) return;
    setIsCommentLiked(true);
    setLoadLike(true);
    await dispatch(likeComment(comment, post, auth));
    setLoadLike(false);
  };

  const handleUnlikeComment = async () => {
    if (loadLike) return;
    setIsCommentLiked(false);
    setLoadLike(true);
    await dispatch(unlikeComment(comment, post, auth));
    setLoadLike(false);
  };

  const handleReplyComment = () => {
    if (isReplying) {
      setIsReplying(false);
      onReply(null);
    } else {
      setIsReplying(true);
      onReply({ ...comment, commentId: comment._id });
    }
  };

  return (
    <>
      <div className='comment_card' style={styleCard}>
        <NavLink to={`/profile/${comment.user._id}`} className='comment_card-profile-pic'>
          <img src={comment.user.profilePicture} alt='Profile img' />
        </NavLink>
        <div className='comment_card-content'>
          <div className='comment_card-content-top'>
            <NavLink to={`/profile/${comment.user._id}`} className='comment_card-name'>
              {comment.user.username}
            </NavLink>
            <span className='comment_card-text'>
              {processedContent?.length < 100
                ? processedContent
                : readMore
                ? processedContent + ' '
                : processedContent?.slice(0, 100) + ''}
              {processedContent?.length > 100 && (
                <span
                  className='comment_card-readmore'
                  onClick={() => setReadMore(!readMore)}
                >
                  {readMore ? '...less' : '...read more'}
                </span>
              )}
            </span>
          </div>
          <div className='comment_card-content-bottom'>
            <span className='comment_card-date'>
              {moment(comment.createdAt).fromNow()}
            </span>
            <span className='comment_card-likes'>
              {comment.likes.length}{' '}
              {comment.likes.length > 1 ? 'likes' : 'like'}
            </span>
            <span className='comment_card-reply' onClick={handleReplyComment}>
              {isReplying ? 'Cancel' : 'Reply'}
            </span>
            {(post.user._id === auth.user._id || comment.user._id === auth.user._id) && (
              <span className='comment_card-more-icon'>
                <img
                  src='/assets/icons/more-horizontal.svg'
                  alt='More'
                  onClick={() => setShowCommentMenu(!showCommentMenu)}
                  className='comment_card-more-icon-img'
                />
              </span>
            )}
          </div>
        </div>
        <div className='comment_card-like'>
          {isCommentLiked ? (
            <img src='/assets/icons/liked.svg' alt='Like' onClick={handleUnlikeComment} />
          ) : (
            <img src='/assets/icons/like.svg' alt='Like' onClick={handleLikeComment} />
          )}
        </div>
      </div>
      {showCommentMenu && (
        <CommentMenu post={post} comment={comment} setShowCommentMenu={setShowCommentMenu} />
      )}
    </>
  );
};

export default CommentCard;
