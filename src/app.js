require('dotenv').config({ path: '.env' })

const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(helmet())

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

const announcesRoute = require('./routes/announceRoutes')
const adminsRoute = require('./routes/adminRoutes')
const rafflesRoute = require('./routes/raffleRoutes')
const usersRoute = require('./routes/userRoutes')
const botRoute = require('./routes/botRoutes')

app.use('/api/announces', announcesRoute)
app.use('/api/admin', adminsRoute)
app.use('/api/raffles', rafflesRoute)
app.use('/api/users', usersRoute)
app.use('/api/bot', botRoute)

app.use((req, res, next) => {
  const error = new Error('Not found')
  error.status = 404
  next(error)
})

// error handler middleware
app.use((error, req, res, next) => {
  console.log(error)
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || 'Internal Server Error'
    }
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log('Server start')
})
