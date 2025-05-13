'use client';

import { useState } from 'react';
import { createTask } from '../actions';
import { taskCreatedEvent } from './TaskList';

export default function TaskForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);
    
    try {
      const newTask = await createTask(formData);
      
      if (newTask) {
        // Dispatch custom event with the new task
        const taskEvent = new CustomEvent(taskCreatedEvent, {
          detail: newTask
        });
        window.dispatchEvent(taskEvent);
        
        // Reset the form
        const form = document.getElementById('task-form') as HTMLFormElement;
        form.reset();
        
        // Show success message briefly
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError('Failed to create task. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form id="task-form" action={handleSubmit} className="space-y-4">
      {success && (
        <div className="p-3 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-md mb-4">
          Task created successfully!
        </div>
      )}
      
      {error && (
        <div className="p-3 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-md mb-4">
          {error}
        </div>
      )}
      
      <div>
        <label htmlFor="header" className="block text-sm font-medium mb-1">
          Task Title
        </label>
        <input 
          id="header"
          type="text" 
          placeholder="Enter task title" 
          name="header" 
          className="w-full p-2 border dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          required
          disabled={isSubmitting}
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Description
        </label>
        <textarea 
          id="description"
          placeholder="Enter task details" 
          name="description" 
          className="w-full p-2 border dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          rows={3}
          required
          disabled={isSubmitting}
        />
      </div>
      <button 
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-70 disabled:cursor-not-allowed"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Creating...' : 'Create Task'}
      </button>
    </form>
  );
} 