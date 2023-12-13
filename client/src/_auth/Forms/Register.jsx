import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { register } from "../../redux/actions/authAction";
import { Loader } from "../../components/index";
import { AnimatePresence, motion } from "framer-motion";
import { headTextAnimation, slideAnimation } from "../../config/motion";

const Register = () => {
  // State
  const initialState = {
    name: "",
    username: "",
    email: "",
    password: "",
  };
  const [userData, setUserData] = useState(initialState);
  const { name, username, email, password } = userData;
  const [showPass, setShowPass] = useState(false);

  // Get auth state from redux store
  const auth = useSelector((state) => state.auth);
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  // UseEffect to redirect to home page if user is already logged in
  useEffect(() => {
    if (auth.token) return <Navigate to="/" />;
  }, [auth.token]);

  // Handle input change event
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Handle submit form event
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(userData));
  };
  return (
    <AnimatePresence>
      <div className="Register">
        <motion.div className="register-container">
          <motion.div
            className="register-container-left"
            {...slideAnimation("up")}
          >
            <div className="register-text">
              <h1>Create a new account</h1>
              <p>To use shareme, Please enter your details</p>
            </div>
            <div className="register-form">
              <form onSubmit={handleSubmit}>
                <div className="register-form-group">
                  <div className="register-input">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={handleChangeInput}
                      style={{ border: alert.name ? "2px solid #ff0e41" : "" }}
                    />
                  </div>
                  <small>{alert.name ? alert.name : ""}</small>
                </div>
                <div className="register-form-group">
                  <div className="register-input">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      placeholder="Enter your username"
                      value={username.toLowerCase().replace(/ /g, "")}
                      onChange={handleChangeInput}
                      style={{ border: alert.username ? "2px solid #ff0e41" : "" }}
                    />
                  </div>
                  <small>{alert.username ? alert.username : ""}</small>
                </div>
                <div className="register-form-group">
                  <div className="register-input">
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={handleChangeInput}
                      style={{ border: alert.email ? "2px solid #ff0e41" : "" }}
                    />
                  </div>
                  <small>{alert.email ? alert.email : ""}</small>
                </div>
                <div className="register-form-group">
                  <div className="register-input">
                    <label htmlFor="password">Password</label>
                    <div className="password-input-group">
                      <input
                        type={showPass ? "text" : "password"}
                        name="password"
                        id="password"
                        placeholder="Enter your password"
                        className="password-input"
                        value={password}
                        onChange={handleChangeInput}
                        style={{
                          border: alert.password ? "2px solid #ff0e41" : "",
                        }}
                      />
                      <img
                        src={
                          showPass
                            ? "/assets/icons/eye-slash.svg"
                            : "/assets/icons/eye.svg"
                        }
                        alt="eye"
                        className="password-icon"
                        onClick={() => setShowPass(!showPass)}
                      />
                    </div>
                  </div>
                  <small>{alert.password ? alert.password : ""}</small>
                </div>
                <div className="register-form-group">
                  <button
                    type="submit"
                    disabled={
                      email && password && name && username && !alert.loading
                        ? false
                        : true
                    }
                  >
                    {alert.loading ? (
                      <div className="register-loader">
                        <Loader size="medium" stroke="white"/>
                        <span
                          style={{
                            color: "var(--neutral1-25)",
                          }}
                        >
                          Registering...
                        </span>
                      </div>
                    ) : (
                      "Register"
                    )}
                  </button>
                </div>
                <div className="register-form-group">
                  <span>Already have an account?</span>
                  <Link to="/login">Login</Link>
                </div>
              </form>
            </div>
          </motion.div>
          <div className="register-container-right">
            <div className="register-right-text">
              <motion.h1 {...headTextAnimation}>
                Every new friend is a new adventure.
              </motion.h1>
              <motion.h1 {...headTextAnimation}>Let's get connected</motion.h1>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Register;
