import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const EditProfileForm = () => {
  // State
  const initialState = {
    profilePicture: "",
    name: "",
    username: "",
    bio: "",
    website: "",
    email: "",
    gender: "",
    dob: "",
    mobile: "919316607575",
  };
  const [formData, setFormData] = useState(initialState);
  const {
    profilePicture,
    name,
    username,
    bio,
    website,
    email,
    gender,
    dob,
    mobile,
  } = formData;

  // Handle input change event
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <form action="" className="EditProfileForm">
      <div className="edit-form-header">
        <div className="edit-header-left">
          <img
            src="/assets/profileimgs/profile11.jpg"
            alt="profile-img"
            className="edit-profile-img"
          />
        </div>
        <div className="edit-header-right">
          <div className="edit-header-username">@asdfgh</div>
          <div className="edit-header-img-input">
            <input type="file" id="file" style={{ display: "none" }} />
            <label htmlFor="file" className="edit-header-img-label">
              Change Profile Photo
            </label>
          </div>
        </div>
      </div>
      <div className="edit-form-body">
        <div className="edit-body-item">
          <div className="edit-body-left">Name</div>
          <div className="edit-body-right">
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={handleChangeInput}
            />
            <span>21/30</span>
            <span>
              Help people discover your account by using the name you're known
              by: either your full name, nickname, or business name.
            </span>
          </div>
        </div>

        <div className="edit-body-item">
          <div className="edit-body-left">Username</div>
          <div className="edit-body-right">
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={handleChangeInput}
            />
            <span>15/30</span>
            <span>
              In most cases, you'll be able to change your username back to
              asdfgh for another 14 days.
            </span>
          </div>
        </div>

        <div className="edit-body-item">
          <div className="edit-body-left">Bio</div>
          <div className="edit-body-right">
            <textarea
              id="bio"
              name="bio"
              maxLength={150}
              value={bio}
              onChange={handleChangeInput}
            />
            <span>76/150</span>
            <span>
              In most cases, you'll be able to change your username back to
              asdfgh for another 14 days.
            </span>
          </div>
        </div>

        <div className="edit-body-item">
          <div className="edit-body-left">Website</div>
          <div className="edit-body-right">
            <input
              type="text"
              name="website"
              id="website"
              value={website}
              onChange={handleChangeInput}
            />
            <span></span>
          </div>
        </div>

        <div className="edit-body-item">
          <div className="edit-body-right personal-info">
            <h4 style={{ color: "#838daa", fontSize: "1.05rem" }}>
              Personal Information
            </h4>
            <span>
              Provide your personal information, even if the account is used for
              a business, a pet or something else. This won't be a part of your
              public profile
            </span>
          </div>
        </div>

        <div className="edit-body-item">
          <div className="edit-body-left">Email</div>
          <div className="edit-body-right">
            <input
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={handleChangeInput}
            />
          </div>
        </div>
        
        
      </div>

      <div className="edit-form-footer">
        <button className="edit-footer-cancel">Cancel</button>
        <button className="edit-footer-save">Save</button>
      </div>
    </form>
  );
};

export default EditProfileForm;
