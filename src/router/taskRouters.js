const express=require('express');
const router=new express.Router();
const {Task}=require('../db/model/taskModel')

router.post('/task',(req,res)=>{
    const task=new Task({
        description:req.body.desc,
        completed:req.body.completed
    }) 
    task.save().then(()=>{
        console.log(task);
    }).catch((error)=>{
        console.log("Error ",error);
    });
    res.send(task)
});

router.get('/getAllTask',async(req,res)=>{
    try{
       const tasks= await Task.find();
        res.status(200).send(tasks)
    }catch(e){
        res.status(400).send(e)
    }
});


module.exports=router;