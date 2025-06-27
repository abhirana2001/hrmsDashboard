import React from "react";
import "./SearchInput.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
function SearchInput() {
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
      />
    </div>
  );
}

export default SearchInput;
