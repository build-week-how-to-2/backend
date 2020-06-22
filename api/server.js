const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const howRouter = require('../howtos/howtos-router.js')

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
    res.status(200).json({ api: "up" });
});

server.use('/api', authRouter);
server.use('/howtos', authenticate, howRouter);

module.exports = server;