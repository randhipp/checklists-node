var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
          title: 'Checklist Be Test with NodeJS Express Mongoose',
          link: 'https://documenter.getpostman.com/view/6587471/TVewZPtC'
        });
});

module.exports = router;
