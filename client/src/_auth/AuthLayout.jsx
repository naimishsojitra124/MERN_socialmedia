import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const AuthLayout = () => {
  const auth = useSelector((state) => state.auth);
  return (
    <>
      {auth.token ? (
        <Navigate to='/' />
      ) : (
        <section>
          <Outlet />
        </section>
      )}
    </>
  );
};

export default AuthLayout;
