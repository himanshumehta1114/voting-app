const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pollSchema = new Schema({
    subject : {
        type : String,
        require : true
    },
    admin : {
        type : Schema.Types.ObjectId,
        ref : 'user'
    },
    options : [{
        name : {
            type : String
        },
        value : {
            type : Number
        }
    }]
});

module.exports = mongoose.model('poll', pollSchema);
