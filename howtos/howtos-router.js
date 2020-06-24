const express = require('express');
const authenticator  = require('../auth/authenticate-middleware.js');
const authCreator = require('../auth/auth-creator.js')

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

router.post("/", authenticator, authCreator, (req, res) => {
    const newHowto = {
      name: req.body.name,
      body: req.body.body,
      img: req.body.img,
      cat: req.body.cat,
      creator_id: req.decodedToken.id,
    };
    ht.addHowto(newHowto)
      .then((howto) => {
        res.status(201).json({ message: "Howto posted", howto });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ errorMessage: err.message });
      });
  });

router.get("/creator", authenticator, (req, res) => {
      ht.creatorHowto({ creator_id: req.decodedToken.id })
      .then((howtos) => {
        res.status(200).json(howtos);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ errorMessage: error.message });
      });
});

router.get("/:id", (req, res) => {
    ht.get(req.params.id).first()
    .then(howto => {
        res.status(200).json(howto)
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

router.put('/:id', authenticator, authCreator, (req, res) => {
    ht.findBy({ id: req.params.id }).first()
    .then(howto => {
        if(howto.creator_id === req.decodedToken.id){
            ht.updateHowto(req.body, req.params.id)
            .then(resp => {
                res.status(200).json(resp)
            })
            .catch(err => {
                res.status(500).json({ errorMessage: err.message });
            })
        } else {
            res.status(400).json({ message: 'Logged in user does not match how creator. '})
        }
    })
})

router.put('/:id/upvote', (req, res) => {
    ht.findBy({ id: req.params.id }).first()
    .then(howto => {
        howto.upvotes += 1;
        ht.updateHowto(howto, req.params.id)
        .then(resp => {
            res.status(200).json(resp)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    })
})

router.put('/:id/downvote', (req, res) => {
    ht.findBy({ id: req.params.id }).first()
    .then(howto => {
        howto.downvotes += 1;
        ht.updateHowto(howto, req.params.id)
        .then(resp => {
            res.status(200).json(resp)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    })
})

router.delete('/:id', authenticator, authCreator, (req, res) => {
    const { id } = req.params;
    ht.deleteHowto(id)
    .then(howto => {
        res.status(200).json(howto);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

module.exports = router;