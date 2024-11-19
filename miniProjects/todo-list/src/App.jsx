import React, { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedText, setEditedText] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([
      ...tasks,
      { id: Date.now(), text: newTask, completed: false, dueDate: dueDate },
    ]);
    setNewTask("");
    setDueDate("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "uncompleted") return !task.completed;
    return true;
  });

  return (
    <div style={{ padding: "20px" }}>
      <h1>Todo List App</h1>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>
      <div style={{ margin: "10px 0" }}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("uncompleted")}>Uncompleted</button>
      </div>
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id} style={{ display: "flex", gap: "10px" }}>
            {editingTaskId === task.id ? (
              <>
                <input
                  type="text"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                />
                <button
                  onClick={() => {
                    setTasks(
                      tasks.map((t) =>
                        t.id === task.id ? { ...t, text: editedText } : t
                      )
                    );
                    setEditingTaskId(null);
                    setEditedText("");
                  }}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleCompletion(task.id)}
                />
                <span
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                  }}
                >
                  {task.text}
                </span>
                {task.dueDate && (
                  <span style={{ marginLeft: "10px" }}>
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                )}
                <button
                  onClick={() => {
                    setEditingTaskId(task.id);
                    setEditedText(task.text);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
