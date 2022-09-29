const mongoose = require('mongoose');

var loginInfo =new mongoose.Schema({
    user:{
        type:String,
        required:true
    },
    pass:{
        type:String,
        required:true
    },
})

module.exports = Login = mongoose.model('user',loginInfo);