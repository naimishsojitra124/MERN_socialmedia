import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";
import Carousel from "./Carousel";

const Posts = ({
  post: { user, createdAt, location, images, caption, likes, comments },
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [readMore, setReadMore] = useState(false);

  // Function to render captions
  const renderCaption = () => {
    // Caption rendering logic here
  };

  const handleLike = () => {
    setIsLiked(true);
  };

  const handleUnlike = () => {
    setIsLiked(false);
  };

  const handleSave = () => {
    setIsSaved(true);
  };

  const handleUnsave = () => {
    setIsSaved(false);
  };

  return (
    <div className="Post">
      <div className="post_header">
        <NavLink className="post_header-left">
          <img
            src={
              user?.profilePicture || "/assets/icons/profile-placeholder.svg"
            }
            alt="Profile Picture"
          />
          <div className="post_header-name">
            <h3>{user?.username}</h3>
            <p>
              {moment(createdAt).fromNow()}{" "}
              {location && <>{"• " + `${location}`}</>}
            </p>
          </div>
        </NavLink>
        <div className="post_header-right">
          <img src="/assets/icons/more-vertical.svg" alt="More Vertical Icon" />
        </div>
      </div>
      <div className="post_body">
        <div className="post_body-carousel">
          <Carousel images={images} />
        </div>
        <div className="post_footer">
        <div className="post_footer-icons">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <div className="post_footer-icon-item">
              {isLiked ? (
                <img
                  src="/assets/icons/liked.svg"
                  alt="Liked Icon"
                  onClick={handleUnlike}
                />
              ) : (
                <img
                  src="/assets/icons/like.svg"
                  alt="Like Icon"
                  onClick={handleLike}
                />
              )}
              <p>
                likes
                <span className="post_footer-icon-counter">
                  {likes?.length}
                </span>
              </p>
            </div>
            <div className="post_footer-icon-item">
              <img src="/assets/icons/comment.svg" alt="Comment Icon" />
              <p>
                Comments
                <span className="post_footer-icon-counter">
                  {comments?.length}
                </span>
              </p>
            </div>
          </div>
          <div>
            <div className="post_footer-icon-item save-icon">
              {isSaved ? (
                <img
                  src="/assets/icons/saved.svg"
                  alt="Saved Icon"
                  onClick={handleUnsave}
                />
              ) : (
                <img
                  src="/assets/icons/save.svg"
                  alt="Save Icon"
                  onClick={handleSave}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="post_body-caption">
          {caption.length < 60 && caption.split("\n").length === 1 ? (
            <>
              <p>
                <NavLink
                  className="post_body-caption-username"
                  to={`/profile/${user?._id}`}
                >
                  {user?.username}
                </NavLink>
                {caption.split("\n").map((word, index) => {
                  if (word[0] === "#") {
                    return (
                      <span
                        key={index}
                        style={{ color: "var(--primary-500)" }}
                        className="post_body-caption-hashtag"
                      >
                        {word}
                      </span>
                    );
                  } else {
                    return (
                      <span key={index}>
                        {word}
                        <br />
                      </span>
                    );
                  }
                })}
              </p>
            </>
          ) : (
            <>
              <p>
                {readMore ? (
                  <>
                    <NavLink
                      className="post_body-caption-username"
                      to={`/profile/${user?._id}`}
                    >
                      {user?.username}
                    </NavLink>
                    {caption.split("\n").map((word, index) => {
                      if (word[0] === "#") {
                        return (
                          <span
                            key={index}
                            style={{ color: "var(--primary-500)" }}
                            className="post_body-caption-hashtag"
                          >
                            {word}
                          </span>
                        );
                      } else {
                        return (
                          <span key={index}>
                            {word}
                            <br />
                          </span>
                        );
                      }
                    })}
                  </>
                ) : (
                  <>
                    <NavLink
                      className="post_body-caption-username"
                      to={`/profile/${user?._id}`}
                    >
                      {user?.username}
                    </NavLink>
                    {caption.split("\n").length > 1 ? (
                      <>{caption.split("\n")[0]}</>
                    ) : (
                      <>{caption.slice(0, 60)}</>
                    )}
                  </>
                )}
                <span
                  className="post_body-caption-readMore"
                  onClick={() => setReadMore(!readMore)}
                >
                  {readMore ? "...less" : "...more"}
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Posts;
