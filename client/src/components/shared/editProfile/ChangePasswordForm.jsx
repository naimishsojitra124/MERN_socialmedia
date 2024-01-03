import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../../index';
import { changePassword } from '../../../redux/actions/profileAction';

const ChangePasswordForm = () => {
  // State
  const initialState = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };
  const [formData, setFormData] = useState(initialState);
  const { oldPassword, newPassword, confirmPassword } = formData;
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile);
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  // Handle input change event
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    dispatch(changePassword({ formData, auth }));
  };

  return (
    <form className='ChangePasswordForm' onSubmit={handleChangePassword}>
      <div className='change-pass-form-header'>
        <div className='change-pass-header-left'>
          <img
            src={
              auth.user?.profilePicture
                ? auth.user?.profilePicture
                : '/assets/icons/profile-placeholder.svg'
            }
            alt='profile-img'
            className='change-pass-profile-img'
            loading='lazy'
          />
        </div>
        <div className='change-pass-header-right'>
          <span className='change-pass-header-username'>
            @{auth?.user?.username}
          </span>
        </div>
      </div>
      <div className='change-pass-form-body'>
        <div className='change-pass-body-item'>
          <div className='change-pass-body-left'>Old Password</div>
          <div className='change-pass-body-right'>
            <div className='change-pass-body-input'>
              <input
                type={showOldPass ? 'text' : 'password'}
                name='oldPassword'
                className='change-pass-body-input'
                placeholder='Old Password'
                // style={{
                //   border: "2px solid #ff0e41",
                // }}
                value={oldPassword}
                onChange={handleChangeInput}
              />
              <img
                src={
                  showOldPass
                    ? '/assets/icons/eye-slash.svg'
                    : '/assets/icons/eye.svg'
                }
                alt='eye'
                className='change-pass-show-icon'
                onClick={() => setShowOldPass(!showOldPass)}
              />
            </div>
            {/* <small>Password must contain atleast 1 lower case letter. </small> */}
          </div>
        </div>
        <div className='change-pass-body-item'>
          <div className='change-pass-body-left'>New Password</div>
          <div className='change-pass-body-right'>
            <div className='change-pass-body-input'>
              <input
                type={showNewPass ? 'text' : 'password'}
                name='newPassword'
                className='change-pass-body-input'
                placeholder='New Password'
                style={{
                  border: alert.newPassword ? '2px solid #ff0e41' : '',
                }}
                value={newPassword}
                onChange={handleChangeInput}
              />
              <img
                src={
                  showNewPass
                    ? '/assets/icons/eye-slash.svg'
                    : '/assets/icons/eye.svg'
                }
                alt='eye'
                className='change-pass-show-icon'
                onClick={() => setShowNewPass(!showNewPass)}
              />
            </div>
            <small>{alert.newPassword ? alert.newPassword : ''}</small>
          </div>
        </div>
        <div className='change-pass-body-item'>
          <div className='change-pass-body-left'>Confirm Password</div>
          <div className='change-pass-body-right'>
            <div className='change-pass-body-input'>
              <input
                name='confirmPassword'
                type={showConfirmPass ? 'text' : 'password'}
                className='change-pass-body-input'
                placeholder='Confirm Password'
                style={{
                  border: alert.confirmPassword ? '2px solid #ff0e41' : '',
                }}
                value={confirmPassword}
                onChange={handleChangeInput}
              />
              <img
                src={
                  showConfirmPass
                    ? '/assets/icons/eye-slash.svg'
                    : '/assets/icons/eye.svg'
                }
                alt='eye'
                className='change-pass-show-icon'
                onClick={() => setShowConfirmPass(!showConfirmPass)}
              />
            </div>
            <small>{alert.confirmPassword ? alert.confirmPassword : ''}</small>
          </div>
        </div>
      </div>

      <div className='change-pass-form-footer'>
        <button className='change-pass-forgot-btn'>Forgot Password?</button>
        <button
          type='submit'
          className='change-pass-btn'
          disabled={
            !oldPassword && !newPassword && !confirmPassword
              ? true
              : profile.loading
                ? true
                : false
          }>
          {profile.loading ? (
            <>
              <Loader size='small' stroke='white' />
              Saving...
            </>
          ) : (
            <>Change Password</>
          )}
        </button>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
