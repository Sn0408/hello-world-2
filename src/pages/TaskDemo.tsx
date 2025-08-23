import { useState } from 'react';
import TaskCard from '../components/TaskCard';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const TaskDemo = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Learn React with TypeScript',
      description: 'Master the fundamentals of React development with TypeScript support',
      completed: false,
    },
    {
      id: 2,
      title: 'Build a Todo App',
      description: 'Create a complete todo application using React and TailwindCSS',
      completed: true,
    },
    {
      id: 3,
      title: 'Deploy to GitHub Pages',
      description: 'Learn how to deploy your React app to GitHub Pages',
      completed: false,
    },
  ]);

  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [showForm, setShowForm] = useState(false);

  const toggleTask = (id: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.title.trim() && newTask.description.trim()) {
      const task: Task = {
        id: Date.now(),
        title: newTask.title.trim(),
        description: newTask.description.trim(),
        completed: false,
      };
      setTasks(prevTasks => [...prevTasks, task]);
      setNewTask({ title: '', description: '' });
      setShowForm(false);
    }
  };

  const deleteTask = (id: number) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Task Management Demo
          </h1>
          <p className="text-xl text-gray-600">
            Interactive TaskCard components with TypeScript and TailwindCSS
          </p>
        </div>

        {/* Add Task Button */}
        <div className="text-center mb-8">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            {showForm ? 'Cancel' : '+ Add New Task'}
          </button>
        </div>

        {/* Add Task Form */}
        {showForm && (
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Task</h3>
            <form onSubmit={addTask} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Task Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={newTask.title}
                  onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter task title"
                  required
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  value={newTask.description}
                  onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter task description"
                  required
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200"
                >
                  Add Task
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Task List */}
        <div className="space-y-6">
          {tasks.map(task => (
            <div key={task.id} className="relative">
              <TaskCard
                title={task.title}
                description={task.description}
                completed={task.completed}
                onToggle={() => toggleTask(task.id)}
              />
              {/* Delete Button */}
              <button
                onClick={() => deleteTask(task.id)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors duration-200"
                aria-label="Delete task"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Click on the checkbox to toggle task completion status • Use the form above to add new tasks
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaskDemo;
