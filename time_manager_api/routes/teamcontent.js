var express = require('express');
var router = express.Router();
var models = require('../models/index')

/* POST teamcontent. */
router.post('/', (req, res, next) =>
    models.TeamContent.create({
            teamId: req.body.teamId, 
            employeeId: req.body.employeeId
        })
    .then((result) => res.json(result))
    .catch((err) => {
            console.error(err)
            return next(err)
    })
);

router.get('/', (req, res, next) =>
    models.TeamContent.findAll()
    .then(result => res.json(result))
    .catch((err) => {
            console.error(err)
            return next(err)
    })
);


router.get('/:id', (req, res, next) =>
    models.TeamContent.findByPk(req.params.id)
    .then(result => res.json(result))
    .catch((err) => {
            console.error(err)
            return next(err)
    })
);

/*  get all records for one user */
router.get('/user/:id', (req, res, next) =>
    models.TeamContent.findAll({
            where: {employeeId: req.params.id}
    })
    .then(result => res.json(result))
    .catch((err) => {
            console.error(err)
            return next(err)
    })
);

/* get all records for one team */
router.get('/team/:id', (req, res, next) =>
    models.TeamContent.findAll({
            where: {teamId: req.params.id}
    })
    .then(result => res.json(result))
    .catch((err) => {
            console.error(err)
            return next(err)
    })
);

router.put('/:id', function(req, res, next) {
    models.TeamContent.update({
      teamId: req.body.teamId,
      employeeId: req.body.employeeId}, {
        where: {id: req.params.id}
      })
    .then(result => res.status(201).send(result))
    .catch((err) => {
      console.error(err)
      return next(err)
    })
});


router.delete('/:id', function(req, res, next) {
  models.TeamContent.destroy({where: {id: req.params.id}})
  .then(() => {
          res.status(200).send('Deleted teamcontent with id : ' + req.params.id)
  })
  .catch((err) => {
          console.error(err)
          return next(err)
  })
});

module.exports = router;