import "./App.css";
import RegisterPage from "./pages/register/RegisterPage";
import { Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import CandidatePage from "./pages/candidatePage/CandidatePage";
import { loginSchema } from "./validation/registration";
import axios from "axios";
import { axiosInstance } from "./features/axiosInstance";
import { useEffect } from "react";
import DashboardPage from "./pages/dashboard/DashboardPage";
import Navbar from "./components/navbar/Navbar";
import ModalComponent from "./components/modal/ModalComponent";
import ConfirmationModal from "./components/modal/ConfirmationModal";
import EmployeePage from "./pages/employee/EmployeePage";
import AuthGuard from "./auth/authGuard";
import AttendancePage from "./pages/attendancePage/AttendancePage";
import LeavePage from "./pages/leavepage/LeavePage";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const loginTime = localStorage.getItem("loginTime");
    const twoHours = 5 * 1000;

    if (loginTime) {
      const timePassed = Date.now() - parseInt(loginTime, 10);

      if (timePassed >= twoHours) {
        handleLogout();
      } else {
        const remainingTime = twoHours - timePassed;
        const timer = setTimeout(handleLogout, remainingTime);

        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loginTime");
    navigate("/login");
  };

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/"
          element={
            <AuthGuard>
              <DashboardPage />
            </AuthGuard>
          }
        >
          <Route
            path="/candidate"
            element={
              <AuthGuard>
                <CandidatePage />
              </AuthGuard>
            }
          />
          <Route
            path="/employee"
            element={
              <AuthGuard>
                <EmployeePage />
              </AuthGuard>
            }
          />
          <Route
            path="/attendance"
            element={
              <AuthGuard>
                <AttendancePage />
              </AuthGuard>
            }
          />

          <Route
            path="/leaves"
            element={
              <AuthGuard>
                <LeavePage />
              </AuthGuard>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
