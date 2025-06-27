import React from "react";
import "./FloatingLabelInput.css";
function FloatingLabelInput({ name, label, type = "text", formik }) {
  return (
    <div className="floating__input">
      <input
        id={name}
        name={name}
        type={type}
        onChange={formik?.handleChange}
        onBlur={formik?.handleBlur}
        value={formik?.values[name]}
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
