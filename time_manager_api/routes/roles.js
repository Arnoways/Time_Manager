var express = require('express');
var router = express.Router();
var models = require('../models/index')

/* POST roles. */
router.post('/', (req, res, next) =>
        models.Role.create({label: req.body.label})
        .then((result) => res.json(result))
        .catch((err) => {
                console.error(err)
                return next(err)
        })
);

router.get('/', (req, res, next) =>
        models.Role.findAll()
        .then(result => res.json(result))
        .catch((err) => {
                console.error(err)
                return next(err)
        })
);


router.get('/:id', (req, res, next) =>
        models.Role.findByPk(req.params.id)
        .then(result => res.json(result))
        .catch((err) => {
                console.error(err)
                return next(err)
        })
);


module.exports = router;