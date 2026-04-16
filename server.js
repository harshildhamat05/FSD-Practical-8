import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import fs from 'fs'
import mongoose from 'mongoose'
import path from 'path'

import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mern_practical'
const uploadsDir = path.join(process.cwd(), 'uploads')

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(uploadsDir))

app.get('/', (req, res) => {
  res.send('API Running')
})

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.post('/api/payment', (req, res) => {
  const amount = Number(req.body.amount)

  if (!Number.isFinite(amount) || amount <= 0) {
    return res.status(400).json({
      status: 'failed',
      message: 'Amount must be greater than zero',
    })
  }

  return res.json({
    status: 'success',
    amount,
    transactionId: `txn_${Date.now()}`,
  })
})

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)

const startServer = async () => {
  try {
    await mongoose.connect(mongoUri)
    console.log('MongoDB Connected')

    app.listen(port, () => {
      console.log(`Server started on port ${port}`)
    })
  } catch (error) {
    console.error('Failed to connect to MongoDB', error)
    process.exit(1)
  }
}

startServer()