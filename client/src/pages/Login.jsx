import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPass, setShowPass] = useState(false); // [1]
  return (
    <div className="Login">
      <div className="login-container">
        <div className="login-container-left">
          <div className="login-text">
            <h1>Welcome Back</h1>
          </div>
        </div>
        <div className="login-container-right">
          <div className="login-form-container">
            <h1>Login</h1>
            <p>
              To keep connected with us please login with your personal info
            </p>
            <form action="">
              <div className="login-form-group">
                <div className="login-input">
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
              <div className="login-form-group">
                <div className="login-input">
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
                      src={
                        showPass
                          ? "/assets/icons/eye.svg"
                          : "/assets/icons/eye-slash.svg"
                      }
                      alt="eye"
                      className="password-icon"
                      onClick={() => setShowPass(!showPass)}
                    />
                  </div>
                </div>
                <small>Enter valid password</small>
              </div>
              <div className="login-form-group">
                <button type="submit">Login</button>
              </div>
              <div className="login-form-group">
                <span>Don't have an account?</span>
                <Link to="/register">Register</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
