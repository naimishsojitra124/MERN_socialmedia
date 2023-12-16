import React from "react";
import { bottombarLinks } from "../constants";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const BottomBar = () => {
  // State
  const { pathname } = useLocation();
  const auth = useSelector((state) => state.auth);
  console.log(pathname);
  console.log(auth.user?._id);
  console.log(pathname === `/profile/${auth.user?._id}` ? "true" : "false");
  return (
    <>
      {pathname === "/account/edit" ? (
        <></>
      ) : (
        <>
          <section className="BottomBar">
            {/* Bottom icon links */}
            {bottombarLinks.map((link) => {
              const isActive = pathname === link.route;
              return (
                <NavLink
                  to={link.route}
                  className="bottomBar-link"
                  key={link.label}
                >
                  <img
                    src={isActive ? link.isActive : link.imgURL}
                    alt={link.label}
                    className="bottomBar-icon"
                    height={23}
                    width={23}
                  />
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
            </NavLink>
            <NavLink
              to={`/profile/${auth.user?._id}`}
              className="bottomBar-link"
            >
              <img
                src={
                  auth.user?.profilePicture
                    ? auth.user?.profilePicture
                    : "/assets/icons/profile-placeholder.svg"
                }
                alt="profilePicture"
                className={
                  pathname === `/profile/${auth.user?._id}`
                    ? "bottomBar-profileIcon bottom-profile-active"
                    : "bottomBar-profileIcon"
                }
                loading="lazy"
              />
            </NavLink>
          </section>
        </>
      )}
    </>
  );
};

export default BottomBar;
