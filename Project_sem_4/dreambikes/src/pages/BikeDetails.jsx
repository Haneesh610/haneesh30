import React, { useContext } from "react";
import BikeData from "../assets/data/BikesData";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { useParams, Link } from "react-router-dom";
import BookingForm from "../components/UI/Bookingform";
import { AuthContext } from "../auth/Authcontext";

const BikeDetails = () => {
  const { slug } = useParams();
  const { isLoggedIn } = useContext(AuthContext);

  const singleBikeItem = BikeData.find((item) => item.bikeName === slug);

  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Helmet title={singleBikeItem.bikeName}>
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <img src={singleBikeItem.imgUrl} alt={singleBikeItem.bikeName} className="w-100" />
            </Col>

            <Col lg="6">
              <div className="bike__info">
                <h2 className="section__title">{singleBikeItem.bikeName}</h2>

                <div className="d-flex align-items-center gap-5 mb-4 mt-3">
                  <h6 className="rent__price fw-bold fs-4">₹{singleBikeItem.price}.00</h6>
                  <span className="d-flex align-items-center gap-2">
                    <span style={{ color: "#f9a826" }}>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    {singleBikeItem.rating}
                  </span>
                </div>

                <p className="section__description">
                  <h3>
                    {singleBikeItem.description}
                  </h3>
                </p>
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              {isLoggedIn ? (
                <BookingForm bikeName={singleBikeItem.bikeName} />
              ) : (
                <div>
                  <p>You must be logged in to book this bike.</p>
                  <Link to="/login" onClick={handleClick}>Login</Link> or <Link to="/signup" onClick={handleClick}>Sign Up</Link>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default BikeDetails;
