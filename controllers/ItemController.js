var Checklist = require('./../model/Checklist');
var Item = require('./../model/Item');

async function getAll(req, res, next) {

  var perPage = typeof req.query.page !== 'undefined' ? req.query.page['limit'] : 10
  var page = typeof req.query.page !== 'undefined' ?req.query.page['offset'] : 0

  const myCustomLabels = {
    totalDocs: 'total',
    // docs: 'itemsList',
    limit: 'count',
    // page: 'currentPage',
    nextPage: 'next',
    prevPage: 'prev',
    // totalPages: 'pageCount',
    // pagingCounter: 'slNo',
    meta: 'meta'
  };

  const options = {
    offset: page,
    limit: perPage > 100 ? 100 : perPage,
    collation: {
      locale: 'en'
    },
    customLabels: myCustomLabels
  };

  let results = await Item.paginate({}, options).catch(e => console.log(e));

  var itemsResponse = [];

  for (let obj of results.docs) {
    var attributes = {};
    for (const prop in obj) {
      attributes[prop] = obj[prop]; 
    }
    let itemUrl = req.protocol + '://' + req.get('host') + req.baseUrl ;  
    itemsResponse.push({
      type: 'items',
      id: obj._id,
      attributes: attributes,
      links: {
        self: `${itemUrl}/checklist/${obj.checklist_id}/items/${obj.id}`
      }
    })          
  }

    var url = req.protocol + '://' + req.get('host') + req.baseUrl + req.path;  

    res.json({
      meta: results.meta,
      links: {
        next: results.meta.hasNextPage === true ? `${url}?page[limit]=${perPage}&page[offset]=${page}` : null,
        prev: results.meta.hasPrevPage === true ? `${url}?page[limit]=${perPage}&page[offset]=${page - perPage}` : null,
        first: results.meta.totalPages > 1 ? url+'?page[limit]='+perPage+'&page[offset]=0' : null,
        last: results.meta.totalPages > 1 ? url+'?page[limit]='+perPage+'&page[offset]='+(parseInt(results.meta.total)-parseInt(perPage)) : null,
      },
      data: itemsResponse
    });

}


async function getAllbyChecklistId(req, res, next) {

  let data = await Checklist.findById(req.params.id)
                          .populate('items')
                          .exec()
                          .catch((e) => {
                            return console.log(e);
                          });

    if(!data){
      res.status(404).json({
        code: 404,
        error: 'Checklist Not Found'
      });      
    } 

    var url = req.protocol + '://' + req.get('host') + req.baseUrl;  

    if(data){
      res.json({
        data: {
          type: 'checklists',
          id: data._id,
          attributes: data,
          links: {
            self: `${url}/checklists/${data._id}`
          }
        }
      });
    }

}
  
async function getOne(req, res, next) {
  let data = await Item.findById(req.params.itemId).exec()
                          .catch((e) => {
                            return console.log(e);
                          });

    if(!data){
      res.status(404).json({
        code: 404,
        error: 'Item Not Found'
      });      
    } 

    var url = req.protocol + '://' + req.get('host') + req.baseUrl;  

    if(data && data.checklist_id == req.params.id){
      res.json({
        data: {
          type: 'items',
          id: data._id,
          attributes: data,
          links: {
            self: `${url}/checklists/${data.checklist_id}/items/${data._id}`
          }
        }
      });
    } else {
      res.status(404).json({
        code: 404,
        error: 'Wrong checklist id'
      });  
    }
}

module.exports = {
    getAll: getAll,
    getAllbyChecklistId: getAllbyChecklistId,
    getOne: getOne,

};