import React, { useState, useEffect, useRef } from "react";

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

  // Reference for the input field
  const taskInputRef = useRef(null);
  const dueDateInputRef = useRef(null);

  // Hold previous state of tasks
  const previousTasksRef = useRef([]);

  // list container
  const listRef = useRef(null);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Function to add a new task
  const addTask = () => {
    if (newTask.trim() === "") {
      alert("Task cannot be empty!");
      taskInputRef.current.focus(); // focus on the task input
      return;
    }

    if (!dueDate) {
      alert("Please select a due date!");
      dueDateInputRef.current.focus(); // focus on the due date input
      return;
    }

    setTasks([
      ...tasks,
      { id: Date.now(), text: newTask, completed: false, dueDate: dueDate },
    ]);
    setNewTask("");
    setDueDate("");
    setTimeout(() => {
      listRef.current.scrollTop = listRef.current.scrollHeight; // scroll to bottom
    }, 0);
  };

  // Function to delete a task by its ID
  const deleteTask = (id) => {
    previousTasksRef.current = tasks;
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Function to "Undo" a task
  const undoLastAction = () => {
    setTasks(previousTasksRef.current);
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
          ref={taskInputRef}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          ref={dueDateInputRef}
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
      <ul ref={listRef} style={{ maxHeight: "200px", overflowY: "auto" }}>
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
                <button
                  onClick={undoLastAction}
                  disabled={previousTasksRef.current.length === 0}
                >
                  Undo
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
