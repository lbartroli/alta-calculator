const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const db = require('./server/db');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

// controllers
const {
  ExamplesController,
  UserController,
  AuthController
} = require('./server/api');

nextApp
  .prepare()
  .then(() => {
    db.connect().then(
      () => {
        console.log('mongo connection success!');

        const app = express();
        const server = require('http').Server(app);
        const io = require('socket.io')(server);
        app.set('superSecret', 'sarasa');

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(cookieParser());

        app.use('/api/auth', new AuthController(app).getRouter());
        app.use('/api/examples', new ExamplesController(io).getRouter());
        app.use('/api/user', new UserController(io).getRouter());

        app.get('*', (req, res) => {
          return nextHandler(req, res);
        });

        server.listen(port, err => {
          if (err) throw err;
          console.log(`> Ready on http://localhost:${port}`);
        });
      },
      err => {
        console.error('DB connection error: ', err);
      }
    );
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
