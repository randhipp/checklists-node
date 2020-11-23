var Item = require('./../model/items');
let ObjectID = require('mongodb').ObjectID;

// try {
//     Item.create({
//       "_id" : new ObjectID("56955ca46063c5600627f393"),
//       "description": "Example Item.",
//       "is_completed": false,
//       "completed_at": null,
//       "due": null,
//       "urgency": 0,
//       "updated_by": null,
//       "updated_at": null,
//       "created_at": "2018-01-25T07:50:14+00:00"
//     });
//   } catch (e) {
  
// }
  
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