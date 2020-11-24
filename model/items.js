const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

let item = new Schema(
  {
    description: {
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
    },
    assignee_id: {
        type: Number
    },
    task_id: {
        type: Number
    }
}
  ,{ 
        collection: "items",
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } 
    }
);

item.plugin(mongoosePaginate);


module.exports = mongoose.model("items", item);