const mongoose = require('mongoose')

const userData = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : false
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        unique : false
    }
})

module.exports = mongoose.model('User' , userData)