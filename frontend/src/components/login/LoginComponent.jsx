import React from "react";
import "./LoginComponent.css";
import Button from "../button/Button";
import { Link } from "react-router-dom";
import InputText from "../input/InputText";

function LoginComponent() {
  return (
    <form className="login__form__container">
      <div className="logincomponent__box">
        <div className="logincomponent__title">
          <h2>Welcome to Dashboard</h2>
        </div>
        <div className="login_main">
          <div className="login__email__container">
            <InputText label={"Email Address"} />
          </div>
          <div className="login__password__container">
            <InputText label={"Password"} />
          </div>
        </div>
        <div className="login__btn__container">
          <Button btnName={"login"} />
        </div>
        <div className="footer__login__text">
          <p>
            Already have an account?
            <span>
              <Link to="/register"> Register</Link>
            </span>
          </p>
        </div>
      </div>
    </form>
  );
}

export default LoginComponent;
