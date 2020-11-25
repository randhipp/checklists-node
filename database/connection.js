const mongoose = require("mongoose");

var uri = process.env.DB_URL;

mongoose.set('debug', process.env.DB_DEBUG === true ? true : false);
mongoose.connect(uri, { 
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true,
    useFindAndModify: false
});

const connection = mongoose.connection;

exports.connection = connection;
