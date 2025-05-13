import prisma from '@/lib/prisma';
import { Suspense } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

export default async function Page() {
  // Fetch existing tasks
  const tasks = await prisma.task.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Task Manager</h1>
      
      <Suspense fallback={<div>Loading tasks...</div>}>
        <TaskList initialTasks={tasks} />
      </Suspense>
      
      {/* Create task form */}
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700 mt-8">
        <h2 className="text-xl font-semibold mb-4">Create New Task</h2>
        <TaskForm />
      </div>
    </div>
  );
}