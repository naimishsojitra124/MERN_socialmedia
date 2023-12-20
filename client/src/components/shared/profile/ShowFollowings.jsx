import React from "react";
import ProfileInfoButtons from "./ProfileInfoButtons";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const ShowFollowings = ({ user, setShowFollowings }) => {
  // State
  const auth = useSelector((state) => state.auth);
  return (
    <div className="ShowFollowersContainer">
      <div className="followers-wrapper">
        <div className="followers-top">
          <h3 className="followers-heading">Followings</h3>
          <span
            className="followers-close"
            onClick={() => setShowFollowings(false)}
          >
            &times;
          </span>
        </div>
        <div className="followers-bottom">
          {user?.map((user) => (
            <div className="followers-user" key={user?._id}>
              <NavLink
                to={`/profile/${user?._id}`}
                className="followers-user-left"
                onClick={() => setShowFollowings(false)}
              >
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
                  <ProfileInfoButtons user={user} ShowFollowings />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowFollowings;
