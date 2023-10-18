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
      const res=await axios.post('http://localhost:3001/add',{task:task})
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
    
  const fetchTodos = await fetch('http://localhost:3001/getTodos')
  const data= await fetchTodos.json()
  setTodos(data);
  }

  console.log("render")

  fetchTodoData()
     
  },[]);

// delet todo items

const deleteItem = async (id) => {
  try{
    const res = await axios.delete(`http://localhost:3001/deleteTodo/${id}`)

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
    const res = await axios.put(`http://localhost:3001/updateTodo/${isUpdating}`, {item: updateItemText})
    console.log(res.data)

    setTodos(todos=>todos.filter(item=>item._id==id))


    // const updatedItemIndex = setTodos.findIndex(item => item._id === isUpdating);
    // const updatedItem = setTodos[updatedItemIndex].item = updateItemText;
    setUpdateItemText('');
    setIsUpdating('');
  }catch(err){
    console.log(err);
  }
}

const completeTodo = async(id) => {

       alert(id)

const data = await fetch(`http://localhost:3001` + '/complete/' + id).then(res => res.json());

  setTodos(todos => todos.map(todo => {
    if (todo._id === data._id) {
      todo.complete = data.complete;
    }

    return todo;
  }));
  
}








//before updating item we need to show input field where we will create our updated item
const renderUpdateForm = () => (
  <form className="update-form" onSubmit={(e)=>{updateItem(e)}} >
    <input className="update-new-input" type="text" placeholder="New Item" onChange={e=>{setUpdateItemText(e.target.value)}} value={updateItemText} />
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
  <div className={"todo-item " + (item.complete ? "is-complete" : "")}    key={item._id} 
    onClick={() => completeTodo(item._id)} >
    {
      isUpdating === item._id
      ? renderUpdateForm()
      : <>
      <div className="checkbox" ></div>
          <p className="item-content">{item.task}</p>
          <button className="update-item" onClick={()=>{setIsUpdating(item._id)}}>Update</button>
          <button className="delete-item" onClick={()=>{deleteItem(item._id)}}>Delete</button>
        </>
    }
  </div>
  ))
}


</div>




      // <div className="todo-listItems">
        
      //  { todos.length==0?<div> No records </div>:
      //   todos.map((todo,index)=>{ 
      //       return (
      //         <div className="todo-item">

      //      <p className="item-content">{todo.task}</p>
      //      <button className="update-item">Update</button>
      //      <button className="update-item"  onClick={()=>{deleteItem(todo._id)}} >Delete</button>
           
      //         </div>
               
      //       )

      //   })
      // }

      //   </div>

    }
   
 </div>
    </>

  )
}

export default Home