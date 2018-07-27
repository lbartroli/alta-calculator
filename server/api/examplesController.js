const express = require('express');

class ExamplesController {
  constructor(io) {
    this.io = io;
    this.router = express.Router();
    this.messages = [{ id: 123123, value: 'Test message 123' }];

    this._setSocketIO();
    this._setRoutes();
  }

  getRouter() {
    return this.router;
  }

  _setSocketIO() {
    this.io.on('connection', socket => {
      socket.on('message', data => {
        this.messages.push(data);
        socket.broadcast.emit('message', data);
      });
    });
  }

  _setRoutes() {
    this.router.get('/messages', (req, res) => {
      res.json(this.messages);
    });
  }
}

module.exports = ExamplesController;
