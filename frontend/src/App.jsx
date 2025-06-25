import "./App.css";
import RegisterPage from "./pages/register/RegisterPage";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
}

export default App;
