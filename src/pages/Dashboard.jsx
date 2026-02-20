import { useEffect, useState, useContext } from "react";
import API from "../api/axios";
import AuthContext from "../context/AuthContext";
import { LogOut } from "lucide-react";

function Dashboard() {
  const { logout } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // ✅ Load tasks on first render
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const res = await API.get("/tasks");
        setTasks(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadTasks();
  }, []);

  // ✅ Reusable refresh function
  const refreshTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!title.trim()) return;

    await API.post("/tasks", { title });
    setTitle("");
    refreshTasks();
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    refreshTasks();
  };

  const markComplete = async (id) => {
    await API.put(`/tasks/${id}`, { completed: true });
    refreshTasks();
  };

  // ✅ Derived values
  const activeTasks = tasks.filter(task => !task.completed);
  const completedCount = tasks.filter(task => task.completed).length;

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 hidden md:block">
        <h2 className="text-2xl font-bold mb-8">TaskPro</h2>

        <button
          onClick={logout}
          className="mt-10 flex items-center gap-2 text-red-500 hover:text-red-700"
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">

        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        {/* Stats Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Active Tasks</p>
            <p className="text-3xl font-bold mt-2">
              {activeTasks.length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Completed Tasks</p>
            <p className="text-3xl font-bold mt-2 text-green-600">
              {completedCount}
            </p>
          </div>
        </div>

        {/* Add Task */}
        <div className="bg-white p-6 rounded-xl shadow mb-6">
          <div className="flex gap-3">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter new task..."
              className="flex-1 border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={addTask}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Add
            </button>
          </div>
        </div>

        {/* Active Tasks */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Active Tasks</h2>

          <div className="space-y-3">
            {activeTasks.map(task => (
              <div
                key={task._id}
                className="flex justify-between items-center border-b pb-2"
              >
                <span>{task.title}</span>

                <div className="flex gap-4">
                  <button
                    onClick={() => markComplete(task._id)}
                    className="text-green-600 hover:text-green-800"
                  >
                    Complete
                  </button>

                  <button
                    onClick={() => deleteTask(task._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {activeTasks.length === 0 && (
              <p className="text-gray-400 text-center py-4">
                No active tasks 🎉
              </p>
            )}
          </div>
        </div>

      </main>
    </div>
  );
}

export default Dashboard;
