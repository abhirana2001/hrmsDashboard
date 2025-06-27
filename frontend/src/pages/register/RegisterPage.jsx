import "./registerPage.css";
import Carousel from "../../components/carousel/Carousel ";
import RegisterComponent from "../../components/register/RegisterComponent";
import Logo from "../../components/logo/Logo";

function RegisterPage() {
  return (
    <div className="register__body">
      <div className="register__container">
        <div className="logo_box">
          {" "}
          <Logo />
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
