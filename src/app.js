const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const app = express()
//const cors = require("cors")

const announceRoute = require('./routes/announce.routes')
const adminRoute = require('./routes/admin.routes')
const raffleRoute = require('./routes/raffle.routes')
const userRoute = require('./routes/user.routes')

app.use(helmet())

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(bodyParser.json())

app.use('/api/announce', announceRoute)
app.use('/api/admin', adminRoute)
app.use('/api/raffle', raffleRoute)
app.use('/api/users', userRoute)

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