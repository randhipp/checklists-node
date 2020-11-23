var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.json({
      data: 'respond with a resource'
  });
});

router.get('/:id', function(req, res, next) {
    res.json({
        data: req.params.id
    });
  });

module.exports = router;
