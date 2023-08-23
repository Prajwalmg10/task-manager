const jwt=require('jsonwebtoken');
const {User}=require('../db/model/userModel')
const {UserSession}=require('../db/model/userSession')
const auth=async(req,res,next)=>{
    try {
        const token=req.header("Authorization");
        const decode=jwt.verify(token,"qazwsx");
        const userSession=await UserSession.findOne({userId:decode._id,token:token,us_login_status:true});
        if(!userSession){
            throw new Error("user has no logged in device")
        }
        const user=await User.findOne({_id:userSession.userId});

        req.user=user;
        req.token=userSession.token;
        next()

    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports=auth;