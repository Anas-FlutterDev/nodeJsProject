import mongoose from 'mongoose';

const CardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  description: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  web: { type: String, required: true },
  image: {
    url: { type: String, default: '' },
    alt: { type: String, default: '' }
  },
  address: {
    state: { type: String, default: '' },
    country: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    houseNumber: { type: Number, required: true },
    zip: { type: String, required: true }
  },
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

const Card = mongoose.model('Card', CardSchema);

export default Card;
