import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { TiEdit } from "react-icons/ti";
import { MdDeleteForever } from "react-icons/md";


function App() {


  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showfinished, setshowfinished] = useState(true)

  useEffect(() => {
    let todostring = localStorage.getItem("todos")
    if (todostring) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }

  }, [])


  const savetols = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }


  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    savetols()
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(item => item.id === id)
    setTodo(t[0].todo)
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    savetols()
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    savetols()
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
  }

  const togglefinish = (e) => {
    setshowfinished(!showfinished)
  }

  return (
    <>
      <Navbar />
      <div className="box  max-w-[90vw] mx-auto min-h-[85vh] bg-blue-100 p-3 rounded-3xl  my-5  md:p-7 md:max-w-[60vw]   ">
        <h2 className='font-bold text-2xl text-center'>All Your To-Do's At One Place</h2>
        <div className="add my-2">
          <p className='font-bold text-xl my-1'>Add To-Do:</p>
          <input onChange={handleChange} name="change" value={todo} type="text" className='w-3/4 rounded-3xl px-3 py-0.5 ' />
          <button onClick={handleAdd} disabled={todo.length < 3} className='w-16 p-1 mx-1 text-white font-bold rounded-xl bg-blue-800  hover:bg-blue-600 disabled:bg-blue-300 md:mx-2'>Save</button>
        </div>


        <input type="checkbox" onChange={togglefinish} checked={showfinished} name="" id="toggle" />
        <label htmlFor="toggle">Show Finished</label>

        <hr className="h-[0.5px] my-3 bg-black border-0 w-7.5/8 mx-auto" />
        <div className="todos my-2">
          <p className='font-bold text-xl '>Your To-Do's</p>
          {todos.length === 0 && <div> No Todos there</div>}
          {todos.map((item) => {
            return (showfinished || !item.isCompleted) && <div key={item.id} className="todo flex items-center w-full justify-between m-1 md:w-3/4 ">
              <div className="info flex items-center leading-none ">
                <input onChange={handleCheckbox} type="checkbox" className='mx-1 md:mx-2' checked={item.isCompleted} name={item.id} id="" />
                <p className={item.isCompleted ? "line-through text-red-500" : ""} >{item.todo} </p>
              </div>
              <div className="buttons flex">
                <button onClick={(e) => handleEdit(e, item.id)} className='w-8 h-8 p-2 m-1 text-white font-bold rounded-xl bg-blue-800 hover:bg-blue-600'> <TiEdit /></button>
                <button onClick={(e) => handleDelete(e, item.id)} className='w-8 h-8 p-2 m-1 text-white font-bold rounded-xl bg-blue-800 hover:bg-blue-600'><MdDeleteForever /></button>
              </div>
            </div>

          })}

        </div>
      </div>

    </>
  )
}

export default App
