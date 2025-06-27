import React, { useState } from "react";
import "./InputText.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
function InputText({ name, label, type = "text", formik }) {
  const [hide, setHide] = useState(name == "password");
  let isPassword = type == "password";
  let inputType = isPassword ? (!hide ? "password" : "text") : type;
  return (
    <div className="input__container">
      <div className="input__label__container">
        <label htmlFor={name} className="input__label">
          {label}
        </label>
      </div>
      <div className="input__Box">
        <input
          id={name}
          name={name}
          type={inputType}
          onChange={formik?.handleChange}
          onBlur={formik?.handleBlur}
          value={formik?.values[name]}
          className={type == "password" ? "input__password" : "input__text"}
          placeholder={label}
        />

        {type == "password" && (
          <FontAwesomeIcon
            onClick={() => setHide((pre) => !pre)}
            className="password__eye"
            icon={hide ? faEye : faEyeSlash}
            style={{ color: "#4d007d" }}
          />
        )}
      </div>
      {formik?.touched[name] && formik?.errors[name] && (
        <p>{formik?.errors[name]}</p>
      )}
    </div>
  );
}

export default InputText;
