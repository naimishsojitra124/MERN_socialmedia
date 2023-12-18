import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { logout } from "../redux/actions/authAction";

const TopBar = () => {
  // State
  const { userId } = useParams();
  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile);
  const [userData, setUserData] = useState([]);
  const [onSetting, setOnSetting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {pathname} = useLocation();

  // Effect to get user profile
  useEffect(() => {
    if (userId === auth.user?._id) {
      setUserData([auth.user]);
    } else {
      const newData = profile.users.filter((user) => user._id === userId);
      setUserData(newData);
    }
  }, [userId, auth, profile.users]);
  return (
    <>
    {pathname === "/explore" ? <></> : (
      <section className="TopBar">
      <div className="topBar-container">
        <Link to="/" className="topBar-left">
          <img
            src="/assets/icons/camera-retro-solid.svg"
            alt="logo"
            className="topBar-logo"
            width={23}
            height={23}
          />
          {pathname === `/profile/${userId}` ? <></> : <h1>SnapThread</h1>}
        </Link>
        {userId && (
          <div className="topBar-center">
            <div className="topBar-username">
              {userData.map((user) => {
                return <span key={user?._id}>@{user?.username}</span>;
              })}
            </div>
          </div>
        )}
        <div className="topBar-right">
          {userId === auth.user?._id ? (
            <img
              src="/assets/icons/settings.svg"
              alt="settings"
              width={23}
              height={23}
              onClick={() => setOnSetting(!onSetting)}
            />
          ) : (
            <button>
              <img
                src="/assets/icons/bell-solid.svg"
                alt="profile-placeholder"
                width={20}
                height={20}
              />
            </button>
          )}
        </div>
      </div>

      {onSetting && (
        <div className="settings" onClick={() => setOnSetting(!onSetting)}>
          <div className="settings-container">
            <button
              className="settings-btn setting"
              onClick={(e) => {
                e.preventDefault();
                setOnSetting(false);
                navigate("/account/edit");
              }}
            >
              <img
                src="/assets/icons/settings.svg"
                alt="settings-icon"
                height={20}
              />
              Settings
            </button>
            <button
              className="settings-btn logout-btn"
              onClick={() => {
                dispatch(logout());
              }}
            >
              <img
                src="/assets/icons/logout.svg"
                alt="logout-icon"
                height={20}
              />
              Logout
            </button>
            <button
              className="settings-btn"
              onClick={() => setOnSetting(!onSetting)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </section>
    )}
    </>
  );
};

export default TopBar;
