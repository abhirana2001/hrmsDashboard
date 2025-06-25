import React from "react";
import "./InputText.css";
function InputText({ label }) {
  return (
    <div className="input__container">
      <div className="input__label__container">
        <label htmlFor="" className="input__label">
          {label}
        </label>
      </div>
      <div className="input__container">
        <input type="text" className="input__text" placeholder={label} />
      </div>
    </div>
  );
}

export default InputText;
