const mongoose = require("mongoose");
const validator=require('validator');
const bcrypt=require('bcryptjs');
const { UserSession } = require("./userSession");
const signIn = require("../../security/jwtToken");

const userSchema = new mongoose.Schema({
    firstName: {
        type:String,
        trim:true,
        required:true
        },
    lastName: {
        type:String
    },
    email: {
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email address')
            }
        }
        },
    age: {
        type:Number,
        required:true,
        default:0,
        validate(value){
            if(value<0){
                throw new Error('Age must be positive number') 
            }
        }
        },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:8
    }
  });

userSchema.statics.findByCredentials=async(email,password)=>{
    const user=await User.findOne({email});
    if(!user){
        throw new Error('User not found for the given email address')
    }
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        throw new Error('invalid password')
    }
    const jwtToken=await signIn(user._id);
    let lastlogin=await UserSession.findOne({userId:user._id});
    if(!lastlogin){
        console.log("new");
        lastlogin=new UserSession({
            userId:user._id,
            token:jwtToken,
            us_login_status:true
        })
        console.log(lastlogin);
        lastlogin.save()
    }else{
        console.log("Update");
    lastlogin.token=jwtToken;
    lastlogin.us_login_status=true;
    lastlogin.save()
    } 
     return {user,token:lastlogin.token};
}

//hiding private data
userSchema.methods.toJSON=function(){
    
    const userObject=this.toObject();
    delete userObject.password;
    return userObject;
}

//hashing the password using bcrypt
userSchema.pre('save',async function(next){
    const user=this
    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8);
    }
    next()
})
  
const User = mongoose.model('User', userSchema);

module.exports={User}