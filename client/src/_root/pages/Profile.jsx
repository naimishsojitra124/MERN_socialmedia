import React from "react";
import { Helmet } from "react-helmet";
import { ProfileInfo, Posts } from "../../components/index";

const Profile = () => {
  return (
    <>
    <Helmet>
        <title>Profile</title>
      </Helmet>

    <div className="Profile">
      <ProfileInfo />
      <Posts />
    </div>
    </>
  );
};

export default Profile;
