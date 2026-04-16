import bcrypt from 'bcryptjs'
import express from 'express'
import jwt from 'jsonwebtoken'
import { body } from 'express-validator'

import authMiddleware from '../middleware/authMiddleware.js'
import validateRequest from '../middleware/validateRequest.js'
import User from '../models/User.js'

const router = express.Router()

const signToken = (user) =>
  jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || 'mysecretkey', {
    expiresIn: '1d',
  })

router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Enter a valid email').normalizeEmail(),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    validateRequest,
  ],
  async (req, res) => {
    const { email, password } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({ email, password: hashedPassword })

    return res.status(201).json({
      message: 'User registered',
      user: {
        id: user._id,
        email: user.email,
      },
    })
  }
)

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Enter a valid email').normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required'),
    validateRequest,
  ],
  async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Wrong password' })
    }

    return res.json({
      token: signToken(user),
      user: {
        id: user._id,
        email: user.email,
      },
    })
  }
)

router.get('/me', authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password')

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  return res.json(user)
})

export default router