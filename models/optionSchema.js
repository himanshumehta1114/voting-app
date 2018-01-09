const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var optionSchema = new Schema{
    option : {
        type : String
    }
}

module.exports = mongoose.model('option', optionSchema);
