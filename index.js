const express =require("express");
const app=express();
const cors=require("cors");
const { createTodo } = require ("./types");
const { updateTodo } = require ("./types");
const { todo } = require ("./db");

app.use(express.json());
app.use(cors());


app.post("/todo",async function(req,res){
        const createPayload=req.body;
        const parsedPayload=createTodo.safeParse(createPayload)
        if (!parsedPayload.success){
            res.status(411).json({
                msg:"YOu sent the wrong inputs",
            })
        }
    

        await todo.create({
            title:createPayload.title,
            description:createPayload.description,
            completed:false
        })

        res.json({
            msg:"Todo created"
        })

        
})

app.get('/todos',async function(req,res){
    const todos=await todo.find({})
    res.json({
        todos
    })
})

app.put("/completed",async function(req,res){
    const updatedPayload=req.body;
    const parsedPayload=updateTodo.safeParse(updatedPayload);
    if (!parsedPayload.success){
        res.status(411).json({
            msg:"YOu sent the wrong inputs",
        })
        return;  
    }

    await todo.update({
        _id:req.body.id
    }, {
        completed:true
    })
    res.json({
        msg:"todo marked as completed"
    })
})

app.listen(5000);