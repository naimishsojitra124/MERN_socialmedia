import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [img, setImg] = useState(null);
  const [showPass, setShowPass] = useState(false);
  return (
    <div className="Register">
      <div className="register-container">
        <div className="register-container-left">
          <div className="register-text">
            <h1>Create a new account</h1>
            <p>To use shareme, Please enter your details</p>
          </div>
          <div className="register-form">
            <form>
              <div className="register-form-group">
                <img
                  src={
                    img
                      ? URL.createObjectURL(img)
                      : "/assets/icons/profile-placeholder.svg"
                  }
                  alt="profileImg"
                  className="register-profile-img"
                />
                <label htmlFor="profileImg" style={{ cursor: "pointer" }}>
                  Upload Profile Picture:
                  <img src="/assets/icons/gallery-add.svg" alt="" />
                  <input
                    type="file"
                    name="profileImg"
                    id="profileImg"
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={(e) => setImg(e.target.files[0])}
                  />
                </label>
              </div>
              <div className="register-form-group">
                <div className="register-input">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Enter your username..."
                  />
                </div>
                <small>Enter valid username</small>
              </div>
              <div className="register-form-group">
                <div className="register-input">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email..."
                  />
                </div>
                <small>Enter valid email</small>
              </div>
              <div className="register-form-group">
                <div className="register-input">
                  <label htmlFor="password">Password</label>
                  <div className="password-input-group">
                    <input
                      type={showPass ? "text" : "password"}
                      name="password"
                      id="password"
                      placeholder="Enter your password..."
                      className="password-input"
                    />
                    <img
                      src={showPass ? "/assets/icons/eye.svg" : "/assets/icons/eye-slash.svg"}
                      alt="eye"
                      className="password-icon"
                      onClick={() => setShowPass(!showPass)}
                    />
                  </div>
                </div>
                <small>Enter valid password</small>
              </div>
              <div className="register-form-group">
                <button type="submit">Register</button>
              </div>
              <div className="register-form-group">
                <span>Already have an account?</span>
                <Link to="/login">Login</Link>
              </div>
            </form>
          </div>
        </div>
        <div className="register-container-right">
          <div className="register-right-text">
            <h1>
              Every new friend is a new adventure.
            </h1>
            <span>Let's get connected</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
