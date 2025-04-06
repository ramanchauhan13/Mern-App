const express = require('express');
const cors = require('cors');
const AuthRouter = require('./routes/AuthRouter');
require('./models/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

// CORS Middleware (FIXED)
app.use(cors());

app.use(express.json()); // Ensure JSON parsing before routes

// Test Route
app.get('/ping', (req, res) => {
  res.send("Pong");
});

// Routes
app.use('/auth', AuthRouter);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
