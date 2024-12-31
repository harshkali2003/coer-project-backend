const mongoose = require('mongoose')

const userQuery = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : false
    },
    email : {
        type : String,
        required : true,
        unique : false
    },
    message : {
        type : String,
        required : true,
        unique : false
    }
})

module.exports = mongoose.model('Query' , userQuery)