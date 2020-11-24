var Item = require('./../model/items');
let ObjectID = require('mongodb').ObjectID;

async function getAll(req, res, paginate, next) {
  if(req.body.select!='undefined'){
    var sort=req.body.select;
  }

  var perPage = 10
  var page = req.query.page || 1

  if (req.body.search!=undefined && req.body.search_field!=undefined && req.body.search!='' && req.body.search_field!='') {
      var search = req.body.search;
      var search_field = req.body.search_field;
      var query = { 'search' : search_field };

      if (search == 'name') {
          var query = { name : search_field };
      }else if (search == 'email') {
          var query = { email : search_field };
      }else if (search == 'phone') {
          var query = { phone : search_field };
      }else if (search == 'city') {
          var query = { city : search_field };
      }else{
          var query = { id : search_field };
      }
  }else{
      var query = { 
        // 'name': { $ne: null }
       };
  }

  Item.find(query).skip((perPage * page) - perPage).limit(perPage).sort(sort)
  .exec(function(err, item) {
          Item.count(query).exec(function(err, count) {
              if (err) return next(err)
              res.json({
                  data: {
                    type: 'items',
                    id: parseInt(item.id),
                    attributes: item,
                    links: {
                      self: ''
                    }
                  },
                  links: {
                    current: page,
                    pages: Math.ceil(count / perPage),
                  },
                  meta: {

                  }
                });
          })
      })
}

  
async function getOne(req, res, next) {
  
    const data = await Item.findOne({id: parseInt(req.params.id)}).catch((e) => console.log(e));
  
    res.json({
      data: {
        type: 'items',
        id: parseInt(data.id),
        attributes: data,
        links: {
          self: ''
        }
      }
    });
}

module.exports = {
    getOne: getOne,
};