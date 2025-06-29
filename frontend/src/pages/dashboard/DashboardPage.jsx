import React, { useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./DashboardPage.css";
import TopBar from "../../components/topbar/TopBar";
function DashboardPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const pageTitle = () => {
    switch (location.pathname) {
      case "/candidate":
        return "Candidate";
      case "/attendance":
        return "Attendance";
      case "/employee":
        return "Employee";
      case "/leaves":
        return "Leaves";

      default:
        "HOME";
    }
  };

  useEffect(() => {
    if (location.pathname == "/") {
      navigate("/candidate");
    }
  }, []);

  return (
    <div className="dashboard__container">
      <div className="dashboard__navbar__container">
        <Navbar />
      </div>
      <div className="dashboard__topbar__container">
        <TopBar pageTitle={pageTitle()} />
      </div>
      <div className="main">
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardPage;
