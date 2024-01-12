const mongoose=require("mongoose");

mongoose.connect('mongodb+srv://rathinvj07:WdckD0Q1gbXQlMC7@test1.0ex5o0w.mongodb.net/todos')

const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
})


const todo=mongoose.model('todos',todoSchema);

module.exports={
    todo
}