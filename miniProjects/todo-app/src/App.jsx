import { useState, useEffect } from "react";

function App() {
  // State to manage the list of todos
  const [todos, setTodos] = useState([]);
  
  // State for the input text to add new tasks
  const [input, setInput] = useState('');
  
  // State for filtering tasks (all, completed, uncompleted)
  const [filter, setFilter] = useState('all'); // 'all' by default

  // Load todos from local storage when the component mounts
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      try {
        setTodos(JSON.parse(storedTodos)); // Parse the stored JSON string and set it to state
      } catch (error) {
        console.error("Error parsing local storage todos:", error);
      }
    }
  }, []); // Empty array means this useEffect runs only once when the component mounts

  // Save todos to local storage whenever the todos list changes
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos)); // Convert todos to JSON and save
    }
  }, [todos]); // This useEffect runs every time the todos state changes

  // Function to add a new todo to the list
  const addTodo = () => {
    if (input.trim()) { // Only add if input is not empty
      setTodos([...todos, { id: Date.now(), text: input, completed: false, isEditing: false }]);
      setInput(''); // Clear the input field after adding the todo
    }
  };

  // Handle 'Enter' key to add a new todo
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) { // Prevent 'Enter' from creating new line in input
      addTodo();
    }
  };

  // Function to toggle the edit mode of a todo
  const toggleEdit = (id) => {
    // When edit button is clicked, toggle the `isEditing` property
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, isEditing: true } : todo
    ));
  };

  // Function to save the edited todo
  const saveEdit = (id, newText) => {
    // Save the new text for the todo and disable the editing mode
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText, isEditing: false } : todo
    ));
  };

  // Handle 'Enter' key in the edit mode to save the edit
  const handleEditKeyDown = (event, id) => {
    if (event.key === 'Enter') { // If 'Enter' is pressed, save the edit
      const newText = event.target.value; // Get the new text from the input field
      saveEdit(id, newText); // Call saveEdit to save the new text
    }
  };

  // Filter todos based on the selected filter ('all', 'completed', 'uncompleted')
  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed; // Show only completed todos
    if (filter === 'uncompleted') return !todo.completed; // Show only uncompleted todos
    return true; // 'all' case: Show all todos
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f4f4]"> {/* Light paper-like background */}
      <div className="w-full max-w-lg bg-[#fafafa] shadow-lg rounded-lg p-8 border-2 border-gray-300">
        {/* Title of the Todo List */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Todo List 📝
        </h1>

        {/* Add Todo Section */}
        <div className="mb-6">
          {/* Input field to add new task */}
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)} // Update input state on change
            onKeyDown={handleKeyDown} // Add a new todo when Enter is pressed
            placeholder="Add a new task"
            className="w-full h-12 p-3 border rounded-md bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Button to add a new todo */}
          <button
            onClick={addTodo} // Call addTodo function when clicked
            className="w-full mt-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
          >
            Add Task
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center mb-6 space-x-4">
          {/* Filter buttons for 'All', 'Completed', and 'Uncompleted' */}
          <button onClick={() => setFilter('all')} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
            All
          </button>
          <button onClick={() => setFilter('completed')} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
            Completed
          </button>
          <button onClick={() => setFilter('uncompleted')} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
            Uncompleted
          </button>
        </div>

        {/* Todo List */}
        <ul className="space-y-4">
          {/* Map over filtered todos and render each todo */}
          {filteredTodos.map((todo) => (
            <li key={todo.id} className="flex items-center p-4 rounded-md bg-white shadow-md border-2 border-gray-200">
              {/* Checkbox to mark todo as completed or uncompleted */}
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() =>
                  setTodos(
                    todos.map((t) =>
                      t.id === todo.id ? { ...t, completed: !t.completed } : t
                    )
                  )
                }
                className="mr-3 h-5 w-5 text-blue-500"
              />
              {/* Display either editable input field or todo text */}
              {todo.isEditing ? (
                <input
                  type="text"
                  defaultValue={todo.text} // Set the current text as the default value
                  onBlur={(e) => saveEdit(todo.id, e.target.value)} // Save the todo when focus is lost (blur)
                  onKeyDown={(e) => handleEditKeyDown(e, todo.id)} // Save the todo when Enter is pressed
                  className="flex-grow p-2 border rounded-md bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <span
                  className={`flex-grow ${
                    todo.completed ? 'line-through text-gray-500' : 'text-gray-800'
                  }`}
                >
                  {todo.text} {/* Display the text of the todo */}
                </span>
              )}
              {/* Button to toggle editing mode */}
              <button
                onClick={() => toggleEdit(todo.id)} // Toggle edit mode when clicked
                className="ml-3 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                {todo.isEditing ? 'Save' : 'Edit'} {/* Change button text based on edit mode */}
              </button>
              {/* Button to delete the todo */}
              <button
                onClick={() => setTodos(todos.filter((t) => t.id !== todo.id))} // Remove the todo from the list
                className="ml-3 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;