import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = express.Router();

// Sign-Up Route
router.post('/signup', async (req, res) => {
  const { name, employeeID, department, designation, password, shift } = req.body;

  try {
    // Validate designation
    if (!['Worker', 'Supervisor'].includes(designation)) {
      return res.status(400).json({ message: 'Invalid designation value' });
    }

    // Validate shift
    if (!['A', 'B'].includes(shift)) {
      return res.status(400).json({ message: 'Invalid shift value' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      employeeID,
      department,
      designation,
      password: hashedPassword,
      shift
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { employeeID, password } = req.body;

  try {
    const user = await User.findOne({ employeeID });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, employeeID: user.employeeID },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
