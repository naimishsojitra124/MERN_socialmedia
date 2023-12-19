import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { follow, unfollow } from "../../../redux/actions/profileAction";

const ProfileInfoButtons = ({ user }) => {
  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [isFollowed, setIsFollowed] = useState(false);

  //Check if user is followed
  useEffect(() => {
    if (user?.followers?.find((follower) => follower?._id === auth.user?._id)) {
      setIsFollowed(true);
    }
  }, [user, auth.user?._id]);

  //Handle follow
  const handleFollow = async () => {
    setIsFollowed(true);
    await dispatch(follow({ users: profile.users, user, auth }));
  };

  //Handle unfollow
  const handleUnfollow = async () => {
    await dispatch(unfollow({ users: profile.users, user, auth }));
    setIsFollowed(false);
  };

  return (
    <div className="ProfileInfoButtons">
      {isFollowed ? (
        <>
          <button className="btn unfollow-btn" onClick={handleUnfollow}>
            <span>Following</span>
            <img src="/assets/icons/unfollow.svg" alt="follow" />
          </button>
          <button className="btn message-btn">
            <img src="/assets/icons/message.svg" alt="message" />
            <span>Message</span>
          </button>
        </>
      ) : (
        <>
          <button className="btn follow-btn" onClick={handleFollow}>
            <img src="/assets/icons/follow.svg" alt="follow" />
            <span>Follow</span>
          </button>
        </>
      )}
    </div>
  );
};

export default ProfileInfoButtons;
