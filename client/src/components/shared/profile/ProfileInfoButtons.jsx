import React from "react";
import { useNavigate } from "react-router-dom";

const ProfileInfoButtons = () => {
  const navigate = useNavigate();
  return (
    <div className="ProfileInfoButtons">
      <button className="btn editprofile-btn" onClick={(e) => {
        e.preventDefault();
        navigate("/account/edit");
      }}>
        <span>Edit Profile</span>
        <img src="/assets/icons/edit.svg" alt="edit-profile" style={{margin: "0 0 0.2rem 0"}}/>
      </button>  
      <button className="btn follow-btn">
        <img src="/assets/icons/follow.svg" alt="follow"/>
        <span>Follow</span>
      </button>
      <button className="btn unfollow-btn">
        <span>Following</span>
        <img src="/assets/icons/unfollow.svg" alt="follow"/>
      </button>
      <button className="btn message-btn">
        <img src="/assets/icons/message.svg" alt="message" />
        <span>Message</span>
      </button>
    </div>
  );
};

export default ProfileInfoButtons;
