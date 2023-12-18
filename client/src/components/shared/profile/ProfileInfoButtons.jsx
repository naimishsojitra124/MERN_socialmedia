import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const ProfileInfoButtons = ({ user }) => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const { userId } = useParams();
  return (
    <div className="ProfileInfoButtons">
      {userId === auth.user?._id ? (
        <button
          className="btn editprofile-btn"
          onClick={(e) => {
            e.preventDefault();
            navigate("/account/edit");
          }}
        >
          <span>Edit Profile</span>
          <img
            src="/assets/icons/edit.svg"
            alt="edit-profile"
            style={{ margin: "0 0 0.2rem 0" }}
          />
        </button>
      ) : (
        <>
          {/* <button className="btn follow-btn">
            <img src="/assets/icons/follow.svg" alt="follow" />
            <span>Follow</span>
          </button> */}
          <button className="btn unfollow-btn">
            <span>Following</span>
            <img src="/assets/icons/unfollow.svg" alt="follow" />
          </button>
          <button className="btn message-btn">
            <img src="/assets/icons/message.svg" alt="message" />
            <span>Message</span>
          </button>
        </>
      )}
    </div>
  );
};

export default ProfileInfoButtons;
