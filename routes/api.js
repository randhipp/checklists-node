var ItemController = require('./../controllers/ItemController');

var express = require('express');
const items = require('./../model/items');
var router = express.Router();

var Item = require('./../model/items')


// var  = require('./../controllers/ItemController')


router.get('/', function(req, res, next) {
  res.json({
      data: 'respond with a resource'
  });
});

// router.get('/checklists', async (req, res, next) => checklistListAll(req, res, next));
// router.get('/checklists/:id', async (req, res, next) => checklistGetOne(req, res, next));
// router.get('/checklists/:id/items', async (req, res, next) => itemGetAll(req, res, next));
router.get('/checklists/:id/items/:itemId', async (req, res, next) => ItemController.getOne(req, res, next));

module.exports = router;
