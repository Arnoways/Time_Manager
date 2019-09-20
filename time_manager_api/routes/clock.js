var express = require('express');
var router = express.Router();
var models = require('../models/index')

router.get('/:id', (req, res, next) =>
        models.Clock.findByPk(req.params.id)
        .then(result => res.send(result))
        .catch(err => {
                console.error(err)
                return next(err)
        })
);

router.get('/', (req, res, next) => 
        models.Clock.findAll()
        .then(result => res.send(result))
        .catch(err => {
                console.error(err)
                return next(err)
        })
);

// get clock from userid
router.get('/user/:userId', (req, res, next) =>
        models.Clock.findOne({where: {employeeId: req.params.userId}})
        .then(result => res.send(result))
        .catch(err => {
                console.error(err)
                return next(err)
        })
);

router.post('/user/:userId', (req, res, next) =>
        models.Clock.create({
          time: req.body.time,
          status: req.body.status,
          employeeId: req.params.userId
        })
        .then(result => res.send(result))
        .catch(err => {
                console.error(err)
                return next(err)
        })
);

router.put('/:id', function(req, res, next) {
        models.Clock.update({
          time: req.body.time,
          status: req.body.status,
          employeeId: req.body.employeeId}, {
          where: {id: req.params.id}
        })
        .then(result => res.status(201).send(result))
        .catch(err => {
                console.error(err)
                return next(err)
        })
});

router.delete('/:id', function(req, res, next) {
        models.Clock.destroy({where: {id: req.params.id}})
        .then(() => {
                res.status(200).send('Deleted clock with id : ' + req.params.id)
        })
        .catch((err) => {
                console.error(err)
                return next(err)
        })
});

module.exports = router;