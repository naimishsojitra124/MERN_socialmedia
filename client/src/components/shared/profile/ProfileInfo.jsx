import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../../redux/actions/profileAction";
import ProfileInfoButtons from "./ProfileInfoButtons";

const ProfileInfo = () => {
  // State
  const { userId } = useParams();
  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState([]);

  // Effect to get user profile
  useEffect(() => {
    if (userId === auth.user?._id) {
      setUserData([auth.user]);
    } else {
      dispatch(getUserProfile({ users: profile.users, userId, auth }));
      const newData = profile.users.filter((user) => user._id === userId);
      setUserData(newData);
    }
  }, [userId, auth, dispatch, profile.users]);
  return (
    <div className="ProfileInfo">
      {userData.map((user) => (
        <div key={user._id}>
          <div className="profile-info-top">
            <div className="profile-info-top-left">
              <img
                src={user?.profilePicture ? user?.profilePicture : "/assets/icons/profile-placeholder.svg"}
                alt="profile-pic"
                className="profile-pic"
                loading="lazy"
              />
            </div>
            <div className="profile-info-top-right">
              <div className="profile-info-right-top">
                <div className="profile-info-names">
                  <div className="profile-info-name">
                    <span>{user?.name}</span>
                  </div>
                  <div className="profile-info-username">@{user?.username}</div>
                </div>
                <div className="profile-info-buttons">
                  <ProfileInfoButtons />
                </div>
              </div>
              <div className="profile-info-right-bottom">
                <div className="profile-info">
                  <span>12</span>
                  <span>Posts</span>
                </div>

                <div className="profile-info">
                  <span>6450</span>
                  <span>Followers</span>
                </div>

                <div className="profile-info">
                  <span>320</span>
                  <span>Following</span>
                </div>
              </div>
            </div>
          </div>
          <div className="profile-info-bottom">
            <div className="profile-info-bio">
              {user?.bio ? <span>𝓛𝓲𝓿𝓮📿𝓛𝓪𝓾𝓰𝓱😊𝓛𝓸𝓥𝓮🤍</span> : "No Bio"}
            </div>
            {user?.website && (
              <div className="profile-info-website">
                <img
                  src="/assets/icons/link.svg"
                  alt="link"
                  className="link-icon"
                  height={16}
                />
                <a href={user?.website} target="_blank" rel="noreferrer">
                  {user?.website}
                </a>
              </div>
            )}
            <div className="profile-buttons-mobile">
              <ProfileInfoButtons />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileInfo;
