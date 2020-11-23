const mongoose = require("mongoose");

var uri = process.env.DB_URL;

mongoose.connect(uri, { 
    useUnifiedTopology: true, 
    useNewUrlParser: true 
});

const connection = mongoose.connection;

exports.connection = connection;
