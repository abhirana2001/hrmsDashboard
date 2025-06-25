import React from "react";
import "./registerPage.css";
import Carousel from "../../components/carousel/Carousel ";
import RegisterComponent from "../../components/register/RegisterComponent";

function RegisterPage() {
  return (
    <div className="register__body">
      <div className="register__container">
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

        <div className="register__box">
          <div className="carousel__box">
            <Carousel />
          </div>
          <div className="registercomponent__box">
            <RegisterComponent />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
