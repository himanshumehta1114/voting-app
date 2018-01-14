const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var db_url = 'mongodb://root:1234@ds241737.mlab.com:41737/mypollsdb'

module.exports = {db_url};
