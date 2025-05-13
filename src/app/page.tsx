import prisma from '@/lib/prisma';

export default function Page() {
  async function create(formData: FormData) {
    'use server';
    
    const header = formData.get('header') as string;
    const description = formData.get('description') as string;
    
    // Insert using Prisma
    await prisma.task.create({
      data: {
        header,
        description
      }
    });
  }

  return (
    <form action={create} className="space-y-4">
      <div>
        <input 
          type="text" 
          placeholder="Task header" 
          name="header" 
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <textarea 
          placeholder="Task description" 
          name="description" 
          className="w-full p-2 border rounded"
          rows={3}
        />
      </div>
      <button 
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Create Task
      </button>
    </form>
  );
}