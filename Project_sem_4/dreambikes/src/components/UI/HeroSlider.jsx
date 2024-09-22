import React from "react";
import Slider from "react-slick";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";

import "../../styles/hero-slider.css";

const HeroSlider = () => {
  const settings = {
    fade: true,
    speed: 2000,
    autoplaySpeed: 3000,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
  };
  return (
    <Slider {...settings} className="hero__slider">
      <div className="slider__item slider__item-01 mt0">
        <Container align="center">
          <div className="slider__content ">
            <h4 className="text-light mb-3">For Rent Starting 500 Per Day</h4>

            <button className="btn reserve__btn mt-4">
              <Link to="/bikes">Reserve Now</Link>
            </button>
          </div>
        </Container>
      </div>

      <div className="slider__item slider__item-02 mt0">
        <Container align="center">
          <div className="slider__content ">
            <h4 className="text-light mb-3">For Rent Starting 500 Per Day</h4>

            <button className="btn reserve__btn mt-4">
              <Link to="/bikes">Reserve Now</Link>
            </button>
          </div>
        </Container>
      </div>

      <div className="slider__item slider__item-03 mt0">
        <Container align="center">
          <div className="slider__content ">
            <h4 className="text-light mb-3">For Rent Starting 500 Per Day</h4>

            <button className="btn reserve__btn mt-4 btn-danger">
              <Link to="/bikes">Reserve Now</Link>
            </button>
          </div>
        </Container>
      </div>
    </Slider>
  );
};

export default HeroSlider;