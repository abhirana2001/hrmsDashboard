import React from "react";
import LoginComponent from "../../components/login/LoginComponent";
import Carousel from "../../components/carousel/Carousel ";
import "./LoginPage.css";
import Logo from "../../components/logo/Logo";

function LoginPage() {
  return (
    <div className="login__body">
      <div className="login__container">
        <div className="logo__box">
          <Logo />
        </div>

        <div className="login__box">
          <div className="carousel__box">
            <Carousel />
          </div>
          <div className="logincomponent__box">
            <LoginComponent />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
