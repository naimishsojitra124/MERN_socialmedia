import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const SearchModel = ({ user, handleClose }) => {
  const auth = useSelector((state) => state.auth);
  return (
    <div className="searchodel-container">
      <NavLink
        to={`/profile/${user?._id}`}
        key={user._id}
        className="searchresult-link"
        onClick={handleClose}
      >
        <img
          src={
            user?.profilePicture
              ? user?.profilePicture
              : "/assets/icons/profile-placeholder.svg"
          }
          alt="profile"
          className="searchmodel-profilePic"
        />
        <div className="searchmodel-userinfo">
          <h4 className="searchmodel-username">{user?.username}</h4>
          <span className="searchmodel-name">
            {user?.name}
            <span className="searchmodel-following-dot">•</span>
            <span className="searchmodel-following-status">
              {/* ${auth.user.followings.map((user) => {
              return user._id;
            }).includes(user._id)
            ? "Following"
            : ""
        } */}{" "}
              Following
            </span>
          </span>
        </div>
      </NavLink>
    </div>
  );
};

export default SearchModel;
