import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { login } from '../../redux/actions/authAction';
import { Loader } from '../../components/index';
import { AnimatePresence, motion } from 'framer-motion';
import {
  fadeAnimation,
  headTextAnimation,
  slideAnimation,
} from '../../config/motion';

const Login = () => {
  // State
  const [showPass, setShowPass] = useState(false);
  const initialState = { email: '', password: '' };
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;

  // Redux store
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  // Handle input change event
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Handle submit form event
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userData));
  };

  return (
    <AnimatePresence>
      <div className='Login'>
        <motion.div className='login-container' {...fadeAnimation}>
          <div className='login-container-left'>
            <div className='login-text'>
              <motion.h1 {...headTextAnimation}>Welcome Back</motion.h1>
            </div>
          </div>
          <div className='login-container-right'>
            <motion.div
              className='login-form-container'
              {...slideAnimation('up')}>
              <h1>Login</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <form action='' onSubmit={handleSubmit} className='login-form'>
                <div className='login-form-group'>
                  <div className='login-input'>
                    <label htmlFor='email'>Email</label>
                    <input
                      type='email'
                      name='email'
                      id='email'
                      placeholder='Enter your email'
                      value={email}
                      onChange={handleChangeInput}
                    />
                  </div>
                </div>
                <div className='login-form-group'>
                  <div className='login-input'>
                    <label htmlFor='password'>Password</label>
                    <div className='password-input-group'>
                      <input
                        type={showPass ? 'text' : 'password'}
                        name='password'
                        id='password'
                        placeholder='Enter your password'
                        className='password-input'
                        value={password}
                        onChange={handleChangeInput}
                      />
                      <img
                        src={
                          showPass
                            ? '/assets/icons/eye-slash.svg'
                            : '/assets/icons/eye.svg'
                        }
                        alt='eye'
                        className='password-icon'
                        onClick={() => setShowPass(!showPass)}
                      />
                    </div>
                  </div>
                </div>
                <div className='login-form-group'>
                  <button
                    type='submit'
                    disabled={
                      email && password && !alert.loading ? false : true
                    }>
                    {alert.loading ? (
                      <div className='login-loader'>
                        <Loader size='medium' stroke='white' />
                        <span
                          style={{
                            color: 'var(--neutral1-25)',
                          }}>
                          Logging in...
                        </span>
                      </div>
                    ) : (
                      'Login'
                    )}
                  </button>
                </div>
                <div className='login-form-group'>
                  <span>Don&apos;t have an account?</span>
                  <NavLink to='/register'>Register</NavLink>
                </div>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Login;
