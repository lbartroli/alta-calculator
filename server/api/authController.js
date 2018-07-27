const express = require('express');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../models');

class AuthController {
  constructor(app) {
    this.router = express.Router();
    this.app = app;

    this._setRoutes();
  }

  getRouter() {
    return this.router;
  }

  _setRoutes() {
    this.router.post('/authenticate', (req, res) => {
      UserModel.findOne({ username: req.body.username })
        .then(user => {
          if (!user) {
            res.json({
              success: false,
              message: 'User not found.'
            });
          } else {
            if (user.password != req.body.password) {
              res.json({
                success: false,
                message: 'Wrong password.'
              });
            }
            const payload = {
              firstName: user.firstName,
              lastName: user.lastName
            };
            const token = jwt.sign(payload, this.app.get('superSecret'), {
              expiresIn: 60 * 60 * 24 // expires in 24 hours
            });

            res.json({
              success: true,
              message: 'Enjoy your token!',
              token: token
            });
          }
        })
        .catch(err => {
          throw err;
        });
    });
  }
}

module.exports = AuthController;
