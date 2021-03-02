const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const expressValidator = require('express-validator')
const app = express()

const announceRoute = require('./routes/announce.routes')

app.use(helmet())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(bodyParser.json())

app.use('/api/announce', announceRoute)

app.use((req, res, next) => {
  const error = new Error('Not found')
  error.status = 404
  next(error)
})

// error handler middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || 'Internal Server Error',
    },
  })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log('Server start')
})