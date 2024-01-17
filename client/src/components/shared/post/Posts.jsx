/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import Carousel from './Carousel';
import { AnimatePresence, motion } from 'framer-motion';
import { slideAnimation } from '../../../config/motion';
import { useDispatch, useSelector } from 'react-redux';
import { unfollow } from '../../../redux/actions/profileAction';
import { TYPES } from '../../../redux/actions/authAction';
import { likePost, unlikePost } from '../../../redux/actions/postAction';
import { Comments, CommentInput } from '../../index';

const Posts = ({
  post: {
    user,
    createdAt,
    location,
    images,
    caption,
    likes,
    comments,
    updatedAt,
  },
  post,
}) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(false);
  const [loadLike, setLoadLike] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showUnfollowScreen, setShowUnfollowScreen] = useState(false);
  const [showCommentScreen, setShowCommentScreen] = useState(false);
  const [onReply, setOnReply] = useState(null);

  useEffect(() => {
    if (
      likes &&
      likes.length > 0 &&
      likes.find((like) => like._id === auth?.user?._id)
    ) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [auth.user?._id, likes]);

  const handleLike = async () => {
    if (loadLike) return;
    setIsLiked(true);
    setLoadLike(true);
    await dispatch(likePost({ post, auth }));
    setLoadLike(false);
  };

  const handleUnlike = () => {
    setIsLiked(false);
    setLoadLike(true);
    dispatch(unlikePost({ post, auth }));
    setLoadLike(false);
  };

  const handleSave = () => {
    setIsSaved(true);
  };

  const handleUnsave = () => {
    setIsSaved(false);
  };

  //Handle unfollow
  const handleUnfollow = async () => {
    await dispatch(unfollow({ user, auth }));
    window.location.reload();
  };

  const handleEditPost = () => {
    dispatch({
      type: TYPES.STATUS,
      payload: { post: { ...post }, onEdit: true },
    });
    setShowDropdown(false);
  };

  const handleOnReply = (commentInfo) => {
    setOnReply(commentInfo);
  };

  return (
    <AnimatePresence>
      <motion.div className='Post' {...slideAnimation('up')}>
        <div className='post_header'>
          <NavLink to={`/profile/${user?._id}`} className='post_header-left'>
            <img
              src={
                user?.profilePicture || '/assets/icons/profile-placeholder.svg'
              }
              alt='user profile'
            />
            <div className='post_header-name'>
              <h3>{user?.username}</h3>
              <p>
                {updatedAt !== createdAt ? (
                  <>Edited • {moment(createdAt).fromNow()} </>
                ) : (
                  <>{moment(createdAt).fromNow()} </>
                )}
                {location && <>• {location}</>}
              </p>
            </div>
          </NavLink>
          <div className='post_header-right'>
            <img
              src='/assets/icons/more-vertical.svg'
              alt='More Vertical Icon'
              className='post_header-more'
              onClick={() => setShowDropdown(!showDropdown)}
            />
            {showDropdown && (
              <>
                <div className='post_header-dropdown'>
                  {auth?.user?._id === user?._id && (
                    <>
                      <button
                        className='post_dropdown-item post_dropdown-edit'
                        onClick={handleEditPost}>
                        Edit
                      </button>

                      <button className='post_dropdown-item post_dropdown-delete'>
                        Delete
                      </button>
                    </>
                  )}
                  {user?._id !== auth?.user?._id && (
                    <button
                      className='post_dropdown-item post_dropdown-unfollow'
                      onClick={() => setShowUnfollowScreen(true)}>
                      Unfollow
                    </button>
                  )}

                  <button className='post_dropdown-item post_dropdown-copy'>
                    Copy Link
                  </button>
                  <button className='post_dropdown-item post_dropdown-share'>
                    Go to post
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        <div className='post_body'>
          <div className='post_body-carousel'>
            <Carousel images={images} />
          </div>
          <div className='post_footer'>
            <div className='post_footer-icons'>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}>
                <div className='post_footer-icon-item'>
                  {isLiked ? (
                    <img
                      src='/assets/icons/liked.svg'
                      alt='Liked Icon'
                      onClick={handleUnlike}
                    />
                  ) : (
                    <img
                      src='/assets/icons/like.svg'
                      alt='Like Icon'
                      onClick={handleLike}
                    />
                  )}
                  <p>
                    <span
                      className={
                        isLiked
                          ? 'post_footer-icon-item-liked'
                          : 'post_footer-icon-item-unliked'
                      }>
                      {likes?.length}
                    </span>{' '}
                    Likes
                  </p>
                </div>
                <div className='post_footer-icon-item'>
                  <img
                    src='/assets/icons/comment.svg'
                    alt='Comment Icon'
                    onClick={() => setShowCommentScreen(!showCommentScreen)}
                  />
                  <p>
                    <span
                      className={
                        comments?.length > 0
                          ? 'post_footer-icon-item-commented'
                          : 'post_footer-icon-item-uncommented'
                      }>
                      {comments?.length}
                    </span>{' '}
                    Comments
                  </p>
                </div>
              </div>
              <div>
                <div className='post_footer-icon-item save-icon'>
                  {isSaved ? (
                    <img
                      src='/assets/icons/saved.svg'
                      alt='Saved Icon'
                      onClick={handleUnsave}
                    />
                  ) : (
                    <img
                      src='/assets/icons/save.svg'
                      alt='Save Icon'
                      onClick={handleSave}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='post_body-caption'>
            {caption.length < 60 && caption.split('\n').length === 1 ? (
              <>
                <p>
                  <NavLink
                    className='post_body-caption-username'
                    to={`/profile/${user?._id}`}>
                    {user?.username}
                  </NavLink>
                  {caption.split('\n').map((word, index) => {
                    if (word[0] === '#') {
                      return (
                        <span
                          key={index}
                          style={{
                            color: 'var(--primary-500)',
                          }}
                          className='post_body-caption-hashtag'>
                          {word}
                        </span>
                      );
                    } else {
                      return (
                        <span key={index}>
                          {word}
                          <br />
                        </span>
                      );
                    }
                  })}
                </p>
              </>
            ) : (
              <>
                <p>
                  {readMore ? (
                    <>
                      <NavLink
                        className='post_body-caption-username'
                        to={`/profile/${user?._id}`}>
                        {user?.username}
                      </NavLink>
                      {caption.split('\n').map((word, index) => {
                        if (word[0] === '#') {
                          return (
                            <span
                              key={index}
                              style={{
                                color: 'var(--primary-500)',
                              }}
                              className='post_body-caption-hashtag'>
                              {word}
                            </span>
                          );
                        } else {
                          return (
                            <span key={index}>
                              {word}
                              <br />
                            </span>
                          );
                        }
                      })}
                    </>
                  ) : (
                    <>
                      <NavLink
                        className='post_body-caption-username'
                        to={`/profile/${user?._id}`}>
                        {user?.username}
                      </NavLink>
                      {caption.split('\n').length > 1 ? (
                        <>{caption.split('\n')[0]}</>
                      ) : (
                        <>{caption.slice(0, 60)}</>
                      )}
                    </>
                  )}
                  <span
                    className='post_body-caption-readMore'
                    onClick={() => setReadMore(!readMore)}>
                    {readMore ? '...less' : '...more'}
                  </span>
                </p>
              </>
            )}
          </div>
          {
            // Comment screen
            showCommentScreen && (
              <>
                <Comments
                  post={post}
                  onReply={handleOnReply}
                />
                <CommentInput
                  post={post}
                  onReply={onReply}
                  setOnReply={setOnReply}
                />
              </>
            )
          }
        </div>
      </motion.div>
      {
        // Unfollow screen
        showUnfollowScreen && (
          <>
            <div
              className='post_unfollow-screen'
              onClick={() => setShowUnfollowScreen(false)}>
              <div className='post_unfollow-screen-wrapper'>
                <div className='post_unfollow-screen-header'>
                  <img
                    src={
                      user?.profilePicture ||
                      '/assets/icons/profile-placeholder.svg'
                    }
                    alt='user profile'
                  />
                  <span className='post_unfollow-screen-username'>
                    Unfollow @{user?.username}?
                  </span>
                </div>
                <div className='post_unfollow-screen-btns'>
                  <button
                    className='post_unfollow-screen-btn post_unfollow-screen-unfollow'
                    onClick={handleUnfollow}>
                    Unfollow
                  </button>
                  <button
                    className='post_unfollow-screen-btn'
                    onClick={() => setShowUnfollowScreen(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </>
        )
      }
    </AnimatePresence>
  );
};

Posts.propTypes = {
  post: PropTypes.shape({
    user: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      profilePicture: PropTypes.string,
    }),
    createdAt: PropTypes.string.isRequired,
    location: PropTypes.string,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        imgUrl: PropTypes.string.isRequired,
      })
    ),
    caption: PropTypes.string.isRequired,
    likes: PropTypes.arrayOf(
      PropTypes.shape({
        user: PropTypes.string,
      })
    ),
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        user: PropTypes.shape({
          _id: PropTypes.string.isRequired,
          username: PropTypes.string.isRequired,
          profilePicture: PropTypes.string,
        }),
      })
    ),
  }).isRequired,
};

export default Posts;
