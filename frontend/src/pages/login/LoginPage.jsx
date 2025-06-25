import React from "react";
import LoginComponent from "../../components/login/LoginComponent";
import Carousel from "../../components/carousel/Carousel ";
import RegisterComponent from "../../components/register/RegisterComponent";
import "./LoginPage.css";

function LoginPage() {
  return (
    <div className="login__body">
      <div className="login__container">
        <div className="logo_container">
          {" "}
          <img
            src="/icons/Property 1=Checkbox inactive.png"
            height={"44px"}
            width={"44px"}
            alt=""
          />{" "}
          <h1>LOGO</h1>
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
