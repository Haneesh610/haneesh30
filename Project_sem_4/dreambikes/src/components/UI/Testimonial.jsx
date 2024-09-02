import React from "react";
import Slider from "react-slick";

import "../../styles/testimonial.css";

import c1 from "../../assets/all-images/c1.jpg";

const Testimonial = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    swipeToSlide: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      <div className="testimonial py-4 px-3">
        <p className="section__description">
        "Fantastic experience! The bike was in perfect condition, and the staff was incredibly helpful. Exploring the city on two wheels has never been easier or more fun. Highly recommend!"
        </p>

        <div className="mt-3 d-flex align-items-center gap-4">
          <img src={c1} alt="" className="w-25 h-25 rounded-2" />

          <div>
            <h6 className="mb-0 mt-3">Ankur Patel</h6>
            <p className="section__description">Customer</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p className="section__description">
        "I've rented bikes from several places, but this company stands out for its quality and service. The rental process was smooth, and the bike was top-notch. I'll definitely be back!" 
        </p>

        <div className="mt-3 d-flex align-items-center gap-4">
          <img src={c1} alt="" className="w-25 h-25 rounded-2" />

          <div>
            <h6 className="mb-0 mt-3">Pratik Shah</h6>
            <p className="section__description">Customer</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p className="section__description">
        "The whole process was seamless. From booking to returning the bike, everything was handled with care and efficiency. The motorbike was a joy to ride, and the experience exceeded my expectations."
        </p>

        <div className="mt-3 d-flex align-items-center gap-4">
          <img src={c1} alt="" className="w-25 h-25 rounded-2" />

          <div>
            <h6 className="mb-0 mt-3">Aryan Shah</h6>
            <p className="section__description">Customer</p>
          </div>
        </div>
      </div>
    </Slider>
  );
};

export default Testimonial;