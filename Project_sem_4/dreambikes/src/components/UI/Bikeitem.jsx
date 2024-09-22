import React from "react";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/bike-item.css";

const BikeItem = (props) => {
  const { imgUrl, bikeName, price } = props.item;

  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Col lg="4" md="4" sm="6" className="mb-5">
      <div className="bike__item">
        <div className="bike__img">
          <img src={imgUrl} alt="" height={"180px"} />
        </div>

        <div className="bike__item-content mt-4">
          <h4 className="section__title text-center">{bikeName}</h4>
          <h6 className="rent__price text-center mt-">
            {price}.00 <span>/ Day</span>
          </h6>

          <button className=" w-100 bike__item-btn bike__btn-rent">
            <Link to={`/bikes/${bikeName}`} onClick={handleClick}>Rent</Link>
          </button>

        </div>
      </div>
    </Col>
  );
};

export default BikeItem;