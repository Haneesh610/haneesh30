import React from "react";
import { Container, Row} from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import Bikeitem from "../components/UI/Bikeitem";
import BikesData from "../assets/data/BikesData";

const BikeListing = () => {
  return (
    <Helmet title="Bikes">
      <CommonSection title="Bike Listing" />

      <section>
        <Container>
          <Row>
            {BikesData.map((item) => (
              <Bikeitem item={item} key={item.id} />
            ))}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default BikeListing;