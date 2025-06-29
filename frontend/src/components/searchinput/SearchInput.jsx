import React from "react";
import "./SearchInput.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
function SearchInput({ setFunc }) {
  return (
    <div className="search__input__container">
      <FontAwesomeIcon
        className="search__input__icon"
        icon={faMagnifyingGlass}
      />

      <input
        type="text"
        placeholder={"Search"}
        name="searchInput"
        className="search__input"
        onChange={(e) =>
          setFunc((pre) => ({ ...pre, fullName: e.target.value }))
        }
      />
    </div>
  );
}

export default SearchInput;
