import React from "react";
import "./LoginComponent.css";
import Button from "../button/Button";
import { Link, useNavigate } from "react-router-dom";
import InputText from "../input/InputText";
import { useFormik } from "formik";
import { loginSchema } from "../../validation/registration";
import { useState } from "react";
import { axiosInstance } from "../../features/axiosInstance";

function LoginComponent() {
  const navigate = useNavigate();
  const [message, setMessage] = useState({
    message: "",
    color: "",
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const res = await axiosInstance.post(`/auth/login`, values);
        console.log(res);
        localStorage.setItem("token", JSON.stringify(res.data.jwtToken));
        localStorage.setItem("logintime", Date.now());

        setMessage({ message: res?.data?.message, color: "green" });

        navigate("/candidate");
      } catch (err) {
        console.log(err);

        setMessage({ message: err?.response?.data?.message, color: "red" });
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="login__form__container">
      <div className="logincomponent__box">
        <div className="logincomponent__title">
          <h2>Welcome to Dashboard</h2>
        </div>
        <div className="login_main">
          <div className="register__email__container">
            <InputText name={"email"} formik={formik} label={"Email Address"} />
          </div>
          <div className="register__password__container">
            <InputText
              type="password"
              name={"password"}
              formik={formik}
              label={"Password"}
            />
          </div>
        </div>

        <div className="login__btn__container">
          <Button btnType="submit" btnName={"Login"} />
        </div>
        {message.message && (
          <div className="message__container">
            <p style={{ color: message.color }}>{message.message}</p>
          </div>
        )}
        <div className="footer__login__text">
          <p>
            Don't have an account?
            <span>
              <Link className="nav-link" to="/register">
                {" "}
                Register
              </Link>
            </span>
          </p>
        </div>
      </div>
    </form>
  );
}

export default LoginComponent;
