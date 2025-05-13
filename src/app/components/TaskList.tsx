'use client';

import { Task } from '@prisma/client';
import { useEffect, useState } from 'react';

// Create a custom event for task creation
export const taskCreatedEvent = 'taskCreated';

// Custom event interface
interface TaskCreatedEvent extends CustomEvent {
  detail: Task;
}

export default function TaskList({ initialTasks }: { initialTasks: Task[] }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  // Listen for the custom task created event
  useEffect(() => {
    const handleTaskCreated = (event: TaskCreatedEvent) => {
      const newTask = event.detail;
      setTasks(prevTasks => [newTask, ...prevTasks]);
    };

    // Add event listener
    window.addEventListener(taskCreatedEvent, handleTaskCreated as EventListener);

    // Clean up
    return () => {
      window.removeEventListener(taskCreatedEvent, handleTaskCreated as EventListener);
    };
  }, []);

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
      {tasks.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 italic">No tasks yet. Create one below!</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li 
              key={task.id} 
              className="border rounded-lg p-4 bg-white dark:bg-gray-800 shadow-sm hover:shadow transition"
            >
              <h3 className="font-medium text-lg">{task.header}</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-1">{task.description}</p>
              <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                Created: {new Date(task.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 