import React, { useState , useEffect} from 'react'
import axios from 'axios'
import './TodoApp.css'

import Create from './create'

function Home() {

const[todos, setTodos]=useState([])

const[task, setTask]=useState('')
const [isUpdating, setIsUpdating] = useState('');
const [updateItemText, setUpdateItemText] = useState('');

const [firstclass, changeClass] = useState('todo-item');

 const handleAdd= async (event)=>
 {
    //alert(event)
    event.preventDefault()
    try{
      const res=await axios.post('http://todo-mern-api.vercel.app/add',{task:task})
      setTodos(prev => [...prev, res.data]);
      setTask('');

    }
    catch(err)
    {
      console.log(err)
    }
    //alert(event.target.value)
    // const res=axios.post('http://localhost:3001/add',{task:task})
    // .then(result=>console.log(result))
    // .catch(err=>console.log(err))

    // setTodos(prev=>[...prev, res.data])
    
    // setTask('')

 }


// on page rendered to display all todos
useEffect(() => {
  const fetchTodoData = async() =>{
    
  const fetchTodos = await fetch('http://todo-mern-api.vercel.app/getTodos')
  const data= await fetchTodos.json()
  setTodos(data);
  }

  console.log("render")

  fetchTodoData()
     
  },[]);

// delet todo items

const deleteItem = async (id) => {
  try{
    const res = await axios.delete(`http://todo-mern-api.vercel.app/eleteTodo/${id}`)

    setTodos(todos=>todos.filter(item=>item._id!==id))

    // const newListItems = setTodos.filter(item=> item._id !== id);
    // setTodos(newListItems);
  }catch(err){
    console.log(err);
  }
}


const updateItem = async (e) => {
  e.preventDefault()
  try{
    const res = await axios.put(`http://todo-mern-api.vercel.app/${isUpdating}`, {item: updateItemText})
  //  console.log(res.data)
    const updatedItemIndex = todos.findIndex(item => item._id === isUpdating);
    const updatedItem = todos[updatedItemIndex].task = updateItemText;

    //setTodos(todos=>todos.filter(item=>item._id==isUpdating))
    setUpdateItemText('')
    setIsUpdating('');
  }catch(err){
    console.log(err);
  }
}

const completeTodo = async(id) => {

      // alert(id)

const data = await fetch(`http://todo-mern-api.vercel.app/` + '/complete/' + id).then(res => res.json());

alert(data.task+"is completed")

  setTodos(todos => todos.map(todo => {
    if (todo._id === data._id) {
      todo.complete = data.complete;
    }

    return todo;
  }));
  
}


//before updating item we need to show input field where we will create our updated item value={updateItemText}
const renderUpdateForm = (taskname) => (
 
  <form className="update-form" onSubmit={(e)=>{updateItem(e)}} >
    <input className="update-new-input" type="text" value={updateItemText}  placeholder="New Item" onChange={e=>{setUpdateItemText(e.target.value)}}  />
    <button className="update-new-btn" type="submit">Update</button>
  </form>
)


return (

  <>
    <div className="App">
       <h1>Todo List</h1>
         <form className="form">       
             <input type="text"  placeholder="Enter Your Todo" onChange={(e)=>setTask(e.target.value)} name=""   id=""/>
         <button type="submit" onClick={handleAdd}  >Add Item</button>
         </form>
  
     </div>

   
    <div className="App">
    {

<div className="todo-listItems">
{
  todos.length==0?<div> No records </div>:
  todos.map(item => (
  <div className="todo-item"   key={item._id} 
     >
    {
      isUpdating === item._id
      ? renderUpdateForm(item.task)
      : <>
      <div className={"checkbox"+ (item.complete ? "is-complete" : "")}  onClick={() => completeTodo(item._id)} ></div>
          <p className="item-content">{item.task}</p>
          <button className="update-item" onClick={()=>{setIsUpdating(item._id)}}>Update</button>
          <button className="delete-item" onClick={()=>{deleteItem(item._id)}}>Delete</button>
        </>
    }
  </div>
  ))
}


</div>



    }
   
 </div>
    </>

  )
}

export default Home