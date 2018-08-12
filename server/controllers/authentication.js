const User = require("./../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("./../config/config");

function tokenForUser(user) {
  var token = jwt.sign({ id: user._id }, config.secret, {
    expiresIn: 86400 // expires in 24 hours
  });

  return token;
}

exports.signin = function(req, res, next) {
  // user would be authenticated!
  // give em' token!

  res.send({
    success: true,
    message: "signed in",
    token: tokenForUser(req.user)
  });
};

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "You must specify email and password" });
  }

  User.findOne(
    {
      email: email
    },
    function(err, user) {
      if (err) return next(err);

      if (user) {
        return res.status(422).send({ error: "Email is in use" });
      }

      bcrypt.hash(password, 10, function(err, hash) {
        const new_user = new User({
          email: email,
          password: hash
        });

        new_user.save(function(err, data) {
          if (err) return next(err);
          res.json({
            success: true,
            token: tokenForUser(data)
          });
        });
      });
    }
  );
};
