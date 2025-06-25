import React from "react";
import "./Button.css";

function Button({ btnName }) {
  return <button className="primary__btn">{btnName}</button>;
}

export default Button;
