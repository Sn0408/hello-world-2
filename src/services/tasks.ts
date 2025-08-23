import { z } from 'zod';

export const TaskSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(80, 'Title too long'),
  description: z.string().max(280, 'Description too long').optional().or(z.literal('')),
  completed: z.boolean().default(false),
});

export type TaskInput = z.infer<typeof TaskSchema>;

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

// In-memory store for now
let tasks: Task[] = [
  { id: 1, title: 'Learn Cursor', description: 'Set up dev env', completed: false },
  { id: 2, title: 'Build Task List', description: 'Practice React state', completed: false },
];

let nextId = 3;

// Helper function to simulate random failures (10% chance)
const simulateRandomFailure = () => {
  if (Math.random() < 0.1) {
    throw new Error('Random server error occurred');
  }
};

export const getTasks = async (): Promise<Task[]> => {
  try {
    // Simulate API latency
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Simulate random failure
    simulateRandomFailure();
    
    return [...tasks];
  } catch (error) {
    throw new Error('Failed to fetch tasks');
  }
};

export const createTask = async (input: TaskInput): Promise<Task> => {
  try {
    // Simulate API latency
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Simulate random failure
    simulateRandomFailure();
    
    const newTask: Task = {
      id: nextId++,
      title: input.title,
      description: input.description || '',
      completed: input.completed,
    };
    
    tasks.push(newTask);
    return newTask;
  } catch (error) {
    throw new Error('Failed to create task');
  }
};

export const updateTask = async (id: number, input: Partial<TaskInput>): Promise<Task> => {
  try {
    // Simulate API latency
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Simulate random failure
    simulateRandomFailure();
    
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }
    
    const updatedTask: Task = {
      ...tasks[taskIndex],
      ...input,
      title: input.title || tasks[taskIndex].title,
      description: input.description !== undefined ? input.description : tasks[taskIndex].description,
    };
    
    tasks[taskIndex] = updatedTask;
    return updatedTask;
  } catch (error) {
    throw new Error('Failed to update task');
  }
};

export const deleteTask = async (id: number): Promise<void> => {
  try {
    // Simulate API latency
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Simulate random failure
    simulateRandomFailure();
    
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }
    
    tasks.splice(taskIndex, 1);
  } catch (error) {
    throw new Error('Failed to delete task');
  }
};
