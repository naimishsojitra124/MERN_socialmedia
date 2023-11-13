import React from "react";
import { Link } from "react-router-dom";

const TopBar = () => {
  return (
    <section className="TopBar">
      <div className="topBar-container">
        <Link to="/" className="topBar-left">
          <img
            src="/assets/icons/camera-retro-solid.svg"
            alt="logo"
            width={28}
            height={28}
          />
          <h1>ShareME</h1>
        </Link>
        <div className="topBar-right">
          <button>
            <img src="/assets/icons/bell-solid.svg" alt="profile-placeholder" width={25} height={25} />
          </button>
          {/* <button>
            <img
              src="/assets/icons/logout.svg"
              alt="logout"
            />
            Logout
          </button> */}
          
        </div>
      </div>
    </section>
  );
};

export default TopBar;
