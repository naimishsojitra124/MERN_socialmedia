import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { follow, unfollow } from '../../../redux/actions/profileAction';

const ProfileInfoButtons = ({ user, ShowFollowers, ShowFollowings }) => {
  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [isFollowed, setIsFollowed] = useState(false);

  //Check if user is followed
  useEffect(() => {
    if (user?.followers?.find((follower) => follower?._id === auth.user?._id)) {
      setIsFollowed(true);
    }

    if (user.followers.find((follower) => follower === auth.user._id)) {
      setIsFollowed(true);
    }
  }, [user, auth.user?._id]);

  //Handle follow
  const handleFollow = async (e) => {
    e.preventDefault();
    setIsFollowed(true);
    await dispatch(follow({ users: profile.users, user, auth }));
  };

  //Handle unfollow
  const handleUnfollow = async () => {
    await dispatch(unfollow({ users: profile.users, user, auth }));
    setIsFollowed(false);
  };

  return (
    <div className='ProfileInfoButtons'>
      {ShowFollowers || ShowFollowings ? (
        // Show Follow and Following buttons in ShowFollowers and ShowFollowings are true
        <>
          {isFollowed ? (
            <button
              className='btn unfollow-btn showfollowers'
              onClick={handleUnfollow}>
              <span>Following</span>
            </button>
          ) : (
            <>
              <button className='btn follow-btn' onClick={handleFollow}>
                <span>Follow</span>
              </button>
            </>
          )}
        </>
      ) : (
        // Show Follow, Following and Message buttons in ProfileInfo are true
        <>
          {isFollowed ? (
            <>
              <button className='btn unfollow-btn' onClick={handleUnfollow}>
                <span>Following</span>
                <img src='/assets/icons/unfollow.svg' alt='follow' />
              </button>
              <button className='btn message-btn'>
                <img src='/assets/icons/message.svg' alt='message' />
                <span>Message</span>
              </button>
            </>
          ) : (
            <>
              <button className='btn follow-btn' onClick={handleFollow}>
                <img src='/assets/icons/follow.svg' alt='follow' />
                <span>Follow</span>
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

ProfileInfoButtons.propTypes = {
  user: PropTypes.object,
  ShowFollowers: PropTypes.bool,
  ShowFollowings: PropTypes.bool,
};

export default ProfileInfoButtons;
