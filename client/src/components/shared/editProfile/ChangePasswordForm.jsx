import React, { useState } from "react";

const ChangePasswordForm = () => {
  const initialState = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
  const [formData, setFormData] = useState(initialState);
  const { oldPassword, newPassword, confirmPassword } = formData;
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  // Handle input change event
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <form className="ChangePasswordForm">
      <div className="change-pass-form-header">
        <div className="change-pass-header-left">
          <img
            src="/assets/profileimgs/profile11.jpg"
            alt="profile-img"
            className="change-pass-profile-img"
            loading="lazy"
          />
        </div>
        <div className="change-pass-header-right">
          <span className="change-pass-header-username">asdfgh</span>
        </div>
      </div>
      <div className="change-pass-form-body">
        <div className="change-pass-body-item">
          <div className="change-pass-body-left">Old Password</div>
          <div className="change-pass-body-right">
            <div className="change-pass-body-input">
              <input
                type={showOldPass ? "text" : "password"}
                name="oldPassword"
                className="change-pass-body-input"
                placeholder="Old Password"
                style={{
                  border: "2px solid red",
                }}
                value={oldPassword}
                onChange={handleChangeInput}
              />
              <img
                src={
                  showOldPass
                    ? "/assets/icons/eye-slash.svg"
                    : "/assets/icons/eye.svg"
                }
                alt="eye"
                className="change-pass-show-icon"
                onClick={() => setShowOldPass(!showOldPass)}
              />
            </div>
            <small>Password must contain atleast 1 lower case letter. </small>
          </div>
        </div>
        <div className="change-pass-body-item">
          <div className="change-pass-body-left">New Password</div>
          <div className="change-pass-body-right">
            <div className="change-pass-body-input">
              <input
                type={showNewPass ? "text" : "password"}
                name="newPassword"
                className="change-pass-body-input"
                placeholder="New Password"
                style={{
                  border: "2px solid red",
                }}
                value={newPassword}
                onChange={handleChangeInput}
              />
              <img
                src={
                  showNewPass
                    ? "/assets/icons/eye-slash.svg"
                    : "/assets/icons/eye.svg"
                }
                alt="eye"
                className="change-pass-show-icon"
                onClick={() => setShowNewPass(!showNewPass)}
              />
            </div>
            <small>Password must contain atleast 1 lower case letter. </small>
          </div>
        </div>
        <div className="change-pass-body-item">
          <div className="change-pass-body-left">Confirm Password</div>
          <div className="change-pass-body-right">
            <div className="change-pass-body-input">
              <input
                name="confirmPassword"
                type={showConfirmPass ? "text" : "password"}
                className="change-pass-body-input"
                placeholder="Confirm Password"
                style={{
                  border: "2px solid red",
                }}
                value={confirmPassword}
                onChange={handleChangeInput}
              />
              <img
                src={
                  showConfirmPass
                    ? "/assets/icons/eye-slash.svg"
                    : "/assets/icons/eye.svg"
                }
                alt="eye"
                className="change-pass-show-icon"
                onClick={() => setShowConfirmPass(!showConfirmPass)}
              />
            </div>
            <small>Password must contain atleast 1 lower case letter. </small>
          </div>
        </div>
      </div>

      <div className="change-pass-form-footer">
        <button className="change-pass-forgot-btn">Forgot Password?</button>
        <button className="change-pass-btn">Change Password</button>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
