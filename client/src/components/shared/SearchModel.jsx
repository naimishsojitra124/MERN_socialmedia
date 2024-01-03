import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const SearchModel = ({ user, handleClose }) => {
  // const auth = useSelector((state) => state.auth);
  return (
    <div className='searchodel-container'>
      <NavLink
        to={`/profile/${user?._id}`}
        key={user._id}
        className='searchresult-link'
        onClick={handleClose}>
        <img
          src={
            user?.profilePicture
              ? user?.profilePicture
              : '/assets/icons/profile-placeholder.svg'
          }
          alt='profile'
          className='searchmodel-profilePic'
          loading='lazy'
        />
        <div className='searchmodel-userinfo'>
          <span className='searchmodel-username'>{user?.username}</span>
          <span className='searchmodel-name'>
            {user?.name}
            <span className='searchmodel-following-dot'>•</span>
            <span className='searchmodel-following-status'>
              {/* ${auth.user.followings.map((user) => {
              return user._id;
            }).includes(user._id)
            ? "Following"
            : ""
        } */}{' '}
              Following
            </span>
          </span>
        </div>
      </NavLink>
    </div>
  );
};

SearchModel.propTypes = {
  user: PropTypes.object,
  handleClose: PropTypes.func,
};

export default SearchModel;
