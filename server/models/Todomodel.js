
const { mongoose } = require('mongoose');


const Todoschema=new mongoose.Schema({
    task:{
        type:String,
 },
 complete:{
  type:Boolean,
  default:false
 },
 timestamp:{
  type:String,
  default:Date.now()
 }
   
   
  })

const Todomodel = mongoose.model("Todos",Todoschema)

module.exports=Todomodel
  