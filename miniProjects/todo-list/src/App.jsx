import { useState, useEffect, useRef } from "react";
import notepad from "./assets/notepad.svg";
import "./App.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Clock from "./Components/Clock";
import PostItWithText from "./Components/PostItWithText";
function App() {
  // State for storing tasks
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // State for new task input
  const [newTask, setNewTask] = useState("");

  // State for the due date input
  const [dueDate, setDueDate] = useState(null);

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

  // Function to edit a task
  const editTask = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    setEditingTaskId(id);
    setEditedText(taskToEdit.text);
  };

  // Function to save the edited task
  const saveEditedTask = () => {
    if (editedText.trim() === "") {
      alert("Task cannot be empty!");
      return;
    }
    setTasks(
      tasks.map((task) =>
        task.id === editingTaskId ? { ...task, text: editedText } : task
      )
    );
    setEditingTaskId(null); // Reset editing state
    setEditedText(""); // Clear the edited text input
  };

  // Function to cancel editing a task
  const cancelEdit = () => {
    setEditingTaskId(null); // Reset editing state
    setEditedText(""); // Clear the edited text input
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
    <>
      {/* Notepad background image */}
      <div className="post-it">
        <PostItWithText />
      </div>
      <div className="notepad-container">
        <img src={notepad} alt="Notepad" className="notepad-background" />
        {/* Clock */}
        <Clock />
        <div className="todo-content">
          <h1 style={{ textAlign: "center" }}>Todo List</h1>

          {/* Input Section */}
          <div className="input-section">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Enter a new task"
              ref={taskInputRef}
              disabled={editingTaskId !== null} // Disable input while editing
            />
            <DatePicker
              selected={dueDate}
              onChange={(date) => setDueDate(date)}
              placeholderText="Select a due date"
              dateFormat="MM/dd/yyyy"
              id="due-date"
              ref={dueDateInputRef}
              disabled={editingTaskId !== null} // Disable input while editing
            />
            <button onClick={addTask}>Add</button>
          </div>

          {/* Editing Task Section */}
          {editingTaskId && (
            <div className="edit-task-section">
              <input
                type="text"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                placeholder="Edit your task"
              />
              <button onClick={saveEditedTask}>Save</button>
              <button onClick={cancelEdit}>Cancel</button>
            </div>
          )}

          {/* Filter Section */}
          <div className="filter-section">
            <button onClick={() => setFilter("all")}>All</button>
            <button onClick={() => setFilter("completed")}>Completed</button>
            <button onClick={() => setFilter("uncompleted")}>
              Uncompleted
            </button>
          </div>

          {/* Task List */}
          <ul ref={listRef}>
            {filteredTasks.map((task) => (
              <li key={task.id}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleCompletion(task.id)}
                />
                <span className={task.completed ? "completed" : ""}>
                  {task.text}
                </span>
                <div>
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                  <button onClick={undoLastAction}>Undo</button>
                  <button onClick={() => editTask(task.id)}>Edit</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
