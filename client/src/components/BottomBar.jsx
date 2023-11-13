import React from "react";
import { bottombarLinks } from "../constants";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const BottomBar = () => {
  const { pathname } = useLocation();
  const auth = useSelector((state) => state.auth);
  return (
    <section className="BottomBar">
      {bottombarLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <NavLink
            to={link.route}
            className={
              isActive ? "bottomBar-link bottom-Link-active" : "bottomBar-link"
            }
            key={link.label}
          >
            <img
              src={isActive ? link.isActive : link.imgURL}
              alt={link.label}
              className={isActive ? "bottomBar-icon bottom-icon-active" : "bottomBar-icon"}
              height={23}
              width={23}
            />
            {/* {link.label} */}
          </NavLink>
        );
      })}
      <NavLink to="/inbox" className="bottomBar-link">
        <img
          src="/assets/icons/chat.svg"
          alt="inbox"
          className="bottomBar-icon"
          height={25}
          width={25}
        />
        {/* Inbox */}
      </NavLink>
      <NavLink to="/profile/:userId" className="bottomBar-link">
        <img
          src={
            auth.user?.profilePicture
              ? auth.user?.profilePicture
              : "/assets/icons/profile-placeholder.svg"
          }
          alt="profile"
          className={pathname === "/profile/:userId" ? "bottomBar-icon profilePic pic-active bottom-icon-active" : "bottomBar-icon profilePic"}
          height={25}
          width={25}
        />
        {/* Profile  */}
      </NavLink>
    </section>
  );
};

export default BottomBar;
