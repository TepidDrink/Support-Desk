const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDb = require('./config/db')

const PORT = process.env.PORT || 8000

connectDb()

const app = express()
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/users', require('./routes/userRoutes'))

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Support Desk API' })
})

app.use(errorHandler)
app.listen(PORT, () => console.log(`Server started on port ${ PORT }`))
