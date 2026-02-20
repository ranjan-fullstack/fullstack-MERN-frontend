import API from "../api/axios";

function TaskItem({ task, refresh }) {
  const deleteTask = async () => {
    await API.delete(`/tasks/${task._id}`);
    refresh();
  };

  return (
    <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm">
      <span>{task.title}</span>
      <button
        onClick={deleteTask}
        className="text-red-500 hover:text-red-700 text-sm"
      >
        Delete
      </button>
    </div>
  );
}

export default TaskItem;
