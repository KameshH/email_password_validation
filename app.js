const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 8000;

// Parse JSON request bodies
app.use(bodyParser.json());
// Import the AJV validation schema
const validate = require('./script');

// Connect to MongoDB
const uri = 'mongodb://127.0.0.1:27017';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Define the user schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

// Create the User model
const User = mongoose.model('User', userSchema);

// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve the HTML form
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Handle form submission
app.post('/register', async (req, res) => {
  const { email, password } = req.body;

 // Validate the input data using AJV
 const isValid = validate({ email, password });
 if (!isValid) {
   return res.status(400).json({ message: 'Invalid data' });
 }

 const user = new User({ email, password });

 try {
   await user.save();
   res.sendStatus(201);
 } catch (error) {
   console.error(error);
   res.sendStatus(500);
 }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
