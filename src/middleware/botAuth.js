exports.checkKey = async function (req, res, next) {
  const authHeader = req.headers.token
  const apiKey = process.env.API_KEY

  if (JSON.stringify(authHeader) !== JSON.stringify(apiKey)) {
    return res.status(401).send({
      error: {
        status: 401,
        message: 'Unauthorized'
      }
    })
  }

  next()
}
