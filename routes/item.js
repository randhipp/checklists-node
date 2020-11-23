var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.json({
      data: 'respond with a resource',
      request: req
  });
});

module.exports = router;
