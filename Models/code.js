var Mongoose = require('mongoose');

var Schema = Mongoose.Schema;
var CodeSchema = new Schema({
    code: {type:String, required:false},
    timeAdded: {type:String, required:false},
    giftcard: {type:String, required:false}
});

var CodeModel = Mongoose.model('codes', CodeSchema);

module.exports = CodeModel;