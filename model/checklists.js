const mongoose = require("mongoose");

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

module.exports = mongoose.model("checklists", checklist);