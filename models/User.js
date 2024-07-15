import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    first: { type: String, required: true },
    middle: { type: String },
    last: { type: String, required: true }
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isBusiness: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  phone: { type: String, required: true },
  address: {
    state: { type: String },
    country: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    houseNumber: { type: String, required: true }
  },
  image: {
    url: { type: String },
    alt: { type: String }
  }
});

const User = mongoose.model('User', UserSchema);

export default User;
