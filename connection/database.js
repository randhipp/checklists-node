const mongoose = require("mongoose");

var uri = "mongodb://127.0.0.1:27017/checklist";

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;

exports.connection = connection;
