const express=require('express')
//const collection = require("./mongo")
const cors = require("cors")
const mongoose=require('mongoose')
const Todomodel = require('./models/Todomodel')

const app=express()
app.use(express.json()) 
app.use(cors())

const { MongoClient } = require('mongodb'); 
// @cluster0.8aiakn4.mongodb.net/?retryWrites=true&w=majority

const uri = 'mongodb+srv://sharath:Eg8ZGIAMfvchpWEy@cluster0.8aiakn4.mongodb.net/?retryWrites=true&w=majority'
// mongoose.connect("mongodb://localhost:27017/Bookstore")
mongoose.connect(uri).then(()=>{console.log("connection succesful")}).catch((err)=>console.log(err))

app.post('/add', async (req, res)=>{
  try{
    const newItem = new Todomodel({
      task: req.body.task
    })
    //save this item in database
    const saveItem = await newItem.save()
    console.log(saveItem)
    res.status(200).json(saveItem);
  }catch(err){
    res.json(err);
  }
})


// app.post('/add', (req,res)=>{
//     console.log(req.body.task)
//     const taskdata=req.body.task;
//     Todomodel.create({task:taskdata}).then(result=>res.json(result)).catch(err=>res.json(err))

// } )

app.get('/getTodos', (req,res)=>{
    Todomodel.find().then(result=>res.json(result)).catch(err=>res.json(err))
   
} )


//complete todo

app.get('/complete/:id', async (req, res) => {
  console.log(req.params.id)
	const todo = await Todomodel.findById(req.params.id);

	todo.complete = !todo.complete;

	todo.save();

	res.json(todo);
})

app.delete('/deleteTodo/:id',async(req,res)=>  {
    try{
        const deleteItem = await Todomodel.findByIdAndDelete(req.params.id);
         res.status(200).json('Item Deleted');
    }
    catch(err)
    {
    res.json(err)

} })

//update item
app.put('/updateTodo/:id', async (req, res)=>{
    try{
        console.log(req.body)
      //find the item by its id and update it
      const updateItem = await Todomodel.findByIdAndUpdate(req.params.id, {$set: req.body});
      res.status(200).json(updateItem);
    }catch(err){
      res.json(err);
    }
  })
  
  
  //Delete item from database
//   router.delete('/api/item/:id', async (req, res)=>{
//     try{
//       //find the item by its id and delete it
//       const deleteItem = await todoItemsModel.findByIdAndDelete(req.params.id);
//       res.status(200).json('Item Deleted');
//     }catch(err){
//       res.json(err);
//     }
//   })



app.listen(3001, ()=>{
    console.log("helloworld")

})
   