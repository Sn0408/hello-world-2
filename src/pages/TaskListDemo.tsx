import TaskList from '../components/TaskList';

const TaskListDemo = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            TaskList Component Demo
          </h1>
          <p className="text-xl text-gray-600">
            Simple TaskList component managing task state and rendering TaskCard components
          </p>
        </div>

        {/* TaskList Component */}
        <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">My Tasks</h2>
          <TaskList />
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Click on the checkboxes to toggle task completion status
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaskListDemo;
