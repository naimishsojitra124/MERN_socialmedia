import React from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TYPES } from "../../redux/actions/authAction";

const Toast = ({ msg, bgColor }) => {
  const dispatch = useDispatch();
  switch (bgColor) {
    case "success":
      toast.success(msg, {
        toastId: bgColor,
        // onClose: () => {
        //   dispatch({ type: TYPES.ALERT, payload: {} });
        // },
      });
      break;
    case "error":
      toast.error(msg, {
        toastId: bgColor,
        // onClose: () => {
        //   dispatch({ type: TYPES.ALERT, payload: {} });
        // },
      });
      break;
    default:
      toast.info(msg, {
        toastId: bgColor,
        // onClose: () => {
        //   dispatch({ type: TYPES.ALERT, payload: {} });
        // },
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
