import React, { useEffect } from "react";

import BikeData from "../assets/data/BikesData";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { useParams } from "react-router-dom";
import Bookingform from "../components/UI/Bookingform";

const BikeDetails = () => {
  const { slug } = useParams();

  const singleBikeItem = BikeData.find((item) => item.bikeName === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [singleBikeItem]);

  return (
    <Helmet title={singleBikeItem.bikeName}>
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <img src={singleBikeItem.imgUrl} alt="" className="w-100" />
            </Col>

            <Col lg="6">
              <div className="bike__info">
                <h2 className="section__title">{singleBikeItem.bikeName}</h2>

                <div className=" d-flex align-items-center gap-5 mb-4 mt-3">
                  <h6 className="rent__price fw-bold fs-4">
                    {singleBikeItem.price}.00 / Day
                  </h6>

                  <span className=" d-flex align-items-center gap-2">
                    ({singleBikeItem.rating} ratings)
                  </span>
                </div>

                <p className="section__description">
                  {singleBikeItem.description}
                </p>

                <div
                  className=" d-flex align-items-center mt-3"
                  style={{ columnGap: "4rem" }}
                >
                </div>

                <div
                  className=" d-flex align-items-center mt-3"
                  style={{ columnGap: "2.8rem" }}
                >

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-building-2-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {singleBikeItem.brand}
                  </span>
                </div>
              </div>
            </Col>

            <Col lg="12" className="mt-5">
              <div className="booking-info mt-5 ">
                <h5 className="mb-4 fw-bold ">Booking Information</h5>
                <Bookingform />
              </div>
            </Col>

          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default BikeDetails;