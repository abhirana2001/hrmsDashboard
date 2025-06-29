import React from "react";
import "./FloatingLabelInput.css";
function FloatingLabelInput({ name, label, type = "text", formik, disable }) {
  return (
    <div className="floating__input">
      <input
        style={disable ? { border: "1px solid rgba(229, 229, 229, 1)" } : null}
        autoComplete="off"
        id={name}
        name={name}
        type={type}
        onChange={formik?.handleChange}
        onBlur={formik?.handleBlur}
        value={formik?.values?.[name]}
        required
      />
      <label htmlFor={name}>{label}</label>
      {formik?.touched[name] && formik?.errors[name] && (
        <p style={{ color: "red" }} className="input-error">
          {formik.errors[name]}
        </p>
      )}
    </div>
  );
}

export default FloatingLabelInput;
