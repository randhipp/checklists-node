var Checklist = require('./../model/checklists');
  
async function getOne(req, res, next) {
  
    const data = await Checklist.findById(req.params.id).populate('items').catch((e) => console.log(e));
  
    res.json({
      data: data
    });
}

module.exports = {
    getOne: getOne,
};