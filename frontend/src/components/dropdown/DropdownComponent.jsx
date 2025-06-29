import React from "react";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./DropdownComponent.css";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

function DropdownComponent({
  name,
  onSelect,
  select = "",
  content,
  dropTitle,
  payload,
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(select);

  const ref = useRef(null);
  const handleToggle = () => {
    setOpen((pre) => !pre);
  };

  const handleSelect = (value) => {
    setSelected(value);
    onSelect?.(value, payload, name);
    setOpen(false);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("mouseout", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.addEventListener("mouseout", handleClickOutside);
    };
  }, [ref]);

  function handleColor(item) {
    switch (item) {
      case "Scheduled":
        return "rgba(232, 176, 0, 1)";
      case "Ongoing":
        return "green";
      case "Rejected":
        return "red";
      case "Present":
        return "green";
      case "Approved":
        return "green";
      case "Absent":
        return "red";
      default:
        return "#4d007d";
    }
  }

  return (
    <div className="dropdown__container" ref={ref}>
      <div
        onClick={handleToggle}
        className={`dropdown__button ${open ? "button__up" : null}`}
      >
        <p style={{ color: handleColor(selected) }}>
          {" "}
          {selected ? selected : dropTitle}
        </p>
        <span className="toggle__icon">
          <FontAwesomeIcon icon={open ? faAngleUp : faAngleDown} />
        </span>
      </div>
      {open && (
        <div className={`dropdown__content  `}>
          {content?.map((item, index) => {
            return (
              <div
                key={index}
                className="dropdow__items"
                onClick={() => handleSelect(item)}
              >
                {item}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default DropdownComponent;
