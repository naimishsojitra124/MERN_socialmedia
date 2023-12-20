import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../../redux/actions/profileAction";
import ProfileInfoButtons from "./ProfileInfoButtons";
import ShowFollowers from "./ShowFollowers";
import ShowFollowings from "./ShowFollowings";

const ProfileInfo = () => {
  // State
  const { userId } = useParams();
  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowings, setShowFollowings] = useState(false);

  // Effect to get user profile
  useEffect(() => {
    if (userId === auth.user?._id) {
      setUserData([auth.user]);
    } else {
      dispatch(getUserProfile({ users: profile.users, userId, auth }));
      const newData = profile.users.filter((user) => user?._id === userId);
      setUserData(newData);
    }
  }, [userId, auth, dispatch, profile.users]);

  return (
    <div className="ProfileInfo">
      {userData.map((user) => (
        <div key={user?._id}>
          <div className="profile-info-top">
            <div className="profile-info-top-left">
              <img
                src={
                  user?.profilePicture
                    ? user?.profilePicture
                    : "/assets/icons/profile-placeholder.svg"
                }
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
                  {/* Show Edit Profile button if user is logged in user */}
                  {userId === auth.user?._id ? (
                    <button
                      className="btn editprofile-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/account/edit");
                      }}
                    >
                      <span>Edit Profile</span>
                      <img
                        src="/assets/icons/edit.svg"
                        alt="edit-profile"
                        style={{ margin: "0 0 0.2rem 0" }}
                      />
                    </button>
                  ) : (
                    <ProfileInfoButtons user={user} />
                  )}
                </div>
              </div>
              <div className="profile-info-right-bottom">
                <div className="profile-info">
                  <span>12</span>
                  <span>Posts</span>
                </div>

                <div className="profile-info">
                  <span
                    onClick={() => {
                      if (
                        user?.followers.some(
                          (user) => user?._id === auth.user?._id
                        )
                      ) {
                        // If user includes logged in user in followers array then show followers
                        setShowFollowers(!showFollowers);
                      } else if (pathname === `/profile/${auth?.user?._id}`) {
                        // If user is logged in user then show followers
                        setShowFollowers(!showFollowers);
                      }
                    }}
                  >
                    {user?.followers?.length}
                  </span>
                  <span>Followers</span>
                </div>

                <div className="profile-info">
                  <span
                    onClick={() => {
                      if (
                        user?.following.some(
                          (user) => user?._id === auth.user?._id
                        )
                      ) {
                        // If user includes logged in user in followers array then show followings
                        setShowFollowings(!showFollowings);
                      } else if (pathname === `/profile/${auth?.user?._id}`) {
                        // If user is logged in user then show followings
                        setShowFollowings(!showFollowings);
                      }
                    }}
                  >
                    {user?.following?.length}
                  </span>
                  <span>Following</span>
                </div>
              </div>
            </div>
          </div>
          <div className="profile-info-bottom">
            <div className="profile-info-bio">
              {user?.bio ? <span>{user?.bio}</span> : "No Bio"}
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
              {userId === auth.user?._id ? (
                <button
                  className="btn editprofile-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/account/edit");
                  }}
                >
                  <span>Edit Profile</span>
                  <img
                    src="/assets/icons/edit.svg"
                    alt="edit-profile"
                    style={{ margin: "0 0 0.2rem 0" }}
                  />
                </button>
              ) : (
                <ProfileInfoButtons user={user} />
              )}
            </div>
          </div>
          
          {/* Show followers and followings */}
          {showFollowers && user?.followers.length > 0 && (
            <ShowFollowers
              user={user?.followers}
              setShowFollowers={setShowFollowers}
            />
          )}
          {showFollowings && user?.following.length > 0 && (
            <ShowFollowings
              user={user?.following}
              setShowFollowings={setShowFollowings}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProfileInfo;
