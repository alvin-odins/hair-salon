const express = require ('express')
const mongoose = require ('mongoose')
const cors = require ('cors')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(
  `mongodb+srv://alvinodins:${process.env.MONGODB_PASSWORD}@cluster0.o0nb4.mongodb.net/hair_salon?retryWrites=true&w=majority&appName=Cluster0`
).then(() => {
  console.log('connected to db')
}).catch((error) => {
  console.error("Error", error)
})