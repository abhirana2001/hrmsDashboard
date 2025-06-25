import React, { Fragment, useState } from "react";
import "./Carousel.css";
function Carousel() {
  const [carouselIndex, setCarouselIndex] = useState(0);

  function changeIndex(index) {
    setCarouselIndex(index);
  }

  const carouselData = [
    {
      img: "/images/carousel/carousel1.jpg",
      title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, saepe.",
      description:
        "Lorem ipsum Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus veniam hic soluta vel temporibus minima quam aliquam magnam voluptas ipsa, accusantiumLorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus veniam hic soluta vel temporibus minima quam aliquam magnam voluptas ipsa, accusantiumdolor sit, amet consectetur adipisicing elit. Necessitatibus veniam hic soluta vel temporibus minima quam aliquam magnam voluptas ipsa, accusantium, corrupti esse fugiat dicta?",
    },
    {
      img: "/images/carousel/carousel2.jpg",
      title:
        "molestiae doloremque delectus officia error velit neque deserunt.",
      description:
        "dolorem quos consectetur deleniti placeat molestias ipsam impedit aperiam natus magni enim molestiae, perferendis minima? Vero sequi, repellat libero eum blanditiis beatae quas! Nam sunt error reiciendis debitis ex reprehenderit repellendus quasi incidunt vel tenetur similique rerum, vero, architecto fugit nesciunt.",
    },
    {
      img: "/images/carousel/carousel3.jpg",
      title:
        "doloremque delectus officia error velit neque deserunt molestiae doloremque ",
      description:
        "similique cupiditate, pariatur sit eveniet consequatur laborum sapiente quae necessitatibus molestiae consectetur veniam iusto distinctio ex! A, eos et ullam dignissimos architecto perferendis nam, corporis cumque quos unde dolore odio voluptate?",
    },
  ];

  return (
    <div className="carousel__wrapper">
      <div className="carousel__container">
        <div className="carousel__box">
          <div className="carousel__img__container">
            <img
              className="carousel__img"
              src={carouselData[carouselIndex].img}
              alt="carousel"
            />
          </div>
          <div className="carousel__info">
            <div className="carousel__title__continer">
              <h3 className="carousel__title">
                {carouselData[carouselIndex].title}
              </h3>
            </div>
            <div className="carousel__description__continer">
              <p className="carousel__description">
                {carouselData[carouselIndex].description.length > 200
                  ? `${carouselData[carouselIndex].description.slice(
                      0,
                      200
                    )}...`
                  : carouselIndex[0].description}
              </p>
            </div>
          </div>
        </div>

        <div className="carousel__silder">
          {carouselData.map((item, index) => {
            return (
              <span
                className={
                  index === carouselIndex
                    ? "carousel__button__currently carousel__button"
                    : "carousel__button"
                }
                onClick={() => changeIndex(index)}
              ></span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default Carousel;
