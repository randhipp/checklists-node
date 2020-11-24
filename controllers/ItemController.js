var Item = require('./../model/items');
let ObjectID = require('mongodb').ObjectID;

async function getAll(req, res, next) {

  var perPage = req.query.limit || 10
  var page = req.query.offset || 0

  const options = {
    offset: page,
    limit: perPage > 100 ? 100 : perPage,
    collation: {
      locale: 'en'
    }
  };

      let result = await Item.paginate({}, options).catch(e => console.log(e));

      let items = result.docs;
      
      let itemsResponse = items.forEach( function(obj) {
        var attributes = {};

        obj.forEach(function(prop) {
          attributes[prop.name] = prop.value;
        });
        obj.type = 'checklist',
        obj.id = obj.id,
        obj.attributes = attributes;
        obj.links = {
          self: 'http://test.com'
        }
     });

    res.json({
      data: {
        type: 'checklists',
        id: parseInt(req.params.id),
        attributes: itemsResponse,
        links: {
          self: ''
        }
      },
      links: {
        current: page,
        pages: result.totalPages,
      },
      meta: result.meta
    });
    // result.docs
    // result.totalDocs = 100
    // result.limit = 10
    // result.page = 1
    // result.totalPages = 10
    // result.hasNextPage = true
    // result.nextPage = 2
    // result.hasPrevPage = false
    // result.prevPage = null
    // result.pagingCounter = 1
  // });

  // Item.find(query).skip((perPage * page) - perPage).limit(perPage).sort(sort)
  // .exec(function(err, item) {
  //         Item.count(query).exec(function(err, count) {
  //             if (err) return next(err)
  //             res.json({
  //                 data: {
  //                   type: 'items',
  //                   id: parseInt(item.id),
  //                   attributes: item,
  //                   links: {
  //                     self: ''
  //                   }
  //                 },
  //                 links: {
  //                   current: page,
  //                   pages: Math.ceil(count / perPage),
  //                 },
  //                 meta: {

  //                 }
  //               });
  //         })
  //     })
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
    getAll: getAll,

};