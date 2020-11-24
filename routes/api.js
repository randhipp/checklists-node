var express = require('express');
const paginate = require('express-paginate');
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
const paginateMiddleware = paginate.middleware(10, 50);
// router.get('/checklists/:id/items', async (req, res, next) => itemGetAll(req, res, next));
// router.use();
router.get('/checklists/:id/items/:itemId', paginateMiddleware , async (req, res, next) => ItemController.getOne(req, res, paginate, next));

module.exports = router;
