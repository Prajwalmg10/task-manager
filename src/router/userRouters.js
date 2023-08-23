const express=require('express');
const router=new express.Router();
const {User}=require('../db/model/userModel');
const auth = require('../middleware/authentication');
const { UserSession } = require('../db/model/userSession');


router.post("/addUser",(req,res)=>{
    const me=new User(req.body);
   
    me.save().then((me)=>{
        return res.send(me);
    }).catch((error)=>{
        // console.log("Error ",error);
        return res.status(400).send(error.message)
    });
});

router.get('/getAllUsers',auth,async(req,res)=>{
    try{
        res.status(200).send(req.user.toJSON())
    }catch(e){
        res.status(400).send(e)
    }
});

router.get('/getUser/:id',async(req,res)=>{
    const _id=req.params.id
    console.log(_id);
    try{
        const user= await User.findOne(_id);
         res.status(200).send(user.toJSON())
     }catch(e){
         res.status(400).send(e)
     }
})
router.post('/login',async(req,res)=>{
    try{
        const user=await User.findByCredentials(req.body.email,req.body.password);
        res.send(user.toJSON())
    }catch(e){
        res.status(500).send(e.message)
    }
})

router.post('/logout',auth,async(req,res)=>{
    try {
       const us=await UserSession.findOne({userId:req.user._id});
       if(!us){
        throw new Error("User already logged out")
       }
       if(us.us_login_status){
        us.us_login_status=false;
        us.save();
       }
       res.send("logeed out sucessfully")
    } catch (e) {
        res.status(401).send(e.message)
    }
})

module.exports=router;