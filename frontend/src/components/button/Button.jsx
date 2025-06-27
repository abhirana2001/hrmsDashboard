import React from "react";
import "./Button.css";

function Button({ func, btnName, btnType = "button", outline = false, data }) {
  return (
    <button
      onClick={() => func(data)}
      type={btnType}
      className={`  ${outline ? "outline__btn" : "primary__btn"}`}
    >
      {btnName}
    </button>
  );
}

export default Button;
