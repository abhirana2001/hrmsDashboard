import React from "react";
import "./TopBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import {
  faBell,
  faEnvelope,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
function TopBar({ pageTitle }) {
  return (
    <div className="topbar__container">
      <div className="page__title__container">
        <h2 className="page__title">{pageTitle}</h2>
      </div>
      <div className="page__profile__icons">
        <FontAwesomeIcon
          className="page__prodile__icon"
          icon={faEnvelope}
          style={{ color: "#000000" }}
        />
        <FontAwesomeIcon
          className="page__prodile__icon"
          icon={faBell}
          style={{ color: "#000000" }}
        />

        <div className="page__profile__icon__profile">
          <FontAwesomeIcon
            className="page__prodile__icon"
            icon={faUser}
            style={{ color: "#000000" }}
          />
          <FontAwesomeIcon
            className="page__prodile__icon"
            icon={faAngleDown}
            style={{ color: "#4d007d" }}
          />
        </div>
      </div>
    </div>
  );
}

export default TopBar;
