const mongoose = require('mongoose')

const userSubscribe = new mongoose.Schema({
    email : {
        type : String,
        unique : true,
        required : true
    }
})

module.exports = mongoose.model('Subscriber' , userSubscribe)