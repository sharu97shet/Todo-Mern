
const { mongoose } = require('mongoose');


const Todoschema=new mongoose.Schema({
    task:{
        type:String,
 },
   
   
  })

const Todomodel = mongoose.model("Todos",Todoschema)

module.exports=Todomodel
  