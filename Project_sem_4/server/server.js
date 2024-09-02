const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/DreamBikes', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.error('MongoDB connection error:', err));

const formDataSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  address: String,
  bookingDate: Date,
  bikeName: String,
  paymentMethod: String
});

const ContactFormData = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const ContactForm = mongoose.model('ContactForm', ContactFormData);

// Create Mongoose Model
const FormData = mongoose.model('FormData', formDataSchema);

app.post('/submit-form', async (req, res) => {
  console.log('Received data:', req.body);
  try {
    const newFormData = new FormData(req.body);
    await newFormData.save();
    res.status(200).send('Form data saved successfully!');
  } catch (err) {
    console.error('Error saving form data:', err);
    res.status(500).send('Error saving form data');
  }
});

app.post('/contact', async (req, res) => {
  try {
    const contactForm = new ContactForm(req.body);
    await contactForm.save();
    res.status(200).send('Form data saved successfully!');
  } catch (err) {
    console.error('Error saving form data:', err);
    res.status(500).send('Error saving form data');
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
