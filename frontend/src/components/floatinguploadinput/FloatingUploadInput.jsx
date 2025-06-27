import React from "react";
import "./FloatingUploadInput.css";
import { useState } from "react";
import { useRef } from "react";
function FloatingUploadInput({ name, label, type = "text", formik }) {
  const [isFocused, setIsFocused] = useState(false);

  const file = formik?.values[name];
  const fileName = file?.name || "";

  const handleChange = (e) => {
    const file = e.target.files[0];
    formik.setFieldValue(name, file);
  };

  const shouldFloat = isFocused || fileName;

  return (
    <div className={`floating-file-wrapper ${shouldFloat ? "float" : ""}`}>
      <label htmlFor={name} className="floating-label">
        {label}
      </label>
      <input
        type="file"
        id={name}
        name={name}
        className="hidden-input"
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
          formik.setFieldTouched(name, true);
        }}
      />
      <div
        className="fake-input"
        onClick={() => document.getElementById(name).click()}
      >
        {fileName || ""}
      </div>
      {formik?.touched[name] && formik?.errors[name] && (
        <p className="input-error">{formik.errors[name]}</p>
      )}
    </div>
  );
}

export default FloatingUploadInput;
