const express=require('express');
const app=express();
const port=4041
const userRouter=require('./router/userRouters')
const taskRouter=require('./router/taskRouters')
app.use(express.json())
app.use(userRouter)
app.use(taskRouter);

app.listen(port,()=>{
    console.log("server started at port :",port);
});