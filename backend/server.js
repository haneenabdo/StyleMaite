const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const express = require ('express');
const wardrobeRoutes = require('./routes/wardrobeRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
.then(()=> console.log('MongoDB connected'))
.catch((err)=>console.error(err));

app.use('/api/wardrobe', wardrobeRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`))