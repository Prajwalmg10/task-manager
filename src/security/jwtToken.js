const jwt=require('jsonwebtoken');

const signIn=  (id)=>{
    const token = jwt.sign({_id:id.toString()},"qazwsx");
    return token;
}

module.exports=signIn;