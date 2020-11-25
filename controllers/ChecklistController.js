var Checklist = require('./../model/Checklist');
  
async function getOne(req, res, next) {
  
    const data = await Checklist.findById(req.params.id).populate('items').catch((e) => console.log(e));

    if(!data){
      res.status(404).json({
        code: 404,
        error: 'Not Found'
      });      
    } else {
      res.json({
        data: {
          type: 'checklists',
          id: data._id,
          attributes: data,
          links: {
            self: ''
          }
        }
      });
    }
}

module.exports = {
    getOne: getOne,
};