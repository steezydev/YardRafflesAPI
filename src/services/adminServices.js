const db = require("../models");
const Admin = db.admin;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async function (regUser) {
  try {
    let user = await Admin.create({
      username: regUser.username,
      email: regUser.email,
      password: bcrypt.hashSync(regUser.password, 8)
    });

    return user;
  } catch (err) {
    throw ({ status: 500, message: err.message || "Some error occurred while getting Announces." });
  }
}

exports.signin = async function (loginUser) {
  try {
    let user = await Admin.findOne({
      where: {
        email: loginUser.email
      }
    })

    if (!user) {
      throw ({ status: 401, message: 'Invalid password or email' })
    }

    let passwordIsValid = bcrypt.compareSync(
      loginUser.password,
      user.password
    );

    if (!passwordIsValid) {
      throw ({ status: 401, message: 'Invalid password or email' })
    }

    let token = jwt.sign({ id: user.id }, process.env.AUTH_SECRET, {
      expiresIn: 86400 // 24 hours
    });

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      accessToken: token
    };
  } catch (err) {
    throw ({ status: err.status || 500, message: err.message || "Some error occurred" });
  }
}

exports.getAdminUser = async function (userId) {
  try {
    let user = await Admin.findByPk(userId, { 
      attributes: [
        'id', 
        'username',
        'email',
        'createdAt',
        'updatedAt',
      ] 
    })

    return user;
  } catch (err) {
    throw ({ status: err.status || 500, message: err.message || "Some error occurred while getting the Announce." });
  }
}