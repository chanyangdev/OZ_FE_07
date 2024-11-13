import { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  // Load todos from local storage when the component mounts
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      try {
        setTodos(JSON.parse(storedTodos));
      } catch (error) {
        console.error("Error parsing local storage todos:", error);
      }
    }
  }, []);

  // Save todos to local storage whenever todos change
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  // Add isEditing property
  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false, isEditing: false }]);
      setInput('');
    }
  };

  // Handle Enter key press to add the todo
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      addTodo();
    }
  };

  // Toggle edit mode for a specific todo
  const toggleEdit = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, isEditing: true } : todo
    ));
  };

  // Update text while editing
  const handleEditInputChange = (id, newText) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  // Save changes and exit edit mode
  const saveEdit = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, isEditing: false } : todo
    ));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-emerald-600">
      <div className="bg-white shadow-lg rounded-3xl p-16">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Todo List ✅
        </h1>

        <div className="mb-4 flex">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown} // Add this line for Enter key handling
            type="text"
            placeholder="Add a new task"
            className="flex-grow px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
            onClick={addTodo}
          >
            Add
          </button>
        </div>

        <ul className="space-y-2">
          {todos.map((todo) => (
            <li key={todo.id} className="flex items-center p-3 rounded-lg bg-slate-100 border border-gray-200">
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
                className="mr-2 h-5 w-5 text-blue-600"
              />

              {/* Render input or text based on isEditing */}
              {todo.isEditing ? (
                <input
                  value={todo.text}
                  onChange={(e) => handleEditInputChange(todo.id, e.target.value)}
                  className="flex-grow mr-2 px-2 py-1 border rounded focus:outline-none"
                />
              ) : (
                <span
                  className={`flex-grow ${
                    todo.completed ? 'line-through text-gray-500' : 'text-gray-800'
                  }`}
                >
                  {todo.text}
                </span>
              )}

              {todo.isEditing ? (
                <button onClick={() => saveEdit(todo.id)}
                  className="ml-2 p-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
                >
                  Save
                </button>
              ) : (
                <button onClick={() => toggleEdit(todo.id)}
                  className="ml-2 p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                >
                  Edit
                </button>
              )}

              <button
                onClick={() =>
                  setTodos(todos.filter((t) => t.id !== todo.id))
                }
                className="ml-2 p-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
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