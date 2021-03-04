const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

exports.authenticateToken = async function (req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) {
    return res.status(401).send({
      error: {
        status: 401,
        message: 'Unauthorized',
      },
    })
  }

  jwt.verify(token, config.secret, (err, user) => {
    if (err) {
      return res.status(401).send({
        error: {
          status: 401,
          message: 'Unauthorized',
        },
      })
    }

    req.user = user
    next();
  });
};