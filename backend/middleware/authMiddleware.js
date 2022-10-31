const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
  if (!req.headers.authorization || !req.headers.authorization.startsWith(('Bearer '))) {
    res.status(401)
    throw new Error('Not authorized')
  }

  try {
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findById(decoded.id).select('-password')

  } catch (error) {
    console.log(error)

    res.status(401)
    throw new Error('Not authorized')
  }

  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  next()
})

module.exports = { protect }
