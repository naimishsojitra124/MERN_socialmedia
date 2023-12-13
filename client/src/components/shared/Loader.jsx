import React from "react";

const Loader = ({ size, stroke }) => {
  let loaderstyles = {};
  if (size === "small") {
    loaderstyles = {
      width: "1rem",
      height: "1rem",
      margin: "0 0.5rem 0 0",
    };
  } else if (size === "medium") {
    loaderstyles = {
      width: "1.25rem",
      height: "1.25rem",
      margin: "0 0.7rem 0 0",
    };
  }
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img
        src={
          stroke === "white"
            ? "/assets/icons/loader-white.svg"
            : "/assets/icons/loader-black.svg"
        }
        alt="loader"
        style={loaderstyles}
      />
    </div>
  );
};

export default Loader;
