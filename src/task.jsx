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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      saveEdit();
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  return (
    <div className="sub-list">
      {editingTaskId === id ? (
        <div className="edit-mode">
          <input
            type="text"
            value={editedTaskName}
            onChange={(e) => setEditedTaskName(e.target.value)}
            onKeyDown={handleKeyPress}
            autoFocus
          />
          <button className="save-btn" onClick={saveEdit}>Save</button>
          <button className="cancel-btn" onClick={cancelEdit}>Cancel</button>
        </div>
      ) : (
        <>
          <div className="task-content">
            <h4>{taskName}</h4>
          </div>
          <div className="task-buttons">
            <button className="editBtn" onClick={() => startEditing(id, taskName)}>Edit</button>
            <button className="deleteBtn" onClick={() => deleteTask(id)}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
};