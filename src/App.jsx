import './App.css'
import { useState } from 'react'
import { Task } from './task'

function App() {
  const [todoList, setTodoList] = useState([])
  const [newTask, setNewTask] = useState("")
  const [editingTaskId, setEditingTaskId] = useState(null)  // Track the task being edited
  const [editedTaskName, setEditedTaskName] = useState("") // Store the new task name while editing


  const handleChange = (event) => {
    setNewTask(event.target.value)
  };

  const addTask = () => {
    if (newTask.trim() === "") {
      alert("Task cannot be empty!");
      return;
    }

    const task = {
      id: todoList.length === 0 ? 1 : todoList[todoList.length -1].id + 1,
      taskName: newTask,
    }

    setTodoList([...todoList, task])
    setNewTask(""); // Clear input
    // document.querySelector("input").focus();
  }

  const deleteTask = (id) => {
    const newTodoList = todoList.filter((task) => {
      if (task.id === id) {
        return false
      } else {
        return true
      }
    })
    setTodoList(newTodoList)
  }

  const startEditing = (id, taskName) => {
    setEditingTaskId(id)
    setEditedTaskName(taskName)
  }

  const saveEdit = () => {
    if (editedTaskName.trim() === "") {
      alert("Task cannot be empty!");
      return;
    }

    const updatedTasks = todoList.map((task) => 
      task.id === editingTaskId ? { ...task, taskName: editedTaskName } : task
    )
    setTodoList(updatedTasks)
    setEditingTaskId(null) // End editing mode
    setEditedTaskName("") // Clear edited task name
  }

  const cancelEdit = () => {
    setEditingTaskId(null) // End editing mode
    setEditedTaskName("") // Clear edited task name
  }

  return (
    <>
      <div className="App">
        <div className="addTask">
          <input value={newTask} placeholder='Enter task' onChange={handleChange}/>
          <button onClick={addTask}>Add Task</button>
        </div>
        <div className="list">
          {todoList.map((task) => {
            return (
              <Task
                key={task.id}
                taskName={task.taskName}
                id={task.id}
                deleteTask={deleteTask} 
                startEditing={startEditing} 
                editingTaskId={editingTaskId} 
                editedTaskName={editedTaskName} 
                setEditedTaskName={setEditedTaskName} 
                saveEdit={saveEdit} 
                cancelEdit={cancelEdit}
              />
            );
          })}
        </div>
      </div>
    </>
  )
}

export default App
