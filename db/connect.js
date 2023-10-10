const mongoose = require('mongoose');


const conectDB = (url) => {
 console.log('DB connection successfully');
 return mongoose.connect(url, {
 })
}
module.exports = conectDB