import { useEffect, useState } from "react";
import "./FloatingSearchInput.css";
import { axiosInstance } from "../../features/axiosInstance";

const allNames = ["Abhishek", "Aditya", "Amit", "Anjali", "Aryan", "Ankita"];

function FloatingSearchInput({ label, name, formik }) {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [filter, setFilter] = useState("");

  const handleFilter = async (fullName) => {
    try {
      const queryParams = new URLSearchParams();

      if (fullName) queryParams.append("fullName", fullName);
      const res = await axiosInstance.get(
        `/filter/present-byname?${queryParams.toString()}
        `
      );
      console.log(res.data.data);

      setSuggestions(res?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      handleFilter(filter);
    }, 200);
    return () => clearTimeout(delay);
  }, [filter]);

  const handleChange = (value) => {
    formik.setFieldValue(name, value);

    setFilter(value);
  };

  const handleSelect = (value) => {
    console.log(value);

    formik.setFieldValue(name, value?.fullName);
    formik.setFieldValue("employeeId", value?.employee);
    formik.setFieldValue(
      "designation",
      `${value?.position} ${value?.department}`
    );

    setSuggestions([]);
  };

  return (
    <div className="floating__search__container">
      <input
        autoComplete="off"
        type="text"
        className="floating__search__input"
        placeholder=" "
        id="searchInput"
        onChange={(e) => handleChange(e.target.value)}
        onBlur={formik?.handleBlur}
        value={formik?.values?.[name]}
        required
      />
      <label htmlFor="searchInput" className="floating__search__label">
        {label}
      </label>

      {suggestions.length > 0 && (
        <ul className="dropdown__suggestions">
          {suggestions.map((item, index) => (
            <li key={index} onClick={() => handleSelect(item)}>
              {item?.fullName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FloatingSearchInput;
