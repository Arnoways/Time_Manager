var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/health', function(req, res, next) {
    res.status(200).send('ok')
    .catch((err) => {
      console.error(err)
      return next(err)
    })
})

module.exports = router;
