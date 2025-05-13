'use server';

import prisma from '@/lib/prisma';
import { Task } from '@prisma/client';

export async function createTask(formData: FormData): Promise<Task | null> {
  try {
    const header = formData.get('header') as string;
    const description = formData.get('description') as string;
    
    if (!header || !description) {
      return null;
    }
    
    // Insert using Prisma
    const newTask = await prisma.task.create({
      data: {
        header,
        description,
      }
    });
    
    return newTask;
  } catch (error) {
    console.error('Error creating task:', error);
    return null;
  }
} 