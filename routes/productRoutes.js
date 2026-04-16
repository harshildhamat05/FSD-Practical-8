import express from 'express'
import multer from 'multer'
import path from 'path'
import { body } from 'express-validator'

import authMiddleware from '../middleware/authMiddleware.js'
import validateRequest from '../middleware/validateRequest.js'
import Product from '../models/Product.js'

const router = express.Router()
const uploadDir = path.join(process.cwd(), 'uploads')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/\s+/g, '-')
    cb(null, `${Date.now()}-${safeName}`)
  },
})

const upload = multer({ storage })

router.post(
  '/',
  authMiddleware,
  upload.single('image'),
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a valid number'),
    validateRequest,
  ],
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' })
    }

    const product = await Product.create({
      name: req.body.name.trim(),
      price: Number(req.body.price),
      image: `/uploads/${req.file.filename}`,
      owner: req.user.id,
    })

    return res.status(201).json(product)
  }
)

router.get('/', async (req, res) => {
  const products = await Product.find().populate('owner', 'email')
  return res.json(products)
})

router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id).populate('owner', 'email')

  if (!product) {
    return res.status(404).json({ message: 'Product not found' })
  }

  return res.json(product)
})

export default router