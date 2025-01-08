const mongoose = require('mongoose');

const wardrobeItemSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  type: { type: String, required: true },
  color: { type: String, required: true },
  season: { type: String, required: true },
  description: { type: String, default: '' },
  category: { type: String, default: 'General' },
  addDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('WardrobeItem', wardrobeItemSchema);