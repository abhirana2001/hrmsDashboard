import React, { useState } from "react";
import "./SearchInput.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
function SearchInput({ setFunc }) {
  return (
    <div className="search__input__container">
      <FontAwesomeIcon
        className="search__input__icon"
        icon={faMagnifyingGlass}
      />

      <input
        autoComplete={"off"}
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

export const StaticSearchInput = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const allItems = [
    { label: "Candidate", path: "/candidate" },
    { label: "Employee", path: "/employee" },
    { label: "Leaves", path: "/leaves" },
  ];

  const filteredItems = allItems.filter((item) =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (item) => {
    setSearchTerm(item.label);
    setShowResults(false);
    navigate(item.path);
  };

  return (
    <div className="search__input__container">
      <FontAwesomeIcon
        className="search__input__icon"
        icon={faMagnifyingGlass}
      />
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        className="search__input"
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setShowResults(true);
        }}
        onFocus={() => searchTerm && setShowResults(true)}
      />

      {showResults && filteredItems.length > 0 && (
        <ul className="search-results">
          {filteredItems.map((item) => (
            <li
              key={item.label}
              className="result-item"
              onClick={() => handleSelect(item)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
