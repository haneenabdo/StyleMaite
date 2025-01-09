require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const wardrobeRoutes = require('./routes/wardrobeRoutes');
const connectDB = require('./config/dbCon');
const corsOptions = require('./config/corsOptions');

const PORT = process.env.PORT || 5001;
const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/wardrobe', wardrobeRoutes);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});