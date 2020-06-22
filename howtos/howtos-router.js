const express = require('express');
const authenticator = require('../auth/authenticate-middleware.js');

const ht = require('./howtos-model.js');

const router = express.Router();

router.get('/', (req, res) => {
    ht.getHowTos()
    .then(howtos => {
        res.status(200).json(howtos);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

router.get("/creator", authenticator, (req, res) => {
      ht.findBy({ creator_id: req.decodedToken.userId })
      .then((howtos) => {
        res.status(200).json(howtos);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ errorMessage: error.message });
      });
});


router.get('/:id/steps', (req, res) => {
    const { id } = req.params;
    ht.getSteps(id)
    .then(steps => {
        res.status(200).json(steps);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

module.exports = router;