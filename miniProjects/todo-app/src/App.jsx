function App() {

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-emerald-600">

    <div className="bg-white shadow-lg rounded-3xl p-16">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">React Todo List ✅</h1>

      <div className="mb-4 flex">
        <input type="text" placeholder="Add a new task" className="flex-grow px-3 py-2 border rounded-1-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600">Add</button>
      </div>

      <ul className="space-y-2">

      </ul>
      
    </div>
    </div>
  );
}

export default App;