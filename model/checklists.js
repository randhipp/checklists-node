const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

let checklist = new Schema(
  {
    object_domain: {
      type: String
    },
    object_id: {
      type: String
    },
    is_completed: {
        type: Boolean
    },
    completed_at: {
        type: String
    },
    due: {
        type: String
    },
    urgency: {
        type: Number
    },
    updated_by: {
        type: Number
    }
}
  ,{ 
        collection: "checklists",
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } 
    }
);

checklist.plugin(mongoosePaginate);

module.exports = mongoose.model("checklists", checklist);