var Mongoose = require('mongoose');

var Schema = Mongoose.Schema;
var DataSchema = new Schema({
    tries: Number
});

const DataModel = Mongoose.model('datas', DataSchema);

module.exports = DataModel;