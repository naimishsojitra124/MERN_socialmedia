import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Loader } from "../../index";
import { checkImage } from "../../../utils/checkImage";
import { useDispatch, useSelector } from "react-redux";
import { TYPES } from "../../../redux/actions/authAction";
import { deleteDataAPI, postDataAPI } from "../../../utils/fetchData";
import {
  PROFILE_TYPES,
  updateUserProfile,
} from "../../../redux/actions/profileAction";

const EditProfileForm = () => {
  // State
  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const initialState = {
    name: "",
    username: "",
    bio: "",
    website: "",
    email: "",
    gender: "",
    mobile: "",
    dob: "",
  };
  const [formData, setFormData] = useState(initialState);
  const { name, username, bio, website, email, gender, mobile, dob } = formData;
  const [img, setImg] = useState("");

  // Handle input change event
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const changeProfilePicture = (e) => {
    const file = e.target.files[0];
    const err = checkImage(file);
    if (err) return dispatch({ type: TYPES.ALERT, payload: { error: err } });
    setImg(file);
  };

  // Handle submit form event
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (img) {
      const form = new FormData();
      form.append("file", img);
      dispatch({ type: PROFILE_TYPES.LOADING, payload: true });
      
      try {
        // If user has no profile picture
        if (auth.user?.profilePicture === "") {
          const res = await postDataAPI(
            `upload/uploadprofilePic/${auth.user?._id}`,
            form
          );
          formData.profilePicture = res.data.imgUrl;
          console.log(res.data.imgUrl);
        } else {
          // First upload new profile picture
          const res = await postDataAPI(
            `upload/uploadprofilePic/${auth.user?._id}`,
            form
          );
          formData.profilePicture = res.data.imgUrl;

          // Then delete old profile picture
          // Get image name
          const imgName = auth.user?.profilePicture.substring(
            auth.user?.profilePicture.lastIndexOf("/") + 1,
            auth.user?.profilePicture?.length
          );

          // Delete old profile picture
          await deleteDataAPI(
            `upload/deleteprofilePic/${imgName}/${auth.user?._id}`
          );
        }
      } catch (err) {
        dispatch({
          type: TYPES.ALERT,
          payload: { error: err.response.data.msg },
        });
      }
    }

    // Update user profile
    dispatch(updateUserProfile({ formData, auth }));
    window.location.reload();
  };
  return (
    <form action="" className="EditProfileForm" onSubmit={handleSubmit}>
      <div className="edit-form-header">
        <div className="edit-header-left">
          <img
            src={
              img
                ? URL.createObjectURL(img)
                : auth.user?.profilePicture
                ? auth.user?.profilePicture
                : "/assets/icons/profile-placeholder.svg"
            }
            alt="profile-img"
            className="edit-profile-img"
            loading="lazy"
          />
        </div>
        <div className="edit-header-right">
          <div className="edit-header-username">@{auth.user?.username}</div>
          <div className="edit-header-img-input">
            <input
              type="file"
              name="file"
              id="file"
              style={{ display: "none" }}
              accept="image/*"
              onChange={changeProfilePicture}
            />
            <label htmlFor="file" className="edit-header-img-label">
              Change Profile Photo
            </label>
          </div>
        </div>
      </div>
      <div className="edit-form-body">
        <div className="edit-body-item">
          <div className="edit-body-left">Name</div>
          <div className="edit-body-right">
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={handleChangeInput}
              maxLength={20}
              placeholder={auth.user?.name}
            />
            <span>{name?.length || auth.user?.name.length}/20</span>
            <span>
              Help people discover your account by using the name you're known
              by: either your full name, nickname, or business name.
            </span>
          </div>
        </div>

        <div className="edit-body-item">
          <div className="edit-body-left">Username</div>
          <div className="edit-body-right">
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={handleChangeInput}
              maxLength={20}
              placeholder={auth.user?.username}
            />
            <span>{username?.length || auth.user?.username.length}/20</span>
          </div>
        </div>

        <div className="edit-body-item">
          <div className="edit-body-left">Bio</div>
          <div className="edit-body-right">
            <textarea
              id="bio"
              name="bio"
              maxLength={150}
              value={bio}
              onChange={handleChangeInput}
              placeholder={auth.user?.bio ? auth.user?.bio : "Bio"}
            />
            <span>{bio?.length || auth.user?.bio.length}/150</span>
          </div>
        </div>

        <div className="edit-body-item">
          <div className="edit-body-left">Website</div>
          <div className="edit-body-right">
            <input
              type="text"
              name="website"
              id="website"
              value={website}
              onChange={handleChangeInput}
              placeholder={auth.user?.website ? auth.user?.website : "Website"}
            />
          </div>
        </div>

        <div className="edit-body-item">
          <div className="edit-body-right personal-info">
            <h4 style={{ color: "#838daa", fontSize: "1.05rem" }}>
              Personal Information
            </h4>
            <span>
              Provide your personal information, even if the account is used for
              a business, a pet or something else. This won't be a part of your
              public profile.
            </span>
          </div>
        </div>

        <div className="edit-body-item">
          <div className="edit-body-left">Email</div>
          <div className="edit-body-right">
            <input
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={handleChangeInput}
              placeholder={auth.user?.email}
            />
          </div>
        </div>

        <div className="edit-body-item">
          <div className="edit-body-left">Gender</div>
          <div className="edit-body-right">
            <select
              onChange={handleChangeInput}
              name="gender"
              id="gender"
              defaultValue={auth.user?.gender ? auth.user?.gender : ""}
            >
              <option value="" disabled>
                Select your gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="prefer not to say">Prefer not to say</option>
            </select>
          </div>
        </div>

        <div className="edit-body-item">
          <div className="edit-body-left">Phone</div>
          <div className="edit-body-phone-right">
            <PhoneInput
              value={auth.user?.mobile ? auth.user?.mobile : mobile}
              onChange={(mobile) => setFormData({ ...formData, mobile })}
              enableSearch
              disableSearchIcon
              inputClass="edit-body-phone-input"
              containerClass="edit-body-phone-container"
              inputProps={{
                name: "mobile",
                placeholder: "+91 12345-67890",
              }}
              isValid={(value, country) => {
                if (value.match(/12345/)) {
                  return "Invalid value: " + value + ", " + country.name;
                } else if (value.match(/1234/)) {
                  return false;
                } else {
                  return true;
                }
              }}
            />
          </div>
        </div>

        <div className="edit-body-item">
          <div className="edit-body-left">Date of Birth</div>
          <div className="edit-body-right">
            <input
              type={auth.user?.dob ? "text" : "date"}
              name="dob"
              id="dob"
              value={dob}
              onChange={handleChangeInput}
              max={new Date().toISOString().split("T")[0]}
              placeholder={auth.user?.dob ? auth.user?.dob?.split("T")[0] : ""}
              onFocus={(e) => (e.currentTarget.type = "date")}
            />
          </div>
        </div>
      </div>

      <div className="edit-form-footer">
        <button type="reset" className="edit-footer-cancel">
          Cancel
        </button>
        <button
          type="submit"
          className="edit-footer-save"
          disabled={
            !img &&
            !name &&
            !username &&
            !bio &&
            !website &&
            !email &&
            !gender &&
            !mobile &&
            !dob
              ? true
              : profile.loading
              ? true
              : false
          }
        >
          {profile.loading ? (
            <>
              <Loader size="small" stroke="white" />
              Saving...
            </>
          ) : (
            <>Save</>
          )}
        </button>
      </div>
    </form>
  );
};

export default EditProfileForm;