import React, { useState } from "react";
import "../../styles/booking-form.css";
import { Form, FormGroup } from "reactstrap";
import axios from "axios";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    bookingDate: "",
    bikeName: "",
    paymentMethod:"",
  });

  const [phoneError, setPhoneError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === "phoneNumber") {
      if (value.length !== 10) {
        setPhoneError("Phone number must be 10 digits");
      } else {
        setPhoneError("");
      }
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (formData.phoneNumber.length !== 10) {
      setPhoneError("Phone number must be 10 digits");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/submit-form', formData);
      console.log(response.data); 
      handleReset();
    } catch (error) {
      console.error('There was an error submitting the form!', error); 
    }
  };

  const handleReset = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      address: "",
      bookingDate: "",
      bikeName: "",
      paymentMethod: "",
    });
    setPhoneError("");
  };

  return (
    <Form onSubmit={submitHandler}>
      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required/>
      </FormGroup>

      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required/>
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required/>
      </FormGroup>
      
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input 
          type="number" 
          name="phoneNumber" 
          placeholder="Phone Number" 
          value={formData.phoneNumber} 
          onChange={handleChange} 
          required 
        />
        {phoneError && <small className="text-danger">{phoneError}</small>}
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required/>
      </FormGroup>

      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input type="date" name="bookingDate" placeholder="Booking Date" value={formData.bookingDate} onChange={handleChange} required />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input type="text" name="bikeName" placeholder="Enter confirm bike name" value={formData.bikeName} onChange={handleChange} required />
      </FormGroup>

      <FormGroup className="payment-method">
        <h4 className="payment">Payment Method</h4>
        <div>
          <input type="radio" id="cash" name="paymentMethod" value="Cash" checked={formData.paymentMethod === "Cash"} onChange={handleChange} />
          <label htmlFor="cash">Cash</label>
        
          <input type="radio" id="card" name="paymentMethod" value="Card" checked={formData.paymentMethod === "Card"} onChange={handleChange} />
          <label htmlFor="card">Card</label>
    
          <input type="radio" id="gpay" name="paymentMethod" value="GPay" checked={formData.paymentMethod === "GPay"} onChange={handleChange} />
          <label htmlFor="gpay">GPay</label>
       
          <input type="radio" id="bankTransfer" name="paymentMethod" value="Bank Transfer" checked={formData.paymentMethod === "Bank Transfer"} onChange={handleChange} />
          <label htmlFor="bankTransfer">Bank Transfer</label>
        </div>
      </FormGroup>

      <FormGroup>
        <button type="submit" className="booking__form-btn">Submit</button>
        <button type="reset" className="booking__form-btn m-4" onClick={handleReset}>Reset</button>
      </FormGroup>
    </Form>
  );
};

export default BookingForm;
