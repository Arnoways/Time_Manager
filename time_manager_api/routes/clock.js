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

router.get('/', permit.roleCheck('Administrator', 'Manager'), (req, res, next) => 
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
          status: false,
          employeeId: req.params.userId
        })
        .then(result => res.send(result))
        .catch(err => {
                console.error(err)
                return next(err)
        })
);

/* Updates a clock by specifying the userId   */
router.patch('/user/:userId', (req, res, next) =>
        models.Clock.findOne({where: {employeeId: req.params.userId}})
        .then(function(result) {
                if (result.status && !req.body.status) {
                        models.WorkingTime.create({
                            start: result.time,
                            end: req.body.time,
                            employeeId: req.params.userId
                        })
                        .catch(err => {
                                console.error(err)
                                return next(err)
                        })
                }
                /* if status doesn't change, no need to update. */
                if (result.status !== req.body.status) {
                        models.Clock.update({
                                time: req.body.time,
                                status: req.body.status}, {
                                where: {id: req.params.id}
                              })
                              .then(result => res.status(201).send(result))
                              .catch(err => {
                                      console.error(err)
                                      return next(err)
                              })
                }
                res.status(200).send("Nothing to update.")
                .catch(err => {
                        console.error(err)
                        return next(err)
                })
        })
);

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