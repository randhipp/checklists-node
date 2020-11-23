var express = require('express');
var router = express.Router();

const ChecklistController = require('./../controllers/ChecklistController');
const ItemController = require('./../controllers/ItemController');

router.get('/', function(req, res, next) {
  res.json({
      data: 'respond with a resource'
  });
});

// router.get('/checklists', async (req, res, next) => checklistListAll(req, res, next));
router.get('/checklists/:id', async (req, res, next) => ChecklistController.getOne(req, res, next));
// router.get('/checklists/:id/items', async (req, res, next) => itemGetAll(req, res, next));
router.get('/checklists/:id/items/:itemId', async (req, res, next) => ItemController.getOne(req, res, next));

module.exports = router;
