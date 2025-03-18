import React, { useState, useEffect } from "react";
import { TiEdit } from "react-icons/ti";
import { MdDeleteForever } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

const Task = () => {
  const [title, setTitle] = useState("");
  const [disc, setDisc] = useState("");
  const [cat, setCat] = useState("");
  const [date, setDate] = useState("");
  const [file, setFile] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    let storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  const savetols = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleAdd = () => {
    if (editId) {
      const updatedTodos = todos.map((task) =>
        task.id === editId ? { ...task, title, disc, cat, date, file } : task
      );
      setTodos(updatedTodos);
      setEditId(null);
    } else {
      setTodos([...todos, { id: uuidv4(), title, disc, cat, date, file, isCompleted: false }]);
    }

    setTitle("");
    setDisc("");
    setCat("");
    setDate("");
    setFile("");
    savetols();
  };

  const handleDelete = (id) => {
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    savetols();
  };

  const handleCheckbox = (id) => {
    const updatedTodos = todos.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(updatedTodos);
    savetols();
  };

  const handleEdit = (task) => {
    setEditId(task.id);
    setTitle(task.title);
    setDisc(task.disc);
    setCat(task.cat);
    setDate(task.date);
    setFile(task.file);
  };

  return (
    <div className="box max-w-[90vw] mx-auto min-h-[85vh] bg-blue-100 p-3 rounded-3xl my-5 md:p-7 md:max-w-[75vw]">
      <h2 className="font-bold text-2xl text-center">All Your To-Do's At One Place</h2>

      {/* Add / Edit To-Do Section */}
      <div className="add my-2 flex flex-col  ">

        <p className="font-bold text-xl my-1">{editId ? "Edit To-Do" : "Add To-Do"}</p>
        <div className="md:flex justify-between gap-3 w-full ">
        <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder="Title" className="md:w-1/2 w-3/4 rounded-3xl px-3 py-1 mt-2" />
        <input onChange={(e) => setDisc(e.target.value)} value={disc} type="text" placeholder="Description" className="md:w-1/2 w-3/4 w rounded-3xl px-3 py-1 mt-2" />
        </div>
<div className="md:flex justify-between">
  <div>
        <p className="font-bold text-base mt-1 ">Task Category*</p>
        <label>
          <input type="radio" value="work" name="cat" checked={cat === "work"} onChange={(e) => setCat(e.target.value)} /> Work
        </label>
        <label>
          <input type="radio" value="personal" name="cat" checked={cat === "personal"} onChange={(e) => setCat(e.target.value)} /> Personal
        </label>
        </div>

        <div>
        <p className="font-bold text-base mt-1">Due On</p>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>

<div>
        <p className="font-bold text-base mt-1">Attachment</p>
        <input type="file" value={file} onChange={(e) => setFile(e.target.value)} />
        </div>
        </div>
        <div className="flex justify-center">
        <button onClick={handleAdd} disabled={title.length < 3} className="w-16 p-1 m-2 text-white font-bold rounded-xl bg-blue-800 hover:bg-blue-600 disabled:bg-blue-300 md:mx-2">
          {editId ? "Update" : "Save"}
        </button>
        </div>
      </div>

      {/* All Tasks */}
      <hr className="h-[0.5px] my-4 bg-black border-0 w-7.5/8 mx-auto" />
      <div className="todos my-5 bg-blue-200 p-3 rounded-lg shadow">
        <p className="font-bold text-xl ">All Tasks</p>
        {todos.length === 0 && <div>No Todos there</div>}
        {todos.map((item) => (
          <div key={item.id} className="todo flex items-center w-full justify-between m-1 md:w-full bg-white p-2 rounded-lg shadow">
            <input type="checkbox" checked={item.isCompleted} onChange={() => handleCheckbox(item.id)} className="mx-2 w-5 h-5" />
            <div className="info flex flex-col w-full">
              <p className={`font-bold ${item.isCompleted ? "line-through text-red-600" : " "}`}>{item.title}</p>
              <p className={` ${item.isCompleted ? "line-through text-red-500" : " "}`}>{item.disc}</p>
              <div className="md:flex gap-12">
              <p>Category: <span className="font-semibold">{item.cat}</span></p>
              <p>Status: <span className={`font-semibold ${item.isCompleted ? "text-green-600" : "text-orange-500"}`}>{item.isCompleted ? "Completed" : "In Progress"}</span></p>
            </div>
            </div>
            <div className="actions items-center flex flex-col md:flex-row">
              <TiEdit onClick={() => handleEdit(item)} className="text-blue-600 cursor-pointer text-2xl mx-2" />
              <MdDeleteForever onClick={() => handleDelete(item.id)} className="text-red-600 cursor-pointer text-2xl" />
            </div>
          </div>
        ))}
      </div>

      {/* Ongoing Tasks */}
      <div className="todos my-5  bg-red-100 p-3 rounded-lg shadow">
        <p className="font-bold text-xl">Ongoing Tasks</p>
        {todos.filter((task) => !task.isCompleted).length === 0 && <div>No Ongoing Tasks</div>}
        {todos.filter((task) => !task.isCompleted).map((item) => (
          <div key={item.id} className="todo flex items-center w-full justify-between m-1 md:w-full bg-red-300 p-2 rounded-lg shadow">
            <input type="checkbox" checked={item.isCompleted} onChange={() => handleCheckbox(item.id)} className="mx-2 w-5 h-5" />
            <div className="info flex flex-col w-full">
              <p className="font-bold">{item.title}</p>
              <p>{item.disc}</p>
              <p>Category: <span className="font-semibold">{item.cat}</span></p>
            </div>
            <div className="actions items-center flex flex-col md:flex-row">
              <TiEdit onClick={() => handleEdit(item)} className="text-blue-600 cursor-pointer text-2xl mx-2" />
              <MdDeleteForever onClick={() => handleDelete(item.id)} className="text-red-600 cursor-pointer text-2xl" />
            </div>
          </div>
        ))}
      </div>

      {/* Completed Tasks */}
      <div className="todos my-2  bg-green-100 p-3 rounded-lg shadow ">
        <p className="font-bold text-xl">Completed Tasks</p>
        {todos.filter((task) => task.isCompleted).length === 0 && <div>No Completed Tasks</div>}
        {todos.filter((task) => task.isCompleted).map((item) => (
          <div key={item.id} className="todo flex items-center w-full justify-between m-1 md:w-full bg-emerald-200 p-2 rounded-lg shadow">
            <input type="checkbox" checked={item.isCompleted} onChange={() => handleCheckbox(item.id)} className="mx-2 w-5 h-5" />
            <div className="info flex flex-col w-full">
            <p className={`font-bold ${item.isCompleted ? "line-through text-red-600" : " "}`}>{item.title}</p>
            <p className={` ${item.isCompleted ? "line-through text-red-500" : " "}`}>{item.disc}</p>
              <p>Category: <span className="font-semibold">{item.cat}</span></p>
            </div>
            <div className="actions items-center flex flex-col md:flex-row">
              <TiEdit onClick={() => handleEdit(item)} className="text-blue-600 cursor-pointer text-2xl mx-2" />
              <MdDeleteForever onClick={() => handleDelete(item.id)} className="text-red-600 cursor-pointer text-2xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Task;



// import React, { useState, useEffect } from "react";
// import { TiEdit } from "react-icons/ti";
// import { MdDeleteForever } from "react-icons/md";
// import { v4 as uuidv4 } from "uuid";

// const Task = () => {
//   const [title, setTitle] = useState("");
//   const [disc, setDisc] = useState("");
//   const [cat, setCat] = useState("");
//   const [date, setDate] = useState("");
//   const [file, setFile] = useState(null);
//   const [todos, setTodos] = useState([]);

//   // Load todos from localStorage
//   useEffect(() => {
//     let todostring = localStorage.getItem("todos");
//     if (todostring) {
//       setTodos(JSON.parse(todostring));
//     }
//   }, []);

//   // Save todos to localStorage whenever todos change
//   useEffect(() => {
//     localStorage.setItem("todos", JSON.stringify(todos));
//   }, [todos]);

//   const handleTitleChange = (e) => setTitle(e.target.value);
//   const handleDiscChange = (e) => setDisc(e.target.value);
//   const handleCatChange = (e) => setCat(e.target.value);
//   const handleDateChange = (e) => setDate(e.target.value);
//   const handleFileChange = (e) => setFile(e.target.files[0]); // Correct way for file input

//   const handleAdd = () => {
//     const newTodo = {
//       id: uuidv4(),
//       title,
//       disc,
//       cat,
//       date,
//       file,
//       isCompleted: false,
//     };
//     setTodos((prevTodos) => [...prevTodos, newTodo]); // Update state properly
//     setTitle("");
//     setDisc("");
//     setCat("");
//     setDate("");
//     setFile(null);
//   };

//   const handleEdit = (id) => {
//     let t = todos.find((item) => item.id === id);
//     if (t) {
//       setTitle(t.title);
//       setDisc(t.disc);
//       setCat(t.cat);
//       setDate(t.date);
//       setFile(t.file);
//       setTodos((prevTodos) => prevTodos.filter((item) => item.id !== id));
//     }
//   };

//   const handleDelete = (id) => {
//     setTodos((prevTodos) => prevTodos.filter((item) => item.id !== id));
//   };

//   const handleCheckbox = (id) => {
//     setTodos((prevTodos) =>
//       prevTodos.map((item) =>
//         item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
//       )
//     );
//   };

//   return (
//     <div className="box max-w-[90vw] mx-auto min-h-[85vh] bg-blue-100 p-3 rounded-3xl my-5 md:p-7 md:max-w-[60vw]">
//       <h2 className="font-bold text-2xl text-center">
//         All Your To-Do's At One Place
//       </h2>
//       <div className="add my-2">
//         <p className="font-bold text-xl my-1">Add To-Do:</p>
//         <input
//           onChange={handleTitleChange}
//           name="title"
//           value={title}
//           type="text"
//           placeholder="Task Title"
//           className="w-3/4 rounded-3xl px-3 py-0.5 mt-2"
//         />
//         <input
//           onChange={handleDiscChange}
//           name="disc"
//           value={disc}
//           type="text"
//           placeholder="Task Description"
//           className="w-3/4 rounded-3xl px-3 py-0.5 mt-2"
//         />

//         <p className="font-bold text-base mt-1">Task Category*</p>
//         <label>
//           <input
//             type="radio"
//             value="work"
//             name="cat"
//             checked={cat === "work"}
//             onChange={handleCatChange}
//           />
//           Work
//         </label>
//         <label>
//           <input
//             type="radio"
//             value="personal"
//             name="cat"
//             checked={cat === "personal"}
//             onChange={handleCatChange}
//           />
//           Personal
//         </label>

//         <p className="font-bold text-base mt-1">Due On</p>
//         <input type="date" value={date} onChange={handleDateChange} />

//         <p className="font-bold text-base mt-1">Attachment</p>
//         <input type="file" onChange={handleFileChange} />

//         <button
//           onClick={handleAdd}
//           disabled={title.length < 3}
//           className="w-16 p-1 mx-1 text-white font-bold rounded-xl bg-blue-800 hover:bg-blue-600 disabled:bg-blue-300 md:mx-2"
//         >
//           Save
//         </button>
//       </div>

//       <hr className="h-[0.5px] my-3 bg-black border-0 w-7.5/8 mx-auto" />

//       <div className="todos my-2">
//         <p className="font-bold text-xl">All To-Do</p>
//         {todos.length === 0 && <div>No Todos there</div>}
//         {todos.map((item) => (
//           <div key={item.id} className="todo flex items-center w-full justify-between m-1 md:w-3/4">
//             <div className="info flex items-center leading-none">
//               <input
//                 onChange={() => handleCheckbox(item.id)}
//                 type="checkbox"
//                 className="mx-1 md:mx-2"
//                 checked={item.isCompleted}
//               />
//               <div>
//                 <p className={item.isCompleted ? "line-through text-red-500" : ""}>{item.title}</p>
//                 <p className={item.isCompleted ? "line-through text-red-500" : ""}>{item.disc}</p>
//               </div>
//             </div>
//             <div className="buttons flex">
//               <button onClick={() => handleEdit(item.id)} className="w-8 h-8 p-2 m-1 text-white font-bold rounded-xl bg-blue-800 hover:bg-blue-600">
//                 <TiEdit />
//               </button>
//               <button onClick={() => handleDelete(item.id)} className="w-8 h-8 p-2 m-1 text-white font-bold rounded-xl bg-blue-800 hover:bg-blue-600">
//                 <MdDeleteForever />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Task;
