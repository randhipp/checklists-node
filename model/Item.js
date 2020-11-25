const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

let item = new Schema(
  {
    description: {
      type: String,
      required: true
    },
    is_completed: {
      type: Boolean
    },
    completed_at: {
        type: String
    },
    due: {
        type: Date,
        required: true
    },
    urgency: {
        type: Number,
        required: true
    },
    updated_by: {
        type: Number
    },
    assignee_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    task_id: {
        type: Schema.Types.ObjectId,
    },
    checklist_id: {
        type: Schema.Types.ObjectId,
        required: true
    }
}
  ,{ 
        collection: "items",
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } 
    }
);

item.plugin(mongoosePaginate);


module.exports = mongoose.model("items", item);