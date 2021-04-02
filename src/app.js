require("dotenv").config({path:".env"})

const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const app = express()
//const cors = require("cors")

const announcesRoute = require('./routes/announceRoutes')
const adminsRoute = require('./routes/adminRoutes')
const rafflesRoute = require('./routes/raffleRoutes')
const usersRoute = require('./routes/userRoutes')
const cors = require('cors');

app.use(cors());
app.use(helmet())

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(bodyParser.json())

app.use('/api/announces', announcesRoute)
app.use('/api/admins', adminsRoute)
app.use('/api/raffles', rafflesRoute)
app.use('/api/users', usersRoute)

app.use((req, res, next) => {
  const error = new Error('Not found')
  error.status = 404
  next(error)
})

// error handler middleware
app.use((error, req, res, next) => {
  console.log(error);
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || 'Internal Server Error',
    },
  })
})

const PORT = process.env.PORT || 8888
app.listen(PORT, () => {
  console.log('Server start')
})