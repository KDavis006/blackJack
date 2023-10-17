const mongoose = require('mongoose');

const connectDB = (url) => {
 return mongoose.connect(url, {})
}

module.exports = connectDB
// this function connects to the database and the empty object inside of it is requirements for being able to minipulate the database.