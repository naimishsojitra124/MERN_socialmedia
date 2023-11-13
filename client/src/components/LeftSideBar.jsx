import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { sidebarLinks } from "../constants/index";

const LeftSideBar = () => {
  const auth = useSelector((state) => state.auth);
  const { pathname } = useLocation();
  return (
    <nav className="LeftSideBar">
      <div className="leftSideBar-top">
        <Link to="/" className="logo">
          <img
            src="/assets/icons/camera-retro-solid.svg"
            alt="logo"
            width={28}
            height={28}
          />
          <h1>ShareMe</h1>
        </Link>

        {/* <Link to="/profile" className="leftSideBar-profile">
          <img
            src={
              auth.user?.profilePicture
                ? auth.user?.profilePicture
                : "/assets/icons/profile-placeholder.svg"
            }
            alt="profile"
            width={55}
            height={55}
          />
          <div className="leftSideBar-profile-names">
            <p className="leftSideBar-name">{auth.user?.name}</p>
            <p className="leftSideBar-username">@{auth.user?.username}</p>
          </div>
        </Link> */}

        <div className="leftSideBar-links">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.route;
            return (
              <NavLink to={link.route}
                className={
                  isActive ? "leftSideBar-link active" : "leftSideBar-link"
                }
                key={link.label}
              >
                  <img
                    src={isActive ? link.isActive : link.imgURL}
                    alt={link.label}
                    className={
                      isActive ? "leftSideBar-icon active" : "leftSideBar-icon"
                    }
                  />
                  {link.label}
              </NavLink>
            );
          })}
          <NavLink to="/inbox" className="leftSideBar-link">
            <img
              src="/assets/icons/chat.svg"
              alt="inbox"
              // className={isActive ? "leftSideBar-icon active" : "leftSideBar-icon"}
              className="leftSideBar-icon"
            />
            Inbox
          </NavLink>
          <NavLink to="/profile/:userId" className="leftSideBar-link">
            <img
              src={auth.user?.profilePicture ? auth.user?.profilePicture : "/assets/icons/profile-placeholder.svg"}
              alt="profile"
              className="leftSideBar-icon"
            />
            Profile
          </NavLink>

          <NavLink to="/account/edit" className="leftSideBar-link">
            <img
              src={pathname === "/account/edit" ? "/assets/icons/settings-solid.svg" : "/assets/icons/settings.svg"}
              alt="settings"
              className="leftSideBar-icon"
            />
            Settings
          </NavLink>
        </div>
      </div>
      <button className="leftSideBar-logout">
        <img src="/assets/icons/logout.svg" alt="logout" />
        Logout
      </button>
    </nav>
  );
};

export default LeftSideBar;
