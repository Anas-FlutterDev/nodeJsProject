import User from '../models/User.js'; // Assuming you have a User model defined
import jwt from 'jsonwebtoken'
import config from 'config'
import bcrypt from 'bcryptjs'
const registerUser = async (req, res) => {
    try {
      const { name, email, password, isBusiness, isAdmin } = req.body;
  
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create a new user with the hashed password
      user = new User({ 
        name, 
        email, 
        password: hashedPassword, 
        isBusiness, 
        isAdmin 
      });
      await user.save();
  
      res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
  
  const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  
      // Check if password matches
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  
      // Prepare JWT payload
      const payload = {
        user: {
          id: user.id,
          // You can include more user information here if needed
        },
      };
  
      // Sign JWT
      jwt.sign(
        payload,
        "thisismyjwtsecret", // Get the secret key from config or environment variables
        { expiresIn: 3600 }, // Token expires in 1 hour (optional)
        (err, token) => {
          if (err) throw err;
          // Send JWT token to client
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
  
  
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.password = password || user.password;
    await user.save();

    res.json({ msg: 'User updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    await user.deleteOne();
    res.json({ msg: 'User deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export default { registerUser, loginUser, getAllUsers, getUserById, updateUser, deleteUser };
