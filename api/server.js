const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authRouter = require('../auth/auth-router.js');
const howRouter = require('../howtos/howtos-router.js')

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
    res.status(200).json({ api: "up" });
});

server.use('/api', logger, authRouter);
server.use('/howtos', logger, howRouter);

function logger(req, res, next) {
    const today = new Date().toLocaleDateString('en-US');
    console.log(`${today} ${req.method} ${req.url} ${req.body}`);

    next();
}

module.exports = server;