const express = require('express');
const router = express.Router();
const wardrobeItem = require('../models/wardrobeItem');
const axios = require('axios');
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

router.get('/suggest-outfit/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        const wardrobe = await wardrobeItem.find({ userId });

        if (wardrobe.length === 0) {
            return res.status(404).json({ error: 'No wardrobe items found' });
        }

        const lat = 29.6516;
        const lon = -82.3248;
        const weatherAPIKey = process.env.WEATHER_API_KEY;
        const weatherResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${weatherAPIKey}`
        );

        const weather = weatherResponse.data;
        const temperature = weather.main.temp;
        const condition = weather.weather[0].description;

        let season;
        if (temperature >= 85) {
            season = 'Summer';
        } else if (temperature >= 65 && temperature < 85) {
            season = 'Spring';
        } else if (temperature >= 60 && temperature < 65) {
            season = 'Fall';
        } else {
            season = 'Winter';
        }

        res.status(200).json({
            weather: {
                temperature,
                condition,
                season,
            },
            suggestion: wardrobe,
        });
    } catch (err) {
        console.error('Error in /suggest-outfit:', err.message);
        res.status(500).json({ error: err.message });
    }
});


//add a new wardrobe item
router.post('/add', async (req, res) => {
  try {
      const existingItem = await wardrobeItem.findOne({
          userId: req.body.userId,
          type: req.body.type,
          color: req.body.color,
          season: req.body.season,
      });

      if (existingItem) {
          return res.status(400).json({ error: 'Duplicate wardrobe item not allowed' });
      }

      const newItem = new wardrobeItem({
          ...req.body,
          description: req.body.description || '', //include description if provided
          category: req.body.category || 'General', //default to general if no category provided
      });
      const savedItem = await newItem.save();
      res.status(201).json(savedItem);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});


//get all the wardrobe items for a user
router.get('/:userId', async(req, res)=>{
  try{
    const items = await wardrobeItem.find({userId: req.params.userId});
    res.status(200).json(items);
  }catch (err){
    res.status(500).json({error: err.message});
  }
});

//delete a wardrobe item
router.delete('/:id', async(req,res)=>{
  try{
    const deletedItem = await wardrobeItem.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedItem);
  }catch(err){[
    res.status(500).json({error: err.message})
  ]}
});

module.exports = router;