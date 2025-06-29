import "./DotDropdown.css";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { axiosInstance } from "../../features/axiosInstance";
import { data } from "react-router-dom";

function DotDropdown({
  fileUrl,
  _id,
  data,
  confirmModal = () => {},
  currentType,
  onClick,
}) {
  const [open, setOpen] = useState(false);

  const ref = useRef(null);
  const handleToggle = () => {
    setOpen((pre) => !pre);
  };

  function downloadResume(fileUrl) {
    window.open(`${import.meta.env.VITE_BASE_URL}/upload/${fileUrl}`, "_blank");
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <div className="dot__dropdown__container" ref={ref}>
      <div
        onClick={handleToggle}
        className={`dot__dropdown__button ${open ? "button__up" : null}`}
      >
        <span className="dot__toggle__icon">⋮</span>
      </div>
      {open && (
        <div className={`dot__dropdown__content  `}>
          {currentType == "Candidate" && (
            <div
              className="dot__dropdow__items"
              onClick={() => downloadResume(fileUrl)}
            >
              Download Resume
            </div>
          )}
          {(currentType == "Employee" || currentType == "Attendance") && (
            <div className="dot__dropdow__items" onClick={() => onClick(data)}>
              Edit
            </div>
          )}
          {currentType !== "Attendance" && (
            <div
              className="dot__dropdow__items"
              onClick={() => confirmModal(_id)}
            >
              Delete Candidate
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DotDropdown;
