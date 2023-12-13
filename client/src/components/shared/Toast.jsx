import React from "react";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = ({ msg, bgColor }) => {
  switch (bgColor) {
    case "success":
      toast.success(msg, {
        toastId: bgColor,
      });
      break;
    case "error":
      toast.error(msg, {
        toastId: bgColor,
      });
      break;
    default:
      toast.info(msg, {
        toastId: bgColor,
      });
      break;
  }

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        transition={Zoom}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Toast;
