const { mongoose } = require("../mongoose");

const taskSchema=mongoose.Schema({
    description:{
        type:String
    },
    completed:{
        type:Boolean
    }
})

const Task=mongoose.model('Task',taskSchema)

module.exports={Task}