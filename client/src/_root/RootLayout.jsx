import React from "react";
import { BottomBar, LeftSideBar, TopBar } from "../components/index";
import { Navigate, Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";
const RootLayout = () => {
  // const auth = useSelector((state) => state.auth);
  const firstLogin = localStorage.getItem("firstLogin");
  return (
    <div className="RootLayout">
      <TopBar />
      <LeftSideBar />

      {firstLogin ? (
        <section className="root-section">
          <Outlet />
        </section>
      ) : (
        <Navigate to="/login" />
      )}

      <BottomBar />
    </div>
  );
};

export default RootLayout;
