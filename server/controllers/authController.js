import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Helper to generate JWT
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'supersecretjwtkey_expensetracker_2026_dev_secure',
    { expiresIn: '30d' }
  );
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, currency, monthlyBudget } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password',
      });
    }

    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email already exists',
      });
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      currency: currency || '$',
      monthlyBudget: monthlyBudget || 0,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        currency: user.currency,
        monthlyBudget: user.monthlyBudget,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Login user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password',
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'Logged in successfully',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        currency: user.currency,
        monthlyBudget: user.monthlyBudget,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current logged in user profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    user.name = req.body.name || user.name;
    user.currency = req.body.currency || user.currency;
    if (req.body.monthlyBudget !== undefined) {
      user.monthlyBudget = req.body.monthlyBudget;
    }

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        currency: updatedUser.currency,
        monthlyBudget: updatedUser.monthlyBudget,
        token: generateToken(updatedUser._id),
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    One-click demo login (auto finds or creates demo account)
// @route   POST /api/auth/demo
// @access  Public
export const demoLogin = async (req, res, next) => {
  try {
    let demoUser = await User.findOne({ email: 'demo@expensetracker.com' });

    if (!demoUser) {
      demoUser = await User.create({
        name: 'Alex Morgan',
        email: 'demo@expensetracker.com',
        password: 'demopassword123',
        currency: '$',
        monthlyBudget: 3500,
      });
    }

    const token = generateToken(demoUser._id);

    res.json({
      success: true,
      message: 'Demo login successful',
      data: {
        _id: demoUser._id,
        name: demoUser.name,
        email: demoUser.email,
        currency: demoUser.currency,
        monthlyBudget: demoUser.monthlyBudget,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};
