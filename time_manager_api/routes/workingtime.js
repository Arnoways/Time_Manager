var express = require('express');
var router = express.Router();
var models = require('../models/index')
var Sequelize = require('sequelize');
var permit = require('../config/permission');

const Op = Sequelize.Op;

/* GET ONE workingtime. */
router.get('/:id', (req, res, next) =>
        models.Workingtime.findByPk(req.params.id)
        .then(result => res.send(result))
        .catch(err => {
                console.error(err)
                return next(err)
        })
);

/* Get all working times for a specified user, with a time range if specified */
router.get('/user/:userId', function(req, res, next) {
        if (req.query.start !== undefined && req.query.end !== undefined) {
          models.Workingtime.findAll({
            where: {
              start: {[Op.gte]: req.query.start},
              end: {[Op.lte]: req.query.end},
              employeeId: req.params.userId
            }
          })
          .then(result => res.send(result))
          .catch(err => {
            console.error(err)
            return next(err)
          })
        } else {
          models.Workingtime.findAll({
            where: {
              employeeId: req.params.userId
            }
          })
          .then(result => res.send(result))
          .catch(err => {
            console.log(err)
            return next(err)
          })
        }
});

/* creates a workingtime new working time for an employee*/
router.post('/user/:userId', (req, res, next) =>
        models.Workingtime.create({
          start: req.body.start,
          end: req.body.end,
          employeeId: req.params.userId
        })
        .then(result => res.send(result))
        .catch(err => {
                console.error(err)
                return next(err)
        })
);

/* gets all the working times for a specified team */
router.get('/team/:teamId', permit.roleCheck('Administrator', 'Manager'), function(req, res, next) {
    models.TeamContent.findAll({
      where: {teamId: req.params.id}
    })
    .then(function(result) {
      var employees = []
      result.forEach(employeeId => {
        employees.push(employeeId);
      });
    })
    .then(models.Workingtime.findAll({
      where: {
        employeeId: {
          [Op.in]: employees
        }
      }
    })).then(result => res.send(result))
    .catch((err) => {
      console.error(err)
      return next(err)
  })
})

router.put('/:id', (req, res, next) =>
        models.Workingtime.update({
          start: req.body.start,
          end: req.body.end,
          employeeId: req.body.employeeId}, {
            where: {id: req.params.id}
          })
        .then(result => res.send(result))
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