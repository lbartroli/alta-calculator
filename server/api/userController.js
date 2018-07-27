const express = require('express');
const { UserModel } = require('../models');

class UserController {
  constructor(io) {
    this.io = io;
    this.router = express.Router();

    this._setSocketIO();
    this._setRoutes();
  }

  getRouter() {
    return this.router;
  }

  _setSocketIO() {
    this.io.on('connection', socket => {
      socket.on('newUser', data => {
        socket.broadcast.emit('newUser', data);
      });
    });
  }

  _setRoutes() {
    this.router.get('/getAll', (req, res) => {
      UserModel.find()
        .then(users => res.json(users))
        .catch(err => console.log(err));
    });

    this.router.post('/add', (req, res) => {
      UserModel.create(req.body.user)
        .then(user => res.json(user))
        .catch(err => console.log(err));
    });
  }
}

module.exports = UserController;
