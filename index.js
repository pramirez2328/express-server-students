const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const studentsRouter = require('./routes/students');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.options('*', cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost/students')
  .then(() => {
    console.log('Connected to Database...');
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
  });

app.use('/students', studentsRouter);

app.use((req, res, next) => {
  res.status(404).send('Bad network request. Please try again.');
});

// Use the PORT environment variable provided by Render
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Students app listening at http://localhost:${PORT}`);
});
