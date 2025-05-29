import { useState } from "react";

function App() {
  const [addTask, setAddTask] = useState("");
  const [todo, setTodo] = useState([]);

  const addTodoTask = (e) => {
    e.preventDefault();
    setTodo((prev) => [
      ...prev,
      { id: Date.now(), task: addTask, completed: false },
    ]);
    setAddTask("");
  };

  const deleteTask = (toDelete) => {
    const newArr = todo.filter((item) => item.id != toDelete);
    setTodo(newArr);
  };

  const toggleCompleted = (toToggle) => {
    const updatedArray = todo.map((item) => {
      return item.id === toToggle
        ? { ...item, completed: !item.completed }
        : item;
    });
    setTodo(updatedArray);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-400 to-red-200 p-8 font-mono">
      <div className="max-w-2xl mx-auto bg-black bg-opacity-40 backdrop-blur-lg rounded-3xl p-8 shadow-2xl shadow-purple-500/50 border-2 border-cyan-300">
        <h1 className="text-5xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-300">
          TODO APP
        </h1>
        
        {/* Add Task Form */}
        <form onSubmit={addTodoTask} className="mb-10">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="✨ Enter your Todo task..."
              className="flex-1 px-6 py-4 rounded-full bg-black bg-opacity-50 text-cyan-200 placeholder-pink-300 border-2 border-purple-400 focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:border-transparent text-lg font-bold"
              onChange={(e) => setAddTask(e.target.value)}
              value={addTask}
            />
            <button
              type="submit"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold uppercase tracking-wider hover:scale-105 transform transition duration-200 hover:shadow-lg hover:shadow-cyan-400/50"
            >
              ADD
            </button>
          </div>
        </form>

        {/* Pending Tasks */}
        {todo.some(item => !item.completed) && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-yellow-300 flex items-center">
              <span className="inline-block w-4 h-4 bg-pink-500 rounded-full mr-2 animate-pulse"></span>
              PENDING TASKS
            </h2>
            <ul className="space-y-3">
              {todo.map((item) => {
                return !item.completed ? (
                  <li 
                    key={item.id} 
                    className="flex items-center group bg-gradient-to-r from-purple-900/50 to-pink-800/50 p-4 rounded-xl border-l-4 border-cyan-400 hover:border-yellow-400 transition-all"
                  >
                    <span className="flex-1 text-xl font-bold text-cyan-200 group-hover:text-white">
                      {item.task}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => deleteTask(item.id)}
                        className="px-4 py-2 bg-red-500 hover:bg-red-400 text-white rounded-lg font-bold transform hover:scale-110 transition duration-200"
                      >
                        ✕
                      </button>
                      <button
                        onClick={() => toggleCompleted(item.id)}
                        className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-400 hover:from-green-400 hover:to-emerald-300 text-white rounded-lg font-bold transform hover:scale-110 transition duration-200"
                      >
                        ✓
                      </button>
                    </div>
                  </li>
                ) : null;
              })}
            </ul>
          </div>
        )}

        {/* Completed Tasks */}
        {todo.some(item => item.completed) && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-green-300 flex items-center">
              <span className="inline-block w-4 h-4 bg-green-500 rounded-full mr-2"></span>
              COMPLETED TASKS
            </h2>
            <ul className="space-y-3">
              {todo.map((item) => {
                return item.completed ? (
                  <li 
                    key={item.id} 
                    className="flex items-center group bg-gradient-to-r from-green-900/50 to-emerald-800/50 p-4 rounded-xl border-l-4 border-green-400 hover:border-yellow-400 transition-all opacity-80 hover:opacity-100"
                  >
                    <span className="flex-1 text-xl font-bold text-green-200 line-through group-hover:text-white">
                      {item.task}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => deleteTask(item.id)}
                        className="px-4 py-2 bg-red-500 hover:bg-red-400 text-white rounded-lg font-bold transform hover:scale-110 transition duration-200"
                      >
                        ✕
                      </button>
                      <button
                        onClick={() => toggleCompleted(item.id)}
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-400 hover:to-cyan-300 text-white rounded-lg font-bold transform hover:scale-110 transition duration-200"
                      >
                        ↻
                      </button>
                    </div>
                  </li>
                ) : null;
              })}
            </ul>
          </div>
        )}

        {todo.length === 0 && (
          <div className="text-center py-16">
            <div className="text-8xl mb-6">🕺</div>
            <h2 className="text-3xl font-bold text-pink-300 mb-2">NO TASKS YET!</h2>
            <p className="text-xl text-cyan-200">Add your first Todo task above</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;