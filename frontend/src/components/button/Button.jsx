import React from "react";
import "./Button.css";

function Button({
  func,
  btnName,
  btnType = "button",
  outline = false,
  data,
  formik,
}) {
  const isFormikValid = formik?.isValid && formik?.dirty;

  return (
    <button
      type={btnType}
      disabled={formik ? !isFormikValid : false}
      onClick={() => func && func(data)}
      className={outline ? "outline__btn" : "primary__btn"}
      style={
        formik
          ? {
              backgroundColor: isFormikValid ? "#4B0082" : "#ccc",
              color: "#fff",
              cursor: isFormikValid ? "pointer" : "not-allowed",
            }
          : {}
      }
    >
      {btnName}
    </button>
  );
}
export default Button;
