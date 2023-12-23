import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { TYPES } from "../../redux/actions/authAction";

// Constants
const SUPPORTED_FORMATS = ["image/jpeg", "image/png", "image/jpg"];

const CreatePost = () => {
  // State
  const [postData, setPostData] = useState({
    caption: "",
    tags: [],
    location: "",
  });

  const { caption, tags, location } = postData;
  const [img, setImg] = useState([]);
  const dispatch = useDispatch();

  // Handle input changes for caption, tags, and location
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
          <form>
            <div className="form-group">
              <label htmlFor="caption">Caption</label>
              <textarea
                className="createPost-form-textarea"
                placeholder="Write a caption..."
                name="caption"
                maxLength={150}
                value={caption}
                onChange={handleInputChange}
              />
              <small>{caption.length}/150</small>
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
              <label htmlFor="add-tags">Add Tags</label>
              <input
                type="text"
                name="tags"
                id="tags"
                placeholder="Add tags"
                maxLength={100}
                value={tags}
                onChange={handleInputChange}
              />
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
          </form>
        </main>
        <footer>
          <button className="createPost-form-btn cancel-button">Cancel</button>
          <button className="createPost-form-btn post-button">Post</button>
        </footer>
      </div>
    </>
  );
};

export default CreatePost;
