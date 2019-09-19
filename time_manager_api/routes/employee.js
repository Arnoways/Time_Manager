var express = require('express');
var router = express.Router();
var models = require('../models/index')
const bcrypt = require('bcrypt');

var emailRegex = /[^@]+@[^\.]+\..+/

/* GET one employee by id. */
router.get('/:id', (req, res, next) =>
        models.Employee.findByPk(req.params.id)
        .then(result => res.json(result))
        .catch(err => {
                console.error(err)
                return next(err)
        })
);

/* GET all users unless email&username are specified*/
router.get('/', function(req, res, next) {
        if (req.query.email != null && req.query.first_name != null && req.query.last_name != null) {
                models.Employee.findAll({
                    where: {
                        email: req.query.email,
                        first_name: req.query.first_name,
                        last_name: req.query.last_name
                    }
                })
                .then(result => res.send(result))
                .catch(err => {
                     console.error(err)
                    return next(error)
                })
        } else {
            models.Employee.findAll()
            .then(result => res.send(result))
            .catch(err => {
                console.error(err)
                return next(error)
            })
        }
});


/* POST - creates one employee */
router.post('/', function(req, res, next) {
        if (! emailRegex.test(req.body.email)) {
                res.status(400).send("Bad email format.")
                return
        }
        bcrypt.hash(req.body.password, 10, function(err, hash) {
                if (err) {
                        console.error(err)
                        return next(err)
                }
                models.Employee.create({
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        password: hash,
                        email: req.body.email,
                        role: capitalize(req.body.role)})
                .then(result => res.send(result))
                .catch((err) => {
                        console.error(err)
                        return next(err)
                })
        })
});

router.put('/:id', function(req, res, next) {
        if (! emailRegex.test(req.body.email)) {
                res.status(400).send("Bad email format.")
                return
        }
        bcrypt.hash(req.body.password, 10, function(err, hash) {
                if (err) {
                        console.error(err)
                        return next(err)
                }
        models.Employee.update({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                password: hash, 
                email: req.body.email,
                role: capitalize(req.body.role)}, {
                where: {id: req.params.id}
                })
        .then(result => res.status(201).send(result))
        .catch((err) => {
                console.error(err)
                return next(err)
        })
        })
});

router.delete('/:id', function(req, res, next) {
        models.Employee.destroy({where: {id: req.params.id}})
        .then(() => {
                res.status(200).send('Deleted employee with id : ' + req.params.id)
        })
        .catch((err) => {
                console.error(err)
                return next(err)
        })
});

function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

module.exports = router;
