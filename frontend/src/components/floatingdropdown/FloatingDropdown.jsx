import React, { useState } from "react";
import "./FloatingDropdown.css";

function FloatingDropdown({
  label = "Select Role",
  name = "role",
  options = [],
  formik,
}) {
  const [focused, setFocused] = useState(false);

  const value = formik?.values[name] || "";

  const handleChange = (e) => {
    formik?.setFieldValue(name, e.target.value);
  };

  const handleBlur = () => {
    setFocused(false);
    formik?.setFieldTouched(name, true);
  };

  const shouldFloat = focused || value;

  return (
    <div className={`floating-select-wrapper ${shouldFloat ? "float" : ""}`}>
      <label htmlFor={name} className="floating-select-label">
        {label}
      </label>

      <select
        id={name}
        name={name}
        className="floating-select"
        value={value}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={handleBlur}
        required
      >
        <option value="" disabled hidden></option>
        {options.map((opt, i) => (
          <option key={i} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      {formik?.touched[name] && formik?.errors[name] && (
        <p style={{ color: "red" }}>{formik.errors[name]}</p>
      )}
    </div>
  );
}

export default FloatingDropdown;
