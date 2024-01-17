import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sidebarLinks } from '../constants/index';
import { logout } from '../redux/actions/authAction';

const LeftSideBar = () => {
  // State
  const auth = useSelector((state) => state.auth);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  return (
    <nav className='LeftSideBar'>
      <div className='leftSideBar-top'>
        <NavLink to='/' className='logo'>
          <img src='/assets/icons/snapThread.svg' alt='logo' />
          <span>SnapThread</span>
        </NavLink>

        {/* Left side icon links */}
        <div className='leftSideBar-links'>
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.route;
            return (
              <NavLink
                to={link.route}
                className={
                  isActive ? 'leftSideBar-link active' : 'leftSideBar-link'
                }
                key={link.label}>
                <img
                  src={isActive ? link.isActive : link.imgURL}
                  alt={link.label}
                  className={
                    isActive ? 'leftSideBar-icon active' : 'leftSideBar-icon'
                  }
                />
                {link.label}
              </NavLink>
            );
          })}

          <NavLink
            to={`/profile/${auth.user?._id}`}
            className='leftSideBar-link'>
            <img
              src={
                auth.user?.profilePicture
                  ? auth.user?.profilePicture
                  : '/assets/icons/profile-placeholder.svg'
              }
              alt='profilePicture'
              className={
                pathname === `/profile/${auth.user?._id}`
                  ? 'leftSideBar-icon profilePic leftSideBar-pic-active'
                  : 'leftSideBar-icon profilePic'
              }
              loading='lazy'
            />
            Profile
          </NavLink>
        </div>
      </div>
      <button
        className='leftSideBar-logout'
        onClick={() => {
          dispatch(logout());
        }}>
        <img src='/assets/icons/logout.svg' alt='logout' />
        Logout
      </button>
    </nav>
  );
};

export default LeftSideBar;
