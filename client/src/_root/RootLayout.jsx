import React from 'react';
import { BottomBar, LeftSideBar, TopBar } from '../components/index';
import { Navigate, Outlet } from 'react-router-dom';
const RootLayout = () => {
  const firstLogin = localStorage.getItem('firstLogin');
  return (
    <div className='RootLayout'>
      <TopBar />
      <LeftSideBar />

      {/* If firstLogin is true, then render the Outlet component, otherwise, redirect to the login page. */}
      {firstLogin ? (
        <section className='root-section'>
          <Outlet />
        </section>
      ) : (
        <Navigate to='/login' />
      )}

      <BottomBar />
    </div>
  );
};

export default RootLayout;
