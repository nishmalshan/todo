export const Task = (prop) => {

    const {
        taskName,
        id,
        deleteTask,
        setEditedTaskName,
        startEditing,
        editingTaskId,
        editedTaskName,
        saveEdit,
        cancelEdit
      } = prop;
      
    return (
        <div className='sub-list'>
            {editingTaskId === id ? (
                <div>
                    <input type="text" value={editedTaskName} onChange={(e) => setEditedTaskName(e.target.value)} />
                    <button onClick={saveEdit}>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
                </div>
            ) : (
                <>
                <h4>{prop.taskName}</h4>
                <div>
                <button className="editBtn" onClick={() => startEditing(id, taskName)}>Edit</button>
                <button className='deleteBtn' onClick={() => deleteTask(id)}> X </button>
                </div>
                </>
            )}
        </div>
      )
}

