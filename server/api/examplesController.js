const express = require('express');

const ExamplesController = (io) => {
    const router = express.Router();
    // fake DB
    const messages = [{id: 123123, value: 'Test message'}];
    
    // socket.io server
    io.on('connection', (socket) => {
        socket.on('message', (data) => {
            messages.push(data);
            socket.broadcast.emit('message', data);
        });
    });
    
    router.get('/messages', (req, res) => {
        res.json(messages);
    });

    return router;
}

module.exports = ExamplesController;