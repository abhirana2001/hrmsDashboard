import "./DotDropdown.css";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { axiosInstance } from "../../features/axiosInstance";

function DotDropdown({ fileUrl, _id, confirmModal = () => {} }) {
  const [open, setOpen] = useState(false);
  console.log(fileUrl);

  const ref = useRef(null);
  const handleToggle = () => {
    setOpen((pre) => !pre);
  };

  function downloadResume(fileUrl) {
    window.open(`${import.meta.env.VITE_BASE_URL}upload/${fileUrl}`, "_blank");
  }

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
  console.log(ref);

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
          <div
            className="dot__dropdow__items"
            onClick={() => downloadResume(fileUrl)}
          >
            Download Resume
          </div>
          <div
            className="dot__dropdow__items"
            onClick={() => confirmModal(_id)}
          >
            Delete Candidate
          </div>
        </div>
      )}
    </div>
  );
}

export default DotDropdown;
