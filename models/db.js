const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var db_url = 'mongodb://root:1234@ds241737.mlab.com:41737/mypollsdb'

mongoose.connect(db_url);
console.log(`Mongoose is connected`);

module.exports = {mongoose};
