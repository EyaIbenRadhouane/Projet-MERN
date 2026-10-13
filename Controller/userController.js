const User = require('../models/userModel');

// 1. Create a new user (POST /api/users)
const createUser = async (req, res) => {
  try {
    const { name, email, age, role } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }
    // Check for duplicate email
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: 'Email already in use' });
    }
    const user = await User.create({ name, email, age, role });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 2. Retrieve all users (GET /api/users)
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 3. Retrieve user by ID (GET /api/users/:id)
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  }catch(err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = {
  createUser,
  getUsers,
  getUserById
};