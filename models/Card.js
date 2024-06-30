// Card.js (assuming using ESM syntax)

import mongoose from 'mongoose';

const CardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Card = mongoose.model('Card', CardSchema);

export default Card;
