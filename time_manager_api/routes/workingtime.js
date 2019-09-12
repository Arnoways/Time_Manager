var express = require('express');
var router = express.Router();
var models = require('../models/index')
var Sequelize = require('sequelize');

const Op = Sequelize.Op;

/* GET ONE workingtime. */
router.get('/:userID/:workingtimeID', (req, res, next) =>
        models.Workingtime.findByPk(req.params.workingtimeID)
        .then(result => res.json(result))
        .catch(err => {
                console.error(err)
                return next(err)
        })
);

router.get('/:userID', function(req, res, next) {
        if (req.query.start !== undefined && req.query.end !== undefined) {
          models.Workingtime.findAll({
            where: {
              start: {[Op.gte]: req.query.start},
              end: {[Op.lte]: req.query.end},
              employeeId: req.params.userID
            }
          })
          .then(result => res.json(result))
          .catch(err => {
            console.error(err)
            return next(err)
          })
        } else {
          models.Workingtime.findAll({
            where: {
              employeeId: req.params.userID
            }
          })
          .then(result => res.json(result))
          .catch(err => {
            console.log(err)
            return next(err)
          })
        }
});

router.post('/:userID', (req, res, next) =>
        models.Workingtime.create({
          start: req.body.start,
          end: req.body.end,
          employeeId: req.params.userID
        })
        .then(result => res.json(result))
        .catch(err => {
                console.error(err)
                return next(err)
        })
);

router.put('/:id', (req, res, next) =>
        models.Workingtime.update({
          start: req.body.start,
          end: req.body.end,
          employeeId: req.body.employeeId}, {
            where: {id: req.params.id}
          })
        .then(result => res.json(result))
        .catch(err => {
            console.error(err)
            return next(err)
        })
);

router.delete('/:id', function(req, res, next) {
    models.Workingtime.destroy({where: {id: req.params.id}})
    .then(() => {
        res.status(200).send('Deleted workingtime with id: ' + req.params.id)
    })
    .catch((err) => {
      console.error(err)
      return next(err)
    })
});

module.exports = router;