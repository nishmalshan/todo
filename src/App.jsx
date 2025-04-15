import './App.css';
import { useState } from 'react';
import { Task } from './task';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskName, setEditedTaskName] = useState("");

  const handleChange = (event) => {
    setNewTask(event.target.value);
  };

  const addTask = () => {
    if (newTask.trim() === "") {
      alert("Task cannot be empty!");
      return;
    }

    const task = {
      id: todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1,
      taskName: newTask,
    };

    setTodoList([...todoList, task]);
    setNewTask(""); // Clear input
  };

  const deleteTask = (id) => {
    const newTodoList = todoList.filter((task) => task.id !== id);
    setTodoList(newTodoList);
  };

  const startEditing = (id, taskName) => {
    setEditingTaskId(id);
    setEditedTaskName(taskName);
  };

  const saveEdit = () => {
    if (editedTaskName.trim() === "") {
      alert("Task cannot be empty!");
      return;
    }

    const updatedTasks = todoList.map((task) =>
      task.id === editingTaskId ? { ...task, taskName: editedTaskName } : task
    );
    setTodoList(updatedTasks);
    setEditingTaskId(null);
    setEditedTaskName("");
  };

  const cancelEdit = () => {
    setEditingTaskId(null);
    setEditedTaskName("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className="App">
      <div className="addTask">
        <div className="addTask-container">
          <h1 className="app-title">Todo List</h1>
          <div className="input-container">
            <input
              value={newTask}
              placeholder="Enter task"
              onChange={handleChange}
              onKeyPress={handleKeyPress}
            />
            <button onClick={addTask}>Add Task</button>
          </div>
        </div>
      </div>
      <div className="list">
        <h2 className="list-header">Your Tasks</h2>
        {todoList.length === 0 ? (
          <div className="empty-list">
            <p>No tasks yet. Add a task to get started!</p>
          </div>
        ) : (
          todoList.map((task) => (
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
          ))
        )}
      </div>
    </div>
  );
}

export default App;