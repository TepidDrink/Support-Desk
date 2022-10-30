const mongoose = require('mongoose')

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB Connected: ${ connect.connection.host }`.cyan.underline)
  } catch (err) {
    console.log(`Error: ${ err.message }`.red.underline.bold)
    process.exit(1)
  }
}

module.exports = connectDb

