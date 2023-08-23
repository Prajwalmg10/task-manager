const {MongoClient}=require('mongodb')
const connectionURL="mongodb://127.0.0.1:27017/task-manager"
const client =new MongoClient(connectionURL,{ useNewUrlParser:true,useUnifiedTopology: true})
client.connect()
.then(()=>console.log("mongodb connected"))
.catch(error=>console.log(error));

const db_connect=(onSuccess,onError)=>{
   return client.connect().then((dbClient)=>{
    if(onSuccess) onSuccess(dbClient)
    return dbClient
   }).catch(err=>{
    if(onError) onError(err)
    return err
})
}

module.exports={db_connect}