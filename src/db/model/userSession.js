const mongoose=require('mongoose');

const userSessionSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    token:{
        type:String,
        required:true
    },
    us_login_status:{
        type:Boolean,
        required:true
    }
})

const UserSession = mongoose.model('UserSession', userSessionSchema);

module.exports={UserSession};