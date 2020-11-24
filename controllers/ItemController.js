var Item = require('./../model/items');
let ObjectID = require('mongodb').ObjectID;

async function getAll(req, res, next) {

  var perPage = req.query.page['limit'] || 10
  var page = req.query.page['offset'] || 0

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
    // console.log(obj);
    var attributes = {};
    for (const prop in obj) {
      attributes[prop] = obj[prop]; 
    }
    let itemUrl = req.protocol + '://' + req.get('host') + req.baseUrl ;  
    itemsResponse.push({
      type: 'items',
      id: obj.id,
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
        first: url+'?page[limit]='+perPage+'&page[offset]=0',
        last: url+'?page[limit]='+perPage+'&page[offset]='+(parseInt(results.meta.total)-parseInt(perPage)),
      },
      data: itemsResponse
    });

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