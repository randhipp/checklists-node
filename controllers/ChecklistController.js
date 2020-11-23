var Item = require('./../model/checklists');
let ObjectID = require('mongodb').ObjectID;
  
async function getOne(req, res, next) {
  
    const data = await Item.find({}).catch((e) => console.log(e));
  
    res.json({
      data: data
    });
}

module.exports = {
    getOne: getOne,
};