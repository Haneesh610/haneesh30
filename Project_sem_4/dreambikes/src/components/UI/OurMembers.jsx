import React from "react";
import "../../styles/our-member.css";
import { Col } from "reactstrap";
import e1 from '../../assets/all-images/emp1.jpg'
import e2 from '../../assets/all-images/emp2.jpg'
import e3 from '../../assets/all-images/emp3.jpg'

const OUR__MEMBERS = [
  {
    name: "Xavier",
    experience: "5 years of experience",
    imgUrl: e1,
  },

  {
    name: "Pankaj Khan",
    experience: "7 years of experience",
    imgUrl: e2,
  },

  {
    name: "Mahi Patel",
    experience: "3 years of experience",
    imgUrl: e3,
  }
];

const OurMembers = () => {
  return (
    <>
      {OUR__MEMBERS.map((item, index) => (
        <Col lg="4" md="3" sm="4" xs="6" key={index} className="mb-4">
          <div className="single__member">
            <div className="single__member-img">
              <img src={item.imgUrl} alt="" className="w-100" />
            </div>

            <h6 className="text-center mb-0 mt-3">{item.name}</h6>
            <p className="section__description text-center">
              {item.experience}
            </p>
          </div>
        </Col>
      ))}
    </>
  );
};

export default OurMembers;