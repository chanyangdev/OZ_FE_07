import React, { useState, useEffect } from "react";

function App() {
  // State for storing tasks
  const [tasks, setTasks] = useState(() => {
    // Load tasks from localStorage when the app loads
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // State for new task input
  const [newTask, setNewTask] = useState("");

  // State for the due date input
  const [dueDate, setDueDate] = useState("");

  // State to filter tasks (all, completed, uncompleted)
  const [filter, setFilter] = useState("all");

  // State for editing a task
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedText, setEditedText] = useState("");

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Function to add a new task
  const addTask = () => {
    if (newTask.trim() === "") return; // Prevent adding empty tasks
    setTasks([
      ...tasks,
      { id: Date.now(), text: newTask, completed: false, dueDate: dueDate },
    ]);
    setNewTask(""); // Clear the input field
    setDueDate(""); // Clear the due date field
  };

  // Function to delete a task by its ID
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Function to toggle the completion status of a task
  const toggleCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Function to filter tasks based on the selected filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "uncompleted") return !task.completed;
    return true; // Default is "all"
  });

  return (
    <div style={{ padding: "20px" }}>
      <h1>Todo List App</h1>

      {/* Input for adding a new task */}
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

      {/* Buttons to filter tasks */}
      <div style={{ margin: "10px 0" }}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("uncompleted")}>Uncompleted</button>
      </div>

      {/* Display the list of tasks */}
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id} style={{ display: "flex", gap: "10px" }}>
            {editingTaskId === task.id ? (
              // Edit mode: allow the user to update the task
              <>
                <input
                  type="text"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                />
                <button
                  onClick={() => {
                    // Save the edited text and reset edit mode
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
              // Normal display mode
              <>
                {/* Checkbox to toggle completion */}
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleCompletion(task.id)}
                />
                {/* Task text with strikethrough if completed */}
                <span
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                  }}
                >
                  {task.text}
                </span>
                {/* Display the due date if available */}
                {task.dueDate && (
                  <span style={{ marginLeft: "10px" }}>
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                )}
                {/* Edit and Delete buttons */}
                <button
                  onClick={() => {
                    setEditingTaskId(task.id); // Enter edit mode
                    setEditedText(task.text); // Prefill the current task text
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
