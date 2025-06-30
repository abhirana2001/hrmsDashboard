import React from "react";
import "./NavBar.css";
import Logo from "../logo/Logo";
import SearchInput, { StaticSearchInput } from "../searchinput/SearchInput";
import { NavLink } from "react-router-dom";
import LogOutPage from "../../pages/logoutpage/LogOutPage";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartSimple,
  faRightFromBracket,
  faSliders,
  faStar,
  faUsers,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
function Navbar({ handleSlideBar }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && <LogOutPage setOpen={setOpen} />}
      <div className="sidebar__container">
        <div className="frame__container">
          <div className="frame__box">
            <div className="slider__wrapper">
              <div className="frame__logo">
                <img src="/icons/Property 1=Checkbox inactive.png" alt="" />{" "}
                <h1>LOGO</h1>
              </div>

              <FontAwesomeIcon
                onClick={handleSlideBar}
                className="slider__close"
                icon={faXmark}
                style={{ color: "#4d007d" }}
              />
            </div>
            <div className="frame__searchbar">
              <StaticSearchInput />
            </div>
          </div>
        </div>
        <div className="left__pannel">
          <div className="left__pannel_link__container">
            <h3 className="link__title">Recruiment</h3>

            <ul>
              <li>
                <NavLink
                  to={"/candidate"}
                  className={({ isActive }) =>
                    isActive ? "link__name active" : "link__name"
                  }
                >
                  {" "}
                  <FontAwesomeIcon
                    className="faws"
                    icon={faUserPlus}
                    style={{ color: "#000000" }}
                  />
                  Candidate
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="left__pannel_link__container">
            <h3 className="link__title">Organization</h3>
            <ul>
              <li>
                <NavLink
                  to={"/employee"}
                  className={({ isActive }) =>
                    isActive ? "link__name active" : "link__name"
                  }
                >
                  {" "}
                  <FontAwesomeIcon
                    className="faws"
                    icon={faUsers}
                    style={{ color: "#000000" }}
                  />{" "}
                  Employees
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/attendance"}
                  className={({ isActive }) =>
                    isActive ? "link__name active" : "link__name"
                  }
                >
                  {" "}
                  <FontAwesomeIcon
                    className="faws"
                    icon={faChartSimple}
                    style={{ color: "#000000" }}
                  />
                  Attendance
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/leaves"}
                  className={({ isActive }) =>
                    isActive ? "link__name active" : "link__name"
                  }
                >
                  {" "}
                  <FontAwesomeIcon
                    className="faws"
                    icon={faStar}
                    style={{ color: "#000000" }}
                  />
                  Leaves
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="left__pannel_link__container">
            <h3 className="link__title">Others</h3>

            <ul>
              <li>
                <span
                  className="link__name"
                  onClick={() => setOpen((pre) => !pre)}
                >
                  <FontAwesomeIcon
                    className="faws"
                    icon={faRightFromBracket}
                    style={{ color: "#000000" }}
                  />
                  Logout
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
