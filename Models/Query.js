const mongoose = require('mongoose')
const userQuery = new mongoose.Schema({
    name : String,
    email : String,
    message : String
})

module.exports = mongoose.model('Query' , userQuery)
