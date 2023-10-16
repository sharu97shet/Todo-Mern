import React , {useState, useEffect} from 'react'
import axios from 'axios'
import './TodoApp.css'
function Create() {

const[task, setTask]=useState()

 const handleAdd=(event)=>
 {
    //alert(event)
    event.preventDefault()
    //alert(event.target.value)
    axios.post('http://localhost:3001/add',{task:task})
    .then(result=>console.log(result))
    .catch(err=>console.log(err))

    setTask('')

 }

  return (
    <div className="App">
      <h1>Todo List</h1>
        <form className="form">       
            <input type="text"  placeholder="Enter Your Todo" onChange={(e)=>setTask(e.target.value)} name=""   id=""/>
        <button type="submit" onClick={handleAdd} >Add Item</button>
        </form>
 
    </div>
  )
}

export default Create