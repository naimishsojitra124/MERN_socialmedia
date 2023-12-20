import React from "react";
import ProfileInfoButtons from "./ProfileInfoButtons";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const ShowFollowers = ({ user, setShowFollowers }) => {
  const auth = useSelector((state) => state.auth);

  let currentUserFollowingList = auth.user?.following?.map((user) => {
    return user?._id;
  });

  // Custom sorting function
  const customSort = (a, b) => {
    if (a._id === auth?.user?._id) {
      // Current user comes first
      return -1;
    } else if (b._id === auth?.user?._id) {
      // Other user comes after the current user
      return 1;
    } else if (
      currentUserFollowingList.includes(a._id) &&
      !currentUserFollowingList.includes(b._id)
    ) {
      // Users in the current user's following list come next
      return -1;
    } else if (
      !currentUserFollowingList.includes(a._id) &&
      currentUserFollowingList.includes(b._id)
    ) {
      // Users not in the current user's following list come last
      return 1;
    } else {
      // Maintain the original order for other cases
      return 0;
    }
  };

  // Sort the array using the custom sorting function
  user.sort(customSort);

  return (
    <div className="ShowFollowersContainer">
      <div className="followers-wrapper">
        <div className="followers-top">
          <h3 className="followers-heading">Followers</h3>
          <span
            className="followers-close"
            onClick={() => setShowFollowers(false)}
          >
            &times;
          </span>
        </div>
        <div className="followers-bottom">
          {user?.map((user) => (
            <div className="followers-user" key={user?._id}>
              <NavLink to={`/profile/${user?._id}`} className="followers-user-left" onClick={() => setShowFollowers(false)}>
                <img
                  src={
                    user?.profilePicture
                      ? user?.profilePicture
                      : "/assets/icons/profile-placeholder.svg"
                  }
                  alt="profile"
                  className="followers-profile-pic"
                />
                <div className="followers-user-names">
                  <div className="followers-username">{user?.username}</div>
                  <div className="followers-name">{user?.name}</div>
                </div>
              </NavLink>
              <div className="followers-user-right">
                {user?._id !== auth.user?._id && (
                  <ProfileInfoButtons user={user} ShowFollowers />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowFollowers;
