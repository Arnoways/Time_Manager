var express = require('express');
var router = express.Router();
var models = require('../models/index')

router.get('/:id', (req, res, next) =>
        models.Clock.findByPk(req.params.id)
        .then(result => res.json(result))
        .catch(err => {
                console.error(err)
                return next(err)
        })
);

router.post('/:userID', (req, res, next) =>
        models.Clock.create({
          time: req.body.time,
          status: req.body.status,
          employeeId: req.params.userID
        })
        .then(result => res.json(result))
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
        .then(result => res.json(result))
        .catch(err => {
                console.error(err)
                return next(err)
        })
});

// router.patch('/:id', function(req, res, next) {
//         var old_status = null;
//         var old_time = null;
//         models.Clock.findByPk(req.params.id)
//         .then(result => old_status = result.status)
//         if (old_status != req.body.status) {
//           models.Clock.update({
//             time: req.body.time,
//             status: req.body.status}, {
//             where: {id: req.params.id}
//           })
//           .then()
//           .then(result => res.json(result))
//           .catch(err => {
//             console.error(err)
//             return next(err)
//           })
//         }
// });

module.exports = router;