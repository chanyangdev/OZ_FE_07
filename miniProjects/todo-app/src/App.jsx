import { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all'); // Filter state

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

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false, isEditing: false }]);
      setInput('');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      addTodo();
    }
  };

  const toggleEdit = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, isEditing: true } : todo
    ));
  };

  const saveEdit = (id, newText) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText, isEditing: false } : todo
    ));
  };

  const handleEditKeyDown = (event, id) => {
    if (event.key === 'Enter') {
      const newText = event.target.value;
      saveEdit(id, newText);
    }
  };

  // Filter todos
  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'uncompleted') return !todo.completed;
    return true; // 'all' case
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f4f4]"> {/* Light paper-like background */}
      <div className="w-full max-w-lg bg-[#fafafa] shadow-lg rounded-lg p-8 border-2 border-gray-300">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Todo List 📝
        </h1>

        {/* Add Todo Section */}
        <div className="mb-6">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a new task"
            className="w-full h-12 p-3 border rounded-md bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addTodo}
            className="w-full mt-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
          >
            Add Task
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center mb-6 space-x-4">
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
          {filteredTodos.map((todo) => (
            <li key={todo.id} className="flex items-center p-4 rounded-md bg-white shadow-md border-2 border-gray-200">
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
              {/* Displaying Editable Text Field or Text */}
              {todo.isEditing ? (
                <input
                  type="text"
                  defaultValue={todo.text}
                  onBlur={(e) => saveEdit(todo.id, e.target.value)} // Save on blur
                  onKeyDown={(e) => handleEditKeyDown(e, todo.id)} // Save on Enter
                  className="flex-grow p-2 border rounded-md bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              <button
                onClick={() => toggleEdit(todo.id)}
                className="ml-3 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                {todo.isEditing ? 'Save' : 'Edit'}
              </button>
              <button
                onClick={() => setTodos(todos.filter((t) => t.id !== todo.id))}
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