import React, { useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { TYPES } from "../../redux/actions/authAction";
import { postDataAPI } from "../../utils/fetchData";
import { createPost } from "../../redux/actions/postAction";

// Constants
const SUPPORTED_FORMATS = ["image/jpeg", "image/png", "image/jpg"];

const CreatePost = () => {
  // State
  const initialState = useMemo(
    () => ({
      caption: "",
      location: "",
    }),
    []
  );

  const [postData, setPostData] = useState(initialState);

  const { caption, location } = postData;
  const [img, setImg] = useState([]);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Handle input changes for caption and location
  const handleInputChange = ({ target: { name, value } }) => {
    setPostData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle file changes when selecting images
  const handleFileChange = (e) => {
    // Extract selected files from the event
    const files = [...e.target.files];

    // Array to store valid files
    let newFiles = [];

    // Iterate through selected files
    files.forEach((file) => {
      // Check if the file type is supported
      if (!SUPPORTED_FORMATS.includes(file.type)) {
        // Dispatch an alert for unsupported file format
        return dispatch({
          type: TYPES.ALERT,
          payload: {
            error: `Unsupported file format. Please upload images in ${SUPPORTED_FORMATS.join(
              ", "
            )} format.`,
          },
        });
      } else {
        // Add valid file to the newFiles array
        newFiles.push(file);
      }
    });

    // Update the file state with the new valid files
    setImg((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form
    if (img.length > 10) {
      return dispatch({
        type: TYPES.ALERT,
        payload: { error: "You can only upload up to 10 images." },
      });
    } else if (!caption.trim()) {
      return dispatch({
        type: TYPES.ALERT,
        payload: { error: "Caption is required." },
      });
    } else if (caption.split("\n")) {
      if (caption.split("\n").length > 20) {
        return dispatch({
          type: TYPES.ALERT,
          payload: { error: "You can only have up to 20 lines in a caption." },
        });
      }
    }

    const newPost = {
      caption,
      location,
      images: [],
    };

    if (img.length > 0) {
      try {
        for (let i = 0; i < img.length; i++) {
          const formData = new FormData();
          formData.append("caption", caption);
          formData.append("files", img[i]);

          const res = await postDataAPI(
            `upload/uploadPostImgs/${auth.user?._id}`,
            formData
          );
          newPost.images.push({ imgUrl : res.data.imgUrl, public_id: res.data.public_id });

          console.log(res);

          if (res.err) {
            return dispatch({
              type: TYPES.ALERT,
              payload: { error: res.err },
            });
          }
        }

        dispatch(createPost({ newPost, auth }));
        setPostData(initialState);
        setImg([]);
      } catch (err) {
        return dispatch({
          type: TYPES.ALERT,
          payload: { error: err.response.data.msg },
        });
      }
    } else {
      return dispatch({
        type: TYPES.ALERT,
        payload: { error: "Please select at least one image." },
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Create Post • SnapThread</title>
      </Helmet>
      <div className="create-post-container">
        <header>
          <img src="/assets/icons/gallery-add.svg" alt="Gallery Add" />
          <h1>Create Post</h1>
        </header>
        <main>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="caption">Caption</label>
              <textarea
                className="createPost-form-textarea"
                placeholder="Write a caption..."
                name="caption"
                maxLength={2200}
                value={caption}
                onChange={handleInputChange}
              />
              <small>{caption.length}/2200</small>
            </div>
            <div className="form-group">
              <label htmlFor="add-photos">Add Photos</label>
              <div className="add-img-container">
                {img.length > 0 ? (
                  <>
                    <div className="selected-imgs-container">
                      <div className="selected-imgs-Wrapper">
                        {img?.map((selectedImage, index) => (
                          <div key={index} className="selected-image-item">
                            <img
                              src={URL.createObjectURL(selectedImage)}
                              alt={`Selected img ${index + 1}`}
                            />
                            <span
                              className="selected-img-cancel"
                              onClick={() => {
                                const updatedFiles = img.filter(
                                  (_, i) => i !== index
                                );
                                setImg(updatedFiles);
                              }}
                            >
                              &times;
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="noImg-container">
                      <img
                        src="/assets/icons/file-upload.svg"
                        alt="File Upload"
                      />
                      <h3>Add Photos Here</h3>
                      <span>PNG, JPG, JPEG</span>
                    </div>
                  </>
                )}
                <div className="img-options">
                  <div className="img-option-select-img">
                    <label htmlFor="file">Select from computer</label>
                    <input
                      type="file"
                      name="file"
                      id="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleFileChange(e)}
                      style={{ display: "none" }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="add-location">Add Location</label>
              <input
                className="createPost-form-input"
                type="text"
                name="location"
                placeholder="Add location"
                maxLength={30}
                value={location}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-btns">
              <button
                type="reset"
                className="createPost-form-btn cancel-button"
                onClick={() => {
                  setPostData(initialState);
                  setImg([]);
                }}
              >
                Cancel
              </button>
              <button type="submit" className="createPost-form-btn post-button">
                Post
              </button>
            </div>
          </form>
        </main>
      </div>
    </>
  );
};

export default CreatePost;
