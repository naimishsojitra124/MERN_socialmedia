import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TYPES } from '../../../redux/actions/authAction';
import { updatePost } from '../../../redux/actions/postAction';
import { deleteDataAPI, postDataAPI } from '../../../utils/fetchData';
import Loader from '../Loader';

// Constants
const SUPPORTED_FORMATS = ['image/jpeg', 'image/png', 'image/jpg'];

const EditPost = () => {
  const auth = useSelector((state) => state.auth);
  const status = useSelector((state) => state.status);
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();
  const initialState = {
    caption: '',
    location: '',
  };
  const [editPostData, setEditPostData] = useState(initialState);
  const { caption, location } = editPostData;
  const [imgs, setImgs] = useState([]);
  useEffect(() => {
    if (status.onEdit) {
      setImgs(status?.post.images);
      setEditPostData(status?.post);
    }
  }, [status]);

  // Handle input changes for caption and location
  const handleChangeInput = ({ target: { name, value } }) => {
    setEditPostData((prevData) => ({ ...prevData, [name]: value }));
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
              ', '
            )} format.`,
          },
        });
      } else {
        // Add valid file to the newFiles array
        newFiles.push(file);
      }
    });

    // Update the file state with the new valid files
    setImgs((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleClose = () => {
    dispatch({
      type: TYPES.STATUS,
      payload: false,
    });
  };

  const handleEditPost = async (e) => {
    e.preventDefault();
    dispatch({ type: TYPES.ALERT, payload: { loading: true } });
    // Old images
    const imgOldURL = status.post.images.map((img) => ({
      public_id: img.public_id,
      imgUrl: img.imgUrl,
    }));

    // New images
    const imgNewURL = imgs.map((img) => img);

    // Find the removed image
    const deletedImg = imgOldURL.filter(
      (oldImg) =>
        !imgNewURL.some((newImg) => newImg.public_id === oldImg.public_id)
    );

    // Get the public_ids of the removed images
    const filenames = deletedImg.map((img) => {
      // Split the public_id using '/' and get the last part (filename)
      const parts = img.public_id.split('/');
      return parts[parts.length - 1];
    });

    // Delete the removed images from Aws S3
    for (let i = 0; i < filenames.length; i++) {
      await deleteDataAPI(
        `upload/deletePostImgs/${filenames[i]}/${auth.user._id}`
      );
    }

    const newImages = [];

    // Upload new images
    if (imgNewURL.length > 0) {
      try {
        for (let i = 0; i < imgNewURL.length; i++) {
          if (imgNewURL[i].imgUrl) {
            newImages.push(imgNewURL[i]);

            continue;
          }
          console.log(imgNewURL[i]);
          const formData = new FormData();
          formData.append('files', imgNewURL[i]);

          const res = await postDataAPI(
            `upload/uploadPostImgs/${auth.user?._id}`,
            formData
          );

          newImages.push({
            imgUrl: res.data.imgUrl,
            public_id: res.data.public_id,
          });

          if (res.err) {
            return dispatch({
              type: TYPES.ALERT,
              payload: { error: res.err },
            });
          }
        }
      } catch (err) {
        dispatch({
          type: TYPES.ALERT,
          payload: {
            error: err.response.data.msg,
          },
        });
      }
    }
    // Update the post
    dispatch(
      updatePost({ caption, location, images: newImages, auth, status })
    );
    dispatch({ type: TYPES.ALERT, payload: { loading: false } });
  };
  return (
    <div className='editpost'>
      <div className='editpost_wrapper'>
        <header className='editpost_header'>
          <h3>Edit Post</h3>
          <span className='editpost_close-btn' onClick={handleClose}>
            &times;
          </span>
        </header>
        <form className='editpost_content' onSubmit={handleEditPost}>
          <div className='editpost_form-group'>
            <label htmlFor='title'>Caption</label>
            <textarea
              name='caption'
              id='caption'
              className='editpost_input'
              value={caption}
              onChange={handleChangeInput}
            />
          </div>

          <div className='editpost_form-group'>
            <label htmlFor='add-photos'>Photos</label>
            <div className='editpost_add-img-container'>
              {imgs.length > 0 && (
                <>
                  <div className='editpost_selected-imgs-container'>
                    <div className='editpost_selected-imgs-wrapper'>
                      {imgs?.map((selectedImage, index) => (
                        <div
                          key={index}
                          className='editpost_selected-image-item'>
                          <img
                            src={
                              selectedImage?.imgUrl
                                ? selectedImage.imgUrl
                                : URL.createObjectURL(selectedImage)
                            }
                            alt={`Selected img ${index + 1}`}
                          />
                          <span
                            className='editpost_selected-img-cancel'
                            onClick={() => {
                              const updatedFiles = imgs.filter(
                                (_, i) => i !== index
                              );
                              setImgs(updatedFiles);
                            }}>
                            &times;
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div className='editpost_img-options'>
                <div className='img-option-select-img'>
                  <label htmlFor='file'>Select from computer</label>
                  <input
                    type='file'
                    name='file'
                    id='file'
                    multiple
                    accept='image/*'
                    onChange={(e) => handleFileChange(e)}
                    style={{ display: 'none' }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='editpost_form-group'>
            <label htmlFor='title'>Location</label>
            <input
              type='text'
              className='editpost_input'
              placeholder='Add location'
              name='location'
              id='location'
              value={location}
              onChange={handleChangeInput}
            />
          </div>

          <div className='editpost_form-btns'>
            <button
              className='editpost_btn editpost_btn-cancel'
              type='reset'
              onClick={handleClose}>
              Cancel
            </button>
            <button
              className='editpost_btn editpost_btn-save'
              type='submit'
              disabled={alert.loading ? true : false}>
              {alert.loading ? (
                <div className='login-loader'>
                  <Loader size='medium' stroke='white' />
                  <span
                    style={{
                      color: 'var(--neutral1-25)',
                    }}>
                    Saving...
                  </span>
                </div>
              ) : (
                'Save'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
