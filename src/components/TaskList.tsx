import { useState, useEffect } from 'react';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import { createTask, updateTask, getTasks, type Task } from '../services/tasks';

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>('');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const loadedTasks = await getTasks();
      setTasks(loadedTasks);
    } catch (error) {
      console.error('Failed to load tasks:', error);
    }
  };

  const toggleTask = async (id: number) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    try {
      const updatedTask = await updateTask(id, { completed: !task.completed });
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === id ? updatedTask : task
        )
      );
    } catch (error) {
      console.error('Failed to toggle task:', error);
    }
  };

  const handleCreateTask = async (data: { title: string; description: string; completed: boolean }) => {
    try {
      const newTask = await createTask(data);
      setTasks(prevTasks => [...prevTasks, newTask]);
      setShowCreate(false);
      showSuccessMessage('Task created successfully!');
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const handleUpdateTask = async (data: { title: string; description: string; completed: boolean }) => {
    if (!editingTaskId) return;

    try {
      const updatedTask = await updateTask(editingTaskId, data);
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === editingTaskId ? updatedTask : task
        )
      );
      setEditingTaskId(null);
      showSuccessMessage('Task updated successfully!');
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTaskId(task.id);
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
  };

  const showSuccessMessage = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const renderTask = (task: Task) => {
    if (editingTaskId === task.id) {
      return (
        <TaskForm
          key={`edit-${task.id}`}
          initial={task}
          onSubmit={handleUpdateTask}
          onCancel={handleCancelEdit}
        />
      );
    }

    return (
      <TaskCard
        key={task.id}
        title={task.title}
        description={task.description}
        completed={task.completed}
        onToggle={() => toggleTask(task.id)}
        onEdit={() => handleEditTask(task)}
      />
    );
  };

  if (tasks.length === 0 && !showCreate) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 mb-4">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks yet</h3>
        <p className="text-gray-500 mb-4">Get started by creating your first task</p>
        <button
          onClick={() => setShowCreate(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200"
        >
          Add Your First Task
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Success Message */}
      {successMessage && (
        <div 
          role="status"
          className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md animate-fade-in"
        >
          {successMessage}
        </div>
      )}

      {/* Add Task Button */}
      {!showCreate && (
        <div className="text-center">
          <button
            onClick={() => setShowCreate(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            + Add New Task
          </button>
        </div>
      )}

      {/* Create Task Form */}
      {showCreate && (
        <TaskForm
          onSubmit={handleCreateTask}
          onCancel={() => setShowCreate(false)}
        />
      )}

      {/* Task List */}
      <div className="space-y-4">
        {tasks.map(renderTask)}
      </div>
    </div>
  );
};

export default TaskList;
