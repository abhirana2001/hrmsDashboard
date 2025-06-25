import React from "react";
import "./RegisterComponent.css";
import InputText from "../input/InputText";
import Button from "../button/Button";
import { Link } from "react-router-dom";
function RegisterComponent() {
  return (
    <form className="register__form__container">
      <div className="registercomponent__box">
        <div className="registercomponent__title">
          <h2>Welcome to Dashboard</h2>
        </div>
        <div className="register_main">
          <div className="register__name__container">
            <InputText label={"Full Name"} />
          </div>
          <div className="register__email__container">
            <InputText label={"Email Address"} />
          </div>
          <div className="register__password__container">
            <InputText label={"Password"} />
          </div>
          <div className="register__confirm_password*__container">
            <InputText label={"Confirm Password*"} />
          </div>
        </div>
        <div className="register__btn__container">
          <Button btnName={"Register"} />
        </div>
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
