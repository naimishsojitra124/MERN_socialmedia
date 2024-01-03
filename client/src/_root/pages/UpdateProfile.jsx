import React from 'react';
import { Helmet } from 'react-helmet';
import { EditProfileForm, ChangePasswordForm } from '../../components/index';

const UpdateProfile = () => {
  return (
    <>
      <Helmet>
        <title>Edit Profile • SnapThread</title>
      </Helmet>
      <div className='UpdateProfile'>
        <div className='update-profile-container'>
          <input
            type='radio'
            name='indicator'
            id='edit-profile'
            defaultChecked
          />
          <input type='radio' name='indicator' id='change-password' />
          <div className='tab-container'>
            <label htmlFor='edit-profile' className='edit-profile'>
              <span>Edit Profile</span>
            </label>
            <label htmlFor='change-password' className='change-password'>
              <span>Change Password</span>
            </label>
            <div className='indicator'></div>
          </div>
          <div className='tab-content'>
            <div className='edit-profile-form'>
              <EditProfileForm />
            </div>
            <div className='change-password-form'>
              <ChangePasswordForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
