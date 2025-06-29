import React from "react";
import "./NavBar.css";
import Logo from "../logo/Logo";
import SearchInput from "../searchinput/SearchInput";
import { NavLink } from "react-router-dom";
import LogOutPage from "../../pages/logoutpage/LogOutPage";
import { useState } from "react";
function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && <LogOutPage setOpen={setOpen} />}
      <div className="sidebar__container">
        <div className="frame__container">
          <div className="frame__box">
            <div className="frame__logo">
              <img src="/icons/Property 1=Checkbox inactive.png" alt="" />{" "}
              <h1>LOGO</h1>
            </div>
            <div className="frame__searchbar">
              <SearchInput />
            </div>
          </div>
        </div>
        <div className="left__pannel">
          <div className="left__pannel_link__container">
            <h3 className="link__title">Recruiment</h3>

            <ul>
              <li>
                {" "}
                <NavLink
                  to={"/candidate"}
                  className={({ isActive }) =>
                    isActive ? "link__name active" : "link__name"
                  }
                >
                  {" "}
                  <img src="/icons/Property 1=user-add.png" alt="" />
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
                  <img src="/icons/Property 1=users.png" alt="" /> Employees
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
                  <img src="/icons/Property 1=attandance.png" alt="" />
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
                  <img src="/icons/Icon-leave.png" alt="" />
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
                  <img src="/icons/Property 1=log-out@2x.png" alt="" />
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
