const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcryptjs');

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'SecretSecret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/DreamBikes', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.error('MongoDB connection error:', err));

// Define Mongoose Schemas
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true }
});

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

const contactFormDataSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

// Create Mongoose Models
const User = mongoose.model('User', userSchema);
const FormData = mongoose.model('FormData', formDataSchema);
const ContactForm = mongoose.model('ContactForm', contactFormDataSchema);

// User Registration
app.post('/signup', async (req, res) => {
  const { name, email, phoneNumber, password, confirmPassword } = req.body;

  const trimmedEmail = email.trim();

  if (!name || !trimmedEmail || !phoneNumber || !password || !confirmPassword) {
    return res.status(400).send('All fields are required');
  }

  if (password !== confirmPassword) {
    return res.status(400).send('Passwords do not match');
  }

  try {
    console.log('User data:', { name, email: trimmedEmail, phoneNumber, password });

    const existingUser = await User.findOne({ email: trimmedEmail });
    if (existingUser) {
      console.log('Existing user found:', existingUser);
      return res.status(400).send('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email: trimmedEmail, phoneNumber, password: hashedPassword });
    await newUser.save();
    res.status(201).send('User registered successfully!');
  } catch (err) {
    console.error('Error saving user data:', err.message);
    if (err.code === 11000) {
      return res.status(400).send('User with this email already exists.');
    }
    res.status(500).send('Error registering user');
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      req.session.userId = user._id; // Store user ID in session
      res.json({ user }); // Include user data in response
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).send('Internal server error');
  }
});

// Submit Form Data
app.post('/submit-form', async (req, res) => {
  try {
    const newFormData = new FormData(req.body);
    await newFormData.save();
    res.status(200).send('Form data saved successfully!');
  } catch (err) {
    console.error('Error saving form data:', err);
    res.status(500).send('Error saving form data');
  }
});

// Submit Contact Form
app.post('/contact', async (req, res) => {
  try {
    const contactForm = new ContactForm(req.body);
    await contactForm.save();
    res.status(200).send('Contact form data saved successfully!');
  } catch (err) {
    console.error('Error saving contact form data:', err);
    res.status(500).send('Error saving contact form data');
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
