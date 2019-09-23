var express = require('express');
var router = express.Router();
var models = require('../models/index')
var permit = require('../config/permission');

/* POST team. */
router.post('/', permit.roleCheck('Administrator', 'Manager'), function(req, res, next) {
    models.Employee.findByPk(req.body.managerId)
    .then(function(result) {
      if (result == null || result.role !== "Manager") {
        res.status(400).send("User is not a Manager")
        return
      }
    })
    models.Team.create({name: req.body.name, managerId: req.body.managerId})
    .then(function(result) {
      models.TeamContent.create({
        teamId: result.id,
        employeeId: result.managerId
      })
      res.send(result)
    })
    .catch((err) => {
            console.error(err)
            return next(err)
    })
});

router.get('/', permit.roleCheck('Administrator', 'Manager'), (req, res, next) =>
    models.Team.findAll()
    .then(result => res.send(result))
    .catch((err) => {
            console.error(err)
            return next(err)
    })
);


router.get('/:id', (req, res, next) =>
    models.Team.findByPk(req.params.id)
    .then(result => res.send(result))
    .catch((err) => {
            console.error(err)
            return next(err)
    })
);

router.put('/:id', permit.roleCheck('Administrator', 'Manager'), function(req, res, next) {
    models.Employee.findByPk(req.body.managerId)
    .then(function(result) {
      if (result == null || result.role !== "Manager") {
        res.status(400).send("User is not a Manager")
        return
      }
    })
    models.Team.update({
      name: req.body.name,
      managerId: req.body.managerId}, {
        where: {id: req.params.id}
      })
    .then(result => res.status(201).send(result))
    .catch((err) => {
      console.error(err)
      return next(err)
    })
});


router.delete('/:id', permit.roleCheck('Administrator', 'Manager'), function(req, res, next) {
  models.Team.destroy({where: {id: req.params.id}})
  .then(() => {
          res.status(200).send('Deleted team with id : ' + req.params.id)
  })
  .catch((err) => {
          console.error(err)
          return next(err)
  })
});

module.exports = router;
