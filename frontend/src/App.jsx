import "./App.css";
import RegisterPage from "./pages/register/RegisterPage";
import { Route, Routes } from "react-router-dom";
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
import LogOutPage from "./pages/logoutpage/LogOutPage";

function App() {
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        axiosInstance.get("/auth/check", {
          withCredentials: true,
        });
      } catch (err) {
        navigate("/login");
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [location.pathname]);

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
            path="/logout"
            element={
              <AuthGuard>
                <LogOutPage />
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
