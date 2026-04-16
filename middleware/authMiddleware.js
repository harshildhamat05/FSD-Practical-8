import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7).trim() : header.trim()

  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'mysecretkey')
    req.user = verified
    return next()
  } catch {
    return res.status(401).json({ message: 'Invalid token' })
  }
}

export default authMiddleware