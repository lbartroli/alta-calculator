const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

//controllers
const ExamplesController = require('./server/api/examplesController');

nextApp
    .prepare()
    .then(() => {
        const app = express();
        const server = require('http').Server(app);
        const io = require('socket.io')(server);
        
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));

        app.use('/api/examples', ExamplesController(io));

        app.get("*", (req, res) => {
            return nextHandler(req, res);
        });

        server.listen(port, err => {
            if (err) throw err;
            console.log(`> Ready on http://localhost:${port}`);
        });
    })
    .catch(ex => {
        console.error(ex.stack);
        process.exit(1);
    });