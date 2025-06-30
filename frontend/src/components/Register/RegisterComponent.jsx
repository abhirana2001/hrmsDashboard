import "./RegisterComponent.css";
import InputText from "../input/InputText";
import Button from "../button/Button";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { registrationSchema } from "../../validation/registration";

import { axiosInstance } from "../../features/axiosInstance";
import { useState } from "react";

function RegisterComponent() {
  const navigate = useNavigate();
  const [message, setMessage] = useState({
    message: "",
    color: "",
  });
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registrationSchema,
    onSubmit: async (values) => {
      try {
        values.role = "hr";
        const res = await axiosInstance.post(`/auth/register`, values);

        setMessage({ message: res?.data?.message, color: "green" });

        navigate("/login");
      } catch (err) {
        setMessage({ message: err?.response?.data?.message, color: "red" });
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="register__form__container">
      <div className="registercomponent__box">
        <div className="registercomponent__title">
          <h2>Welcome to Dashboard</h2>
        </div>
        <div className="register_main">
          <div className="register__name__container">
            <InputText name={"fullName"} formik={formik} label={"Full Name"} />
          </div>
          <div className="register__email__container">
            <InputText
              type="email"
              name={"email"}
              formik={formik}
              label={"Email Address"}
            />
          </div>
          <div className="register__password__container">
            <InputText
              type="password"
              name={"password"}
              formik={formik}
              label={"Password"}
            />
          </div>
          <div className="register__confirm_password*__container">
            <InputText
              type="password"
              name={"confirmPassword"}
              formik={formik}
              label={"Confirm Password*"}
            />
          </div>
        </div>
        <div className="register__btn__container">
          <Button formik={formik} btnType="submit" btnName={"Register"} />
        </div>
        {message.message && (
          <div className="message__container">
            <p style={{ color: message.color }}>{message.message}</p>
          </div>
        )}

        <div className="footer__register__text">
          <p>
            Already have an account?
            <span>
              <Link to="/login"> Login</Link>
            </span>
          </p>
        </div>
      </div>
    </form>
  );
}

export default RegisterComponent;
